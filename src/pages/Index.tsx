import { useState, useEffect } from 'react';
import axios from 'axios';
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

const Index = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Добавь import axios из 'axios' если ещё нет
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Логируем полный ответ для диагностики
      const res = await axios.get('http://127.0.0.1:8000/api/product/products/');
      console.log('API response:', res);

      // Возможные варианты: res.data = [] или { results: [] } или { data: [...] }
      let data = res.data;
      if (data && data.results) data = data.results;
      if (data && data.data) data = data.data;
      if (!Array.isArray(data)) {
        console.warn('Unexpected products format, trying to extract items...', data);
        // если res.data имеет ключ items или products
        if (data.items) data = data.items;
        else if (data.products) data = data.products;
        else data = [];
      }

      // Нормализуем поля: некоторые бэки возвращают camelCase или snake_case
      const normalized = data.map((p: any) => ({
        id: p.id ?? p.pk ?? Math.random().toString(36).slice(2, 9),
        name: p.name ?? p.title ?? p.name_uz ?? p.name_uzbek,
        name_en: p.name_en ?? p.nameEn ?? p.title_en,
        name_ru: p.name_ru ?? p.nameRu ?? p.title_ru,
        price: p.price ?? p.cost ?? 0,
        image: p.image ?? (p.image && typeof p.image === 'object' ? p.image.url : null) ?? p.image_url ?? p.imageUrl,
        description: p.description ?? p.short_description ?? p.desc,
        raw: p,
      }));

      console.log('Normalized products:', normalized);
      setProducts(normalized);
    } catch (err) {
      console.error('Ошибка при загрузке товаров:', err);
      setError('Mahsulotlarni yuklab bo‘lmadi — tekshiring console/network');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductName = (product: any) => {
    if (language === 'en' && product.name_en) return product.name_en;
    if (language === 'ru' && product.name_ru) return product.name_ru;
    return product.name || product.title;
  };

  const filteredProducts = products
    .filter(p =>
      getProductName(p)?.toLowerCase().includes(search.toLowerCase())
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

        {/* 🔍 Filters */}
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

        {/* 🛍️ Product Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : filteredProducts.length > 0 ? (
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
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Mahsulot topilmadi
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;