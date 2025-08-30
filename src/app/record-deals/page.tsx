
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Mic, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const dealFeatures = {
    'Artist Development': [
        'Personalized A&R guidance',
        'Vocal and performance coaching',
        'Branding and image consulting',
        'Professional photoshoots and EPK creation',
    ],
    'Music Production': [
        'Access to our state-of-the-art recording studios',
        'Collaboration with our in-house producers and songwriters',
        'High-quality mixing and mastering services',
        'Beat selection from our exclusive catalog',
    ],
    'Distribution & Promotion': [
        'Global digital distribution to all major platforms',
        'Targeted marketing and PR campaigns',
        'Playlist pitching and radio plugging',
        'Social media strategy and management',
    ],
};

export default function RecordDealsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[60vh] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="artist signing contract"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Record Deals & Artist Management</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              We're more than a label; we're a partnership. Discover how we empower artists to build lasting careers.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
            <div className="mx-auto max-w-5xl text-center">
                <Users className="mx-auto h-16 w-16 text-primary" />
                <h2 className="mt-6 text-3xl font-bold md:text-4xl">Our Philosophy: Artist First</h2>
                <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                    At Ranking Family Multimedia, we believe in nurturing talent from the ground up. Our approach to record deals and artist management is built on a foundation of transparency, collaboration, and a shared passion for creating timeless music. We provide our artists with the tools, resources, and dedicated team they need to not only succeed in the industry but to thrive creatively and financially.
                </p>
            </div>
        </section>

        <section className="py-20 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">What We Offer</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">Our comprehensive deals are designed to cover every aspect of an artist's career.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                     <Card className="border-gray-700 bg-gray-800">
                         <CardHeader>
                             <Mic className="h-10 w-10 text-primary mb-4" />
                             <CardTitle>Artist Development</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <ul className="space-y-3 text-gray-300">
                                 {dealFeatures['Artist Development'].map(feature => (
                                     <li key={feature} className="flex items-center gap-3">
                                         <CheckCircle className="h-5 w-5 text-primary" />
                                         <span>{feature}</span>
                                     </li>
                                 ))}
                             </ul>
                         </CardContent>
                     </Card>
                     <Card className="border-gray-700 bg-gray-800">
                         <CardHeader>
                             <TrendingUp className="h-10 w-10 text-primary mb-4" />
                             <CardTitle>Distribution & Promotion</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <ul className="space-y-3 text-gray-300">
                                 {dealFeatures['Distribution & Promotion'].map(feature => (
                                     <li key={feature} className="flex items-center gap-3">
                                         <CheckCircle className="h-5 w-5 text-primary" />
                                         <span>{feature}</span>
                                     </li>
                                 ))}
                             </ul>
                         </CardContent>
                     </Card>
                     <Card className="border-gray-700 bg-gray-800">
                         <CardHeader>
                             <Users className="h-10 w-10 text-primary mb-4" />
                             <CardTitle>Music Production</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <ul className="space-y-3 text-gray-300">
                                 {dealFeatures['Music Production'].map(feature => (
                                     <li key={feature} className="flex items-center gap-3">
                                         <CheckCircle className="h-5 w-5 text-primary" />
                                         <span>{feature}</span>
                                     </li>
                                 ))}
                             </ul>
                         </CardContent>
                     </Card>
                </div>
            </div>
        </section>

        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Think you have what it takes?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            We are always searching for the next generation of talent. If you're a dedicated artist with a unique sound, we want to hear from you.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-8">
              Submit Your Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
