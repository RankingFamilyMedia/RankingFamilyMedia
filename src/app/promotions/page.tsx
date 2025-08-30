
'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Check, Star, ArrowRight } from 'lucide-react';

const promotionPackages = [
  {
    title: 'Starter Boost',
    price: 'GHS 500',
    features: [
      'Social media announcement',
      '1-week placement on our homepage',
      'Basic SEO for your track',
      'Artist profiling and indexing',
      '5 radio plays for 3 months',
      'Publish on 19 websites',
    ],
    isPopular: false,
  },
  {
    title: 'Artist Spotlight',
    price: 'GHS 1,200',
    features: [
      'Everything in Starter Boost',
      'Featured artist interview on our blog',
      'Email newsletter feature',
      'Targeted social media ads',
    ],
    isPopular: true,
  },
  {
    title: 'Label-Mate',
    price: 'GHS 2,500',
    features: [
      'Everything in Artist Spotlight',
      'Music video promotion',
      'Playlist pitching to curators',
      'Dedicated press release',
      'Managing social media handles',
    ],
    isPopular: false,
  },
];

export default function PromotionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1">
        <section
          className="relative h-[50vh] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://picsum.photos/1920/1080?blur=2')",
          }}
          data-ai-hint="stage lights crowd"
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold md:text-7xl">Promotion Packages</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 md:text-xl">
              Amplify your reach and get your music heard by a wider audience. Choose the package that fits your goals.
            </p>
          </div>
        </section>

        <section className="bg-[#121212] py-20 px-4 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {promotionPackages.map((pkg) => (
              <Card
                key={pkg.title}
                className={`flex flex-col border-gray-700 bg-gray-800 ${pkg.isPopular ? 'border-primary' : ''}`}
              >
                {pkg.isPopular && (
                  <div className="flex justify-center -mt-4">
                    <div className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                      <Star className="mr-2 h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="items-center text-center">
                  <CardTitle className="mt-4 text-3xl font-bold">
                    {pkg.title}
                  </CardTitle>
                   <CardDescription className="text-2xl font-semibold text-primary">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={pkg.isPopular ? 'default' : 'outline'} className="w-full">
                    Choose Package
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary/10 py-20 px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Have a custom need?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Let's build a custom promotional strategy tailored to your specific goals.
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
