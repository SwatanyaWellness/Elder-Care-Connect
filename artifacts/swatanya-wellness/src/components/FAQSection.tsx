import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How quickly can I get a caregiver assigned?',
    answer: 'We assign a caregiver within 24 hours of registration. For emergency cases, we can dispatch a responder within 2–4 hours. Our network spans 25+ cities with 5,000+ trained caregivers ready to serve.',
  },
  {
    question: 'Are your caregivers background-verified?',
    answer: 'Absolutely. Every caregiver undergoes a comprehensive background check including police verification, identity verification, reference checks, and medical screening. They are also professionally trained in elderly care, first aid, and CPR.',
  },
  {
    question: 'What if I\'m not satisfied with the assigned caregiver?',
    answer: 'We offer a free replacement guarantee. If you are not satisfied with your assigned caregiver, contact us and we will assign a new caregiver within 48 hours. Your satisfaction is our priority.',
  },
  {
    question: 'Do you provide services in regional languages?',
    answer: 'Yes! We match caregivers based on language preference. We have caregivers fluent in Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Bengali, Punjabi, Urdu, and many more regional languages.',
  },
  {
    question: 'What is the minimum service duration?',
    answer: 'Our minimum service duration is 7 days (weekly plan). We offer flexible packages including weekly, monthly, quarterly, and annual plans. For long-term care, we recommend our monthly or annual plans for better rates.',
  },
  {
    question: 'How is emergency support handled at night?',
    answer: 'Our emergency hotline is operational 24/7, 365 days a year. Night emergencies are handled by our trained on-call response team. We coordinate with nearest hospitals, dispatch ambulances, and notify family members immediately.',
  },
  {
    question: 'What government IDs are accepted for registration?',
    answer: 'We accept Aadhaar Card, PAN Card, Passport, Voter ID Card, and Driving License. The ID is required for security verification and to ensure the safety of both the elder and the caregiver.',
  },
  {
    question: 'Is photo verification mandatory?',
    answer: 'Photo verification is strongly recommended but not mandatory for initial registration. However, it speeds up the caregiver matching process and enhances security. You can upload a clear face photograph during registration.',
  },
  {
    question: 'Do you offer trial periods?',
    answer: 'Yes! We offer a 3-day trial period for all new registrations. If you are not completely satisfied within the first 3 days, we offer a full refund. We are confident in our service quality.',
  },
  {
    question: 'Which cities do you currently serve?',
    answer: 'We currently serve Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad, Jaipur, Surat, and 15+ more cities across India. We are rapidly expanding — contact us if your city is not listed.',
  },
];

export default function FAQSection() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white" data-testid="section-faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Got Questions?
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="heading-faq"
          >
            {t('faq')}
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Swatanya Wellness services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-border rounded-2xl overflow-hidden"
              data-testid={`faq-item-${idx}`}
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/30 transition-colors"
                data-testid={`faq-toggle-${idx}`}
              >
                <span className="font-semibold text-foreground pr-4 text-sm sm:text-base">{faq.question}</span>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open === idx ? 'gradient-saffron rotate-180' : 'bg-muted'}`}>
                  <ChevronDown className={`w-4 h-4 ${open === idx ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
              </button>

              {open === idx && (
                <div
                  className="px-6 pb-5 border-t border-border/50"
                  data-testid={`faq-answer-${idx}`}
                >
                  <p className="text-muted-foreground text-sm leading-relaxed pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center bg-muted/30 rounded-2xl p-8 border border-border">
          <h3 className="font-bold text-foreground text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Still have questions?
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            Our care team is available 24/7 to answer all your queries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:7898985703"
              className="px-6 py-3 gradient-saffron text-white rounded-xl font-semibold hover:opacity-90 transition-all"
              data-testid="button-faq-call"
            >
              Call Us Now
            </a>
            <a
              href="mailto:care@swatanyawellness.in"
              className="px-6 py-3 border-2 border-border text-foreground rounded-xl font-semibold hover:border-primary hover:text-primary transition-all"
              data-testid="button-faq-email"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
