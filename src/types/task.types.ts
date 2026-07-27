//Campos de uma tarefa

export type StatusTarefa = "concluida" | "em andamento" | "em pausa";


export interface Tarefa {
  id?: number;
  titulo: string;
  descricao?: string;
  status: StatusTarefa;
}
