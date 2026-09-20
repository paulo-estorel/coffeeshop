import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown, ChevronUp, Coffee, Car, Wifi } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Your message has been sent to our barista team!', 'success');
  };

  const faqs = [
    {
      q: 'Where do your coffee beans come from?',
      a: 'We source exclusively from certified highland smallholder farms in Atok & La Trinidad (Benguet), the pine mountains of Sagada (Mountain Province), and the fertile foothills of Mt. Apo (Davao del Sur).'
    },
    {
      q: 'What are your delivery areas and fees?',
      a: 'We offer express delivery across Metro Manila (Makati, BGC, Taguig, Mandaluyong, Pasig, San Juan, Manila, and Quezon City). Flat delivery is ₱49, and orders ₱600 and above receive Free Delivery.'
    },
    {
      q: 'Is there parking and WiFi at your Poblacion branch?',
      a: 'Yes! We have dedicated street parking spots in front of the shop and high-speed fiber WiFi (150 Mbps) with power outlets at most tables.'
    },
    {
      q: 'Do you offer catering or event coffee bars?',
      a: 'Yes, we provide mobile espresso cart catering for weddings, corporate workshops, and private celebrations across Metro Manila. Contact us via the form or email us at events@pauloestorelcoffee.ph.'
    }
  ];

  return (
    <div className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5A2B] bg-[#EFE8DC] px-3.5 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1810]">
            Visit Us or Drop a Hello
          </h2>
          <p className="text-sm text-[#6F4E37]">
            Have a question regarding bulk orders, event coffee bars, or bean wholesale? We’d love to hear from you.
          </p>
        </div>

        {/* Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Details & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-6 text-[#2B1810]">
              <h3 className="font-serif text-2xl font-bold text-[#2B1810]">
                Paulo Estorel Coffee Shop Headquarters
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center text-[#6F4E37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm text-[#2B1810]">Our Address</strong>
                    <p className="text-xs text-[#6F4E37] mt-0.5 leading-relaxed">
                      128 Roastcraft Boulevard, Poblacion, Makati City, 1210 Metro Manila
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center text-[#6F4E37] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm text-[#2B1810]">Operating Hours</strong>
                    <p className="text-xs text-[#6F4E37] mt-0.5">
                      Monday to Sunday: 7:00 AM – 10:00 PM
                    </p>
                    <span className="inline-block text-[11px] text-[#3D5A45] font-semibold mt-0.5">
                      ● Kitchen closes at 9:30 PM
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center text-[#6F4E37] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm text-[#2B1810]">Direct Hotline</strong>
                    <p className="text-xs text-[#6F4E37] mt-0.5">
                      (02) 8123 4567 • 0917 555 BEAN (2326)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center text-[#6F4E37] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm text-[#2B1810]">Email Support</strong>
                    <p className="text-xs text-[#6F4E37] mt-0.5">
                      orders@pauloestorelcoffee.ph
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="pt-4 border-t border-[#F4EFEA] flex items-center gap-4 text-xs text-[#6F4E37]">
                <span className="flex items-center gap-1">
                  <Wifi className="w-4 h-4 text-[#3D5A45]" /> Free Fast WiFi
                </span>
                <span className="flex items-center gap-1">
                  <Car className="w-4 h-4 text-[#3D5A45]" /> Street Parking
                </span>
                <span className="flex items-center gap-1">
                  <Coffee className="w-4 h-4 text-[#3D5A45]" /> Dine-in & Takeout
                </span>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE8DC] shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#2B1810] mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-[#6F4E37] mb-6">
              Our store manager and head roaster respond to inquiries within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#FAF8F5] rounded-2xl border border-[#E6DAC8]">
                <CheckCircle className="w-12 h-12 text-[#3D5A45] mx-auto" />
                <h4 className="font-serif text-xl font-bold text-[#2B1810]">
                  Thank You, {name}!
                </h4>
                <p className="text-xs text-[#6F4E37] max-w-sm mx-auto">
                  We received your message regarding &ldquo;{subject || 'General Inquiry'}&rdquo;. We will get back to you shortly at {email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="mt-3 px-4 py-2 bg-[#6F4E37] text-white text-xs font-semibold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#6F4E37] block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mateo Rivera"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#6F4E37] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. mateo@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#6F4E37] block mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Event Catering / Coffee Beans Wholesale / General Feedback"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#6F4E37] block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#6F4E37] hover:bg-[#5C3A21] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-[#2B1810]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#6F4E37] mt-1">
              Common questions about ordering, bean sourcing, and cafe visits.
            </p>
          </div>

          <div className="divide-y divide-[#EFE8DC] max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left font-serif text-base font-bold text-[#2B1810] hover:text-[#6F4E37] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#8B5A2B]" /> : <ChevronDown className="w-5 h-5 text-[#8B5A2B]" />}
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-[#6F4E37] mt-2.5 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
