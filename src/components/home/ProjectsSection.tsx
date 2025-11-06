import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ImageItem {
  id: number;
  image: string;
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  category?: string;
}

export const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка изображений с бэкенда
  const fetchImages = async () => {
    try {
      const response = await axios.get("https://gulchekhras-admin.onrender.com/api/img/images/");
      setImages(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке изображений:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    const interval = setInterval(fetchImages, 10000);
    return () => clearInterval(interval);
  }, []);

  // Функция для выбора языка
  const getTitle = (img: ImageItem) => {
    if (language === "ru") return img.title_ru || "Без названия";
    if (language === "en") return img.title_en || "Untitled";
    return img.title_uz || "Nomsiz";
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Заголовок */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {t.projects?.title || "Bizning loyihalar"}
      </h2>

      {/* Если загрузка */}
      {loading ? (
        <p className="text-center text-muted-foreground">
          {t.common?.loading || "Yuklanmoqda..."}
        </p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <Card
              key={img.id}
              className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={img.image}
                    alt={getTitle(img)}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{getTitle(img)}</h3>
                      <p className="text-sm text-white/80 mb-3">
                        {img.category || "Hunarmandlik"}
                      </p>
                      <Button size="sm" variant="secondary">
                        {t.projects?.viewDetails || "Batafsil"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          {t.common?.data || "Hozircha rasm mavjud emas."}
        </p>
      )}
    </section>
  );
};