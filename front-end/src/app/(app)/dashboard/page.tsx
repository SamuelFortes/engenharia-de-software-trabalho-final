
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { currentUser, polls } from "@/lib/placeholder-data"
import { Gavel, Handshake, Building2, Activity, Lock, Unlock } from "lucide-react"
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const activePolls = polls.filter((p) => p.status === 'Ativa').length;
  const allPolls = polls;

  const handleRowClick = (pollId: string) => {
    router.push(`/dashboard/voting/${pollId}`);
  };
  
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Votações Ativas</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePolls}</div>
            <p className="text-xs text-muted-foreground">votações atualmente abertas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minhas Propriedades</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meus Procuradores</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">1 ativo, 0 inativos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Histórico de Votações
            </CardTitle>
            <CardDescription>
              Uma lista de todas as votações no condomínio. Clique em uma votação para ver os detalhes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Tipo</TableHead>
                  <TableHead className="text-right">Data Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPolls.map((poll) => (
                  <TableRow key={poll.id} onClick={() => handleRowClick(poll.id)} className="cursor-pointer">
                    <TableCell className="font-medium">{poll.title}</TableCell>
                    <TableCell className="text-center">
                        <Badge variant={poll.status === 'Ativa' ? 'default' : poll.status === 'Finalizada' ? 'secondary' : 'outline'} className={poll.status === 'Ativa' ? 'bg-accent text-accent-foreground' : ''}>
                            {poll.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          {poll.type === 'secreto' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                          <span className="capitalize">{poll.type}</span>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">{formatDate(poll.endDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
