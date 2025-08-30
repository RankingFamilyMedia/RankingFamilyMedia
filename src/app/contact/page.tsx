
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for form submission logic
        alert(`(Placeholder) Form submitted! Thank you, ${name}.`);
        console.log({ name, email, subject, message });
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[50vh] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="person on phone"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Contact Us</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Have a question, a project proposal, or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Get In Touch</h2>
              <p className="mt-4 text-gray-400">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe" className="bg-gray-800 border-gray-700" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="bg-gray-800 border-gray-700" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} required placeholder="e.g., Project Proposal" className="bg-gray-800 border-gray-700" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required placeholder="Your message..." rows={6} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 border-gray-700" />
                 </div>
                 <div>
                    <Button type="submit" size="lg" className="w-full">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                    </Button>
                 </div>
              </form>
            </div>
            <div className="space-y-8">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle>Our Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-gray-300">
                        <div className="flex items-center gap-4">
                            <Mail className="h-6 w-6 text-primary" />
                            <span>admin@rankingfamily.com</span>
                        </div>
                         <div className="flex items-center gap-4">
                            <Phone className="h-6 w-6 text-primary" />
                            <span>+233277632966</span>
                        </div>
                         <div className="flex items-center gap-4">
                            <MapPin className="h-6 w-6 text-primary" />
                            <span>2nd Ponpon streets,dansoman,accra</span>
                        </div>
                    </CardContent>
                </Card>
                <div className="h-80 w-full rounded-lg overflow-hidden border-2 border-gray-700">
                     <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.972793132244!2d-0.2642553852339366!3d5.570187895959955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a7c4f4d4a3b%3A0x809a744a42839a82!2sPonpon%20St%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1700000000001"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
