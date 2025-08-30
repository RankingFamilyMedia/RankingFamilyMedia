
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Album,
  Users,
  Calendar,
  Waves,
  Film,
  Podcast,
  ArrowRight,
  Upload,
  Radio,
  Mic,
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Album className="h-12 w-12 text-primary" />,
    title: 'Record Label',
    description:
      'Comprehensive artist development, music production, global distribution, and strategic marketing campaigns to launch and sustain careers.',
    link: '/about',
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: 'Artist Management',
    description:
      'Dedicated career guidance, booking, and promotional support for emerging and established artists. We handle the business so you can focus on the music.',
    link: '/contact',
  },
  {
    icon: <Calendar className="h-12 w-12 text-primary" />,
    title: 'Event Organising & Production',
    description:
      'Full-scale production for concerts, festivals, and corporate events. We manage everything from staging and sound to logistics and promotion.',
    link: '/contact',
  },
  {
    icon: <Waves className="h-12 w-12 text-primary" />,
    title: 'Recording Studio',
    description:
      'State-of-the-art recording facilities with professional engineers for tracking, mixing, and mastering your next hit. Base rate: GHS 500 per 4 hours.',
    isStudio: true,
  },
  {
    icon: <Film className="h-12 w-12 text-primary" />,
    title: 'Movies & Film Production',
    description:
      'High-quality music video production, from concept development and storyboarding to final cut. We also provide scoring and soundtrack services for film.',
    link: '/videos',
  },
  {
    icon: <Podcast className="h-12 w-12 text-primary" />,
    title: 'Podcast Production',
    description:
      'Professional audio and video podcast recording and production services. We help you create engaging content with pristine sound and visuals.',
    link: '/contact',
  },
  {
    icon: <Upload className="h-12 w-12 text-primary" />,
    title: 'Music Distribution',
    description: 'Get your music on all major platforms worldwide, including Spotify, Apple Music, and more.',
    link: '/music'
  },
  {
    icon: <Radio className="h-12 w-12 text-primary" />,
    title: 'Media Promotions',
    description: 'Strategic media campaigns to get your music, brand, or event heard by a wider audience through radio, online press, and social media.',
    link: '/promotions'
  },
   {
    icon: <Mic className="h-12 w-12 text-primary" />,
    title: 'Corporate & Private Events',
    description: 'Professional A/V and entertainment solutions for any function, from corporate galas to private parties. Let us make your event unforgettable.',
    link: '/contact'
  }
];


function StudioBookingForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('(Placeholder) Booking request submitted! We will contact you shortly to confirm.');
        // Here you would typically handle the form submission, e.g., send an email or API request.
        // You might want to close the dialog after submission.
    };

    return (
        <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
                <DialogTitle>Book a Studio Session</DialogTitle>
                <DialogDescription>
                    Fill out the form below to request a booking. Our team will contact you to confirm the details.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" required className="col-span-3 bg-gray-900 border-gray-600" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input id="email" type="email" required className="col-span-3 bg-gray-900 border-gray-600" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Phone
                    </Label>
                    <Input id="phone" type="tel" required className="col-span-3 bg-gray-900 border-gray-600" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="request" className="text-right">
                        Request
                    </Label>
                    <textarea 
                        id="request" 
                        required 
                        placeholder="Please describe your needs (e.g., 4-hour vocal session, full day production, mixing & mastering for 1 track, etc.)"
                        rows={4}
                        className="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-900 border-gray-600" 
                    />
                </div>
                <p className="text-center text-sm text-muted-foreground pt-2">
                    Studio Rate: GHS 500 per 4 hours. We'll provide a full quote based on your request.
                </p>
            
                <DialogFooter>
                    <Button type="submit">Submit Booking Request</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}

export default function ServicesPage() {
  return (
    <Dialog>
      <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
        <main className="flex-1">
          <section
            className="relative h-[50vh] w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://picsum.photos/1920/1080?blur=2')",
            }}
            data-ai-hint="sound mixing board"
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <h1 className="text-5xl font-bold md:text-7xl">Our Services</h1>
              <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
                From artist development to large-scale event production, we
                provide comprehensive solutions for the entertainment industry.
              </p>
            </div>
          </section>

          <section className="bg-[#121212] py-20 px-4 md:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card
                  key={service.title}
                  className="flex flex-col border-gray-700 bg-gray-800 text-center"
                >
                  <CardHeader className="items-center">
                    {service.icon}
                    <CardTitle className="mt-4 text-2xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-400">{service.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    {service.isStudio ? (
                       <DialogTrigger asChild>
                         <Button variant="default" className="w-full">
                            Book Now
                         </Button>
                       </DialogTrigger>
                    ) : (
                       <Link href={service.link || '/contact'}>
                        <Button variant="outline" className="w-full">
                            Learn More
                        </Button>
                       </Link>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-primary/10 py-20 px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to start your project?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Let's build the future of music together. Contact us for a
              consultation.
            </p>
            <Link href="/contact">
              <Button size="lg" className="mt-8">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </section>
        </main>
        <Footer />
        <StudioBookingForm />
      </div>
    </Dialog>
  );
}
