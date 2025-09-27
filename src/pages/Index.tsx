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
import {
  Calendar,
  Users,
  FileChartColumn,
  LogIn,
  UserPlus,
} from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-backgroundblue ">
      {/* Header*/}
      <div className="bg-backgroundheader mx-auto p-2 flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo da SlotWise"
            className="h-10 w-10 mr-4"
          />
          <span className="text-2xl font-bold hidden sm:inline">
            <span className="text-primary">Slot</span>Wise
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Link to="/register">Cadastre-se agora</Link>
          </Button>
          <Button variant="outline" className="bg-backgroundheader">
            <Link to="/login">Já tem uma conta? </Link>
          </Button>
        </div>
      </div>
      <div className="container mx-auto p-4">
        {/* Heading */}
        <div className="text-center mb-12 pt-8">
          <div className="space-y-2">
            <h1 className="text-7xl font-bold">Transforme a Gestão do Seu</h1>
            <h1 className="text-7xl font-bold">
              Negócio com a <span className="text-primary">Slot</span>Wise
            </h1>
            <p className="text-2 xl text-muted-foreground ">
              A plataforma definitiva de agendamentos inteligente para
              prestadores <br />
              de serviço. Menos no-shows, mais clientes satisfeitos. Tudo em um
              só lugar.
            </p>
          </div>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 ">
              <Link to="/register">
                <Button className="flex items-center space-x-2 min-w-[140px]">
                  <span>Começe Agora</span>
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
                <FileChartColumn className="h-5 w-5 text-primary" />
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
        {/*footer*/}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Pronto para revolucionar seus agendamentos?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Junte-se a centenas de prestadores que já usam o SlotWise para
              gerenciar seus negócios
            </p>
            <div className="justify-center flex flex-col sm:flex-row gap-4 ">
              <Link to="/register">
                <Button className="flex items-center  space-x-2 min-w-[140px]">
                  <span>Criar Conta Grátis</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/*footer*/}
      </div>
    </div>
  );
};

export default Index;
