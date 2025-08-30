
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Music, Briefcase, Target, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
    {
        name: 'Capt Perrygrino Nelson Rtd',
        role: 'CEO',
        imageUrl: 'https://picsum.photos/400/400?random=1',
        hint: 'male portrait',
    },
    {
        name: 'Hafiz Mula',
        role: 'Project Manager',
        imageUrl: 'https://picsum.photos/400/400?random=2',
        hint: 'male portrait',
    },
    {
        name: 'Nii adjei',
        role: 'Director',
        imageUrl: 'https://picsum.photos/400/400?random=3',
        hint: 'male portrait',
    }
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[50vh] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="team working music"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">About Us</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              We are the driving force behind the sound of tomorrow. Discover our story, our mission, and the team that makes it all happen.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
            <div className="mx-auto max-w-5xl text-center">
                <Music className="mx-auto h-16 w-16 text-primary" />
                <h2 className="mt-6 text-3xl font-bold md:text-4xl">Our Story</h2>
                <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                    Founded in 1999, Ranking Family Multimedia began with a simple mission: to provide a platform for undiscovered talent and to create high-quality music that resonates with audiences worldwide. From a small studio in Accra, we have grown into a multi-faceted entertainment company, but our core values remain the same. We believe in the power of music to connect people, to tell stories, and to inspire change. We are more than just a label; we are a family of artists, producers, and creators dedicated to pushing the boundaries of sound and culture.
                </p>
                <div className="mt-8">
                    <Link href="#">
                        <Button variant="outline">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

        <section className="py-20 px-4 md:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                     <Target className="h-12 w-12 text-primary" />
                     <h2 className="mt-6 text-3xl font-bold md:text-4xl">Our Mission</h2>
                     <p className="mt-4 text-lg text-gray-300">
                        Our mission is to empower artists and creators by providing them with the resources, support, and platform they need to succeed. We strive to be a catalyst for innovation in the music industry, fostering a collaborative environment where creativity can flourish.
                     </p>
                </div>
                 <div className="flex flex-col justify-center">
                     <Briefcase className="h-12 w-12 text-primary" />
                     <h2 className="mt-6 text-3xl font-bold md:text-4xl">Our Vision</h2>
                     <p className="mt-4 text-lg text-gray-300">
                        Our vision is to be a leading global entertainment company known for its diverse roster of talent, its commitment to quality, and its positive impact on the world. We aim to build a legacy of timeless music and unforgettable experiences.
                     </p>
                </div>
            </div>
        </section>
        
        <section className="bg-[#121212] py-20 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <Users className="mx-auto h-16 w-16 text-primary" />
                    <h2 className="mt-6 text-3xl font-bold md:text-4xl">Meet the Team</h2>
                    <p className="mt-4 text-lg text-gray-300">The passionate individuals behind the music.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member) => (
                        <Card key={member.name} className="border-gray-700 bg-gray-800 text-center">
                            <CardContent className="p-6">
                                <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden">
                                     <Image 
                                        src={member.imageUrl}
                                        alt={member.name}
                                        fill
                                        style={{objectFit: 'cover'}}
                                        data-ai-hint={member.hint}
                                     />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold">{member.name}</h3>
                                <p className="text-primary">{member.role}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Want to join the family?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            We're always looking for new talent. If you think you have what it takes, get in touch.
          </p>
          <Button size="lg" className="mt-8">
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
