import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Users, Home, Shield, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [roomType, setRoomType] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCheckAvailability = () => {
    if (checkIn && checkOut && guests && roomType) {
      setShowDialog(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative w-full bg-[#F6F7F6] py-24 lg:py-32"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Booking Card */}
        <div
          ref={cardRef}
          className="bg-white border border-[#11130E]/10 p-8 lg:p-12 will-change-transform"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="section-label text-[#6B7280] mb-4">RESERVE</div>
            <h2 className="font-serif text-headline-sm lg:text-headline text-[#11130E] mb-4">
              Book your stay
            </h2>
            <p className="font-sans text-body text-[#11130E]/70">
              Best rates when you book direct. Instant confirmation.
            </p>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Check-in */}
            <div className="space-y-2">
              <Label className="font-sans text-xs text-[#6B7280] uppercase tracking-wide">
                Check-in
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10 border-[#11130E]/15 focus:border-[#2F5D50] focus:ring-[#2F5D50]/20"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <Label className="font-sans text-xs text-[#6B7280] uppercase tracking-wide">
                Check-out
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10 border-[#11130E]/15 focus:border-[#2F5D50] focus:ring-[#2F5D50]/20"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label className="font-sans text-xs text-[#6B7280] uppercase tracking-wide">
                Guests
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="border-[#11130E]/15 focus:ring-[#2F5D50]/20">
                  <Users className="w-4 h-4 text-[#6B7280] mr-2" />
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <Label className="font-sans text-xs text-[#6B7280] uppercase tracking-wide">
                Room Type
              </Label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger className="border-[#11130E]/15 focus:ring-[#2F5D50]/20">
                  <Home className="w-4 h-4 text-[#6B7280] mr-2" />
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Room</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={handleCheckAvailability}
              className="bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-sm tracking-wide px-12 py-6 transition-all hover:-translate-y-0.5"
            >
              Check availability
            </Button>
          </div>

          {/* Trust Line */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-[#11130E]/5">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#2F5D50]" strokeWidth={1.5} />
              <span className="font-sans text-xs text-[#6B7280]">
                Free cancellation within 24 hours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2F5D50]" strokeWidth={1.5} />
              <span className="font-sans text-xs text-[#6B7280]">
                Secure checkout
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-white border border-[#11130E]/10">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#11130E]">
              Booking Request Received
            </DialogTitle>
            <DialogDescription className="font-sans text-[#11130E]/70">
              Thank you for choosing Bosanic Hotel. Our team will contact you shortly to confirm your reservation.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-[#F6F7F6] border border-[#11130E]/5">
            <div className="font-sans text-sm text-[#11130E]">
              <div className="flex justify-between mb-2">
                <span className="text-[#6B7280]">Check-in:</span>
                <span>{checkIn}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#6B7280]">Check-out:</span>
                <span>{checkOut}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#6B7280]">Guests:</span>
                <span>{guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Room Type:</span>
                <span className="capitalize">{roomType}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowDialog(false)}
            className="w-full bg-[#2F5D50] hover:bg-[#244a40] text-white mt-4"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
