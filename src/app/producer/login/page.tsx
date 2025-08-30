
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProducerLoginPage() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for login logic
    alert('(Placeholder) Logging in...');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for signup logic
    alert('(Placeholder) Creating account...');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#121212] p-4 text-white">
        <div className="absolute top-8 left-8">
            <Link href="/beats">
                <Button variant="outline"><ArrowRight className="mr-2 h-4 w-4" /> Back to Beats</Button>
            </Link>
        </div>
        <div className="text-center mb-8">
            <Music className="mx-auto h-16 w-16 text-primary" />
            <h1 className="text-4xl font-bold mt-4">Producer Portal</h1>
            <p className="text-gray-400">Log in or create an account to sell your beats.</p>
        </div>
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login"><LogIn className="mr-2 h-4 w-4"/>Login</TabsTrigger>
          <TabsTrigger value="signup"><UserPlus className="mr-2 h-4 w-4"/>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="you@example.com" required className="bg-gray-900 border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" required className="bg-gray-900 border-gray-600" />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Join our community of talented producers.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="signup-name">Producer Name</Label>
                  <Input id="signup-name" type="text" placeholder="e.g., Metro Boomin" required className="bg-gray-900 border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="you@example.com" required className="bg-gray-900 border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required className="bg-gray-900 border-gray-600" />
                </div>
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
