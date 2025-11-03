import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { AgeGateProvider } from '@/contexts/AgeGateContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { AgeGate } from '@/components/ui/AgeGate';
import { ToastContainer } from '@/components/ui/Toast';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import CollectionsPage from '@/pages/CollectionsPage';
import CategoryPage from '@/pages/CategoryPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import ShippingReturnsPage from '@/pages/ShippingReturnsPage';
import PrivacyPage from '@/pages/legal/PoliticaPrivacidadePage';
import TermsPage from '@/pages/legal/TermosServicoPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import NotFound from '@/pages/handle/NotFound';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AgeGateProvider>
      <CartProvider>
        <ToastProvider>
          <AgeGate />
          <div className="flex flex-col min-h-screen bg-background text-neutral-100">
            <Header />
            <main 
              className="flex-1 transition-all duration-300"
              style={{ 
                paddingTop: scrolled ? 'clamp(4rem, 5vw, 5rem)' : 'clamp(6rem, 7vw, 7rem)',
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/collections/:slug" element={<CategoryPage />} />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/legal/privacy" element={<PrivacyPage />} />
                <Route path="/legal/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer />
        </ToastProvider>
      </CartProvider>
    </AgeGateProvider>
  );
}

export default App;
