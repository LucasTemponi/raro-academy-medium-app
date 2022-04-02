export type ArticleViewProps = {
  article: string;
  autor: {
    id:number;
    nome: string;
    avatar: string;
  };
  dataPublicacao: Date;
  tempoLeitura: string;
}