"use client";

export function LandingVideo() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <iframe
        className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
        src="https://www.youtube.com/embed/BRjDORRsF1I?autoplay=1&mute=1&loop=1&playlist=BRjDORRsF1I&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
    </div>
  );
}
