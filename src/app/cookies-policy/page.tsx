'use client';

import { Metadata } from 'next';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicyPage() {
  const lastUpdatedDate = format(new Date(), 'MMMM d, yyyy');
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
        </Link>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">Cookies Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: {lastUpdatedDate}</p>
        </header>

        <main className="prose prose-lg mx-auto text-foreground/90 max-w-none prose-headings:text-primary prose-a:text-primary">
          <section>
            <h2 className="text-2xl font-semibold">1. Our Use of Cookies</h2>
            <p>
              The service QRcodeDunya is a fully private and works entirely on your device (client-side). For this core functionality, we do not use cookies to track you or your data. The information you enter to create a QR code is never sent to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. When Are Cookies Used?</h2>
            <p>
              We only use cookies for users who voluntarily choose to create an account to access advanced features (like saving and managing dynamic QR codes). These cookies are essential for providing a secure login session.
            </p>
            <ul className="list-disc pl-6">
                <li><strong>Own cookies:</strong> We use session cookies to keep you logged in to your account.</li>
                <li><strong>Third-party cookies:</strong> We use Google Firebase for authentication. If you sign in, Google will set cookies to manage your session securely. For more information, you can review the types of cookies Google uses.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">3. What is a cookie?</h2>
            <p>
              A cookie is a small text file that is sent to the web browser of your computer, mobile, or tablet and is used to store and retrieve information about the navigation carried out. For example, remembering your login session or your profile preferences.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">4. How to configure and disable cookies</h2>
            <p>
              You can allow, block, or delete the cookies installed on your device from your web browser. If you do not allow the installation of cookies, you can still use our free QR code generator without any issues. However, you will not be able to use account-specific features. You can find instructions on how to configure cookies in your browser's help section.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}