
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Administrador' | 'Titular' | 'Procurador';
  property: string;
  createdAt: string;
  status: 'Adimplente' | 'Inadimplente';
  document: string;
};

export type Poll = {
  id: string;
  title: string;
  description: string;
  status: 'Ativa' | 'Próxima' | 'Finalizada';
  startDate: string;
  endDate: string;
  options: string[];
  type: 'aberto' | 'secreto';
};

export type Proxy = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  status: 'Ativo' | 'Inativo';
  since: string;
};

export type VoteChange = {
    voterId: string;
    votedFor: string;
    timestamp: string;
}

export type OpenVote = {
    unitId: string;
    votedFor: string;
}

export type VoteHistory = {
    pollId: string;
    unitId: string;
    finalVote: string;
    voterId: string;
    changes: VoteChange[];
    openVotes?: OpenVote[];
}
