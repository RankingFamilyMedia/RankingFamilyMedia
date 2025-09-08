
'use client';

import { useState, useEffect, useRef } from 'react';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Edit, WifiOff, Play, Pause, ListMusic, Upload, Loader2, Search, CheckCircle, XCircle, FileCheck, FileWarning } from 'lucide-react';
import Image from 'next/image';
import { analyzeSeo, SeoAnalysis } from '@/ai/flows/seo-flow';
import Papa from 'papaparse';

interface Beat {
  id: number;
  title: string;
  producer: string;
  genre: string;
  bpm: string;
  price: string;
  imageUrl: string;
  audioUrl: string;
}

function ExistingBeats() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<number | null>(null);
  const [loadingTrack, setLoadingTrack] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchBeats() {
      setIsLoading(true);
      try {
        const response = await fetch('https://legacy.rankingfamily.com/wp-json/wp/v2/riddim-instrumentals?_embed');
        if (!response.ok) {
          throw new Error('Failed to fetch beats from the API.');
        }
        const data = await response.json();
        const formattedBeats = data.map((item: any) => ({
          id: item.id,
          title: item.title.rendered,
          producer: item.meta?.producer || 'N/A',
          genre: item.meta?.genre || 'N/A',
          bpm: item.meta?.bpm || 'N/A',
          price: item.meta?.price || '0',
          imageUrl: item.featured_image_url || 'https://picsum.photos/200',
          audioUrl: item.meta?.audio_url || '',
        }));
        setBeats(formattedBeats);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBeats();
  }, []);

  const handlePlayPause = (beatId: number, audioUrl: string) => {
    if (nowPlaying === beatId) {
      audioRef.current?.pause();
      setNowPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setLoadingTrack(beatId);
      const newAudio = new Audio(audioUrl);
      
      newAudio.oncanplay = () => {
        newAudio.play();
        setLoadingTrack(null);
        setNowPlaying(beatId);
      };

      newAudio.onerror = () => {
        setLoadingTrack(null);
        // Optionally show an error to the user
        console.error("Error loading audio");
      };

      newAudio.onended = () => {
        setNowPlaying(null);
      };

      audioRef.current = newAudio;
    }
  };
  
  const handleDelete = (beatId: number) => {
    // Note: This is a placeholder. A real implementation would call an API endpoint.
    alert(`(Placeholder) Deleting beat with ID: ${beatId}`);
    setBeats(beats.filter(beat => beat.id !== beatId));
  };

  if (isLoading) {
    return <p>Loading existing beats...</p>;
  }

  if (error) {
    return (
      <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <div className="flex items-center gap-2 text-destructive">
          <WifiOff className="h-5 w-5" />
          <h3 className="font-bold">Error Loading Beats</h3>
        </div>
        <p className="mt-1 text-destructive/80">{error}</p>
      </div>
    );
  }

  if (beats.length === 0) {
    return <p>No existing beats found.</p>;
  }

  return (
    <div className="space-y-4">
      {beats.map(beat => (
        <Card key={beat.id} className="bg-gray-800 border-gray-700 flex items-center p-3">
          <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
            <Image src={beat.imageUrl} alt={beat.title} fill className="object-cover" />
          </div>
          {beat.audioUrl && (
            <Button variant="ghost" size="icon" className="ml-3" onClick={() => handlePlayPause(beat.id, beat.audioUrl)} disabled={loadingTrack === beat.id}>
              {loadingTrack === beat.id ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : nowPlaying === beat.id ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          )}
          <div className="flex-grow ml-4">
            <h4 className="font-semibold">{beat.title}</h4>
            <p className="text-sm text-gray-400">{beat.producer} &bull; {beat.genre} &bull; {beat.bpm} BPM</p>
          </div>
          <div className="text-lg font-bold text-primary mr-4">GHS {beat.price}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
            <Button variant="destructive" size="icon" onClick={() => handleDelete(beat.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function SubscribersManager() {
  const [subscribersFile, setSubscribersFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus(null);
    if (e.target.files && e.target.files.length > 0) {
      setSubscribersFile(e.target.files[0]);
    } else {
      setSubscribersFile(null);
    }
  };

  const handleImport = () => {
    if (!subscribersFile) {
      setImportStatus({ type: 'error', message: 'Please select a file to import.' });
      return;
    }

    setIsImporting(true);
    setImportStatus(null);

    Papa.parse(subscribersFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setImportStatus({ type: 'error', message: `Error parsing CSV: ${results.errors[0].message}` });
          setIsImporting(false);
          return;
        }

        if (!results.meta.fields?.includes('email')) {
          setImportStatus({ type: 'error', message: "CSV must contain an 'email' column." });
          setIsImporting(false);
          return;
        }

        const emails = results.data
          .map((row: any) => row.email)
          .filter(email => typeof email === 'string' && email.includes('@'));

        if (emails.length === 0) {
          setImportStatus({ type: 'error', message: 'No valid email addresses found in the file.' });
          setIsImporting(false);
          return;
        }

        // Placeholder for backend API call
        console.log('Imported emails:', emails);

        setImportStatus({ type: 'success', message: `Successfully imported ${emails.length} subscribers.` });
        setIsImporting(false);
        setSubscribersFile(null);
        (document.getElementById('subscribers-csv') as HTMLInputElement).value = '';
      },
      error: (error) => {
        setImportStatus({ type: 'error', message: `An error occurred: ${error.message}` });
        setIsImporting(false);
      }
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700 mt-6">
      <CardHeader>
        <CardTitle>Import Subscribers</CardTitle>
        <CardDescription>
          Upload a CSV file containing email addresses to add new subscribers. The CSV should have a single column with the header 'email'.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="subscribers-csv">Subscribers CSV File</Label>
          <Input 
            id="subscribers-csv" 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange} 
            className="bg-gray-900 border-gray-600"
            disabled={isImporting}
          />
          <p className="text-sm text-muted-foreground">Upload a CSV file with an 'email' column.</p>
        </div>
        <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={handleImport} disabled={!subscribersFile || isImporting}>
          {isImporting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Upload className="mr-2 h-5 w-5" />}
          {isImporting ? 'Importing...' : 'Import Subscribers'}
        </Button>
        {importStatus && (
          <div className={`flex items-center gap-3 rounded-md p-3 text-sm ${importStatus.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-destructive/20 text-destructive'}`}>
            {importStatus.type === 'success' ? <FileCheck className="h-5 w-5" /> : <FileWarning className="h-5 w-5" />}
            <p>{importStatus.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


function SeoAnalysisResult({ result }: { result: SeoAnalysis }) {
    const scoreColor = result.score >= 80 ? 'text-green-400' : result.score >= 50 ? 'text-yellow-400' : 'text-red-400';
    return (
        <Card className="bg-gray-900/50 border-gray-700 mt-6">
            <CardHeader>
                <CardTitle>SEO Analysis Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>Overall Score</Label>
                    <p className={`text-3xl font-bold ${scoreColor}`}>{result.score} / 100</p>
                </div>
                <div>
                    <Label>What's Good</Label>
                    <div className="flex items-start gap-2 text-green-400">
                        <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                        <p>{result.good}</p>
                    </div>
                </div>
                <div>
                    <Label>What to Improve</Label>
                     <div className="flex items-start gap-2 text-yellow-400">
                        <XCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                        <p>{result.improvements}</p>
                    </div>
                </div>
                 <div>
                    <Label>Suggested Title</Label>
                    <p className="text-gray-300 italic">"{result.suggestion}"</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function AdminPage() {
  const [beatTitle, setBeatTitle] = useState('');
  const [seoKeyword, setSeoKeyword] = useState('');
  const [genre, setGenre] = useState('');
  const [bpm, setBpm] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<File | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysis | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);


  const handleAnalyzeSeo = async () => {
    if (!beatTitle || !seoKeyword) {
      setAnalysisError("Please enter a Beat Title and an SEO Keyword to analyze.");
      return;
    }
    setAnalysisError(null);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeSeo({ content: beatTitle, keyword: seoKeyword });
      setAnalysisResult(result);
    } catch (error) {
      console.error("SEO Analysis failed:", error);
      setAnalysisError("An error occurred during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, e.g., upload files and send data to an API
    console.log({ beatTitle, genre, bpm, price, coverImage, audioPreview });
    alert('(Placeholder) Adding beat...');
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <main className="flex-1 pt-24">
        <section className="px-4 py-12 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            
            <Tabs defaultValue="manage-beats" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manage-beats">Manage Beats</TabsTrigger>
                <TabsTrigger value="manage-subscribers">Manage Subscribers</TabsTrigger>
              </TabsList>
              <TabsContent value="manage-beats">
                <Card className="bg-gray-800 border-gray-700 mt-6">
                  <CardHeader>
                    <CardTitle>Add New Beat</CardTitle>
                    <CardDescription>Fill in the details below to add a new beat to the marketplace.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="beat-title">Beat Title</Label>
                        <Input id="beat-title" placeholder="e.g., Summer Vibes" value={beatTitle} onChange={e => setBeatTitle(e.target.value)} className="bg-gray-900 border-gray-600" />
                      </div>
                       <div className="space-y-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                         <h3 className="text-lg font-semibold text-primary">AI-Powered SEO Analysis</h3>
                         <div className="space-y-2">
                           <Label htmlFor="seo-keyword">Focus SEO Keyword</Label>
                           <Input id="seo-keyword" placeholder="e.g., Afrobeats instrumental" value={seoKeyword} onChange={e => setSeoKeyword(e.target.value)} className="bg-gray-900 border-gray-600" />
                         </div>
                         <Button type="button" variant="outline" onClick={handleAnalyzeSeo} disabled={isAnalyzing}>
                           {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                           {isAnalyzing ? 'Analyzing...' : 'Analyze SEO'}
                         </Button>
                         {analysisError && <p className="text-sm text-destructive">{analysisError}</p>}
                         {analysisResult && <SeoAnalysisResult result={analysisResult} />}
                       </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                           <Label htmlFor="genre">Genre</Label>
                           <Input id="genre" placeholder="e.g., Afrobeats" value={genre} onChange={e => setGenre(e.target.value)} className="bg-gray-900 border-gray-600" />
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor="bpm">BPM</Label>
                           <Input id="bpm" type="number" placeholder="120" value={bpm} onChange={e => setBpm(e.target.value)} className="bg-gray-900 border-gray-600" />
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor="price">Price (GHS)</Label>
                           <Input id="price" type="number" placeholder="0" value={price} onChange={e => setPrice(e.target.value)} className="bg-gray-900 border-gray-600" />
                        </div>
                      </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <Label htmlFor="cover-image">Cover Image</Label>                           <Input id="cover-image" type="file" accept="image/jpeg, image/png" onChange={e => setCoverImage(e.target.files ? e.target.files[0] : null)} className="bg-gray-900 border-gray-600" />
                           <p className="text-sm text-muted-foreground">Artwork for the beat (JPG, PNG).</p>
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor="audio-preview">Audio Preview</Label>
                           <Input id="audio-preview" type="file" accept="audio/mpeg" onChange={e => setAudioPreview(e.target.files ? e.target.files[0] : null)} className="bg-gray-900 border-gray-600" />
                            <p className="text-sm text-muted-foreground">Tagged MP3 preview file.</p>
                        </div>
                      </div>
                      <Button type="submit" size="lg" className="w-full">Add Beat</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 mt-8">
                   <CardHeader>
                    <CardTitle>Existing Beats</CardTitle>
                    <CardDescription>View, edit, or delete existing beat listings.</CardDescription>
                  </CardHeader>
                   <CardContent>
                     <ExistingBeats />
                   </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manage-subscribers">
                 <SubscribersManager />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
