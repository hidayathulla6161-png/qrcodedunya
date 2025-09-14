
'use client';

import { Metadata } from 'next';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfUsePage() {
  const lastUpdatedDate = format(new Date(), 'MMMM d, yyyy');
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
        </Link>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">Terms of Use and Contract</h1>
          <p className="text-muted-foreground mt-2">Last updated: {lastUpdatedDate}</p>
        </header>

        <main className="prose prose-lg mx-auto text-foreground/90 max-w-none prose-headings:text-primary prose-a:text-primary">
          <p>
            Welcome to QRcodeDunya. These terms are important because they describe the rules everyone must respect when using the service. Please read them carefully.
          </p>

          <section>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              Our core mission is to champion a paperless society by promoting the widespread adoption of QR code technology in every home, restaurant, and business, thereby supporting environmental sustainability. The website and service (hereinafter, the "Website" or "Service") are owned and operated by QRcodeDunya (hereinafter, "we", "us", "our"). We provide a free tool for generating static QR codes and optional, account-based services for advanced features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Purpose and Scope</h2>
            <p>
              These conditions of use constitute, together with the Privacy Policy and the Cookies Policy, the legal framework that regulates the use of the Website. By using our service, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Access and Acceptance</h2>
            <p>
              Access to the free QR code generator is open and does not require registration. Using any part of the Website implies your full and unreserved acceptance of these conditions of use. You declare that you are of legal age and have the necessary legal capacity to use the site in accordance with its terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Conditions of Use</h2>
            <p>
              The User agrees to use the Website in accordance with these conditions, current legislation, and good faith. The User is responsible for the content they encode in the QR codes they generate. It is strictly forbidden to use the service for illegal, fraudulent, or malicious purposes, including but not limited to creating QR codes for phishing, malware distribution, hate speech, or scams. We reserve the right to suspend or terminate access for any user who violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Description of the Service</h2>
            <p>
              QRcodeDunya provides a free service for creating unlimited static QR codes. We may also offer optional paid plans ("Pro" or "Business") that allow for the creation and management of dynamic QR codes. For features that require payment, you authorize us to charge the corresponding subscription fee to your payment method. You can cancel your subscription at any time and will retain access until the end of your billing period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Intellectual and Industrial Property</h2>
            <p>
              The Website and its contents are the property of QRcodeDunya. Any form of reproduction, distribution, or transformation of the Website or its contents without the prior express consent of QRcodeDunya is strictly prohibited. You, the user, retain all ownership rights to the content you create.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">7. Disclaimer of Liability</h2>
            <p>
                QRcodeDunya is a tool for creating QR codes. The User is solely and exclusively responsible for the content, links, and data they choose to encode in the QR codes they generate. QRcodeDunya does not endorse, review, or control the content created by users and expressly disclaims any and all liability in connection with such content. The Service is provided "as-is" and "as-available" without warranties of any kind. We will not be liable for any damages that may be derived to the User or to third parties as a result of the use of a QR code created on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Modifications and Nullity</h2>
            <p>
              We may update these terms and conditions in the future. We will inform you of the changes by updating the "Last updated" date at the top of this page. If any clause included in these terms is declared null or ineffective, it will only affect that provision, and the rest of the terms and conditions will remain in effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Governing Law and Dispute Resolution</h2>
            <p>
              This Service is governed by the laws of India. For the resolution of any disputes, the parties submit to the jurisdiction of the courts of India.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}