// app/faq/page.tsx

import React from 'react';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) | DIMC Prep',
  description:
    'Find answers to the most common questions about DIMC Prep. Learn more about our platform, its purpose, and who it’s for.',
};

const FAQPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is DIMC Prep?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DIMC Prep is an advanced online question bank created specifically to support candidates preparing for the Diploma in Immediate Medical Care (DipIMC), administered by the Royal College of Surgeons of Edinburgh (RCSEd). It is designed for doctors, paramedics, and nurses working in pre-hospital emergency medicine (PHEM)."
        }
      },
      {
        "@type": "Question",
        "name": "Who should use this platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our platform is ideal for healthcare professionals preparing for the DipIMC. Whether you’re a doctor, paramedic, or nurse working in pre-hospital emergency settings, DIMC Prep offers targeted revision tools mapped to the RCSEd curriculum."
        }
      },
      {
        "@type": "Question",
        "name": "Is this resource updated regularly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our academic team regularly reviews and updates the content in alignment with RCSEd curriculum changes and new guidelines in pre-hospital emergency medicine."
        }
      },
      {
        "@type": "Question",
        "name": "How do I contact support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you have any questions or face technical issues, you can contact our team via the Contact Us page or email us directly at support@dimcprep.com. We aim to respond within 24 hours."
        }
      },
      {
        "@type": "Question",
        "name": "Who is eligible to take the DipIMC exam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Candidates typically include doctors, paramedics, and nurses with experience in pre-hospital care, emergency medicine, or critical care. You should check the RCSEd eligibility requirements for the most up-to-date details."
        }
      }
    ]
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* ✅ Schema Markup for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-4xl font-bold text-center mb-6">Have Questions? We’ve Got Answers.</h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Preparing for the DipIMC can be overwhelming, but DIMC Prep is here to make it easier.
        Find answers to the most common queries below.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold">1. What is DIMC Prep?</h2>
          <p className="mt-2 text-gray-700">
            DIMC Prep is an advanced online question bank created specifically to support
            candidates preparing for the Diploma in Immediate Medical Care (DipIMC), administered
            by the Royal College of Surgeons of Edinburgh (RCSEd). It is designed for doctors,
            paramedics, and nurses working in pre-hospital emergency medicine (PHEM).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Who should use this platform?</h2>
          <p className="mt-2 text-gray-700">
            Our platform is ideal for healthcare professionals preparing for the DipIMC.
            Whether you’re a doctor, paramedic, or nurse working in pre-hospital emergency
            settings, DIMC Prep offers targeted revision tools mapped to the RCSEd curriculum.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Is this resource updated regularly?</h2>
          <p className="mt-2 text-gray-700">
            Yes. Our academic team regularly reviews and updates the content in alignment with
            RCSEd curriculum changes and new guidelines in pre-hospital emergency medicine.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. How do I contact support?</h2>
          <p className="mt-2 text-gray-700">
            If you have any questions or face technical issues, you can contact our team via the{' '}
            <a href="/contact-us" className="text-blue-600 underline">Contact Us</a> page or email us directly at{' '}
            <a href="mailto:info@dimcprep.com" className="text-blue-600 underline">info@dimcprep.com</a>.
            We aim to respond within 24 hours.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Who is eligible to take the DipIMC exam?</h2>
          <p className="mt-2 text-gray-700">
            Candidates typically include doctors, paramedics, and nurses with experience in
            pre-hospital care, emergency medicine, or critical care. You should check the RCSEd
            eligibility requirements for the most up-to-date details.
          </p>
        </section>
      </div>
    </main>
  );
};

export default FAQPage;
