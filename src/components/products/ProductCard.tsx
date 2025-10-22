import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { AddToCartModal } from "@/components/modals/AddToCartModal";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  description,
}: ProductCardProps) => {
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
      <Card className="overflow-hidden hover:scale-[1.02] shadow-md hover:shadow-lg transition-all duration-300 bg-background">
        <Link to={`/product/${id}`} className="block">
          <div className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] bg-secondary flex items-center justify-center overflow-hidden">
            <img
              src={image || "/placeholder.jpg"}
              alt={name}
              className="w-full h-full object-contain sm:object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg";
              }}
            />
          </div>
        </Link>

        <CardContent className="p-4">
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {description}
            </p>
          )}
          <p className="text-lg sm:text-xl font-bold text-primary">
            {price.toLocaleString()} UZS
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full text-sm sm:text-base"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {t.products?.addToCart || "Add to cart"}
          </Button>
        </CardFooter>

        <AddToCartModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onCheckout={() => {
            setModalOpen(false);
            navigate("/cart");
          }}
        />
      </Card>
    </>
  );
};