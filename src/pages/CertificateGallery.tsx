import React, { useEffect, useState } from "react";
import axios from "axios";
import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Certificate {
  id: number;
  image: string;
  title?: string;
}

const CertificateGallery = () => {
  const { t } = useLanguage();
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Загружаем изображения с бэкенда
  const fetchCertificates = async () => {
    try {
      const response = await axios.get("https://gulchekhras-admin.onrender.com/api/certifikat/images/");
      setCertificates(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке сертификатов:", error);
    }
  };

  useEffect(() => {
    fetchCertificates();
    const interval = setInterval(fetchCertificates, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Заголовок */}
      <div className="text-center mb-12">
        <Award className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold">
          {t.nav.certificates}
        </h1>
      </div>

      {/* Сетка */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="aspect-[4/3] overflow-hidden rounded-xl bg-secondary hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
            >
              <img
                src={cert.image}
                alt={cert.title || `certificate-${cert.id}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">
            {t.common.certificates || "Сертификаты пока не загружены."}
          </p>
        )}
      </div>
    </div>
  );
};

export default CertificateGallery;