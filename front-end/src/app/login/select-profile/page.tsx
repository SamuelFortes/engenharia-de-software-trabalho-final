'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { users } from '@/lib/placeholder-data';
import { useRouter } from 'next/navigation';
import { CondoVoteLogo } from '@/components/icons/logo';
import { ChevronRight } from 'lucide-react';

export default function SelectProfilePage() {
  const router = useRouter();
  const proxyUser = users.find((u) => u.role === 'Procurador');
  // Simulating the owners this proxy represents
  const representedOwners = users.filter(
    (u) => u.role === 'Titular' && u.id !== '5' // Example: proxy represents all owners except Carlos Rocha
  );

  const handleSelectProfile = (userId: string) => {
    // Here you would set the user session/context
    console.log(`Selected user ID: ${userId}`);
    router.push('/dashboard');
  };

  if (!proxyUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Procurador não encontrado.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <CondoVoteLogo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Selecionar Perfil</CardTitle>
          <CardDescription>
            Escolha em nome de quem você gostaria de prosseguir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {representedOwners.map((owner) => (
            <button
              key={owner.id}
              onClick={() => handleSelectProfile(owner.id)}
              className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50"
            >
              <Avatar className="h-12 w-12">
                <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{owner.name}</p>
                <p className="text-sm text-muted-foreground">
                  Agir como Procurador de {owner.name}. (Propriedade: {owner.property})
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
