import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bed, Wifi, Sparkles, MapPin, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    id: 'standard',
    title: 'Standard Suite',
    price: '₦120,000',
    description: 'A perfect balance of comfort and function. Designed for the modern traveler who values simplicity and rest.',
    features: ['King sized bed', 'Work desk + Wi-Fi', 'Garden view'],
    image: '/rooms/standard.png'
  },
  {
    id: 'deluxe',
    title: 'Deluxe Suite',
    price: '₦180,000',
    description: 'More space to breathe. Featuring a dedicated seating area and premium amenities for a refined experience.',
    features: ['King & twin options', 'Lounge area', 'Premium bath'],
    image: '/rooms/deluxe.png'
  },
  {
    id: 'executive',
    title: 'Executive Suite',
    price: '₦250,000',
    description: 'Elevated luxury with a stunning view of Benin City. Perfect for longer stays and business leadership.',
    features: ['Panoramic balcony', 'Smart office setup', 'Express check-in'],
    image: '/rooms/executive.png'
  },
  {
    id: 'presidential',
    title: 'Presidential Suite',
    price: '₦450,000',
    description: 'The pinnacle of Bosanic. Unparalleled space, privacy, and curated design for the most discerning guests.',
    features: ['Master living wing', 'Kitchenette', 'Dedicated concierge'],
    image: '/rooms/presidential.png'
  }
];

export default function RoomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [activeRoom, setActiveRoom] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Main horizontal animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${rooms.length * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * rooms.length),
              rooms.length - 1
            );
            setActiveRoom(index);
          },
        },
      });

      scrollTl.to(horizontalRef.current, {
        xPercent: -100 * (rooms.length - 1),
        ease: 'none',
      });
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
      id="rooms"
      className="relative w-full h-screen bg-[#F6F7F6] overflow-hidden"
    >
      <div className="flex h-full w-full">
        {/* Left: Fixed Info Panel */}
        <div className="relative z-10 w-[45vw] h-full bg-[#F6F7F6] border-r border-[#11130E]/10 flex flex-col justify-between p-[6vw] lg:py-[10vh]">
          <div>
            <div className="section-label text-[#6B7280] mb-8">
              ROOMS & SUITES
            </div>
            
            <div className="overflow-hidden">
              <div 
                className="transition-all duration-500 ease-out"
                style={{ transform: `translateY(-${activeRoom * 0}%)` }} // Reset sync logic below
              >
                <div key={rooms[activeRoom].id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="font-serif text-headline-sm lg:text-headline text-[#11130E] mb-6 min-h-[1.2em]">
                    {rooms[activeRoom].title}
                  </h2>
                  <div className="font-sans text-xl text-[#2F5D50] mb-8 font-medium">
                    {rooms[activeRoom].price} <span className="text-sm font-normal text-[#6B7280]">/ night</span>
                  </div>
                  <p className="font-sans text-body text-[#11130E]/75 mb-10 leading-relaxed max-w-sm">
                    {rooms[activeRoom].description}
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-12">
                    {rooms[activeRoom].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#2F5D50] rounded-full" />
                        <span className="font-sans text-sm text-[#11130E]/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 text-[#6B7280]">
              <div className="font-sans text-xs tracking-widest font-bold">
                {String(activeRoom + 1).padStart(2, '0')}
              </div>
              <div className="w-12 h-px bg-[#11130E]/10" />
              <div className="font-sans text-xs tracking-widest text-[#11130E]/20">
                {String(rooms.length).padStart(2, '0')}
              </div>
            </div>

            <Button
              onClick={scrollToBooking}
              className="w-fit bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-sm tracking-wide px-8 py-6 transition-all hover:translate-x-1"
            >
              Check Availability
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Right: Horizontal Scrolling Images */}
        <div className="relative w-[55vw] h-full overflow-hidden bg-[#11130E]">
          <div 
            ref={horizontalRef}
            className="flex h-full will-change-transform"
            style={{ width: `${rooms.length * 100}%` }}
          >
            {rooms.map((room) => (
              <div key={room.id} className="relative w-[55vw] h-full flex-shrink-0">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#11130E]/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
