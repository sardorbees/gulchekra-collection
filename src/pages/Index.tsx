import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from '@/components/products/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ProjectsSection } from '@/components/home/ProjectsSection';

import img from '../components/assets/product/11111.jpg'
import img1 from '../components/products/17.jpg'
import img2 from '../components/products/19.jpg'
import img3 from '../components/assets/product/14.png'
import img4 from '../components/assets/product/15.png'
import img5 from '../components/assets/product/16.png'
const mockProducts = [
  {
    id: '1',
    name: "Qoraqalpoq ayollar choponi",
    nameEn: 'Qoraqalpoq ayollar choponi',
    nameRu: 'Каракалпакские орнаменты',
    price: 1000000,
    image: img,
    description: "Стандарт",
    minidesc: "Naqishlari: Qo'lida kashtalangan",
  },
  {
    id: '2',
    name: 'Qoraqalpoq jaketlar',
    nameEn: 'Qoraqalpoq jaketlar',
    nameRu: 'Черные куртки',
    price: 500000,
    image: img1,
    description: "Koreyski Velur",
    minidesc: "Naqishlari: Ipak Iplar bilan tikilgan",
  },
  {
    id: '3',
    name: 'Бешпент',
    nameEn: 'Beshpent',
    nameRu: 'Бешпент',
    price: 1000000,
    image: img2,
    description: "Kорейски Велур",
    minidesc: "Naqishlari: Kора Kолпак Накишлари",
  },
  {
    id: '4',
    name: 'Qoroqolpoq Naqish tushirilgan jaket',
    nameEn: 'Qoroqolpoq Naqish tushirilgan jaket',
    nameRu: 'Вышитая куртка',
    price: 500000,
    image: img3,
    description: "Barxit material",
  },
  {
    id: '5',
    name: 'Qoroqolpoq Naqish tushirilgan jaket',
    nameEn: 'Qoroqolpoq Naqish tushirilgan jaket',
    nameRu: 'Вышитая куртка',
    price: 500000,
    image: img4,
    description: "Barxit material",
  },
  {
    id: '6',
    name: 'Shyfon kuylak',
    nameEn: 'Shyfon kuylak',
    nameRu: 'Шифоновое платье',
    price: 1200000,
    image: img5,
    description: "Astarli biser bilan bezagan qo'l ishi",
  },
];

const Index = () => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const getProductName = (product: typeof mockProducts[0]) => {
    if (language === 'en') return product.nameEn;
    if (language === 'ru') return product.nameRu;
    return product.name;
  };

  const filteredProducts = mockProducts
    .filter(p =>
      getProductName(p).toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen">
      <HeroBanner />
      <ProjectsSection />
      <section id="products" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t.products.title}
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.products.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder={t.products.sort} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t.products.newest}</SelectItem>
              <SelectItem value="priceAsc">{t.products.priceAsc}</SelectItem>
              <SelectItem value="priceDesc">{t.products.priceDesc}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={getProductName(product)}
              price={product.price}
              image={product.image}
              description={product.description}
              minidesc={product.minidesc}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t.products.search}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;