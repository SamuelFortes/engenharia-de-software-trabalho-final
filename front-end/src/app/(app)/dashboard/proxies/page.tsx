
import { Button } from "@/components/ui/button"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { proxies } from "@/lib/placeholder-data"
import { MoreHorizontal, PlusCircle } from "lucide-react"

export default function ProxiesPage() {

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Procuradores</h1>
            <p className="text-muted-foreground">Atribua e gerencie procuradores para votar em seu nome.</p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Novo Procurador
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Procurador</DialogTitle>
                    <DialogDescription>
                        Insira os detalhes da pessoa que você deseja designar como seu procurador. Eles serão notificados por e-mail.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input id="name" defaultValue="Pedro Pascal" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" defaultValue="pedro@pascal.com" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cpf" className="text-right">CPF</Label>
                        <Input id="cpf" placeholder="000.000.000-00" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">Senha Inicial</Label>
                        <Input id="password" type="password" required className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Enviar Convite</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meus Procuradores</CardTitle>
          <CardDescription>Uma lista de indivíduos autorizados a votar por você.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Desde</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proxies.map((proxy) => (
                <TableRow key={proxy.id}>
                  <TableCell className="font-medium">{proxy.name}</TableCell>
                  <TableCell>{proxy.email}</TableCell>
                  <TableCell>{proxy.cpf}</TableCell>
                  <TableCell>
                    <Badge variant={proxy.status === 'Ativo' ? 'default' : 'outline'}>
                      {proxy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(proxy.since)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Alternar menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>{proxy.status === 'Ativo' ? 'Desabilitar' : 'Habilitar'}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
