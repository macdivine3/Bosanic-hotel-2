import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Dining', href: '#dining' },
  { label: 'Location', href: '#location' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F6F7F6]/95 backdrop-blur-sm border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-5">
        {/* Logo */}
        <a
          href="#"
          className="font-sans text-sm font-semibold tracking-[0.2em] text-[#11130E] hover:opacity-70 transition-opacity"
        >
          BOSANIC
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-sans text-xs font-medium tracking-wide text-[#11130E]/80 hover:text-[#11130E] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 text-[#11130E] hover:opacity-70 transition-opacity">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-[#F6F7F6] border-l border-black/10">
              <div className="flex flex-col h-full pt-12">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="font-serif text-2xl text-[#11130E] text-left hover:text-[#2F5D50] transition-colors"
                      >
                        {link.label}
                      </button>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto pb-8">
                  <Button
                    onClick={() => scrollToSection('#booking')}
                    className="w-full bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-sm tracking-wide py-6"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Book Button (Desktop) */}
          <Button
            onClick={() => scrollToSection('#booking')}
            className="hidden lg:inline-flex bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-xs tracking-wide px-6 py-5 transition-all hover:-translate-y-0.5"
          >
            Book
          </Button>
        </div>
      </div>
    </header>
  );
}
