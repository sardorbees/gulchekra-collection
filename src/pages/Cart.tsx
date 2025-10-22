import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { t, language } = useLanguage();
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleOrderSubmit = async () => {
    if (!name || !phone || !address) {
      toast.error(language === "uz" ? "Iltimos, barcha maydonlarni to‘ldiring." : "Пожалуйста, заполните все поля.");
      return;
    }

    if (items.length === 0) {
      toast.error(language === "uz" ? "Savat bo‘sh." : "Корзина пуста.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/order/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          customer_phone: phone,
          customer_address: address,
          total_price: total,
          items: items.map((i) => ({
            product_name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });

      if (response.ok) {
        toast.success(
          language === "uz"
            ? "Buyurtma muvaffaqiyatli yuborildi!"
            : language === "ru"
              ? "Заказ успешно отправлен!"
              : "Order successfully placed!"
        );
        clearCart(); // 🧹 очищаем корзину
        setName("");
        setPhone("");
        setAddress("");
      } else {
        toast.error(language === "uz" ? "Buyurtma yuborishda xatolik yuz berdi." : "Ошибка при оформлении заказа.");
      }
    } catch (error) {
      toast.error(language === "uz" ? "Server bilan aloqa xatosi." : "Ошибка соединения с сервером.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <h1 className="text-3xl font-bold">{t.cart.empty}</h1>
          <br />
          <Link to="/">
            <Button>{t.cart.continueShopping}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t.cart.title}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 🧺 Список товаров */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-lg font-bold text-primary">
                      {item.price.toLocaleString()} UZS
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 💰 Итоги + форма */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold mb-2">
                {language === "uz" ? "Buyurtma maʼlumotlari" : "Информация о заказе"}
              </h2>

              <input
                type="text"
                placeholder={language === "uz" ? "Ismingiz" : "Ваше имя"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder={language === "uz" ? "Telefon raqamingiz" : "Ваш телефон"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                placeholder={language === "uz" ? "Manzilingiz" : "Ваш адрес"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />

              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>{t.cart.total}</span>
                <span className="text-primary">
                  {total.toLocaleString()} UZS
                </span>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={loading}
                onClick={handleOrderSubmit}
              >
                {loading
                  ? language === "uz"
                    ? "Yuborilmoqda..."
                    : language === "ru"
                      ? "Отправка..."
                      : "Sending..."
                  : t.cart.checkout}
              </Button>

              <Link to="/">
                <Button variant="outline" className="w-full">
                  {t.cart.continueShopping}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;