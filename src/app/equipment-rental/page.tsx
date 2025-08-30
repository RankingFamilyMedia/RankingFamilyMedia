
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Mic, Film, Speaker, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const rentalCategories = [
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Cameras & Lenses',
    description: 'A range of professional cinema cameras, DSLRs, and lenses to capture the perfect shot.',
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: 'Audio Equipment',
    description: 'High-quality microphones, field recorders, boom poles, and wireless lavalier systems.',
  },
  {
    icon: <Film className="h-10 w-10 text-primary" />,
    title: 'Lighting & Grip',
    description: 'Complete lighting kits, C-stands, flags, and diffusion to shape the light for any scene.',
  },
  {
    icon: <Speaker className="h-10 w-10 text-primary" />,
    title: 'Live Sound Gear',
    description: 'PA systems, mixing consoles, stage monitors, and microphones for live events.',
  },
];

export default function EquipmentRentalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="camera equipment case"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Media Equipment Rentals</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Access professional-grade equipment for your film shoot, live event, or recording session without the upfront cost.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Our Rental Inventory</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                We provide well-maintained, industry-standard equipment to ensure your production runs smoothly.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {rentalCategories.map((category) => (
                <Card key={category.title} className="border-gray-700 bg-gray-800 text-center">
                  <CardHeader className="items-center">
                    {category.icon}
                    <CardTitle className="mt-4 text-2xl h-16">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Need equipment for your next project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Contact us with your equipment list and production dates for a competitive rental quote.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-8">
              Request a Rental Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
