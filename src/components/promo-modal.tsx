
'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ShoppingCart, Handshake, Mail } from 'lucide-react';
import Link from 'next/link';

const popups = [
  {
    icon: <Mail className="h-10 w-10 text-primary" />,
    title: 'Subscribe to Our Newsletter',
    description: 'Get the latest news, updates, and special offers delivered directly to your inbox.',
    content: (
      <form action="#" method="POST">
        <div className="flex w-full items-center space-x-2 pt-4">
            <Input name="email" type="email" placeholder="Email" className="bg-gray-900 border-gray-600" required />
            <Button type="submit">Subscribe</Button>
        </div>
      </form>
    ),
    ctaText: 'Subscribe',
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    title: 'Looking for a Beat?',
    description: 'Explore our curated marketplace of high-quality beats from talented producers.',
    content: null,
    ctaText: 'Explore Beats',
    ctaLink: '/beats',
  },
  {
    icon: <Handshake className="h-10 w-10 text-primary" />,
    title: 'Sell Your Music With Us',
    description: 'Join our family of producers. Get your music in front of thousands of artists.',
    content: null,
    ctaText: 'Become a Producer',
    ctaLink: 'https://grinomuzik.com',
  },
];

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState(popups[0]);

  useEffect(() => {
    const hasSeenModalThisSession = sessionStorage.getItem('promoModalSeen');
    if (hasSeenModalThisSession) {
      return;
    }

    const lastPopupIndexStr = localStorage.getItem('lastPromoPopupIndex');
    const lastPopupIndex = lastPopupIndexStr ? parseInt(lastPopupIndexStr, 10) : -1;
    
    const nextPopupIndex = (lastPopupIndex + 1) % popups.length;
    
    const timer = setTimeout(() => {
      setSelectedPopup(popups[nextPopupIndex]);
      setIsOpen(true);
      sessionStorage.setItem('promoModalSeen', 'true');
      localStorage.setItem('lastPromoPopupIndex', nextPopupIndex.toString());
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">{selectedPopup.icon}</div>
          <DialogTitle className="text-center text-2xl">{selectedPopup.title}</DialogTitle>
          <DialogDescription className="text-center pt-2">
            {selectedPopup.description}
          </DialogDescription>
        </DialogHeader>
        {selectedPopup.content}
        {selectedPopup.ctaLink && (
            <DialogFooter className="pt-4">
                <Link href={selectedPopup.ctaLink} className="w-full" target={selectedPopup.ctaLink.startsWith('http') ? '_blank' : '_self'}>
                    <Button type="button" className="w-full" onClick={handleClose}>{selectedPopup.ctaText}</Button>
                </Link>
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
