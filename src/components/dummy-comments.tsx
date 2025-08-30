'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const dummyComments = [
  {
    name: 'Alex Johnson',
    handle: '@alexj',
    avatar: 'https://picsum.photos/40/40?random=10',
    comment: 'This is fire! 🔥 Can\'t stop listening. Ranking Family never disappoints.',
    time: '2h ago',
    hint: 'male portrait',
  },
  {
    name: 'Brenda K.',
    handle: '@brendak',
    avatar: 'https://picsum.photos/40/40?random=11',
    comment: 'Amazing production quality. The beat is insane. Well done!',
    time: '3h ago',
    hint: 'female portrait',
  },
  {
    name: 'Chris Lee',
    handle: '@chrislee',
    avatar: 'https://picsum.photos/40/40?random=12',
    comment: 'Shared this with all my friends. This deserves to go viral!',
    time: '5h ago',
    hint: 'male portrait',
  },
];

export function DummyComments() {
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        // Generate a high random number for comments on client side
        setCommentCount(Math.floor(Math.random() * (450 - 50 + 1)) + 50);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('(Placeholder) Thanks for your comment! Note: This is a demo and your comment has not been posted.');
        const form = e.target as HTMLFormElement;
        form.reset();
    };

    return (
        <Card className="mt-8 bg-gray-900/50 border-gray-700">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <MessageSquare className="mr-3 h-6 w-6" />
                     {commentCount.toLocaleString()} Comments
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-start">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/40/40?random=9" data-ai-hint="person icon" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Textarea 
                        placeholder="Add a comment... (This is a demo)"
                        className="bg-gray-800 border-gray-600"
                        name="comment"
                    />
                    <Button type="submit">Post</Button>
                </form>
                <div className="space-y-6">
                    {dummyComments.map((comment) => (
                        <div key={comment.handle} className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={comment.avatar} data-ai-hint={comment.hint} />
                                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                    <p className="font-bold text-white">{comment.name}</p>
                                    <p className="text-sm text-gray-400">{comment.handle}</p>
                                    <p className="text-xs text-gray-500">{comment.time}</p>
                                </div>
                                <p className="text-gray-300">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}