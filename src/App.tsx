
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import Index from './pages/Index';
import Generate from './pages/Generate';
import Reports from './pages/Reports';
import Pricing from './pages/Pricing';
import Billing from './pages/Billing';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import About from './pages/About';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import PaymentInfo from './pages/PaymentInfo';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/signup" element={<Navigate to="/auth" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/generate" element={<ProtectedRoute><Generate /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/payment-info" element={<ProtectedRoute><PaymentInfo /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
