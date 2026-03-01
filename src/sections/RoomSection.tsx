import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Sparkles, Maximize2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    id: 'standard',
    name: 'Standard Suite',
    price: '₦23,000',
    description: 'A cozy yet refined space perfectly suited for the modern traveler. Quiet, clean, and filled with natural light.',
    image: '/rooms/standard.png',
    features: ['King Bed', 'Rain Shower', 'Work Desk', 'Free Wi-Fi']
  },
  {
    id: 'deluxe',
    name: 'Deluxe Suite',
    price: '₦45,000',
    description: 'Extra space for extra comfort. Featuring a dedicated sitting area and premium finishes throughout.',
    image: '/rooms/deluxe.png',
    features: ['King Bed', 'Sitting Area', 'Smart TV', 'Mini Bar']
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    price: '₦75,000',
    description: 'Designed for the business traveler who demands the best. A sophisticated blend of productivity and rest.',
    image: '/rooms/executive.png',
    features: ['Extra Large Bed', 'Lounge Area', 'Office Desk', 'Priority Service']
  },
  {
    id: 'presidential',
    name: 'Presidential Suite',
    price: '₦150,000',
    description: 'The pinnacle of luxury in Benin City. Grand living spaces, master bedrooms, and views that redefine GRA living.',
    image: '/rooms/presidential.png',
    features: ['Master Bedroom', 'Living Room', 'Dining Area', 'Personal Concierge']
  }
];

interface RoomSectionProps {
  rootRef: React.RefObject<HTMLElement | null>;
  onScrollToBooking?: () => void;
}

export default function RoomSection({ rootRef, onScrollToBooking }: RoomSectionProps) {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [activeRoom, setActiveRoom] = useState(0);

  // Sync scroll on mobile to update dots
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.offsetWidth * 0.85; // Card is 85vw
      const index = Math.round(scrollLeft / cardWidth);
      if (index !== activeRoom) setActiveRoom(index);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [activeRoom]);

  useLayoutEffect(() => {
    const section = rootRef.current;
    const horizontal = horizontalRef.current;
    if (!section || !horizontal) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // DESKTOP: GSAP Horizontal Pinned Scroll
        "(min-width: 1024px)": function () {
          const totalWidth = horizontal.scrollWidth;
          const viewportWidth = window.innerWidth;
          const scrollDist = totalWidth - viewportWidth;

          gsap.to(horizontal, {
            x: -scrollDist,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              onUpdate: (self) => {
                const index = Math.round(self.progress * (rooms.length - 1));
                setActiveRoom(index);
              },
            },
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-screen bg-[#F6F7F6] overflow-hidden"
    >
      {/* 1. DESKTOP VIEWPORT (Hidden on Mobile) */}
      <div className="hidden lg:block h-screen">
        {/* Background Room Counter */}
        <div className="absolute top-[15vh] left-[6vw] font-serif text-[10vw] font-bold text-[#11130E]/5 select-none pointer-events-none">
          0{activeRoom + 1}
        </div>

        <div ref={horizontalRef} className="flex h-full w-[400vw] will-change-transform">
          {rooms.map((room, index) => (
            <div key={room.id} className="flex w-screen h-full items-center px-[6vw]">
              {/* Left Content Column */}
              <div className="w-[40vw] pr-[5vw] flex flex-col justify-center">
                <div className="section-label text-[#6B7280] mb-8">
                  ROOMS • 0{index + 1} / 0{rooms.length}
                </div>
                <h2 className="font-serif text-headline text-[#11130E] mb-4">
                  {room.name}
                </h2>
                <div className="font-sans text-xl font-medium text-[#2F5D50] mb-8 uppercase tracking-widest">
                  {room.price} <span className="text-xs text-[#11130E]/50 font-normal">/ Night</span>
                </div>
                <p className="font-sans text-body text-[#11130E]/75 mb-10 leading-relaxed max-w-md">
                  {room.description}
                </p>
                <div className="grid grid-cols-2 gap-y-4 mb-10">
                  {room.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#2F5D50]" strokeWidth={1.5} />
                      <span className="font-sans text-xs text-[#11130E]/70 tracking-wide uppercase">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button onClick={onScrollToBooking} className="bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-xs tracking-widest px-10 py-6 uppercase">
                    Reserve Now
                  </Button>
                  <Button variant="outline" className="border-[#11130E]/20 text-[#11130E] hover:bg-white hover:border-[#11130E] font-sans text-xs tracking-widest px-10 py-6 uppercase">
                    Details
                  </Button>
                </div>
              </div>
              {/* Right Image Column */}
              <div className="w-[48vw] h-[70vh] relative group overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <img src={room.image} alt={room.name} className="w-full h-full object-cover transform scale-110 translate-x-[-5%] transition-transform duration-1000 ease-out group-hover:scale-100 group-hover:translate-x-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Navigation Indicator */}
        <div className="absolute bottom-[8vh] left-[6vw] flex items-center gap-4">
          {rooms.map((_, index) => (
            <div key={index} className={`h-[2px] transition-all duration-500 ${activeRoom === index ? 'w-12 bg-[#2F5D50]' : 'w-4 bg-[#11130E]/10'}`} />
          ))}
        </div>
      </div>

      {/* 2. MOBILE VIEWPORT (Hidden on Desktop) */}
      <div className="lg:hidden flex flex-col py-20 min-h-screen">
        <div className="px-6 mb-8">
          <div className="section-label text-[#6B7280] mb-2">OUR SUITES</div>
          <h2 className="font-serif text-3xl text-[#11130E]">Select your rest.</h2>
        </div>

        {/* Card Snap Slider */}
        <div
          ref={mobileRef}
          className="flex overflow-x-auto scroll-snap-x-mandatory no-scrollbar space-x-4 px-6 snap-x"
        >
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="flex-shrink-0 w-[85vw] scroll-snap-align-center first:pl-0 last:pr-6"
            >
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden group shadow-2xl shadow-black/10">
                {/* Background Image */}
                <img
                  src={room.image}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                {/* Card Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start justify-end">
                  <h3 className="font-serif text-2xl text-white mb-1">{room.name}</h3>
                  <div className="font-sans text-white/80 text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                    {room.price}
                    <span className="text-[10px] text-white/40 font-normal lowercase tracking-normal">/ night</span>
                  </div>

                  <p className="font-sans text-xs text-white/60 mb-8 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="flex w-full gap-3">
                    <Button
                      onClick={onScrollToBooking}
                      size="sm"
                      className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black font-sans text-[10px] tracking-widest uppercase h-11"
                    >
                      Reserve
                    </Button>
                    <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-white">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {rooms.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${activeRoom === i ? 'w-8 bg-[#2F5D50]' : 'w-2 bg-[#11130E]/10'}`}
            />
          ))}
        </div>

        <div className="mt-8 px-6 text-center italic font-serif text-[#11130E]/40 text-sm">
          Swipe to discover our suites
        </div>
      </div>
    </section>
  );
}
