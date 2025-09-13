'use client';

import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useRef, forwardRef } from 'react';
import { Coffee, Bike, Car, Laptop, Smartphone, Heart, ScanLine } from 'lucide-react';
import qrcode from 'qrcode';


export type QrStyle = 'squares' | 'dots' | 'rounded';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type FrameStyle = 'none' | 'text' | 'box' | 'banner' | 'coffee' | 'bike' | 'car' | 'laptop' | 'smartphone' | 'heart';

interface QRCodeDisplayProps {
  value: string;
  qrColor?: string;
  bgColor?: string;
  logo?: string | null;
  qrStyle?: QrStyle;
  ecLevel?: ErrorCorrectionLevel;
  frameText?: string;
  frameStyle?: FrameStyle;
  size?: number;
}

const frameIcons: { [key in FrameStyle]?: string } = {
    coffee: '☕',
    bike: '🚲',
    car: '🚗',
    laptop: '💻',
    smartphone: '📱',
    heart: '❤️',
};


const QRCodeDisplay = forwardRef<HTMLDivElement, QRCodeDisplayProps>(
  ({ value, qrColor = '#000000', bgColor = '#FFFFFF', logo, qrStyle = 'squares', ecLevel = 'M', frameText, frameStyle = 'none', size = 256 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // Determine the total size including frame
    const qrSize = size;
    let framePadding = 0;
    let frameHeight = 0;
    const hasFrame = frameStyle !== 'none' && frameText;

    if (frameStyle === 'box') {
      framePadding = 20;
    }
    if (hasFrame) {
        if (frameStyle === 'box' || frameStyle === 'text') {
            frameHeight = 40; 
        } else {
            frameHeight = 50;
        }
    }

    const totalWidth = qrSize + (framePadding * 2);
    const totalHeight = qrSize + (framePadding * 2) + frameHeight;

    useEffect(() => {
      const renderQRCode = async () => {
        if (!value || !canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = totalWidth;
        canvas.height = totalHeight;

        // Clear canvas and draw background
        ctx.clearRect(0, 0, totalWidth, totalHeight);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        // --- Start Frame Drawing ---
        const drawFrame = () => {
          if (!hasFrame && frameStyle !== 'box') return;

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if (frameStyle === 'text' && frameText) {
              ctx.fillStyle = qrColor;
              ctx.font = `bold 20px Inter, sans-serif`;
              ctx.fillText(frameText, totalWidth / 2, (framePadding) + qrSize + (frameHeight / 2));
          } else if (frameStyle === 'box') {
              ctx.strokeStyle = qrColor;
              ctx.lineWidth = 4;
              ctx.strokeRect((framePadding/2), (framePadding/2), qrSize + framePadding, qrSize + framePadding);
              if (frameText) {
                ctx.fillStyle = qrColor;
                ctx.font = `bold 20px Inter, sans-serif`;
                ctx.fillText(frameText, totalWidth / 2, (framePadding) + qrSize + (frameHeight/2));
              }
          } else if (frameStyle !== 'none' && frameText) { // Banner styles
              const isIconFrame = frameIcons.hasOwnProperty(frameStyle);
              
              ctx.fillStyle = qrColor;
              ctx.fillRect(0, totalHeight - 60, totalWidth, 60);
              
              ctx.fillStyle = bgColor;
              ctx.font = `bold 22px Inter, sans-serif`;
              
              let textX = totalWidth / 2;
              
              if (isIconFrame) {
                const icon = frameIcons[frameStyle as keyof typeof frameIcons]!;
                const iconWidth = ctx.measureText(icon).width;
                const textWidth = ctx.measureText(frameText).width;
                const totalContentWidth = iconWidth + textWidth + 10;
                const iconX = (totalWidth - totalContentWidth) / 2;
                textX = iconX + iconWidth + 10;
                
                ctx.font = '24px sans-serif'; // Use a generic font for emoji
                ctx.textAlign = 'left';
                ctx.fillText(icon, iconX, totalHeight - 30);
                
                ctx.font = `bold 22px Inter, sans-serif`;
                ctx.fillText(frameText, textX, totalHeight - 30);
              } else { // Banner style
                ctx.textAlign = 'center';
                ctx.fillText(frameText, textX, totalHeight - 30);
              }
            }
        };
        // --- End Frame Drawing ---


        try {
           const qrCodeUrl = await qrcode.toDataURL(value, {
             errorCorrectionLevel: ecLevel,
             type: 'image/png',
             color: { dark: qrColor, light: '#00000000' }, // Use transparent light color for overlay
             margin: 1,
             width: qrSize,
             rendererOpts: { quality: 1 }
           });

          const qrImg = new Image();
          qrImg.crossOrigin = "anonymous";
          qrImg.src = qrCodeUrl;
          
          qrImg.onload = () => {
            ctx.drawImage(qrImg, framePadding, framePadding, qrSize, qrSize);

            if (logo) {
              const logoImg = new Image();
              logoImg.crossOrigin = "anonymous";
              logoImg.src = logo;
              logoImg.onload = () => {
                const logoSize = qrSize * 0.25;
                const logoX = framePadding + (qrSize - logoSize) / 2;
                const logoY = framePadding + (qrSize - logoSize) / 2;
                
                ctx.fillStyle = bgColor;
                const borderRadius = 8;
                ctx.beginPath();
                ctx.moveTo(logoX - 5 + borderRadius, logoY - 5);
                ctx.lineTo(logoX - 5 + logoSize + 10 - borderRadius, logoY - 5);
                ctx.quadraticCurveTo(logoX - 5 + logoSize + 10, logoY - 5, logoX - 5 + logoSize + 10, logoY - 5 + borderRadius);
                ctx.lineTo(logoX - 5 + logoSize + 10, logoY - 5 + logoSize + 10 - borderRadius);
                ctx.quadraticCurveTo(logoX - 5 + logoSize + 10, logoY - 5 + logoSize + 10, logoX - 5 + logoSize + 10 - borderRadius, logoY - 5 + logoSize + 10);
                ctx.lineTo(logoX - 5 + borderRadius, logoY - 5 + logoSize + 10);
                ctx.quadraticCurveTo(logoX - 5, logoY - 5 + logoSize + 10, logoX - 5, logoY - 5 + logoSize + 10 - borderRadius);
                ctx.lineTo(logoX - 5, logoY - 5 + borderRadius);
                ctx.quadraticCurveTo(logoX - 5, logoY - 5, logoX - 5 + borderRadius, logoY - 5);
                ctx.closePath();
                ctx.fill();

                ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
                drawFrame(); // Draw frame after QR and logo
              }
            } else {
               drawFrame(); // Draw frame after QR
            }
          }

        } catch (error) {
           console.error("Failed to generate QR code:", error);
        }
      }
      
      // Special lightweight render for template previews
      if(value === 'template') {
         const drawTemplatePreview = () => {
             if (!canvasRef.current) return;
             const canvas = canvasRef.current;
             const ctx = canvas.getContext('2d');
             if (!ctx) return;
             
             canvas.width = size;
             canvas.height = size;
             
             ctx.fillStyle = bgColor;
             ctx.fillRect(0,0,size,size);

             // Create a fake QR code pattern
             ctx.fillStyle = qrColor;
             const moduleSize = size / 25;
             for(let i=0; i < 25; i++){
                for(let j=0; j < 25; j++){
                  if(Math.random() > 0.5) {
                    if (qrStyle === 'dots') {
                      ctx.beginPath();
                      ctx.arc(i*moduleSize + moduleSize/2, j*moduleSize + moduleSize/2, moduleSize/2.2, 0, 2 * Math.PI);
                      ctx.fill();
                    } else if (qrStyle === 'rounded') {
                      ctx.beginPath();
                      ctx.roundRect(i*moduleSize, j*moduleSize, moduleSize, moduleSize, [2]);
                      ctx.fill();
                    } else {
                      ctx.fillRect(i*moduleSize, j*moduleSize, moduleSize, moduleSize);
                    }
                  }
                }
             }

             if (logo) {
                const logoImg = new Image();
                logoImg.src = logo;
                logoImg.onload = () => {
                  const logoSize = size * 0.3;
                  const logoX = (size - logoSize) / 2;
                  const logoY = (size - logoSize) / 2;
                  ctx.fillStyle = bgColor;
                  ctx.fillRect(logoX-2, logoY-2, logoSize+4, logoSize+4);
                  ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
                }
             }
         }
         drawTemplatePreview();
         return;
      }
      
      renderQRCode();

    }, [value, qrColor, bgColor, qrStyle, logo, ecLevel, frameText, frameStyle, size, totalWidth, totalHeight, hasFrame]);

    if (!value) {
      return (
        <div 
         ref={ref}
         className="flex justify-center items-center bg-muted rounded-lg aspect-square w-full shadow-inner"
         style={{ maxWidth: size, maxHeight: size }}
        >
          <div className="flex flex-col items-center text-center p-4">
             <div className="p-4 bg-muted-foreground/10 rounded-full">
                <ScanLine className="w-10 h-10 text-muted-foreground" />
             </div>
             <p className="text-muted-foreground text-lg font-medium mt-4">QR Code Preview</p>
             <p className="text-muted-foreground text-sm">Your QR code will appear here once you generate it.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div ref={ref} className="flex flex-col justify-center items-center p-4 bg-card rounded-lg w-full shadow-md">
        <div className='relative' style={{width: totalWidth, height: totalHeight}}>
             <canvas ref={canvasRef} className="max-w-full h-auto" />
        </div>
      </div>
    );
  }
);

QRCodeDisplay.displayName = 'QRCodeDisplay';

export default QRCodeDisplay;
