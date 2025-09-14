'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Briefcase, Gift, Heart, Home, Martini, Utensils, Wifi, Smartphone, FileText, MapPin, Calendar, MessageSquare, Store, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Creative QR Code Ideas | QRcodeDunya',
  description: 'Discover creative and practical ideas for using QR codes in your business, home, and personal life. Simplify tasks, engage customers, and get inspired.',
};

interface Idea {
    title: string;
    description: string;
    icon: React.ReactNode;
    appType: string;
}

const ideas: { category: string; list: Idea[] }[] = [
    {
        category: "For Your Business",
        list: [
            { title: "Digital Business Cards", description: "Link to a vCard so new contacts can save your details with one scan. Never run out of cards again.", icon: <Briefcase className="w-6 h-6 text-blue-500" />, appType: "vCard" },
            { title: "Instant Customer Feedback", description: "Place QR codes on receipts or tables that link to a quick feedback form. Show customers you value their opinion.", icon: <Award className="w-6 h-6 text-yellow-500" />, appType: "URL" },
            { title: "Restaurant Menus", description: "Offer a touchless menu experience. A QR code on each table links directly to your digital menu.", icon: <Utensils className="w-6 h-6 text-amber-600" />, appType: "URL / PDF" },
            { title: "App Downloads", description: "Use a single QR code that directs users to the correct app store (Apple or Google Play) to download your application.", icon: <Store className="w-6 h-6 text-green-500" />, appType: "App Store" },
            { title: "Exclusive Video Content", description: "On product packaging, link to a video showing how to use the product, or the story behind it.", icon: <LinkIcon className="w-6 h-6 text-red-500" />, appType: "URL" },
            { title: "Event Registration", description: "On event posters, link directly to a registration or ticket purchase page.", icon: <Calendar className="w-6 h-6 text-indigo-500" />, appType: "URL" },
            { title: "Follow on Social Media", description: "Put a QR code on your storefront window or marketing materials that links to your Instagram or Facebook page.", icon: <Heart className="w-6 h-6 text-rose-500" />, appType: "Social Media" },
            { title: "Product Authenticity", description: "For luxury goods, a QR code can link to a verification page, confirming the product is genuine.", icon: <Briefcase className="w-6 h-6 text-cyan-600" />, appType: "URL" },
        ]
    },
    {
        category: "For Your Home & Personal Life",
        list: [
            { title: "Guest WiFi Access", description: "Let guests connect to your home WiFi instantly without typing a password. Perfect for a picture frame in the living room.", icon: <Wifi className="w-6 h-6 text-purple-500" />, appType: "WiFi" },
            { title: "The 'Honey-Do' List", description: "Place a QR code on the fridge that links to a shared digital note with the current grocery or chore list.", icon: <Home className="w-6 h-6 text-green-600" />, appType: "URL" },
            { title: "Emergency Contacts", description: "Create a QR code with a vCard of emergency contacts and stick it somewhere visible for babysitters or guests.", icon: <Smartphone className="w-6 h-6 text-red-600" />, appType: "vCard" },
            { title: "Digital Love Notes", description: "Surprise your partner with a QR code in their lunch bag that links to a sweet text message or a photo of you together.", icon: <Heart className="w-6 h-6 text-pink-500" />, appType: "Text / URL" },
            { title: "Recipe Book", description: "At a potluck, place a QR code next to your dish linking to the recipe online.", icon: <Utensils className="w-6 h-6 text-orange-500" />, appType: "URL" },
            { title: "Party Details", description: "On an invitation, link a QR code to a calendar event with all the party details, including time, date, and location.", icon: <Martini className="w-6 h-6 text-sky-500" />, appType: "Event" },
            { title: "Gift Scavenger Hunt", description: "For birthdays or holidays, create a series of QR codes that give clues to the location of a hidden gift.", icon: <Gift className="w-6 h-6 text-teal-500" />, appType: "Text" },
            { title: "Label Moving Boxes", description: "Place a QR code on each moving box that lists the contents. Scan to see what's inside without opening it.", icon: <FileText className="w-6 h-6 text-gray-500" />, appType: "Text" },
        ]
    }
];


export default function IdeasPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Creative QR Code Ideas</h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Discover how QR codes can simplify tasks and create engaging experiences in your business, home, and personal life.
          </p>
        </header>

        <main className="space-y-16">
          {ideas.map((category) => (
            <section key={category.category}>
              <h2 className="text-3xl font-bold text-foreground mb-8 border-b pb-2">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.list.map((idea) => (
                  <div key={idea.title} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {idea.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-primary">{idea.title}</h3>
                      <p className="text-muted-foreground mt-1">{idea.description}</p>
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full mt-2 inline-block">Use Case: {idea.appType}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className="mt-20 text-center">
            <p className="text-lg text-muted-foreground">Ready to bring these ideas to life?</p>
            <Button asChild className="mt-4" size="lg">
                <Link href="/">Create Your QR Code Now</Link>
            </Button>
        </footer>
      </div>
    </div>
  );
}