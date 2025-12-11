
'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { polls, type Poll } from "@/lib/placeholder-data"
import { PlusCircle, Clock, Trash2, MoreVertical, Pencil, Lock, Unlock } from "lucide-react"
import React from "react"
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function VotingPage() {
  const router = useRouter();
  const [options, setOptions] = React.useState(["", ""]);
  const [editingPoll, setEditingPoll] = React.useState<Poll | null>(null);
  const [editOptions, setEditOptions] = React.useState<string[]>([]);
  const { toast } = useToast();

  const activePolls = polls.filter((p) => p.status === 'Ativa');
  const upcomingPolls = polls.filter((p) => p.status === 'Próxima');
  const finishedPolls = polls.filter((p) => p.status === 'Finalizada');

  // Create poll option handlers
  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  // Edit poll option handlers
  const addEditOption = () => {
    setEditOptions([...editOptions, ""]);
  };

  const removeEditOption = (index: number) => {
    if (editOptions.length > 2) {
      setEditOptions(editOptions.filter((_, i) => i !== index));
    }
  };

  const handleEditOptionChange = (index: number, value: string) => {
    const newOptions = [...editOptions];
    newOptions[index] = value;
    setEditOptions(newOptions);
  };

  const handleEditClick = (poll: Poll) => {
    setEditingPoll(poll);
    setEditOptions(poll.options || ["", ""]);
  };

  const handleCloseEditDialog = () => {
    setEditingPoll(null);
  }

  const handleSaveChanges = () => {
    // Here you would typically handle the form submission,
    // e.g., send the data to your backend.
    toast({
      title: "Votação Atualizada!",
      description: `A votação "${editingPoll?.title}" foi atualizada com sucesso.`,
    })
    handleCloseEditDialog();
  };
  
  const handleRowClick = (pollId: string) => {
    router.push(`/dashboard/voting/${pollId}`);
  };
  
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  const renderPolls = (pollsToRender: typeof polls) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pollsToRender.map((poll) => (
            <Card key={poll.id} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle>{poll.title}</CardTitle>
                            <CardDescription>{poll.description}</CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditClick(poll)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2 flex-1">
                     <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>
                            {poll.status === 'Ativa' && `Termina em ${formatDate(poll.endDate)}`}
                            {poll.status === 'Próxima' && `Começa em ${formatDate(poll.startDate)}`}
                            {poll.status === 'Finalizada' && `Terminou em ${formatDate(poll.endDate)}`}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {poll.type === 'secreto' ? <Lock className="mr-2 h-4 w-4" /> : <Unlock className="mr-2 h-4 w-4" />}
                      <span className="capitalize">{poll.type}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant={poll.status === 'Ativa' ? 'default' : 'outline'} onClick={() => handleRowClick(poll.id)}>
                      {poll.status === 'Finalizada' ? 'Ver Resultados' : 'Ver e Votar'}
                    </Button>
                </CardFooter>
            </Card>
        ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Sessões de Votação</h1>
            <p className="text-muted-foreground">Gerencie e participe de votações do condomínio.</p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Criar Nova Votação
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Criar Nova Votação</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes abaixo para criar uma nova sessão de votação.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título da Votação</Label>
                        <Input id="title" placeholder="Ex: Aprovação do Orçamento Anual" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea id="description" placeholder="Descreva o objetivo desta votação." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start-date">Data de Início</Label>
                            <Input id="start-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end-date">Data de Término</Label>
                            <Input id="end-date" type="date" />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="poll-type">Tipo de votação</Label>
                            <Select>
                                <SelectTrigger id="poll-type">
                                    <SelectValue placeholder="Selecione o tipo de votação" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sincrona">Síncrona</SelectItem>
                                    <SelectItem value="assincrona">Assíncrona</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vote-type">Tipo de Voto</Label>
                            <Select>
                                <SelectTrigger id="vote-type">
                                    <SelectValue placeholder="Selecione o tipo de voto" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aberto">Aberto</SelectItem>
                                    <SelectItem value="secreto">Secreto</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Situação inicial</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="active-status" />
                        <Label htmlFor="active-status">Ativa?</Label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Se ativada, a votação começará imediatamente. Caso contrário, será agendada para a data de início.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label>Opções de Voto</Label>
                      {options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder={`Opção ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                          />
                           {options.length > 2 && (
                             <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeOption(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                           )}
                        </div>
                      ))}
                       <Button variant="outline" size="sm" onClick={addOption}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Opção
                      </Button>
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit">Criar Votação</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

       {/* Edit Poll Dialog */}
      <Dialog open={!!editingPoll} onOpenChange={(open) => {if (!open) handleCloseEditDialog()}}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Votação</DialogTitle>
            <DialogDescription>
              Modifique os detalhes da sua votação abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Título da Votação</Label>
              <Input id="edit-title" defaultValue={editingPoll?.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea id="edit-description" defaultValue={editingPoll?.description} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-start-date">Data de Início</Label>
                <Input id="edit-start-date" type="date" defaultValue={editingPoll?.startDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-end-date">Data de Término</Label>
                <Input id="edit-end-date" type="date" defaultValue={editingPoll?.endDate} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="edit-poll-type">Tipo de votação</Label>
                    <Select defaultValue="assincrona">
                        <SelectTrigger id="edit-poll-type">
                            <SelectValue placeholder="Selecione o tipo de votação" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sincrona">Síncrona</SelectItem>
                            <SelectItem value="assincrona">Assíncrona</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="edit-vote-type">Tipo de Voto</Label>
                    <Select defaultValue={editingPoll?.type || "aberto"}>
                        <SelectTrigger id="edit-vote-type">
                            <SelectValue placeholder="Selecione o tipo de voto" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="aberto">Aberto</SelectItem>
                            <SelectItem value="secreto">Secreto</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="space-y-4">
                <Label>Opções de Voto</Label>
                {editOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                    <Input
                    placeholder={`Opção ${index + 1}`}
                    value={option}
                    onChange={(e) => handleEditOptionChange(index, e.target.value)}
                    />
                    {editOptions.length > 2 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEditOption(index)}
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    )}
                </div>
                ))}
                <Button variant="outline" size="sm" onClick={addEditOption}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Opção
                </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseEditDialog}>Cancelar</Button>
            <Button type="submit" onClick={handleSaveChanges}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="finished">Finalizadas</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
            {renderPolls(activePolls)}
        </TabsContent>
        <TabsContent value="upcoming" className="mt-6">
            {renderPolls(upcomingPolls)}
        </TabsContent>
        <TabsContent value="finished" className="mt-6">
            {renderPolls(finishedPolls)}
        </TabsContent>
      </Tabs>
    </div>
  )
}

    