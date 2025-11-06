import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { AddToCartModal } from '@/components/modals/AddToCartModal';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  minidesc: string;
}

export const ProductCard = ({ id, name, price, image, description, minidesc }: ProductCardProps) => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, image });
    setModalOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden hover-scale">
        <Link to={`/product/${id}`}>
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </Link>
        <CardContent className="p-4">
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-lg mb-1 line-clamp-1 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
          )}
          <p className="text-xl font-bold text-primary">{price.toLocaleString()} UZS</p>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 hover:text-primary transition-colors">
            {minidesc}
          </h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button onClick={handleAddToCart} className="w-full" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            {t.products.addToCart}
          </Button>
        </CardFooter>
      </Card>
      <AddToCartModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCheckout={() => {
          setModalOpen(false);
          navigate('/cart');
        }}
      />
    </>
  );
};