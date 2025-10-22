import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PublicOfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PublicOfferModal = ({ open, onOpenChange }: PublicOfferModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Ommaviy Oferta / Публичная Оферта / Public Offer</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-bold mb-2">1. Umumiy qoidalar</h3>
              <p className="text-muted-foreground">
                Ushbu ommaviy oferta (keyingi o'rinlarda "Oferta") Hunarmandlik mahsulotlari do'koni 
                (keyingi o'rinlarda "Sotuvchi") va mijoz (keyingi o'rinlarda "Xaridor") o'rtasidagi 
                mahsulot yetkazib berish va sotish shartlarini belgilaydi.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2">2. Buyurtma berish tartibi</h3>
              <p className="text-muted-foreground">
                Xaridor veb-sayt orqali yoki to'g'ridan-to'g'ri ofisga tashrif buyurish orqali buyurtma 
                berishi mumkin. Buyurtma qabul qilingandan so'ng, Sotuvchi Xaridorga telefon orqali 
                tasdiqlanadi.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2">3. To'lov shartlari</h3>
              <p className="text-muted-foreground">
                To'lov naqd pul, plastik karta yoki bank o'tkazmasi orqali amalga oshiriladi. 
                To'liq to'lov mahsulot yetkazib berilguncha amalga oshirilishi shart.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2">4. Yetkazib berish</h3>
              <p className="text-muted-foreground">
                Yetkazib berish 3-7 ish kuni ichida amalga oshiriladi. Aniq muddat mahsulot va 
                yetkazib berish manziliga bog'liq.
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-2">5. Kafolat va qaytarish</h3>
              <p className="text-muted-foreground">
                Barcha mahsulotlar sifat kafolatiga ega. Agar mahsulot shikastlangan yoki noto'g'ri 
                bo'lsa, 14 kun ichida qaytarish yoki almashtirish mumkin.
              </p>
            </section>

            <hr className="my-4" />

            <section>
              <h3 className="font-bold mb-2">Общие положения (RU)</h3>
              <p className="text-muted-foreground">
                Данная публичная оферта определяет условия продажи и доставки товаров между 
                Продавцом (магазин изделий ручной работы) и Покупателем.
              </p>
            </section>

            <hr className="my-4" />

            <section>
              <h3 className="font-bold mb-2">General Terms (EN)</h3>
              <p className="text-muted-foreground">
                This public offer defines the terms of sale and delivery of goods between the 
                Seller (handicraft products store) and the Buyer.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
