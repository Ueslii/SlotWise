import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

// Importações de Componentes de UI
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

// Importações de Ícones
import {
  LogOut,
  User,
  LayoutDashboard,
  Search,
  Menu,
  Calendar,
  Settings,
  Shield,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login"); // Garante o redirecionamento após o logout
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${
        nameParts[nameParts.length - 1][0]
      }`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const NavLinks = ({ isMobile = false }) => (
    <>
      {/* Links para Cliente */}
      {profile?.role === "cliente" && (
        <>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Explorar
          </Link>
          <Link
            to="/meus-agendamentos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Meus Agendamentos
          </Link>
        </>
      )}

      {/* Links para Administrador */}
      {profile?.role === "administrador" && (
        <>
          <Link
            to="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/gerenciar-servicos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Serviços
          </Link>
          <Link
            to="/disponibilidade"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Horários
          </Link>
        </>
      )}

      {/* Links para Super Admin */}
      {profile?.role === "super_admin" && (
        <Link
          to="/super-admin"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Aprovações
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Esquerda: Logo e Navegação Desktop */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo SlotWise" className="h-8 w-8" />
            <span className="font-bold">
              <span className="text-primary">Slot</span>Wise
            </span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <NavLinks />
          </nav>
        </div>

        {/* Direita: Busca, Perfil e Menu Mobile */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar..." className="pl-10 h-9" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {getInitials(profile?.full_name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {profile?.full_name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botão do Menu Mobile */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <NavLinks isMobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
