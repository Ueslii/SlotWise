import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Building } from "lucide-react";

interface Establishment {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
}

const Explorar = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        // Busca estabelecimentos cujo dono (owner) tenha o status 'ativo'
        const { data, error } = await supabase
          .from("establishments")
          .select(
            `
            id,
            name,
            description,
            address,
            profiles (
              status
            )
          `
          )
          .filter("profiles.status", "eq", "ativo");

        if (error) {
          throw error;
        }

        setEstablishments(data || []);
      } catch (error) {
        console.error("Erro ao carregar estabelecimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstablishments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold mb-4">Explorar Estabelecimentos</h1>
          <p className="text-xl text-muted-foreground">
            Encontre o serviço perfeito para você
          </p>
        </div>

        {establishments.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhum estabelecimento ativo encontrado.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {establishments.map((est) => (
              <Card key={est.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span>{est.name}</span>
                  </CardTitle>
                  <CardDescription>
                    {est.address || "Endereço não informado"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {est.description || "Sem descrição."}
                  </p>
                  <Link to={`/estabelecimentos/${est.id}`}>
                    <Button className="w-full">Ver Serviços</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorar;
