import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Users, LogIn, UserPlus } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold mb-4">SlotWise</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Plataforma inteligente de agendamentos
          </p>
          <div className="text-center mt-8">
            <h2 className="text-xl font-bold mb-4">Teste de Acesso</h2>
            <Link to="/estabelecimentos/1">
              {" "}
              {/* <-- SUBSTITUA O "1" PELO ID REAL */}
              <Button variant="secondary">Ver Estabelecimento de Teste</Button>
            </Link>
          </div>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button className="flex items-center space-x-2 min-w-[140px]">
                  <LogIn className="h-4 w-4" />
                  <span>Entrar</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 min-w-[140px]"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Cadastrar</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Agendamentos</span>
              </CardTitle>
              <CardDescription>
                Sistema completo de agendamentos online
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gerencie agendamentos de forma eficiente com nossa plataforma
                intuitiva.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Gestão de Clientes</span>
              </CardTitle>
              <CardDescription>
                Controle completo da base de clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Mantenha o histórico e informações dos seus clientes
                organizados.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Relatórios</span>
              </CardTitle>
              <CardDescription>Análises e métricas detalhadas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Acompanhe o desempenho do seu negócio com relatórios completos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
