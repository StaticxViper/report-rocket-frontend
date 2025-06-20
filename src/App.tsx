
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Index from './pages/Index';
import Generate from './pages/Generate';
import Reports from './pages/Reports';
import Pricing from './pages/Pricing';
import Billing from './pages/Billing';
import NotFound from './pages/NotFound';
import { Toaster } from 'sonner';
import PaymentInfo from './pages/PaymentInfo';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
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
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/generate" element={<ProtectedRoute><Generate /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/payment-info" element={<ProtectedRoute><PaymentInfo /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
