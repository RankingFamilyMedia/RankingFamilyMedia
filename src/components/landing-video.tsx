
'use client';

export function LandingVideo() {
    // ID for "Free To Use Background Video" from YouTube
    const videoId = "uXl_N_35H8E"; 

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <iframe
                className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Background Video"
            ></iframe>
        </div>
    );
}
