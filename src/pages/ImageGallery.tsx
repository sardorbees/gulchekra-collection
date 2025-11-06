import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "@/contexts/LanguageContext";

interface ImageItem {
  id: number;
  image: string;
}

const ImageGallery = () => {
  const { t } = useLanguage();
  const [images, setImages] = useState<ImageItem[]>([]);

  // Загружаем изображения с бэкенда
  const fetchImages = async () => {
    try {
      const response = await axios.get("https://gulchekhras-admin.onrender.com/api/img/images/");
      setImages(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке изображений:", error);
    }
  };

  useEffect(() => {
    fetchImages();
    const interval = setInterval(fetchImages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Заголовок */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        {t.nav.images}
      </h1>

      {/* Галерея */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((img, index) => (
            <div
              key={img.id || index}
              className="aspect-square overflow-hidden rounded-xl bg-secondary shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={img.image}
                alt={`Gallery ${img.id}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">
            {t.common.commons || "Изображения пока не загружены."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;