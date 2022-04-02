export type ArticleThumbnailProps = {
  id:string;
  imagem: string;
  titulo: string;
  resumo: string;
  dataPublicacao: Date;
  dataAtualizacao?: Date;
  tempoLeitura?: string;
  conteudo:string
  autor: {
    id:number;
    nome: string;
    avatar: string;
  };
}
