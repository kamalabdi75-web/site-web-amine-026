"use client";

interface Video {
    url: string;
}

interface VideoGalleryProps {
    videos: Video[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
    if (!videos || videos.length === 0) return null;

    // Process the URL to ensure it's a valid embed if possible
    const processVideoUrl = (url: string) => {
        // If it's already an embed link or not youtube/tiktok, just return it
        if (url.includes('/embed/')) return url;

        // Handle standard YouTube links (youtube.com/watch?v=ID or youtu.be/ID)
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = new URL(url).searchParams.get('v');
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        }

        // Return original if no transformation matched
        return url;
    };

    return (
        <section className="bg-white dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                Vidéos du produit
            </h3>

            <div className={`grid gap-6 ${videos.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'}`}>
                {videos.map((video, index) => {
                    const embedUrl = processVideoUrl(video.url);

                    return (
                        <div key={index} className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                            <iframe
                                src={embedUrl}
                                className="absolute top-0 left-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                                title={`Product preview video ${index + 1}`}
                            ></iframe>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
