'use client';

import React from 'react';
import type { Post } from '@/types';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Newspaper, Share2, Calendar } from 'lucide-react';
import { SidebarWidgets } from '@/components/sidebar-widgets';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface PostPageClientProps {
  postResult: { success: true; data: Post } | { success: false; message: string };
}

export function PostPageClient({ postResult }: PostPageClientProps) {
  const { toast } = useToast();

  const handleShare = async () => {
      if (!postResult.success) return;
      const post = postResult.data;
      const shareUrl = window.location.href;
      if (navigator.share) {
          try {
              await navigator.share({
                  title: post.title,
                  text: post.excerpt,
                  url: shareUrl,
              });
              toast({ title: 'Shared!', description: `"${post.title}" was shared.` });
          } catch (error) {
              toast({ variant: 'destructive', title: 'Could not share', description: 'There was an error trying to share this article.' });
          }
      } else {
           navigator.clipboard.writeText(shareUrl);
           toast({ title: 'Link Copied!', description: 'Article link copied to clipboard.' });
      }
  };

  if (!postResult.success) {
    return (
        <div className="container mx-auto px-4 py-12">
            <Alert variant="destructive" className="max-w-xl mx-auto">
                <Newspaper className="h-4 w-4" />
                <AlertTitle>Error Loading Post</AlertTitle>
                <AlertDescription>{postResult.message}</AlertDescription>
            </Alert>
        </div>
    );
  }

  const post = postResult.data;

  return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
          <main className="flex-1">
              <div className="container mx-auto px-4 py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2">
                          <article>
                              <header className="mb-8">
                                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                      <div className="flex items-center gap-2">
                                          <Calendar className="h-4 w-4" />
                                          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                      </div>
                                      <Button variant="ghost" size="sm" onClick={handleShare}>
                                          <Share2 className="mr-2 h-4 w-4" /> Share
                                      </Button>
                                  </div>
                                  {post.imageUrl && (
                                   <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden shadow-lg">
                                      <Image
                                          src={post.imageUrl}
                                          alt={post.title}
                                          fill
                                          className="object-cover"
                                          priority
                                      />
                                  </div>
                                  )}
                              </header>
                              <div 
                                  className="prose prose-lg dark:prose-invert max-w-none mb-8" 
                                  dangerouslySetInnerHTML={{ __html: post.content }} 
                              />
                              <Separator className="my-8" />
                              {post.tags && (
                                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                                      <h3 className="text-lg font-semibold mr-2">Tags:</h3>
                                      {post.tags.split(',').map(tag => (
                                          <Badge key={tag.trim()} variant="secondary">{tag.trim()}</Badge>
                                      ))}
                                  </div>
                              )}
                          </article>
                      </div>
                      <aside className="lg:col-span-1 space-y-8">
                          <SidebarWidgets />
                      </aside>
                  </div>
              </div>
          </main>
      </div>
  );
}
