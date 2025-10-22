import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Language } from '@/i18n/translations';
import { useState, useEffect, useRef } from "react";
import { useTheme } from 'next-themes';
import '../../css/style.css'
import logo from '../assets/logo/logo.png'

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { itemCount } = useCart();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const languages: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/videos', label: t.nav.videos },
    {
      label: "Mahsulotlar",
      submenu: [
        { to: '/images', label: t.nav.images },
        { to: '/certificates', label: t.nav.certificates },
        { to: '/faq', label: t.nav.faq },
        { to: '/contact', label: t.nav.contact },
      ],
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              <img src={logo} alt="" style={{ width: '95px' }} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 relative">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                      className="flex items-center gap-2 text-foreground hover:text-primary transition"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-44 bg-secondary rounded-lg shadow-lg border border-border z-50">
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.to}
                            to={sublink.to}
                            onClick={() => setOpenDropdown(null)} // Закрываем меню после клика
                            className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground rounded-lg transition"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.to}
                    className="text-foreground hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <div className="relative md:flex items-center language">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 bg-secondary px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-secondary/80 transition"
              >
                <span>{languages.find((l) => l.code === language)?.label}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isOpen && (
                <div className="absolute top-full mt-1 right-0 w-28 bg-secondary border border-border rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${language === lang.code
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-scale-in">
            {navLinks.map((link) =>
              link.submenu ? (
                <div key={link.label} className="px-4">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label
                      )
                    }
                    className="w-full flex justify-between items-center py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openDropdown === link.label && (
                    <div className="mt-1 ml-3 space-y-1 border-l border-border pl-3">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.to}
                          to={sublink.to}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                          className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
};