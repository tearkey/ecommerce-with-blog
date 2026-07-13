
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeBuilderProvider } from '@/context/ThemeBuilderContext';

// Pages
import IndexPage from '@/pages/Index';
import ProductsPage from '@/pages/Products';
import ProductDetailPage from '@/pages/ProductDetail';
import AboutPage from '@/pages/About';
import ContactPage from '@/pages/Contact';
import BlogPage from '@/pages/Blog';
import BlogPostPage from '@/pages/BlogPost';
import PrivacyPage from '@/pages/Privacy';
import TermsPage from '@/pages/Terms';
import ShippingPage from '@/pages/Shipping';
import ReturnsPage from '@/pages/Returns';
import SupportPage from '@/pages/Support';
import OffersPage from '@/pages/Offers';
import NewProductsPage from '@/pages/NewProducts';
import AdminPage from '@/pages/Admin';
import NotFoundPage from '@/pages/NotFound';
import OAuthConsent from '@/pages/OAuthConsent';

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="techstore-theme">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <ThemeBuilderProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/returns" element={<ReturnsPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/offers" element={<OffersPage />} />
                    <Route path="/new-products" element={<NewProductsPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Router>
                <Toaster />
              </ThemeBuilderProvider>
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
