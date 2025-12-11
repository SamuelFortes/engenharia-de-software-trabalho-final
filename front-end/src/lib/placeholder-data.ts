
import type { User, Poll, Proxy, VoteHistory } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'Usuário Admin',
    email: 'admin@condovote.com',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    role: 'Administrador',
    property: 'Escritório Admin',
    createdAt: '2023-01-15',
    status: 'Adimplente',
    document: '00.000.000/0001-00',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    role: 'Titular',
    property: 'Lote 12, Casa 1',
    createdAt: '2023-02-20',
    status: 'Adimplente',
    document: '111.222.333-44',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    role: 'Titular',
    property: 'Lote 15, Casa 2',
    createdAt: '2023-03-10',
    status: 'Inadimplente',
    document: '222.333.444-55',
  },
  {
    id: '4',
    name: 'Pessoa Proxy',
    email: 'proxy.person@email.com',
    avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
    role: 'Procurador',
    property: 'N/A',
    createdAt: '2023-04-01',
    status: 'Adimplente',
    document: '333.444.555-66',
  },
    {
    id: '5',
    name: 'Carlos Rocha',
    email: 'carlos.rocha@email.com',
    avatarUrl: 'https://picsum.photos/seed/avatar5/100/100',
    role: 'Titular',
    property: 'Lote 22',
    createdAt: '2023-05-11',
    status: 'Adimplente',
    document: '444.555.666-77',
  },
];

export const polls: Poll[] = [
  {
    id: 'poll-1',
    title: 'Aprovação do Orçamento Anual 2024',
    description: 'Vote na proposta de orçamento anual para o ano fiscal de 2024.',
    status: 'Ativa',
    startDate: '2024-07-01',
    endDate: '2024-07-15',
    totalVotes: 150,
    options: ['Aprovar', 'Rejeitar', 'Abster-se'],
    type: 'aberto',
  },
  {
    id: 'poll-2',
    title: 'Instalação de Novo Sistema de Segurança',
    description: 'Aprove a instalação de um novo sistema de segurança CCTV para o condomínio.',
    status: 'Ativa',
    startDate: '2024-07-10',
    endDate: '2024-07-25',
    totalVotes: 150,
    options: ['Sim', 'Não'],
    type: 'secreto',
  },
  {
    id: 'poll-3',
    title: 'Eleição do Novo Comitê Diretivo',
    description: 'Deposite seu voto para os novos membros do comitê diretivo.',
    status: 'Próxima',
    startDate: '2024-08-01',
    endDate: '2024-08-15',
    totalVotes: 150,
    options: ['Chapa 1', 'Chapa 2', 'Voto em Branco'],
    type: 'secreto',
  },
  {
    id: 'poll-4',
    title: 'Projeto de Renovação da Piscina',
    description: 'Vote na proposta de renovação da piscina da comunidade.',
    status: 'Finalizada',
    startDate: '2024-06-01',
    endDate: '2024-06-15',
    totalVotes: 150,
    options: ['A favor', 'Contra'],
    type: 'aberto',
  },
];

export const proxies: Proxy[] = [
  {
    id: 'proxy-1',
    name: 'Pessoa Proxy',
    email: 'proxy.person@email.com',
    cpf: '123.456.789-00',
    status: 'Ativo',
    since: '2024-01-20',
  },
  {
    id: 'proxy-2',
    name: 'Outro Proxy',
    email: 'another.proxy@email.com',
    cpf: '098.765.432-11',
    status: 'Inativo',
    since: '2023-11-05',
  },
];

export const voteHistory: VoteHistory[] = [
    {
        pollId: 'poll-4',
        unitId: '2', // John Doe's property
        finalVote: 'Contra',
        voterId: '4', // Voted by Pessoa Proxy
        changes: [
            { voterId: '2', votedFor: 'A favor', timestamp: '2024-06-02T10:00:00Z' },
            { voterId: '4', votedFor: 'Contra', timestamp: '2024-06-10T15:30:00Z' },
        ],
        openVotes: [
            { unitId: '2', votedFor: 'Contra' },
            { unitId: '3', votedFor: 'A favor' },
            { unitId: '5', votedFor: 'A favor' },
        ]
    },
    {
        pollId: 'poll-1',
        unitId: '2', // John Doe's property
        finalVote: 'Aprovar',
        voterId: '2', // Voted by John Doe
        changes: [
            { voterId: '2', votedFor: 'Aprovar', timestamp: '2024-07-05T11:00:00Z' },
        ],
        openVotes: [
            { unitId: '2', votedFor: 'Aprovar' },
            { unitId: '3', votedFor: 'Rejeitar' },
            { unitId: '5', votedFor: 'Aprovar' },
        ]
    }
]

// This is a hack for demonstration purposes. In a real app,
// user state would be managed through a context or session.
export const currentUser = users.find(u => u.role === 'Titular')!;
export const isAdmin = currentUser.role === 'Administrador';
