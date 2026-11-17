# 🌿 PlantCare — Gerenciamento de Plantas

Aplicação em **Angular 21+** para cadastrar e acompanhar plantas: nome, espécie, ambiente, frequência de rega, última manutenção e necessidade de cuidados.

**Autor:** Marcos Fernando Carvalho

## Como rodar

```bash
npm install
npm start      # http://localhost:4200
npm test       # testes (Vitest)
npm run build  # build de produção (SSR)
```

## Telas

- `/` início, com carrossel de plantas
- `/plantas` listagem pública
- `/plantas/:id` detalhe da planta
- `/sobre` sobre o projeto
- `/admin` lista administrativa (signal), com editar e excluir
- `/admin/form` e `/admin/form/:id` cadastro e edição (Reactive Forms)

## Modelo

```ts
export interface Planta {
  id: string; // chave gerada pelo Firebase
  nome: string;
  especie: string;
  localizacao: string;
  frequenciaRegaDias: number;
  ultimaManutencao: string;
  observacoes: string;
  precisaAtencao: boolean;
}
```

## Estrutura

```
src/app/
├── core/models/planta.model.ts
├── core/services/planta.service.ts   # getAll, getById, create, update, delete
├── features/admin/
├── features/manutencao-planta/
├── features/detalhe-planta/
├── features/plantas/
├── features/home/
├── features/sobre/
└── shared/components/ (header, footer)
```
