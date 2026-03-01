import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  rootRef: React.RefObject<HTMLElement | null>;
  onScrollToBooking?: () => void;
}

export default function ContactSection({ rootRef, onScrollToBooking }: ContactSectionProps) {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = rootRef.current;
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
            start: 'top 85%',
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
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#11130E] py-16 lg:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
          {/* Left Column */}
          <div ref={leftColRef} className="will-change-transform z-10">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-headline text-[#F6F7F6] mb-6">
              Ready to rest?
            </h2>
            <p className="font-sans text-base lg:text-body text-[#F6F7F6]/70 mb-10 max-w-sm">
              Send a message or call us. We're here to make your stay effortless.
            </p>
            <Button
              onClick={onScrollToBooking}
              className="w-full sm:w-auto bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-sm tracking-widest uppercase px-10 py-7 transition-all hover:-translate-y-0.5"
            >
              Book now
            </Button>
          </div>

          {/* Divider (desktop only) */}
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#F6F7F6]/10 origin-top"
          />

          {/* Right Column */}
          <div ref={rightColRef} className="will-change-transform z-10">
            <div className="space-y-10 lg:pl-12">
              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2F5D50]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#2F5D50]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-sans text-[10px] text-[#F6F7F6]/40 uppercase tracking-[0.2em] mb-2">
                    Inquiries
                  </div>
                  <a
                    href="mailto:nerrypraise369@gmail.com"
                    className="font-sans text-lg text-[#F6F7F6] hover:text-[#2F5D50] transition-colors border-b border-[#F6F7F6]/10"
                  >
                    nerrypraise369@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2F5D50]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#2F5D50]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-sans text-[10px] text-[#F6F7F6]/40 uppercase tracking-[0.2em] mb-2">
                    Call Us
                  </div>
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+2347025773030"
                      className="font-sans text-lg text-[#F6F7F6] hover:text-[#2F5D50] transition-colors"
                    >
                      +234 702 577 3030
                    </a>
                    <a
                      href="tel:+2349157956558"
                      className="font-sans text-lg text-[#F6F7F6] hover:text-[#2F5D50] transition-colors"
                    >
                      +234 915 795 6558
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2F5D50]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#2F5D50]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-sans text-[10px] text-[#F6F7F6]/40 uppercase tracking-[0.2em] mb-2">
                    Location
                  </div>
                  <p className="font-sans text-[#F6F7F6]/90 leading-relaxed">
                    No.3 Aiyanyo Omoigui Street,<br />
                    Off 2nd Ugbor Road, GRA,<br />
                    Benin City, Nigeria
                  </p>
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-6 pt-6 border-t border-[#F6F7F6]/5">
                <a
                  href="https://instagram.com/bosanic._hoteland_apartment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F6F7F6]/50 hover:text-[#F6F7F6] transition-colors group"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <span className="font-sans text-xs uppercase tracking-widest">Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F6F7F6]/50 hover:text-[#F6F7F6] transition-colors group"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <span className="font-sans text-xs uppercase tracking-widest">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-[#F6F7F6]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="font-sans text-[10px] text-[#F6F7F6]/30 uppercase tracking-[0.2em]">
            © 2026 Bosanic Hotel • Designed for rest
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="font-sans text-[10px] text-[#F6F7F6]/30 uppercase tracking-[0.2em] hover:text-[#F6F7F6]/60 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-sans text-[10px] text-[#F6F7F6]/30 uppercase tracking-[0.2em] hover:text-[#F6F7F6]/60 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
