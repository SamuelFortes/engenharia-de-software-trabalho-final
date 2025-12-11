
'use client';

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
import { users, type User } from "@/lib/placeholder-data"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import React from "react";

export default function UsersAdminPage() {
  const titulares = users.filter(u => u.role === 'Titular');
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
  };

  const handleCloseEditDialog = () => {
    setEditingUser(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Titulares</h1>
            <p className="text-muted-foreground">Gerencie todos os titulares do sistema.</p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Novo Titular
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Titular</DialogTitle>
                    <DialogDescription>
                        Crie um novo usuário. Um e-mail será enviado com uma senha temporária.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input id="name" placeholder="John Doe" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" type="email" placeholder="john@doe.com" className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="document" className="text-right">CPF/CNPJ</Label>
                        <Input id="document" placeholder="000.000.000-00" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Adimplente</Label>
                        <Switch id="status" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Criar Usuário</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Titulares</CardTitle>
          <CardDescription>Uma lista de todos os titulares no sistema CondoVote.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF/CNPJ</TableHead>
                <TableHead>Propriedade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {titulares.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.document}</TableCell>
                  <TableCell>{user.property}</TableCell>
                   <TableCell>
                    <Badge variant={user.status === 'Adimplente' ? 'default' : 'destructive'}>
                      {user.status}
                    </Badge>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditClick(user)}>Editar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && handleCloseEditDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Titular</DialogTitle>
            <DialogDescription>
              Atualize as informações do titular abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Nome
              </Label>
              <Input
                id="edit-name"
                defaultValue={editingUser?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                type="email"
                defaultValue={editingUser?.email}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-document" className="text-right">CPF/CNPJ</Label>
                <Input id="edit-document" defaultValue={editingUser?.document} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Adimplente
              </Label>
              <Switch
                id="edit-status"
                defaultChecked={editingUser?.status === 'Adimplente'}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseEditDialog}>Cancelar</Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
