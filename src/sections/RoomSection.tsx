import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Sparkles, Maximize2 } from 'lucide-react';

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
  const [activeRoom, setActiveRoom] = useState(0);

  useLayoutEffect(() => {
    const section = rootRef.current;
    const horizontal = horizontalRef.current;
    if (!section || !horizontal) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // DESKTOP: Horizontal scroll with pinning
        "(min-width: 1024px)": function () {
          const totalWidth = horizontal.scrollWidth;
          const viewportWidth = window.innerWidth;
          const scrollDist = totalWidth - viewportWidth;

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              onUpdate: (self) => {
                const index = Math.round(self.progress * (rooms.length - 1));
                setActiveRoom(index);
              },
            },
          });

          scrollTl.to(horizontal, {
            x: -scrollDist,
            ease: 'none',
          });
        },

        // MOBILE: Simple stack (no pinning, no horizontal movement)
        "(max-width: 1023px)": function () {
          // Reset any horizontal transform
          gsap.set(horizontal, { x: 0 });

          rooms.forEach((_, index) => {
            ScrollTrigger.create({
              trigger: section.querySelectorAll('.room-card')[index],
              start: "top center",
              end: "bottom center",
              onToggle: (self) => {
                if (self.isActive) setActiveRoom(index);
              }
            });
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-screen bg-[#F6F7F6] overflow-hidden"
    >
      {/* Background Room Counter - Hidden on mobile */}
      <div className="hidden lg:block absolute top-[15vh] left-[6vw] font-serif text-[10vw] font-bold text-[#11130E]/5 select-none transition-opacity duration-300 pointer-events-none">
        0{activeRoom + 1}
      </div>

      <div
        ref={horizontalRef}
        className="flex flex-col lg:flex-row h-full lg:w-[400vw] will-change-transform"
      >
        {rooms.map((room, index) => (
          <div
            key={room.id}
            className="room-card flex flex-col lg:flex-row w-full lg:w-screen h-full items-center px-6 py-12 lg:px-[6vw]"
          >
            {/* Left Content Column */}
            <div className="w-full lg:w-[40vw] lg:pr-[5vw] flex flex-col justify-center mb-12 lg:mb-0">
              <div className="section-label text-[#6B7280] mb-6 lg:mb-8">
                ROOMS • 0{index + 1} / 0{rooms.length}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-headline text-[#11130E] mb-4">
                {room.name}
              </h2>

              <div className="font-sans text-lg lg:text-xl font-medium text-[#2F5D50] mb-6 lg:mb-8 uppercase tracking-widest">
                {room.price} <span className="text-xs text-[#11130E]/50 font-normal">/ Night</span>
              </div>

              <p className="font-sans text-base lg:text-body text-[#11130E]/75 mb-8 lg:mb-10 leading-relaxed max-w-md">
                {room.description}
              </p>

              <div className="grid grid-cols-2 gap-y-4 mb-8 lg:mb-10">
                {room.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-[#2F5D50]" strokeWidth={1.5} />
                    <span className="font-sans text-[10px] lg:text-xs text-[#11130E]/70 tracking-wide uppercase">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onScrollToBooking}
                  className="w-full sm:w-auto bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-xs tracking-widest px-10 py-6 uppercase transition-all hover:-translate-y-0.5"
                >
                  Reserve Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#11130E]/20 text-[#11130E] hover:bg-white hover:border-[#11130E] font-sans text-xs tracking-widest px-10 py-6 uppercase transition-all"
                >
                  Details
                </Button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="w-full lg:w-[48vw] h-[40vh] sm:h-[50vh] lg:h-[70vh] relative group overflow-hidden">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 z-10" />
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover transform scale-110 lg:translate-x-[-5%] lg:scale-110 group-hover:translate-x-0 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
              <div className="absolute bottom-6 right-6 z-20">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <Maximize2 className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Navigation Indicator - Only on Desktop */}
      <div className="hidden lg:flex absolute bottom-[8vh] left-[6vw] items-center gap-4">
        {rooms.map((_, index) => (
          <div
            key={index}
            className={`h-[2px] transition-all duration-500 ${activeRoom === index ? 'w-12 bg-[#2F5D50]' : 'w-4 bg-[#11130E]/10'
              }`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className={`absolute bottom-6 lg:bottom-[8vh] right-6 lg:right-[6vw] font-sans text-[10px] uppercase tracking-[0.2em] text-[#6B7280] transition-opacity duration-500 ${activeRoom > 0 ? 'opacity-0' : 'opacity-100'}`}>
        {activeRoom === 0 ? 'Scroll to discover suites' : ''}
      </div>
    </section>
  );
}
