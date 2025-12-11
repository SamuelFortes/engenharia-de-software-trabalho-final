'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CondoVoteLogo } from "@/components/icons/logo"
import { useRouter } from "next/navigation";
import React from "react";
import { users } from "@/lib/placeholder-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Role = 'Titular' | 'Procurador' | 'Administrador';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = React.useState<Role>('Titular');
    const [email, setEmail] = React.useState(users.find(u => u.role === 'Titular')?.email || '');
    const [password, setPassword] = React.useState('password');

    const handleRoleChange = (value: string) => {
        const newRole = value as Role;
        setRole(newRole);
        const user = users.find(u => u.role === newRole);
        setEmail(user?.email || '');
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users.find(u => u.email === email);

        if (user) {
            if (user.role === 'Procurador') {
                router.push('/login/select-profile');
            } else {
                router.push('/dashboard');
            }
        } else {
             // Fallback for demo purposes
             router.push('/dashboard');
        }
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="space-y-4">
            <div className="flex justify-center">
                <CondoVoteLogo />
            </div>
          <CardTitle className="text-center text-2xl">Acesse sua conta</CardTitle>
          <CardDescription className="text-center">
            Escolha seu perfil para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue={role} onValueChange={handleRoleChange} className="mb-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Titular">Titular</TabsTrigger>
                    <TabsTrigger value="Procurador">Procurador</TabsTrigger>
                    <TabsTrigger value="Administrador">Admin</TabsTrigger>
                </TabsList>
            </Tabs>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
