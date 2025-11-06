import React, { useEffect, useState } from "react";
import axios from "axios";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface VideoItem {
  id: number;
  title: string;
  thumbnail?: string;
  video: string;
  duration?: string;
}

const Videos = () => {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("https://gulchekhras-admin.onrender.com/api/video/videos/");
        setVideos(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке видео:", error);
      }
    };

    fetchVideos();
    const interval = setInterval(fetchVideos, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.videos.title}
          </h1>
          <p className="text-xl text-muted-foreground">{t.videos.subtitle}</p>
        </div>

        {/* Сетка видео */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <Card
                key={video.id}
                className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <video
                        src={video.video}
                        className="h-full w-full object-cover"
                        muted
                        onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
                        onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                      />
                    )}

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-8 w-8 text-primary ml-1" />
                      </div>
                    </div>

                    {/* Длительность */}
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full">
              Видео пока нет.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;