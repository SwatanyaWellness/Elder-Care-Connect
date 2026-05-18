import { useLang } from '@/lib/LanguageContext';
import { Phone, Mail, MapPin, AlertCircle, Clock, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const { t } = useLang();

  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/30" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Get In Touch
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="heading-contact"
          >
            {t('contact')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We are here for you around the clock. Reach us through any channel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Card */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 flex flex-col items-center text-center" data-testid="card-emergency">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-foreground text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('emergencyHotline')}
            </h3>
            <p className="text-red-600 font-bold text-2xl mb-2">7898985703</p>
            <p className="text-muted-foreground text-sm mb-4">(7898985703)</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {t('available24x7')}
            </span>
            <a
              href="tel:7898985703"
              className="mt-6 w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all text-center"
              data-testid="button-call-emergency"
            >
              Call Emergency Now
            </a>
          </div>

          {/* General Contact */}
          <div className="bg-white border border-border rounded-2xl p-8" data-testid="card-contact-general">
            <h3 className="font-bold text-foreground text-xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              General Inquiries
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Phone</p>
                  <a href="tel:7898985703" className="text-primary hover:underline text-sm">{t('phone')}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Email</p>
                  <a href="mailto:swatanyawellness@gmail.com" className="text-secondary hover:underline text-sm">{t('email')}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">WhatsApp</p>
                  <a href="https://wa.me/917898985703" className="text-accent hover:underline text-sm">+91 78989 85703</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Business Hours</p>
                  <p className="text-muted-foreground text-sm">Mon–Sat: 8 AM – 9 PM</p>
                  <p className="text-muted-foreground text-sm">Emergency: 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Location */}
          <div className="bg-white border border-border rounded-2xl p-8" data-testid="card-contact-offices">
            <h3 className="font-bold text-foreground text-xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Office
            </h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-base mb-1">Swatanya Wellness</p>
                <p className="text-sm text-muted-foreground">G-10B, GTB Tower</p>
                <p className="text-sm text-muted-foreground">University Road, City Centre</p>
                <p className="text-sm text-muted-foreground">Gwalior, Madhya Pradesh</p>
                <a
                  href="https://maps.google.com/?q=G-10B+GTB+Tower+University+Road+City+Centre+Gwalior+Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-primary hover:underline font-semibold"
                >
                  <MapPin className="w-3 h-3" />
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 rounded-xl overflow-hidden border border-border">
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=G-10B+GTB+Tower+University+Road+City+Centre+Gwalior+Madhya+Pradesh&output=embed"
                width="100%"
                height="180"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
