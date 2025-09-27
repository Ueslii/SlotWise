import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PendingApproval from "./pages/PendingApproval";
import Dashboard from "./pages/Dashboard";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import SuperAdmin from "./pages/SuperAdmin";
import SetupEstablishment from "./pages/SetupEstablishment";
import GerenciarServicos from "./pages/GerenciarServicos";
import Disponibilidade from "./pages/Disponibilidade";
import EstablishmentPublic from "./pages/EstablishmentPublic";
import BookingPage from "./pages/BookingPage";
import BookingSuccess from "./pages/BookingSuccess";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import Explorar from "./pages/Explorar";
import MainLayout from "./pages/MainLayout";
const queryClient = new QueryClient();

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  const { user, profile, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  // Public routes for non-authenticated users
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/estabelecimentos/:id" element={<EstablishmentPublic />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Authenticated routing based on role/status
  if (profile?.role === "super_admin") {
    return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup-establishment" element={<SetupEstablishment />} />
          <Route path="/gerenciar-servicos" element={<GerenciarServicos />} />
          <Route path="/disponibilidade" element={<Disponibilidade />} />
          <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route
            path="/estabelecimentos/:id"
            element={<EstablishmentPublic />}
          />
          <Route path="/agendar/:serviceId" element={<BookingPage />} />
          <Route path="/agendamento-concluido" element={<BookingSuccess />} />
          <Route path="/" element={<Navigate to="/super-admin" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  }

  if (profile?.role === "administrador") {
    if (profile.status === "pendente") {
      return (
        <Routes>
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route
            path="*"
            element={<Navigate to="/pending-approval" replace />}
          />
        </Routes>
      );
    }
    // Admin ativo
    return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup-establishment" element={<SetupEstablishment />} />
          <Route path="/gerenciar-servicos" element={<GerenciarServicos />} />
          <Route path="/disponibilidade" element={<Disponibilidade />} />
          <Route
            path="/estabelecimentos/:id"
            element={<EstablishmentPublic />}
          />
          <Route path="/agendar/:serviceId" element={<BookingPage />} />
          <Route path="/agendamento-concluido" element={<BookingSuccess />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    );
  }

  // Cliente
  if (profile?.role === "cliente") {
    return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
          <Route
            path="/estabelecimentos/:id"
            element={<EstablishmentPublic />}
          />
          <Route path="/agendar/:serviceId" element={<BookingPage />} />
          <Route path="/agendamento-concluido" element={<BookingSuccess />} />
          <Route path="/" element={<Explorar />} />
          <Route path="*" element={<Navigate to="/explorar" replace />} />{" "}
          {/* <-- Redireciona para Explorar */}
        </Route>
      </Routes>
    );
  }

  // Fallback para perfis inesperados
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
