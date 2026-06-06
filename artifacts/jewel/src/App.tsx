import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CheckoutPage from "@/pages/CheckoutPage";
import WishlistPage from "@/pages/WishlistPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import SearchPage from "@/pages/SearchPage";
import NotFound from "@/pages/not-found";

// Components
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/product/:slug" component={ProductDetailPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/wishlist" component={WishlistPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/search" component={SearchPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'hsl(var(--foreground))',
              color: 'hsl(var(--background))',
              border: 'none',
              borderRadius: '0',
              fontFamily: 'var(--app-font-sans)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '11px',
            },
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
