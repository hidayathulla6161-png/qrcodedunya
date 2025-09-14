'use client';

import { Metadata } from 'next';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdatedDate = format(new Date(), 'MMMM d, yyyy');
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
        </Link>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: {lastUpdatedDate}</p>
        </header>

        <main className="prose prose-lg mx-auto text-foreground/90 max-w-none prose-headings:text-primary prose-a:text-primary">
          <section>
            <h2 className="text-2xl font-semibold">1. Our Privacy Promise</h2>
            <p>
                Our core mission is to champion a paperless society by promoting the widespread adoption of QR code technology in every home, restaurant, and business, thereby supporting environmental sustainability. The primary purpose of QRcodeDunya is to be a private, secure, and free tool for creating QR codes. This Privacy Policy explains what information we collect and why, depending on how you use our services. You can contact us at <a href="mailto:qrcodedunya@gmail.com">qrcodedunya@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Information Collected</h2>
            <p>
              We have two distinct modes of operation regarding data collection:
            </p>
            <h3 className="text-xl font-semibold">2.1. The Free QR Code Generator (Client-Side)</h3>
            <p>
              For users of our free, public QR code generator, we collect **absolutely no personal information**. The entire process of creating a QR code happens on your device in your browser. The data you input (like a URL, text, or contact information) is **never** sent to our servers. What you create is for your eyes only. We cannot see it, store it, or track it.
            </p>
            <h3 className="text-xl font-semibold">2.2. Optional Account-Based Services ("Pro" Users)</h3>
            <p>
              For users who voluntarily choose to create an account to access advanced features (like dynamic, editable QR codes), we collect the following information:
            </p>
            <ul className="list-disc pl-6">
                <li><strong>Voluntarily Provided Information:</strong> This includes the information required for registration, such as your name and email address, provided through a secure third-party like Google Sign-In.</li>
                <li><strong>User-Generated Content:</strong> We store the content of the dynamic QR codes you save to your account. This is necessary so you can manage, track, and edit them.</li>
                <li><strong>Automatically Collected Information:</strong> We collect essential technical data to maintain your session and secure your account, such as your IP address and browser type. This is used strictly for security and functionality.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Rights and Purposes</h2>
            <p>
              For registered users, you can exercise at any time the rights of access, rectification, deletion, limitation of your treatment, opposition, and portability of your personal data by email to <a href="mailto:qrcodedunya@gmail.com">qrcodedunya@gmail.com</a>. If you have granted consent for a specific purpose, you have the right to withdraw that consent at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Age of Majority</h2>
            <p>
              Regarding the use of the online service, you declare that you are of legal age and that you have the necessary legal capacity to be bound by this agreement and use the site in accordance with its terms and conditions, which you fully understand and acknowledge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Use of Data (For Registered Users Only)</h2>
            <p>
              QRcodeDunya will use the collected data from registered users to: Manage and update the Service; address the questions you raise; provide the contracted service; and maintain the security of the Service, investigate illegal activities, and enforce our terms and conditions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">6. Data Retention (For Registered Users Only)</h2>
            <p>
                User data is stored only as long as the account is active. Disaggregated, anonymous data (like total number of users, which contains no personal info) may be kept without a deletion period for statistical purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Data Shared with Third Parties</h2>
            <p>
              We do not share your data, except with essential third parties that manage part of the Service for registered users. These include our authentication provider (Google Firebase) and web hosting services. We will only provide the information strictly required for them to perform their function.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Changes to the Privacy Policy</h2>
            <p>
              We may update this Privacy Policy in the future. We will inform you of its changes by posting a notice in a prominent place on our website.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}