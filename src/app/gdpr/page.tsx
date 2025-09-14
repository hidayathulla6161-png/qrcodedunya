
'use client';

import { Metadata } from 'next';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GDPRPage() {
  const lastUpdatedDate = format(new Date(), 'MMMM d, yyyy');
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
        </Link>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">General Data Protection Regulation (GDPR)</h1>
          <p className="text-muted-foreground mt-2">Last updated: {lastUpdatedDate}</p>
        </header>

        <main className="prose prose-lg mx-auto text-foreground/90 max-w-none prose-headings:text-primary prose-a:text-primary">
          <section>
            <h2 className="text-2xl font-semibold">1. Who is responsible and how to contact them?</h2>
            <p>
              Our core mission is to champion a paperless society by promoting the widespread adoption of QR code technology in every home, restaurant, and business, thereby supporting environmental sustainability. The controller of this site is QRcodeDunya ("we", "us", "our"). You can contact us via email at <a href="mailto:qrcodedunya@gmail.com">qrcodedunya@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. What data is collected?</h2>
            <p>
              Our data collection practices depend on how you use our service.
            </p>
            <h3 className="text-xl font-semibold">For Our Free, Public QR Code Generator</h3>
            <p>
                <strong>We do not collect any personal data.</strong> The QR code generation process is done entirely within your browser on your device (client-side). The information you enter into the QR code fields is **never** sent to our servers or stored by us.
            </p>

            <h3 className="text-xl font-semibold">For Optional Account-Based Services (e.g., "Pro" Plans)</h3>
            <p>
                If you voluntarily create an account to use advanced features (like dynamic QR codes), we will collect the following:
            </p>
            <ul className="list-disc pl-6">
                <li><strong>Account Information:</strong> We collect the name and email you provide through our authentication provider (e.g., Google Sign-In) to create and manage your account.</li>
                <li><strong>User-Generated Content:</strong> We store the data for the dynamic QR codes you create and save to your account so that you can manage and edit them.</li>
                <li><strong>Usage Data:</strong> We automatically collect data through cookies necessary for authentication and service functionality, including IP address, device type, and browser information to ensure security and improve our service.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">3. What is the collected data used for?</h2>
            <p>
              Data collected from registered users is used to: administer and update the service, respond to your requests, manage your registration on the platform, maintain the security of the Service, investigate illicit activities, enforce our terms and conditions, and help law enforcement bodies in the framework of their eventual investigations. <strong>No data is collected or used from users of the free, public generator.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. How long is data kept?</h2>
            <p>
              This only applies to data from registered users. Disaggregated (anonymous) data will be kept without a deletion period. Customer data will be kept for the minimum necessary period to comply with legal and business obligations. User data will be kept as long as the account is active, or for a maximum period of 12 months after the last activity to attend to any final requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. What are your rights as a user?</h2>
            <p>As a registered user, you have several rights regarding your personal data:</p>
            <ul className="list-disc pl-6">
              <li><strong>Right of access:</strong> You have the right to obtain confirmation as to whether or not personal data concerning you is being processed.</li>
              <li><strong>Right of rectification:</strong> You have the right to obtain the rectification of inaccurate personal data.</li>
              <li><strong>Right of deletion ("Right to be forgotten"):</strong> You have the right to obtain the deletion of your personal data without undue delay.</li>
              <li><strong>Right to limit data processing:</strong> You have the right to obtain the limitation of the processing of your data under certain conditions.</li>
              <li><strong>Right to data portability:</strong> You have the right to receive the personal data that concerns you in a structured, commonly used, and machine-readable format.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. How can you exercise your rights?</h2>
            <p>
              If you are a registered user, you can exercise your personal data rights at any time by sending an email to <a href="mailto:qrcodedunya@gmail.com">qrcodedunya@gmail.com</a>. You must identify yourself with your name and surname. If you believe there is a problem with the way we are handling your data, you can direct your complaints to the relevant data protection authority.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Are security measures adopted?</h2>
            <p>
              The Service takes all necessary technical and organizational measures to protect the security and integrity of the personal information collected from our registered users. In any case, we cannot guarantee absolute security, so you must collaborate and use common sense at all times regarding shared information.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}