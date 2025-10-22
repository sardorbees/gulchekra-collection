import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { PublicOfferModal } from './PublicOfferModal';

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderModal = ({ open, onOpenChange }: OrderModalProps) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedToOffer, setAgreedToOffer] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!agreedToOffer) {
      toast.error('Please agree to the public offer');
      return;
    }
    
    toast.success(t.cart.orderSuccess);
    setName('');
    setPhone('');
    setAgreedToOffer(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.cart.completeOrder}</DialogTitle>
            <DialogDescription>
              Please fill in your details to complete the order
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.cart.yourName}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.cart.yourName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t.cart.phoneNumber}</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 XX XXX XX XX"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="offer"
                checked={agreedToOffer}
                onCheckedChange={(checked) => setAgreedToOffer(checked as boolean)}
              />
              <label
                htmlFor="offer"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <button
                  type="button"
                  onClick={() => setOfferModalOpen(true)}
                  className="text-primary hover:underline"
                >
                  {t.cart.publicOffer}
                </button>
              </label>
            </div>
            <Button type="submit" className="w-full">
              {t.cart.submitOrder}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <PublicOfferModal open={offerModalOpen} onOpenChange={setOfferModalOpen} />
    </>
  );
};
