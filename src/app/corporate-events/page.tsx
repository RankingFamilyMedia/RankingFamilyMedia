
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Award, Users, Mic, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const eventServices = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Gala Dinners & Award Shows',
    description: 'Elegant production for your most prestigious nights, including stage design, lighting, and live entertainment coordination.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Conferences & Seminars',
    description: 'Complete A/V solutions, including multi-screen setups, live streaming, and crystal-clear sound systems for keynote speakers.',
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: 'Product Launches & Private Parties',
    description: 'Create a buzz with our bespoke event services, including themed decor, DJ services, and professional event staffing.',
  },
];

export default function CorporateEventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="corporate event gala"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Corporate & Private Events</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Professional A/V and entertainment solutions to make your corporate gala, conference, or private party unforgettable.
            </p>
          </div>
        </section>
        
        <section className="py-20 px-4 md:px-8">
            <div className="mx-auto max-w-5xl text-center">
                <Building className="mx-auto h-16 w-16 text-primary" />
                <h2 className="mt-6 text-3xl font-bold md:text-4xl">Excellence in Execution</h2>
                <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                    We bring the same passion and precision from our concert productions to the corporate and private event space. Our team ensures flawless execution, from crystal-clear audio for keynote speakers to dynamic lighting and entertainment that aligns with your brand and vision. We handle the technical details so you can focus on your guests and your message.
                </p>
            </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Our Event Capabilities</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                We offer a comprehensive suite of services to cover any event's needs.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {eventServices.map((service) => (
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
            Planning Your Next Event?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Let us handle the technical and entertainment aspects of your next function. Contact us for a consultation and quote.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-8">
              Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
