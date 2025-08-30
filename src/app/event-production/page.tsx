
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Music, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    icon: <Music className="h-10 w-10 text-primary" />,
    title: 'Concert & Festival Production',
    description: 'End-to-end management for live music events, including staging, sound, lighting, and artist liaison.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Tour Management',
    description: 'Comprehensive logistics, scheduling, and on-the-ground support for local and national tours.',
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: 'Venue Booking & Logistics',
    description: 'Securing the perfect venue and managing all technical and logistical requirements for a seamless event.',
  },
];

export default function EventProductionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="concert stage lights"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Event Organising & Production</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              From intimate gigs to large-scale festivals, we create unforgettable live experiences.
            </p>
          </div>
        </section>
        
        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <Calendar className="mx-auto h-16 w-16 text-primary" />
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">Full-Scale Event Management</h2>
               <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">We handle every detail of your event, from initial concept to final encore, ensuring a seamless and spectacular show.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="border-gray-700 bg-gray-800 text-center">
                  <CardHeader className="items-center">
                    {service.icon}
                    <CardTitle className="mt-4 text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Let's Plan Your Next Event
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Have an idea for an event? Let's collaborate to make it a reality. Contact us for a consultation.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-8">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
