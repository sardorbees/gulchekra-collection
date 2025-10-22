import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { AddToCartModal } from '@/components/modals/AddToCartModal';
import axios from 'axios';
import { IoStarSharp } from "react-icons/io5";

// ✅ Расширяем интерфейс, чтобы включить color
interface ProductColor {
  id: number;
  name: string;
  product_count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  img: string;
  description?: string;
  dress?: ProductDress;
  size: string;
  rating: number;
  color?: ProductColor;
  images?: string[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Загружаем продукт по ID из API
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/product/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Mahsulot topilmadi');
        setLoading(false);
      });
  }, [id]);

  // ✅ Добавление в корзину
  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.img,
    });
    setModalOpen(true);
  };

  // ✅ Состояние загрузки
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        {t.loading || 'Yuklanmoqda...'}
      </div>
    );
  }

  // ✅ Ошибка загрузки
  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        {error || 'Xatolik yuz berdi'}
      </div>
    );
  }

  // ✅ Основное отображение
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.nav.home}
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 🖼 Изображения товара */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
            <img
              src={product.img}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-lg bg-secondary cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <img
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ℹ️ Информация о товаре */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
            <p className="text-3xl font-bold text-primary">
              {product.price.toLocaleString()} UZS
              <br />
              <del>Старый цена {product.old_price.toLocaleString()} UZS</del>
            </p>
          </div>

          {product.description && (
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}

          {product.dress && (
            <div className="prose prose-sm max-w-none">
              <h3 className="font-semibold mb-2">Kiyim turi</h3>
              <p className="text-muted-foreground">{product.dress.name}</p>
            </div>
          )}
          {/* 🎨 Цвет материала */}
          {product.color && (
            <div>
              <h3 className="font-semibold mb-2">Materiallar rangi</h3>
              <p className="text-sm text-muted-foreground">
                {product.color.name}
              </p>
            </div>
          )}

          {product.rating && (
            <div className="flex items-center space-x-2">
              <IoStarSharp />
              <p className="text-sm text-muted-foreground">{product.rating} / 5</p>
            </div>
          )}

          {product.size && (
            <div>
              <h3 className="font-semibold mb-2">Materiallar hajmi</h3>
              <p className="text-sm text-muted-foreground">
                {product.size.name}
              </p>
            </div>
          )}

          <Button onClick={handleAddToCart} size="lg" className="w-full">
            <ShoppingCart className="mr-2 h-5 w-5" />
            {t.products.addToCart}
          </Button>
        </div>
      </div>

      <AddToCartModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCheckout={() => {
          setModalOpen(false);
          navigate('/cart');
        }}
      />
    </div>
  );
};

export default ProductDetail;