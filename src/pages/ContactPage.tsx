import React, { useState } from 'react';
import { IntegrationSettings } from '../types';
import { dispatchOrderWebhook } from '../utils/webhook';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ContactPageProps {
  settings: IntegrationSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast is delivery within Southwest Nigeria?',
      a: 'We operate primary dispatch hubs in Lagos and Ibadan. Most orders within Lagos, Ibadan, Ogun, and Osun are delivered within 24 to 48 hours via express motorcycle or dedicated interstate courier.'
    },
    {
      q: 'Do you ship to Diaspora kitchens in the UK, US, and Canada?',
      a: 'Yes! We prepare certified, hermetically vacuum-sealed export packs that comply with international agricultural inspection guidelines. International shipping is handled via DHL / FedEx with tracking.'
    },
    {
      q: 'Are there any artificial preservatives or MSG seasoning cubes in your blends?',
      a: 'Never. Every ounce of umami is derived naturally from pure fermented locust beans (iru crystals), sun-dried coastal crayfish, slow-cured beef, and whole botanical spices. Zero synthetic fillers or artificial flavor enhancers.'
    },
    {
      q: 'Can I order custom spice heat levels or special coarse/fine grinds?',
      a: 'Absolutely. Because we mill our blends in small batches, you can specify your heat preference (mild, traditional, fiery) or grind style (fine stone-ground silk vs coarse mortar crush) when placing your order on WhatsApp.'
    },
    {
      q: 'How should I store my apothecary jars and pouches?',
      a: 'Keep them in a cool, dark pantry away from humid steam above your cooking pots. Our UV-resistant amber jars and foil pouches preserve essential oils for 18 to 24 months.'
    }
  ];

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setFeedback('Please fill in your name, contact phone, and message.');
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    // Dispatch webhook inquiry
    const inquiryPayload = {
      id: 'inq_' + Date.now(),
      orderNumber: 'INQ-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      customer: {
        customerName: name,
        phone,
        email,
        address: 'Inquiry / Consultation',
        city: 'Southwest / Nigeria',
        stateOrRegion: 'Nigeria',
        country: 'Nigeria',
        deliveryZone: 'southwest' as const,
        notes: `Subject: ${subject} | Message: ${message}`,
        preferredContact: 'whatsapp' as const,
      },
      items: [],
      totalNgn: 0,
      currency: 'NGN' as const,
      totalInCurrency: 0,
      status: 'new' as const,
      channel: 'webhook_api' as const,
      webhookDispatched: false,
    };

    try {
      await dispatchOrderWebhook(inquiryPayload, settings);
    } catch (err) {
      console.warn('Inquiry webhook note:', err);
    }

    setIsSubmitting(false);
    setFeedback(`Thank you ${name}! Your inquiry has been dispatched to our atelier. You can also chat directly on WhatsApp for immediate response.`);

    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
          Concierge & Support
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF7F2]">
          Connect with the Atelier
        </h1>
        <p className="text-sm text-stone-300 font-light">
          Have a question about ingredient sourcing, custom catering blends, or delivery to your state? We are here to assist.
        </p>
      </div>

      {/* Quick Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href={`https://wa.me/234${settings.whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-gradient-to-br from-[#12241A] to-[#101913] border border-emerald-600/40 hover:border-emerald-500 transition-all text-center space-y-3 group shadow-lg"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-serif text-lg font-bold text-emerald-200">Instant WhatsApp Concierge</h3>
          <p className="text-xs text-stone-300">Fastest response for orders and instant delivery estimates.</p>
          <p className="text-xs font-mono font-bold text-emerald-400">{settings.businessPhoneDisplay}</p>
        </a>

        <div className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-100">Southwest Logistics Hub</h3>
          <p className="text-xs text-stone-400">Primary dispatch warehouses in Lagos and Ibadan, Nigeria.</p>
          <p className="text-xs font-mono text-amber-400">Lagos & Ibadan 24-48h</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-100">Direct Inquiries</h3>
          <p className="text-xs text-stone-400">For wholesale distribution, export orders, and collaborations.</p>
          <p className="text-xs font-mono text-amber-400">{settings.businessEmail}</p>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-[#17120E] border border-[#2C2119] rounded-3xl p-8 sm:p-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
              Send an Atelier Inquiry
            </h2>
            <p className="text-xs text-stone-400">
              Inquiries are forwarded directly to our dispatch team and logged via API webhook.
            </p>
          </div>

          {feedback && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bukola Akinnike"
                  className="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 07051377659"
                  className="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. hello@example.com"
                  className="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Subject of Inquiry</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Product Inquiry">Product Inquiry / Blend Recommendations</option>
                  <option value="Custom Batch & Catering">Custom Batch & Event Catering (Bulk)</option>
                  <option value="Southwest Delivery Question">Southwest Express Delivery Question</option>
                  <option value="Diaspora / Export Order">UK / US / Diaspora International Delivery</option>
                  <option value="Wholesale / Reseller">Wholesale / Grocery Store Partnership</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Your Message or Order Request *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you would like to know or which products you are interested in..."
                className="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Inquiry to Atelier & Webhook'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-stone-100 text-center">
          Frequently Answered Inquiries
        </h3>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#17120E] border border-[#2A1F18] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-stone-200 hover:text-amber-300"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-400 leading-relaxed border-t border-[#241A14]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
