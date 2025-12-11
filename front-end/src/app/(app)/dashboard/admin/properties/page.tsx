
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
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { users, type User } from "@/lib/placeholder-data"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react";
import { MultiSelect } from "@/components/ui/multi-select";

type Property = {
    id: string;
    property: string;
    ownerId: string;
    ownerName: string;
    type: 'Lote' | 'Casa';
}


export default function PropertiesAdminPage() {
    const propertiesData = users.filter(u => u.role === 'Titular').map(u => ({
        ...u,
        type: u.property.includes('Casa') ? 'Casa' : 'Lote'
    })) as (User & { type: 'Lote' | 'Casa' })[];


    const sortedTitulares = users
        .filter(u => u.role === 'Titular')
        .sort((a, b) => a.name.localeCompare(b.name));

    const [propertyType, setPropertyType] = React.useState('');
    const voteWeight = propertyType === 'casa' ? 2 : propertyType === 'lote' ? 1 : 1;
    
    const existingLots = propertiesData
      .filter(p => p.type === 'Lote')
      .map(p => ({
        value: p.property,
        label: p.property,
      }));

    const [editingProperty, setEditingProperty] = React.useState<(User & {type: 'Lote' | 'Casa'}) | null>(null);

    const handleEditClick = (property: User & {type: 'Lote' | 'Casa'}) => {
        setEditingProperty(property);
        setPropertyType(property.type.toLowerCase());
    };

    const handleCloseEditDialog = () => {
        setEditingProperty(null);
    };


  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Unidades</h1>
            <p className="text-muted-foreground">Gerencie todas as unidades e titularidades.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Nova Unidade
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Unidade</DialogTitle>
              <DialogDescription>
                Preencha as informações para registrar uma nova unidade no sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="property-id" className="text-right">
                  Unidade
                </Label>
                <Input id="property-id" placeholder="Ex: Lote 1, Casa 5" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="property-type" className="text-right">
                  Tipo
                </Label>
                <Select onValueChange={setPropertyType}>
                  <SelectTrigger id="property-type" className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lote">Lote</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                {propertyType === 'casa' && (
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="property-lots" className="text-right">
                        Lotes Ocupados
                    </Label>
                    <div className="col-span-3">
                        <MultiSelect
                            options={existingLots}
                            placeholder="Selecione os lotes"
                            emptyIndicator="Nenhum lote encontrado."
                        />
                    </div>
                </div>
                )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="property-owner" className="text-right">
                  Proprietário
                </Label>
                <Select>
                  <SelectTrigger id="property-owner" className="col-span-3">
                    <SelectValue placeholder="Selecione um titular" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedTitulares.map(user => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vote-weight" className="text-right">
                  Peso do Voto
                </Label>
                <Input id="vote-weight" type="number" value={voteWeight} disabled className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Adicionar Unidade</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Unidades</CardTitle>
          <CardDescription>Uma lista de todas as unidades registradas no sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propriedade</TableHead>
                <TableHead>Proprietário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Peso do Voto</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propertiesData.map((user) => (
                <TableRow key={user.property}>
                  <TableCell className="font-medium">{user.property}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.type}</Badge>
                  </TableCell>
                  <TableCell>{user.type === 'Casa' ? '2.0' : '1.0'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Alternar menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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

      {/* Edit Property Dialog */}
      <Dialog open={!!editingProperty} onOpenChange={(open) => !open && handleCloseEditDialog()}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Unidade</DialogTitle>
              <DialogDescription>
                Atualize as informações da unidade abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-property-id" className="text-right">
                  Unidade
                </Label>
                <Input id="edit-property-id" defaultValue={editingProperty?.property} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-property-type" className="text-right">
                  Tipo
                </Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="edit-property-type" className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lote">Lote</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                {propertyType === 'casa' && (
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-property-lots" className="text-right">
                        Lotes Ocupados
                    </Label>
                    <div className="col-span-3">
                        <MultiSelect
                            options={existingLots}
                            placeholder="Selecione os lotes"
                            emptyIndicator="Nenhum lote encontrado."
                        />
                    </div>
                </div>
                )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-property-owner" className="text-right">
                  Proprietário
                </Label>
                <Select defaultValue={editingProperty?.id}>
                  <SelectTrigger id="edit-property-owner" className="col-span-3">
                    <SelectValue placeholder="Selecione um titular" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedTitulares.map(user => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-vote-weight" className="text-right">
                  Peso do Voto
                </Label>
                <Input id="edit-vote-weight" type="number" value={voteWeight} disabled className="col-span-3" />
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
