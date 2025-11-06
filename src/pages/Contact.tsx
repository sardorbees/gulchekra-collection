import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../css/style.css'

interface FormData {
  full_name: string;
  phone: string;
  question: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone: "",
    question: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // Проверка блокировки повторной отправки
  useEffect(() => {
    const lastSent = localStorage.getItem("lastApplicationSent");
    if (lastSent) {
      const diff = Date.now() - parseInt(lastSent);
      if (diff < 10 * 60 * 1000) {
        setIsBlocked(true);
        const remaining = 10 - Math.floor(diff / 60000);
        setStatusMessage(`⏳ Вы уже отправляли заявку. Попробуйте через ${remaining} минут.`);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lastSent = localStorage.getItem("lastApplicationSent");
    const now = Date.now();

    if (lastSent && now - parseInt(lastSent) < 10 * 60 * 1000) {
      const minutesLeft = Math.ceil((10 * 60 * 1000 - (now - parseInt(lastSent))) / 60000);
      setStatusMessage(`⏳ Вы уже отправляли заявку. Повторите через ${minutesLeft} мин.`);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await axios.post("https://gulchekhras-admin.onrender.com/api/applicationapplications/", formData);
      if (response.status === 201) {
        setStatusMessage("✅ Ваша заявка успешно отправлена!");
        setFormData({ full_name: "", phone: "", question: "" });
        localStorage.setItem("lastApplicationSent", now.toString());
        toast.success("✅ Ваша заявка успешно отправлена!");
        setIsBlocked(true);
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("❌ Ошибка при отправке. Попробуйте позже.");
      toast.error("❌ Ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Связаться с нами</h1>
          <p className="text-xl text-muted-foreground">
            Есть вопросы? Мы будем рады их услышать.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium mb-2">
                    Ваше имя
                  </label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Номер телефона
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="question" className="block text-sm font-medium mb-2">
                    Вопрос
                  </label>
                  <Textarea
                    id="question"
                    rows={6}
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting || isBlocked}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
              </form>

              {statusMessage && (
                <p className="mt-4 text-center text-sm text-muted-foreground">{statusMessage}</p>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Телефон Номер</h3>
                    <p className="text-muted-foreground">+998500048387</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Телеграмм</h3>
                    <p className="text-muted-foreground">Gulschehra</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">Республика Каракалпакстан город Кунгират</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="aspect-video overflow-hidden rounded-lg bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800"
                alt="Workshop location"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="contact-map-area">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5829.942901121011!2d58.84318600000001!3d43.063068!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDAzJzQ3LjAiTiA1OMKwNTAnMzUuNSJF!5e0!3m2!1suz!2s!4v1759846903614!5m2!1suz!2s"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;