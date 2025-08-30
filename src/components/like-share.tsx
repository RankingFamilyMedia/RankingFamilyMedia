
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Twitter, Facebook, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface LikeShareProps {
  title: string;
}

export function LikeShare({ title }: LikeShareProps) {
  // Use a high random base to make it look popular
  const [likes, setLikes] = useState(() => Math.floor(Math.random() * (2500 - 800 + 1)) + 800);
  const [isLiked, setIsLiked] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    // Ensure this runs only on the client where window is available
    setPageUrl(window.location.href);
  }, []);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=Check%20out%20this%20link:%20${encodedUrl}`,
  };

  return (
    <div className="flex items-center gap-4 mt-6 border-y border-gray-700 py-4">
      <Button variant="ghost" onClick={handleLike} className="flex items-center gap-2">
        <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        <span className="font-semibold">{likes.toLocaleString()}</span>
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-gray-400" />
                <span className="font-semibold">Share</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-gray-800 border-gray-700">
          <div className="flex items-center gap-4">
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Facebook /></a>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Twitter /></a>
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Linkedin /></a>
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><MessageCircle /></a>
            <a href={shareLinks.email} className="text-gray-400 hover:text-white"><Mail /></a>
          </div>
        </PopoverContent>
      </Popover>

    </div>
  );
}
