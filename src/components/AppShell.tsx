'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Share2, Download, Loader2, Link as LinkIcon, Rss, Facebook, Twitter, Instagram, Linkedin, FileText, Store, Smartphone, Calendar, MessageSquare, MapPin, Ban, Square, Image as ImageIcon, Utensils, Coffee, Bike, Car, Laptop, Heart, Wifi, Mail, Upload, Youtube, ScanLine, ChevronDown, Contact, Shield, ShieldCheck, ShieldAlert, ShieldPlus, Palette, Shapes, Frame as FrameIcon, Star, RotateCcw, File, FileType, ChevronsUpDown, Eye, EyeOff, HelpCircle, FilePenLine } from 'lucide-react';
import QRCodeDisplay, { FrameStyle, QrStyle, ErrorCorrectionLevel } from './QRCodeDisplay';
import { useToast } from '../hooks/use-toast';
import { importVCardData } from '../lib/actions';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { cn } from '../lib/utils';
import { renderToString } from 'react-dom/server';
import { QrCodeDunyaLogo } from './icons/QrCodeDunyaLogo';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import qrcode from 'qrcode';
import jsPDF from 'jspdf';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';


type QrDataType = 'url' | 'text' | 'email' | 'phone' | 'vcard' | 'wifi' | 'sms' | 'location' | 'event' | 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'pdf' | 'app_store';

const iconMap: { [key: string]: React.ReactElement } = {
  link: <LinkIcon size={24} className="text-blue-500" />,
  text: <FileText size={24} className="text-gray-500" />,
  mail: <Mail size={24} className="text-red-500" />,
  phone: <Smartphone size={24} className="text-green-500" />,
  wifi: <Wifi size={24} className="text-purple-500" />,
  facebook: <Facebook size={24} className="text-blue-600" />,
  twitter: <Twitter size={24} className="text-sky-400" />,
  instagram: <Instagram size={24} className="text-rose-500" />,
  linkedin: <Linkedin size={24} className="text-blue-700" />,
  youtube: <Youtube size={24} className="text-red-600" />,
  calendar: <Calendar size={24} className="text-indigo-500" />,
  'shield-alert': <ShieldAlert size={24} className="text-orange-500" />,
  star: <Star size={24} className="text-yellow-400" />,
  heart: <Heart size={24} className="text-rose-500" />,
  laptop: <Laptop size={24} className="text-blue-800" />,
  contact: <Contact size={24} className="text-cyan-600" />,
  utensils: <Utensils size={24} className="text-amber-600" />,
  smartphone: <Smartphone size={24} className="text-slate-600" />,
  custom: <Upload size={24} className="text-slate-600" />
};

interface Template {
  name: string;
  qrColor: string;
  bgColor: string;
  logo: string | null;
  qrStyle: QrStyle;
  frameStyle: FrameStyle;
  frameText: string;
}

const templates: Template[] = [
    { name: 'Forest', qrColor: '#228B22', bgColor: '#FFFFFF', logo: null, qrStyle: 'rounded', frameStyle: 'none', frameText: '' },
    { name: 'YouTube', qrColor: '#FF0000', bgColor: '#FFFFFF', logo: 'youtube', qrStyle: 'squares', frameStyle: 'text', frameText: 'WATCH NOW' },
    { name: 'Instagram', qrColor: '#E1306C', bgColor: '#FFFFFF', logo: 'instagram', qrStyle: 'squares', frameStyle: 'text', frameText: 'FOLLOW US' },
    { name: 'Twitter/X', qrColor: '#1DA1F2', bgColor: '#FFFFFF', logo: 'twitter', qrStyle: 'rounded', frameStyle: 'text', frameText: 'FOLLOW ON X' },
    { name: 'LinkedIn', qrColor: '#0A66C2', bgColor: '#FFFFFF', logo: 'linkedin', qrStyle: 'rounded', frameStyle: 'text', frameText: 'CONNECT' },
    { name: 'Restaurant', qrColor: '#FFFFFF', bgColor: '#E67E22', logo: 'utensils', qrStyle: 'squares', frameStyle: 'banner', frameText: 'VIEW MENU' },
    { name: 'App Download', qrColor: '#3498DB', bgColor: '#FFFFFF', logo: 'smartphone', qrStyle: 'rounded', frameStyle: 'text', frameText: 'DOWNLOAD APP' },
    { name: 'Ocean', qrColor: '#FFFFFF', bgColor: '#0077B6', logo: null, frameStyle: 'banner', frameText: 'DIVE IN' },
    { name: 'Sunset', qrColor: '#DD2476', bgColor: '#FFD26E', logo: null, qrStyle: 'rounded', frameStyle: 'box', frameText: 'ENJOY' },
    { name: 'Minimalist', qrColor: '#333333', bgColor: '#F5F5F5', logo: null, qrStyle: 'dots', frameStyle: 'none', frameText: '' },
    { name: 'Event', qrColor: '#FFFFFF', bgColor: '#8A2BE2', logo: 'calendar', qrStyle: 'rounded', frameStyle: 'banner', frameText: 'JOIN EVENT' },
    { name: 'WiFi', qrColor: '#6A0DAD', bgColor: '#FFFFFF', logo: 'wifi', qrStyle: 'squares', frameStyle: 'text', frameText: 'CONNECT WIFI' },
    { name: 'Urgent', qrColor: '#FFFFFF', bgColor: '#D9534F', logo: 'shield-alert', qrStyle: 'squares', frameStyle: 'banner', frameText: 'SCAN URGENTLY' },
    { name: 'Royal', qrColor: '#FFD700', bgColor: '#4B0082', logo: 'star', qrStyle: 'dots', frameStyle: 'none', frameText: '' },
    { name: 'Gaming', qrColor: '#7289DA', bgColor: '#2C2F33', logo: 'laptop', qrStyle: 'squares', frameStyle: 'text', frameText: 'GAME ON' },
    { name: 'Tech', qrColor: '#00FFFF', bgColor: '#111111', logo: 'laptop', qrStyle: 'squares', frameStyle: 'box', frameText: 'TECH-SAVVY' },
    { name: 'Love Letter', qrColor: '#FF1493', bgColor: '#FFFFFF', logo: 'heart', qrStyle: 'dots', frameStyle: 'heart', frameText: 'MADE WITH LOVE' },
    { name: 'Business Card', qrColor: '#007BFF', bgColor: '#FFFFFF', logo: 'contact', qrStyle: 'rounded', frameStyle: 'text', frameText: 'MY CONTACT' },
];


const getIconAsBase64 = (iconName: string): string | null => {
    let iconElement: React.ReactElement | null = null;

    if (iconName === 'qrcodedunya') {
      iconElement = <QrCodeDunyaLogo className="text-primary" />;
    } else {
      iconElement = iconMap[iconName];
    }
   
    if (iconElement) {
        try {
            const svgString = renderToString(iconElement);
            const svgBase64 = btoa(unescape(encodeURIComponent(svgString)));
            return `data:image/svg+xml;base64,${svgBase64}`;
        } catch (e) {
            console.error("Could not convert icon to base64", e);
            return null;
        }
    }
    return null;
}

export default function AppShell() {
  const [dataType, setDataType] = useState<QrDataType>('url');
  const [finalQrValue, setFinalQrValue] = useState('');

  // Form states
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [email, setEmail] = useState({ to: '', subject: '', body: '' });
  const [phone, setPhone] = useState('');
  const [vcard, setVcard] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });
  const [sms, setSms] = useState({ to: '', body: '' });
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [event, setEvent] = useState({ title: '', startDate: '', endDate: '', location: '', description: '' });
  const [social, setSocial] = useState({ facebook: '', twitter: '', instagram: '', linkedin: '' });
  const [pdfUrl, setPdfUrl] = useState('');
  const [appStore, setAppStore] = useState({ apple: '', google: '' });


  // Customization
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedLogoOption, setSelectedLogoOption] = useState('none');
  const [qrStyle, setQrStyle] = useState<QrStyle>('squares');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<ErrorCorrectionLevel>('M');
  const [frameText, setFrameText] = useState('');
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('none');


  // UI State
  const [isParsing, setIsParsing] = useState(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(true);

  const { toast } = useToast();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const qrCodeDisplayRef = useRef<HTMLDivElement>(null);

  const prepareQRDataString = () => {
    let dataStr = '';
    switch (dataType) {
      case 'url':
        dataStr = url;
        break;
      case 'text':
        dataStr = text;
        break;
      case 'email':
        dataStr = `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
        break;
      case 'phone':
        dataStr = `tel:${phone}`;
        break;
      case 'vcard':
        dataStr = `BEGIN:VCARD\nVERSION:3.0\nN:${vcard.lastName};${vcard.firstName}\nFN:${vcard.firstName} ${vcard.lastName}\nTEL:${vcard.phone}\nEMAIL:${vcard.email}\nEND:VCARD`;
        break;
      case 'wifi':
        dataStr = `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
        break;
      case 'sms':
        dataStr = `smsto:${sms.to}:${sms.body}`;
        break;
      case 'location':
        dataStr = `geo:${location.latitude},${location.longitude}`;
        break;
      case 'event':
        const formatForVEvent = (date: string) => date ? format(new Date(date), "yyyyMMdd'T'HHmmss") : '';
        dataStr = `BEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${formatForVEvent(event.startDate)}\nDTEND:${formatForVEvent(event.endDate)}\nLOCATION:${event.location}\nDESCRIPTION:${event.description}\nEND:VEVENT`;
        break;
      case 'facebook':
        dataStr = social.facebook.startsWith('https://') ? social.facebook : `https://facebook.com/${social.facebook}`;
        break;
      case 'twitter':
        dataStr = social.twitter.startsWith('https://') ? social.twitter : `https://twitter.com/${social.twitter}`;
        break;
      case 'instagram':
        dataStr = social.instagram.startsWith('https://') ? social.instagram : `https://instagram.com/${social.instagram}`;
        break;
      case 'linkedin':
        dataStr = social.linkedin.startsWith('https://') ? social.linkedin : `https://linkedin.com/in/${social.linkedin}`;
        break;
      case 'pdf':
        dataStr = pdfUrl;
        break;
      case 'app_store':
        // This is a simplified version. A real implementation would redirect based on user agent.
        // For the QR code, we can point to a generic landing page or just one of the stores.
        // Let's default to the Play Store link for simplicity.
        dataStr = appStore.google || appStore.apple;
        break;
    }
    return { dataStr };
  };

  const handleGenerate = () => {
    const { dataStr } = prepareQRDataString();
    if (!dataStr) {
      toast({
        title: 'Input required',
        description: 'Please fill in the content for the QR code.',
        variant: 'destructive',
      });
      return;
    }
    setFinalQrValue(dataStr);
    setIsMobilePreviewOpen(true);
  };
  
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
        setSelectedLogoOption('custom'); 
        setErrorCorrectionLevel('H');
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleVCardUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        setIsParsing(true);
        try {
            // Manually parse vCard data.
            const lines = content.split(/\r\n|\r|\n/);
            let parsedVCard = { firstName: '', lastName: '', phone: '', email: '' };
            lines.forEach(line => {
                if (line.toUpperCase().startsWith('FN:')) {
                    const name = line.substring(3);
                    const nameParts = name.split(' ');
                    parsedVCard.firstName = nameParts[0] || '';
                    parsedVCard.lastName = nameParts.slice(1).join(' ') || '';
                } else if (line.toUpperCase().startsWith('N:')) {
                    const nameParts = line.substring(2).split(';');
                    parsedVCard.lastName = nameParts[0] || '';
                    parsedVCard.firstName = nameParts[1] || '';
                } else if (line.toUpperCase().includes('TEL')) {
                    parsedVCard.phone = line.substring(line.indexOf(':') + 1);
                } else if (line.toUpperCase().includes('EMAIL')) {
                    parsedVCard.email = line.substring(line.indexOf(':') + 1);
                }
            });

            // Check if parsing from 'N' field gave better results.
            const fnLine = lines.find(l => l.toUpperCase().startsWith('FN:'));
            const nLine = lines.find(l => l.toUpperCase().startsWith('N:'));
            if (nLine && !fnLine) {
                 const nameParts = nLine.substring(2).split(';');
                 if (nameParts[0] || nameParts[1]) {
                    parsedVCard.lastName = nameParts[0] || '';
                    parsedVCard.firstName = nameParts[1] || '';
                 }
            }


            setVcard(parsedVCard);
            toast({ title: "vCard Imported", description: "Contact information has been filled in."});
        } catch (error) {
            toast({ title: "Import Failed", description: "Could not parse the vCard file.", variant: "destructive"});
        } finally {
            setIsParsing(false);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleLogoOptionChange = (value: string) => {
    setSelectedLogoOption(value);
    if (value === 'none') {
      setLogo(null);
      setErrorCorrectionLevel('M');
    } else if (value === 'custom') {
      logoInputRef.current?.click();
    } else {
      const base64logo = getIconAsBase64(value);
      setLogo(base64logo);
      setErrorCorrectionLevel('H');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const handleShare = async () => {
    const canvas = qrCodeDisplayRef.current?.querySelector('canvas');
    if (!canvas) {
      toast({ title: 'Error', description: 'Could not find QR Code to share.', variant: 'destructive'});
      return;
    }

    canvas.toBlob(async (blob) => {
      if (!blob) {
        toast({ title: 'Error', description: 'Could not create image from QR Code.', variant: 'destructive'});
        return;
      }
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'My QR Code',
            text: 'Check out this QR code I made with QRcodeDunya!',
            files: [file],
          });
        } catch (error) {
          console.error('Share failed:', error);
          toast({ title: 'Share failed', description: 'An error occurred while sharing.', variant: 'destructive' });
        }
      } else {
        toast({ title: 'Sharing Not Supported', description: 'Your browser does not support sharing files. The link has been copied instead.', variant: 'destructive' });
        copyToClipboard(finalQrValue);
      }
    }, 'image/png');
  };

  const downloadFile = (dataUrl: string, filename: string) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  
  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    if (!finalQrValue) {
      toast({ title: 'Generate a QR Code first!', variant: 'destructive' });
      return;
    }
  
    const canvas = qrCodeDisplayRef.current?.querySelector<HTMLCanvasElement>('canvas');
  
    switch (format) {
      case 'png':
        if (canvas) {
          const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          downloadFile(pngUrl, 'qrcode.png');
          toast({ title: 'PNG Download Started' });
        } else {
          toast({ title: 'Download Failed', variant: 'destructive' });
        }
        break;
  
      case 'svg':
        qrcode.toString(finalQrValue, {
          type: 'svg',
          color: { dark: qrColor, light: bgColor },
          errorCorrectionLevel: errorCorrectionLevel,
          margin: 1,
        }, (err, svgString) => {
          if (err) {
            toast({ title: 'SVG Generation Failed', variant: 'destructive' });
            return;
          }
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
          const svgUrl = URL.createObjectURL(svgBlob);
          downloadFile(svgUrl, 'qrcode.svg');
          toast({ title: 'SVG Download Started'});
        });
        break;
  
      case 'pdf':
        if (canvas) {
          const doc = new jsPDF();
          const pngUrl = canvas.toDataURL('image/png');
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = doc.internal.pageSize.getHeight();
          const aspectRatio = canvasWidth / canvasHeight;
          
          let imgWidth = pdfWidth * 0.8; // Use 80% of page width
          let imgHeight = imgWidth / aspectRatio;
  
          if (imgHeight > pdfHeight * 0.8) {
            imgHeight = pdfHeight * 0.8;
            imgWidth = imgHeight * aspectRatio;
          }
  
          const x = (pdfWidth - imgWidth) / 2;
          const y = (pdfHeight - imgHeight) / 2;
  
          doc.text("Generated with QRcodeDunya", 10, 10);
          doc.addImage(pngUrl, 'PNG', x, y, imgWidth, imgHeight);
          doc.save('qrcode.pdf');
          toast({ title: 'PDF Download Started'});
        } else {
          toast({ title: 'PDF Generation Failed', description: 'Could not find the QR code canvas.', variant: 'destructive' });
        }
        break;
    }
  };
  
  const handleResetForm = () => {
    setUrl('');
    setText('');
    setEmail({ to: '', subject: '', body: '' });
    setPhone('');
    setVcard({ firstName: '', lastName: '', phone: '', email: ''});
    setWifi({ ssid: '', password: '', encryption: 'WPA' });
    setSms({ to: '', body: '' });
    setLocation({ latitude: '', longitude: '' });
    setEvent({ title: '', startDate: '', endDate: '', location: '', description: '' });
    setSocial({ facebook: '', twitter: '', instagram: '', linkedin: '' });
    setPdfUrl('');
    setAppStore({ apple: '', google: '' });
    setFinalQrValue('');
    toast({ title: "Form Cleared", description: "You can now enter new information."})
  };

  const handleTemplateSelect = (template: Template) => {
    setQrColor(template.qrColor);
    setBgColor(template.bgColor);
    setQrStyle(template.qrStyle);
    setFrameStyle(template.frameStyle);
    setFrameText(template.frameText);
    setSelectedLogoOption(template.logo || 'none');

    if (template.logo) {
      const base64logo = getIconAsBase64(template.logo);
      setLogo(base64logo);
      setErrorCorrectionLevel('H');
    } else {
      setLogo(null);
      setErrorCorrectionLevel('M');
    }
    toast({ title: `Template "${template.name}" applied!` });
  };
  
  const renderForm = () => {
    switch (dataType) {
      case 'url':
        return (
          <div className="space-y-1">
            <Label htmlFor="urlInput">URL</Label>
            <Input id="urlInput" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
        );
      case 'text':
        return (
            <div className="space-y-1">
                <Label htmlFor="textInput">Text</Label>
                <Textarea id="textInput" placeholder="Enter your text here" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
        )
      case 'email':
        return (
          <div className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="emailTo">Recipient Email</Label>
                <Input id="emailTo" type="email" placeholder="recipient@example.com" value={email.to} onChange={(e) => setEmail({...email, to: e.target.value})} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="emailSubject">Subject</Label>
                <Input id="emailSubject" placeholder="Email Subject" value={email.subject} onChange={(e) => setEmail({...email, subject: e.target.value})} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="emailBody">Body</Label>
                <Textarea id="emailBody" placeholder="Email body content" value={email.body} onChange={(e) => setEmail({...email, body: e.target.value})} />
            </div>
          </div>
        )
      case 'phone':
        return (
            <div className="space-y-1">
                <Label htmlFor="phoneInput">Phone Number</Label>
                <Input id="phoneInput" type="tel" placeholder="+1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
        )
      case 'vcard':
        return (
          <div className="space-y-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="vcardFirstName">First Name</Label>
                <Input id="vcardFirstName" placeholder="John" value={vcard.firstName} onChange={(e) => setVcard({...vcard, firstName: e.target.value})} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="vcardLastName">Last Name</Label>
                <Input id="vcardLastName" placeholder="Doe" value={vcard.lastName} onChange={(e) => setVcard({...vcard, lastName: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="vcardPhone">Phone</Label>
                <Input id="vcardPhone" placeholder="+1234567890" value={vcard.phone} onChange={(e) => setVcard({...vcard, phone: e.target.value})} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="vcardEmail">Email</Label>
                <Input id="vcardEmail" type="email" placeholder="john.doe@example.com" value={vcard.email} onChange={(e) => setVcard({...vcard, email: e.target.value})} />
              </div>
            </div>
             <Separator className="my-2" />
             <div>
                <Label htmlFor="vcardImport" className="mb-2 block">Import from .vcf file</Label>
                <div className="flex items-center gap-2">
                    <Input id="vcardImport" type="file" accept=".vcf" onChange={handleVCardUpload} className="w-full" />
                    {isParsing && <Loader2 className="animate-spin" />}
                </div>
            </div>
          </div>
        )
      case 'wifi':
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="wifiSsid">Network Name (SSID)</Label>
                        <Input id="wifiSsid" placeholder="MyHomeWiFi" value={wifi.ssid} onChange={(e) => setWifi({...wifi, ssid: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="wifiPassword">Password</Label>
                        <Input id="wifiPassword" type="password" placeholder="Password" value={wifi.password} onChange={(e) => setWifi({...wifi, password: e.target.value})} />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="wifiEncryption">Encryption</Label>
                    <Select value={wifi.encryption} onValueChange={(val) => setWifi({...wifi, encryption: val})}>
                        <SelectTrigger id="wifiEncryption">
                            <SelectValue placeholder="Select encryption type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="WPA">WPA/WPA2</SelectItem>
                            <SelectItem value="WEP">WEP</SelectItem>
                            <SelectItem value="nopass">No Password</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )
      case 'sms':
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="smsTo">Recipient Phone</Label>
              <Input id="smsTo" type="tel" placeholder="+1234567890" value={sms.to} onChange={(e) => setSms({ ...sms, to: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="smsBody">Message</Label>
              <Textarea id="smsBody" placeholder="Message content" value={sms.body} onChange={(e) => setSms({ ...sms, body: e.target.value })} />
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="locLat">Latitude</Label>
              <Input id="locLat" placeholder="e.g., 40.7128" value={location.latitude} onChange={(e) => setLocation({ ...location, latitude: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="locLon">Longitude</Label>
              <Input id="locLon" placeholder="e.g., -74.0060" value={location.longitude} onChange={(e) => setLocation({ ...location, longitude: e.target.value })} />
            </div>
          </div>
        );
      case 'event':
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input id="eventTitle" placeholder="My Awesome Event" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="eventStart">Start Date & Time</Label>
                    <Input id="eventStart" type="datetime-local" value={event.startDate} onChange={(e) => setEvent({ ...event, startDate: e.target.value })} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="eventEnd">End Date & Time</Label>
                    <Input id="eventEnd" type="datetime-local" value={event.endDate} onChange={(e) => setEvent({ ...event, endDate: e.target.value })} />
                </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="eventLocation">Location</Label>
              <Input id="eventLocation" placeholder="Event Venue" value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="eventDesc">Description</Label>
              <Textarea id="eventDesc" placeholder="Details about the event" value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
            </div>
          </div>
        );
      case 'facebook':
        return (
          <div className="space-y-1">
            <Label htmlFor="socialFacebook">Facebook Profile URL or Username</Label>
            <Input id="socialFacebook" placeholder="zuck" value={social.facebook} onChange={(e) => setSocial({...social, facebook: e.target.value})} />
          </div>
        );
      case 'twitter':
        return (
          <div className="space-y-1">
            <Label htmlFor="socialTwitter">Twitter/X Profile URL or Username</Label>
            <Input id="socialTwitter" placeholder="elonmusk" value={social.twitter} onChange={(e) => setSocial({...social, twitter: e.target.value})} />
          </div>
        );
      case 'instagram':
        return (
          <div className="space-y-1">
            <Label htmlFor="socialInstagram">Instagram Profile URL or Username</Label>
            <Input id="socialInstagram" placeholder="kevin" value={social.instagram} onChange={(e) => setSocial({...social, instagram: e.target.value})} />
          </div>
        );
      case 'linkedin':
        return (
          <div className="space-y-1">
            <Label htmlFor="socialLinkedin">LinkedIn Profile URL or Username</Label>
            <Input id="socialLinkedin" placeholder="williamhgates" value={social.linkedin} onChange={(e) => setSocial({...social, linkedin: e.target.value})} />
          </div>
        );
      case 'pdf':
        return (
          <div className="space-y-1">
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input id="pdfUrl" type="url" placeholder="https://example.com/document.pdf" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} />
            <p className="text-xs text-muted-foreground">Enter the direct public URL of a hosted PDF file.</p>
          </div>
        );
      case 'app_store':
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="appStoreApple">Apple App Store URL</Label>
              <Input id="appStoreApple" type="url" placeholder="https://apps.apple.com/..." value={appStore.apple} onChange={(e) => setAppStore({...appStore, apple: e.target.value})} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="appStoreGoogle">Google Play Store URL</Label>
              <Input id="appStoreGoogle" type="url" placeholder="https://play.google.com/..." value={appStore.google} onChange={(e) => setAppStore({...appStore, google: e.target.value})} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
    <div className="grid flex-1 grid-cols-1 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px]">
      {/* Left Panel */}
      <div className="flex flex-col bg-background">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
          <div className="flex items-center gap-3">
            <QrCodeDunyaLogo className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold tracking-tighter">QRcodeDunya</h1>
          </div>
          <Dialog>
             <DialogTrigger asChild>
                <Button variant="outline">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  How to Use
                </Button>
            </DialogTrigger>
             <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">How It Works in 4 Easy Steps</DialogTitle>
                <DialogDescription className="text-center">
                  Follow this guide to create and customize your perfect QR code.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="p-2 bg-primary/10 rounded-full mt-1">
                    <FilePenLine className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold">1. Set QR Content</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a content type (like URL or Text) and fill in the fields. Click the <span className="font-semibold text-foreground">Generate QR Code</span> button to create your preview. If you want to start over, you can click the <span className="font-semibold text-foreground">Reset Form</span> button at any time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="p-2 bg-pink-500/10 rounded-full mt-1">
                    <Palette className="h-6 w-6 text-pink-500 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold">2. Customize Design</h3>
                    <p className="text-sm text-muted-foreground">Make your QR code unique with custom colors, shapes, and frames. You can also add a logo or use one of our pre-designed templates.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="p-2 bg-green-500/10 rounded-full mt-1">
                    <ScanLine className="h-6 w-6 text-green-500 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold">3. Generate & Preview</h3>
                    <p className="text-sm text-muted-foreground">On mobile, the preview appears at the bottom. Use the <span className="font-semibold text-foreground">Hide/Show</span> buttons to toggle its visibility. This gives you easy access to the controls to apply a template or customize your design.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="p-2 bg-blue-500/10 rounded-full mt-1">
                    <Download className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold">4. Download Image</h3>
                    <p className="text-sm text-muted-foreground">Download your finished QR code as a high-quality PNG, SVG, or PDF file, ready for printing or web use.</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <main className={cn("flex-1 overflow-y-auto p-4 md:p-8", finalQrValue && "pb-32 md:pb-8")}>
            <div className="mx-auto max-w-3xl space-y-8">
              {/* Content Form */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Create QR Code</h2>
                 <div className="space-y-2">
                    <Label htmlFor="dataType" className="font-bold text-lg text-primary">1. Select Data Type</Label>
                    <Select value={dataType} onValueChange={(value: QrDataType) => setDataType(value)}>
                      <SelectTrigger id="dataType" className="w-full">
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url"><LinkIcon className="inline-block mr-2 h-4 w-4 text-blue-500" />URL</SelectItem>
                        <SelectItem value="text"><FileText className="inline-block mr-2 h-4 w-4 text-gray-500" />Text</SelectItem>
                        <SelectItem value="email"><Mail className="inline-block mr-2 h-4 w-4 text-red-500" />Email</SelectItem>
                        <SelectItem value="phone"><Smartphone className="inline-block mr-2 h-4 w-4 text-green-500" />Phone Number</SelectItem>
                        <SelectItem value="vcard"><Contact className="inline-block mr-2 h-4 w-4 text-orange-500" />vCard (Contact)</SelectItem>
                        <SelectItem value="wifi"><Wifi className="inline-block mr-2 h-4 w-4 text-purple-500" />WiFi</SelectItem>
                        <SelectItem value="sms"><MessageSquare className="inline-block mr-2 h-4 w-4 text-sky-500" />SMS</SelectItem>
                        <SelectItem value="location"><MapPin className="inline-block mr-2 h-4 w-4 text-pink-500" />Location</SelectItem>
                        <SelectItem value="event"><Calendar className="inline-block mr-2 h-4 w-4 text-indigo-500" />Event (Calendar)</SelectItem>
                        <SelectItem value="facebook"><Facebook className="inline-block mr-2 h-4 w-4 text-blue-600" />Facebook</SelectItem>
                        <SelectItem value="twitter"><Twitter className="inline-block mr-2 h-4 w-4 text-sky-400" />Twitter / X</SelectItem>
                        <SelectItem value="instagram"><Instagram className="inline-block mr-2 h-4 w-4 text-rose-500" />Instagram</SelectItem>
                        <SelectItem value="linkedin"><Linkedin className="inline-block mr-2 h-4 w-4 text-blue-700" />LinkedIn</SelectItem>
                        <SelectItem value="pdf"><FileText className="inline-block mr-2 h-4 w-4 text-red-600" />PDF</SelectItem>
                        <SelectItem value="app_store"><Store className="inline-block mr-2 h-4 w-4 text-teal-500" />App Stores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-4 border rounded-lg bg-card shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="font-bold text-lg text-primary">2. Enter Content</Label>
                      <Button variant="link" onClick={handleResetForm} className="h-auto p-0 text-base font-bold">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset Form
                      </Button>
                    </div>
                    {renderForm()}
                  </div>
              </div>

               <div className="my-6">
                  <Button onClick={handleGenerate} size="lg" className="w-full text-base font-semibold">
                      <ScanLine className="mr-2 h-5 w-5" />
                      {finalQrValue ? 'Update Preview' : 'Generate QR Code'}
                  </Button>
              </div>

               <div className="flex items-start gap-4 rounded-lg border bg-muted/50 p-4 -mt-2 mb-4">
                  <ShieldCheck className="h-10 w-10 text-green-600 mt-1" />
                  <div className="space-y-1">
                      <h4 className="font-bold text-foreground">The Truly Private QR Code Generator</h4>
                      <p className="text-sm text-muted-foreground">
                          No account, no tracking, no worries. We never see your data. What you create on your device stays on your device.
                      </p>
                  </div>
              </div>
              
              {/* Templates Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Start with a Template</h3>
                <p className="text-sm text-muted-foreground">
                  Select a pre-designed template for a professional look in seconds.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.name}
                      onClick={() => handleTemplateSelect(template)}
                      className="flex flex-col items-center justify-center text-center p-2 rounded-lg border-2 border-transparent hover:border-primary hover:bg-accent/20 transition-colors"
                    >
                      <div 
                        className="w-16 h-16 rounded-md flex items-center justify-center border"
                        style={{ backgroundColor: template.bgColor }}
                      >
                        <QRCodeDisplay 
                          value="template" 
                          qrColor={template.qrColor} 
                          bgColor={template.bgColor} 
                          logo={template.logo ? getIconAsBase64(template.logo) : null}
                          qrStyle={template.qrStyle}
                          ecLevel="Q"
                          size={56}
                          frameStyle="none"
                        />
                      </div>
                      <span className="text-sm font-medium mt-2">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customization Tabs */}
              <div className="space-y-4">
                 <h3 className="text-xl font-bold">Customize Your QR Code (Optional)</h3>
                 <p className="text-sm text-muted-foreground">
                    Change colors, add a logo, and more to make your QR code stand out.
                 </p>
                 <Tabs defaultValue="colors" className="w-full">
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto bg-transparent p-0">
                        <TabsTrigger value="colors" className="flex flex-col gap-2 h-24 items-center justify-center text-base font-bold p-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-primary border-2 rounded-lg">
                            <Palette className="h-8 w-8 text-pink-500" />
                            <span>Colors & Logo</span>
                        </TabsTrigger>
                        <TabsTrigger value="frame" className="flex flex-col gap-2 h-24 items-center justify-center text-base font-bold p-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-primary border-2 rounded-lg">
                            <FrameIcon className="h-8 w-8 text-green-500" />
                            <span>Frame</span>
                        </TabsTrigger>
                        <TabsTrigger value="shape" className="flex flex-col gap-2 h-24 items-center justify-center text-base font-bold p-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-primary border-2 rounded-lg">
                            <Shapes className="h-8 w-8 text-blue-500" />
                            <span>Shape</span>
                        </TabsTrigger>
                        <TabsTrigger value="level" className="flex flex-col gap-2 h-24 items-center justify-center text-base font-bold p-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-primary border-2 rounded-lg">
                            <Star className="h-8 w-8 text-yellow-500" />
                            <span>Quality</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="colors" className="p-4 border rounded-b-lg bg-card shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <Label htmlFor="qrColor">QR Color</Label>
                               <Input id="qrColor" type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="p-1 h-10 w-full" />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="bgColor">Background</Label>
                              <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10 w-full" />
                           </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <Label>Logo</Label>
                             <RadioGroup value={selectedLogoOption} onValueChange={handleLogoOptionChange} className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1">
                                {Object.entries(iconMap).map(([key, icon]) => (
                                <Label key={key} htmlFor={`logo-${key}`} className={cn("flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover h-16 w-16 hover:bg-accent hover:text-accent-foreground cursor-pointer", selectedLogoOption === key && "border-primary")}>
                                    <RadioGroupItem value={key} id={`logo-${key}`} className="sr-only" />
                                    {icon}
                                    <span className="text-xs mt-1 capitalize">{key}</span>
                                </Label>
                                ))}
                            </RadioGroup>
                            <Input id="logoInput" type="file" accept="image/*" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" />
                        </div>
                    </TabsContent>
                    <TabsContent value="frame" className="p-4 border rounded-b-lg bg-card shadow-sm">
                      <RadioGroup value={frameStyle} onValueChange={(val: FrameStyle) => setFrameStyle(val)} className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          <Label htmlFor="frame-none" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                              <RadioGroupItem value="none" id="frame-none" className="sr-only peer" />
                              <Ban className="w-8 h-8 text-slate-400" />
                              <span className="text-xs mt-2">None</span>
                          </Label>
                          <Label htmlFor="frame-text" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                              <RadioGroupItem value="text" id="frame-text" className="sr-only peer" />
                              <ImageIcon className="w-8 h-8 text-sky-500" />
                              <span className="text-xs mt-2">Text</span>
                          </Label>
                          <Label htmlFor="frame-box" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                              <RadioGroupItem value="box" id="frame-box" className="sr-only peer" />
                              <Square className="w-8 h-8 text-lime-500" />
                              <span className="text-xs mt-2">Box</span>
                          </Label>
                           <Label htmlFor="frame-banner" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                              <RadioGroupItem value="banner" id="frame-banner" className="sr-only peer" />
                              <Utensils className="w-8 h-8 text-amber-500" />
                              <span className="text-xs mt-2">Banner</span>
                          </Label>
                          <Label htmlFor="frame-coffee" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="coffee" id="frame-coffee" className="sr-only peer" /><Coffee className="w-8 h-8 text-yellow-700" /><span className="text-xs mt-2">Coffee</span>
                          </Label>
                          <Label htmlFor="frame-bike" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="bike" id="frame-bike" className="sr-only peer" /><Bike className="w-8 h-8 text-orange-500" /><span className="text-xs mt-2">Bike</span>
                          </Label>
                          <Label htmlFor="frame-car" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="car" id="frame-car" className="sr-only peer" /><Car className="w-8 h-8 text-red-500" /><span className="text-xs mt-2">Car</span>
                          </Label>
                          <Label htmlFor="frame-laptop" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="laptop" id="frame-laptop" className="sr-only peer" /><Laptop className="w-8 h-8 text-indigo-500" /><span className="text-xs mt-2">Laptop</span>
                          </Label>
                          <Label htmlFor="frame-smartphone" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="smartphone" id="frame-smartphone" className="sr-only peer" /><Smartphone className="w-8 h-8 text-blue-500" /><span className="text-xs mt-2">Phone</span>
                          </Label>
                          <Label htmlFor="frame-heart" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="heart" id="frame-heart" className="sr-only peer" /><Heart className="w-8 h-8 text-rose-500" /><span className="text-xs mt-2">Heart</span>
                          </Label>
                      </RadioGroup>
                      {frameStyle !== 'none' && (
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="frameText">Frame Text</Label>
                          <Input id="frameText" placeholder="SCAN ME" value={frameText} onChange={(e) => setFrameText(e.target.value)} />
                          <p className="text-xs text-muted-foreground">Text to display within the frame.</p>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="shape" className="p-4 border rounded-b-lg bg-card shadow-sm">
                      <RadioGroup value={qrStyle} onValueChange={(val: QrStyle) => setQrStyle(val)} className="grid grid-cols-3 gap-4">
                          <Label htmlFor="shape-squares" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="squares" id="shape-squares" className="sr-only peer" />
                            <div className="w-10 h-10 bg-current" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                            <span className="mt-2 text-sm">Squares</span>
                          </Label>
                           <Label htmlFor="shape-rounded" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="rounded" id="shape-rounded" className="sr-only peer" />
                            <div className="w-10 h-10 bg-current" style={{ borderRadius: '6px' }} />
                            <span className="mt-2 text-sm">Rounded</span>
                          </Label>
                          <Label htmlFor="shape-dots" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer">
                            <RadioGroupItem value="dots" id="shape-dots" className="sr-only peer" />
                            <div className="w-10 h-10 bg-current rounded-full" />
                            <span className="mt-2 text-sm">Dots</span>
                          </Label>                      </RadioGroup>
                    </TabsContent>
                    <TabsContent value="level" className="p-4 border rounded-b-lg bg-card shadow-sm">
                       <RadioGroup value={errorCorrectionLevel} onValueChange={(val: ErrorCorrectionLevel) => setErrorCorrectionLevel(val)} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                           <Label htmlFor="level-l" className="flex flex-col items-center justify-center text-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer"><RadioGroupItem value="L" id="level-l" className="peer sr-only" /><Shield className="w-8 h-8 text-green-500" />Low <span className="text-xs text-muted-foreground">(7%)</span></Label>
                          <Label htmlFor="level-m" className="flex flex-col items-center justify-center text-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer"><RadioGroupItem value="M" id="level-m" className="peer sr-only" /><ShieldCheck className="w-8 h-8 text-blue-500" />Medium <span className="text-xs text-muted-foreground">(15%)</span></Label>
                          <Label htmlFor="level-q" className="flex flex-col items-center justify-center text-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer"><RadioGroupItem value="Q" id="level-q" className="peer sr-only" /><ShieldAlert className="w-8 h-8 text-orange-500" />Quartile <span className="text-xs text-muted-foreground">(25%)</span></Label>
                          <Label htmlFor="level-h" className="flex flex-col items-center justify-center text-center rounded-md border-2 border-muted bg-popover p-4 h-24 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has(:checked)]:border-primary cursor-pointer"><RadioGroupItem value="H" id="level-h" className="peer sr-only" /><ShieldPlus className="w-8 h-8 text-purple-500" />High <span className="text-xs text-muted-foreground">(30%)</span></Label>
                       </RadioGroup>
                       <p className="text-xs text-muted-foreground mt-2">Higher levels can recover more data from a damaged code, but create a denser QR code. Adding a logo automatically sets this to High.</p>
                    </TabsContent>
                </Tabs>
              </div>
            </div>
        </main>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex flex-col bg-muted/30 border-l p-8 sticky top-0 h-screen">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-sm flex flex-col items-center gap-6">
                <QRCodeDisplay 
                    ref={qrCodeDisplayRef} 
                    value={finalQrValue} 
                    qrColor={qrColor} 
                    bgColor={bgColor} 
                    logo={logo}
                    qrStyle={qrStyle}
                    ecLevel={errorCorrectionLevel}
                    frameText={frameText}
                    frameStyle={frameStyle}
                    size={300}
                />
            </div>
          </div>
          
           <div className="w-full max-w-sm mx-auto space-y-3">
              {finalQrValue && (
                <div className="grid grid-cols-2 gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="h-11">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                          <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Download Formats</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDownload('png')}>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          <span>PNG</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload('svg')}>
                          <FileType className="mr-2 h-4 w-4" />
                          <span>SVG (Vector)</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                          <File className="mr-2 h-4 w-4" />
                          <span>PDF Document</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <p className="text-xs p-2 text-muted-foreground">For EPS, please convert the downloaded SVG file using a vector editor.</p>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="secondary" onClick={handleShare} className="h-11">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </div>
              )}
            </div>
      </div>

       {/* Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-2 flex flex-col gap-2 z-50">
        {finalQrValue && (
           <Collapsible open={isMobilePreviewOpen} onOpenChange={setIsMobilePreviewOpen}>
            <CollapsibleContent>
              <div className="flex justify-center py-4">
                <QRCodeDisplay 
                  ref={qrCodeDisplayRef}
                  value={finalQrValue} 
                  qrColor={qrColor} 
                  bgColor={bgColor} 
                  logo={logo}
                  qrStyle={qrStyle}
                  ecLevel={errorCorrectionLevel}
                  frameText={frameText}
                  frameStyle={frameStyle}
                  size={220}
                />
              </div>
            </CollapsibleContent>
            <div className="grid grid-cols-3 gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" side="top">
                    <DropdownMenuLabel>Download Formats</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDownload('png')}>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      <span>PNG</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload('svg')}>
                      <FileType className="mr-2 h-4 w-4" />
                      <span>SVG (Vector)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                      <File className="mr-2 h-4 w-4" />
                      <span>PDF Document</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="secondary" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                 <CollapsibleTrigger asChild>
                    <Button variant="secondary">
                      {isMobilePreviewOpen ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                      {isMobilePreviewOpen ? 'Hide' : 'Show'}
                    </Button>
                </CollapsibleTrigger>
            </div>
          </Collapsible>
        )}
      </div>
    </div>
     <footer className="w-full border-t bg-muted/40 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground px-4 text-center md:text-left">
        <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} QRcodeDunya. All rights reserved.</p>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <nav className="flex gap-4 justify-center flex-wrap">
            <Link href="/ideas" className="hover:text-primary hover:underline">
                QR Code Ideas
            </Link>
            <Link href="/terms-of-use" className="hover:text-primary hover:underline">
                Terms of Use
            </Link>
            <Link href="/privacy-policy" className="hover:text-primary hover:underline">
                Privacy Policy
            </Link>
            <Link href="/cookies-policy" className="hover:text-primary hover:underline">
                Cookies Policy
            </Link>
            <Link href="/gdpr" className="hover:text-primary hover:underline">
                GDPR
            </Link>
            </nav>
            <div className="flex items-center gap-2">
                <span className="font-semibold">Connect with us:</span>
                <Link href="https://youtube.com/@qrcodedunya" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:opacity-80 transition-opacity">
                    <Youtube className="h-6 w-6" />
                </Link>
                <Link href="https://www.instagram.com/qrcodedunya/" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:opacity-80 transition-opacity">
                    <Instagram className="h-6 w-6" />
                </Link>
            </div>
        </div>
      </div>
    </footer>
    </div>
  );
}