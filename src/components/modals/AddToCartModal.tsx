import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingBag } from 'lucide-react';

interface AddToCartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: () => void;
}

export const AddToCartModal = ({ open, onOpenChange, onCheckout }: AddToCartModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mx-auto mb-4">
            <ShoppingBag className="h-16 w-16 text-primary" />
          </div>
          <DialogTitle className="text-center">{t.cart.addedToCart}</DialogTitle>
          <DialogDescription className="text-center">
            {t.cart.wantToBuy}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cart.continueShopping}
          </Button>
          <Button onClick={onCheckout}>
            {t.cart.checkout}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
