'use client';

export function LandingVideo() {
  const videoId = "BRjDORRsF1I";

  return (
    <div className="video-background">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Background Video"
      ></iframe>
    </div>
  );
}
