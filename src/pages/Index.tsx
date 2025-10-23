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

// Mock products data - will be replaced with real data from database
const mockProducts = [
  {
    id: '1',
    name: "Qo'l ishlov berish suzane",
    nameEn: 'Handcrafted Suzani',
    nameRu: 'Ручная вышивка Сузани',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1582582494374-8e87cd5b76d8?w=800',
    description: "An'anaviy o'zbek suzane",
  },
  {
    id: '2',
    name: 'Kulol idish',
    nameEn: 'Ceramic Pottery',
    nameRu: 'Керамическая посуда',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
    description: "Qo'lda yasalgan kulolchilik",
  },
  {
    id: '3',
    name: "To'qilgan gilam",
    nameEn: 'Woven Carpet',
    nameRu: 'Тканый ковер',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
    description: 'Milliy uslubdagi gilam',
  },
  {
    id: '4',
    name: "Yog'och o'ymakorlik",
    nameEn: 'Wood Carving',
    nameRu: 'Резьба по дереву',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800',
    description: "Yog'ochdan yasalgan san'at",
  },
  {
    id: '5',
    name: "Metall san'ati",
    nameEn: 'Metal Art',
    nameRu: 'Металлическое искусство',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1599751449307-c7e0fce4d4c7?w=800',
    description: 'Metalldan yasalgan buyumlar',
  },
  {
    id: '6',
    name: "To'qimachilik",
    nameEn: 'Textile Weaving',
    nameRu: 'Ткачество',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1606306520087-8e82a69e6f2e?w=800',
    description: "Qo'lda to'qilgan matolar",
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
      {/* Hero Banner with Swiper */}
      <HeroBanner />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Products Section */}
      <section id="products" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t.products.title}
        </h2>

        {/* Filters */}
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