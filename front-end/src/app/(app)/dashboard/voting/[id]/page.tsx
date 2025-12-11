
'use client';

import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { polls, users, voteHistory } from '@/lib/placeholder-data';
import { ArrowLeft, User, Clock, FileText, Vote, Unlock, Lock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Client-only component to prevent hydration mismatch
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
};

export default function PollDetailsPage() {
  const params = useParams();
  const pollId = params.id as string;
  const { toast } = useToast();

  const poll = polls.find((p) => p.id === pollId);
  const history = voteHistory.find((h) => h.pollId === pollId);
  const currentUser = users.find(u => u.role === 'Titular');

  const [selectedOption, setSelectedOption] = React.useState<string>(history?.finalVote || '');
  
  const handleVote = () => {
    if (!selectedOption) {
      toast({
        variant: "destructive",
        title: "Nenhuma opção selecionada",
        description: "Por favor, escolha uma opção para votar.",
      })
      return;
    }

    toast({
      title: "Voto Registrado!",
      description: `Seu voto para "${selectedOption}" foi registrado com sucesso.`,
    });
  }


  if (!poll) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-2xl font-bold">Votação não encontrada</h1>
          <p className="text-muted-foreground">A votação que você está procurando não existe ou foi removida.</p>
          <Button asChild className="mt-4">
              <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para Votações
              </Link>
          </Button>
      </div>
    );
  }

  // Simulating results
  const results = [
    { option: poll.options[0], votes: 50, percentage: 66 },
    { option: poll.options[1], votes: 25, percentage: 33 },
    { option: poll.options[2] || 'Abster-se', votes: 1, percentage: 1 },
  ];

  const getVoterName = (voterId: string) => {
    const user = users.find(u => u.id === voterId);
    return user ? `${user.name} (${user.document})` : 'Desconhecido';
  }

  const getUnitName = (unitId: string) => {
    const user = users.find(u => u.id === unitId);
    return user ? user.property : 'Unidade Desconhecida';
  }


  return (
    <div className="flex flex-col gap-8">
        <div>
            <Button asChild variant="outline" size="sm" className="mb-4">
                <Link href="/dashboard/voting">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para Votações
                </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{poll.title}</h1>
            <p className="text-muted-foreground">{poll.description}</p>
        </div>


      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            {poll.status === 'Finalizada' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Resultado Geral da Votação</CardTitle>
                        <CardDescription>Resultado consolidado final. A votação foi do tipo {poll.type === 'aberto' ? 'aberta' : 'secreta'}.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {results.map((result) => (
                        <div key={result.option}>
                            <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{result.option}</span>
                            <span className="text-sm text-muted-foreground">{result.votes} votos ({result.percentage}%)</span>
                            </div>
                            <Progress value={result.percentage} aria-label={`${result.percentage}% dos votos para ${result.option}`} />
                        </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {poll.status === 'Ativa' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Vote className="h-5 w-5" />
                           Realizar Voto
                        </CardTitle>
                        <CardDescription>Selecione uma das opções abaixo e confirme seu voto. Você pode alterar seu voto a qualquer momento enquanto a votação estiver ativa.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-2">
                            {poll.options.map(option => (
                                <div key={option} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={option} />
                                    <Label htmlFor={option} className="text-base font-normal">{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleVote}>
                           Confirmar Voto
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {poll.type === 'aberto' && poll.status === 'Finalizada' && history?.openVotes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="h-5 w-5" />
                    Votos por Unidade
                  </CardTitle>
                  <CardDescription>Veja como cada unidade votou nesta pauta aberta.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Unidade</TableHead>
                        <TableHead className="text-right">Voto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.openVotes.map((vote) => (
                        <TableRow key={vote.unitId}>
                          <TableCell className="font-medium">{getUnitName(vote.unitId)}</TableCell>
                          <TableCell className="text-right">{vote.votedFor}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
        </div>

        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Seu Voto
                    </CardTitle>
                    <CardDescription>Detalhes sobre o voto da sua unidade ({currentUser?.property}).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {history ? (
                        <div>
                             <div className="flex items-center justify-between">
                                <p className="text-muted-foreground">Voto registrado:</p>
                                <Badge variant="secondary" className="text-base">{history.finalVote}</Badge>
                            </div>
                             <div className="flex items-center justify-between mt-2">
                                <p className="text-muted-foreground">Votante:</p>
                                <p className="font-semibold">{getVoterName(history.voterId)}</p>
                            </div>
                        </div>
                    ) : (
                         <p className="text-muted-foreground text-center py-4">Nenhum voto registrado para esta unidade.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Histórico de Alterações
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {history && history.changes.length > 0 ? (
                        <ul className="space-y-4">
                            {history.changes.map((change, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            Voto alterado para <span className="text-primary">{change.votedFor}</span>
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                           Por: {getVoterName(change.voterId)} em <ClientOnly>{new Date(change.timestamp).toLocaleDateString('pt-BR')}</ClientOnly>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-center">Nenhuma alteração registrada.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
