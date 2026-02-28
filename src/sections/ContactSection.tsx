import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToBooking = () => {
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#11130E] py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div ref={leftColRef} className="will-change-transform">
            <h2 className="font-serif text-headline-sm lg:text-headline text-[#F6F7F6] mb-6">
              Ready to rest?
            </h2>
            <p className="font-sans text-body text-[#F6F7F6]/70 mb-10 max-w-md">
              Send a message or call us. We're here until midnight.
            </p>
            <Button
              onClick={scrollToBooking}
              className="bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-sm tracking-wide px-10 py-6 transition-all hover:-translate-y-0.5"
            >
              Book now
            </Button>
          </div>

          {/* Divider (desktop only) */}
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-px bg-[#F6F7F6]/10 origin-left"
          />

          {/* Right Column */}
          <div ref={rightColRef} className="will-change-transform">
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#2F5D50] mt-0.5" strokeWidth={1.5} />
                <div>
                  <div className="font-sans text-xs text-[#F6F7F6]/50 uppercase tracking-wide mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:hello@bosanichotel.com"
                    className="font-sans text-[#F6F7F6] hover:text-[#2F5D50] transition-colors"
                  >
                    hello@bosanichotel.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#2F5D50] mt-0.5" strokeWidth={1.5} />
                <div>
                  <div className="font-sans text-xs text-[#F6F7F6]/50 uppercase tracking-wide mb-1">
                    Phone
                  </div>
                  <a
                    href="tel:+2347025773030"
                    className="font-sans text-[#F6F7F6] hover:text-[#2F5D50] transition-colors"
                  >
                    +234 702 577 3030
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#2F5D50] mt-0.5" strokeWidth={1.5} />
                <div>
                  <div className="font-sans text-xs text-[#F6F7F6]/50 uppercase tracking-wide mb-1">
                    Address
                  </div>
                  <p className="font-sans text-[#F6F7F6]">
                    No.3 Aiyanyo Omoigui Street,<br />
                    Off 2nd Ugbor Road, GRA,<br />
                    Benin City, Nigeria
                  </p>
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-6 pt-4">
                <a
                  href="https://instagram.com/bosanic._hoteland_apartment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F6F7F6]/70 hover:text-[#2F5D50] transition-colors"
                >
                  <Instagram className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-sans text-sm">Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F6F7F6]/70 hover:text-[#2F5D50] transition-colors"
                >
                  <Facebook className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-sans text-sm">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-[#F6F7F6]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-sans text-xs text-[#F6F7F6]/40 tracking-wide">
            © 2026 Bosanic Hotel. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-sans text-xs text-[#F6F7F6]/40 hover:text-[#F6F7F6]/70 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-xs text-[#F6F7F6]/40 hover:text-[#F6F7F6]/70 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
