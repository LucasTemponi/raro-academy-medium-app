import { useState, useEffect } from "react";
import { ArticleView } from "../../components/ArticleView";
import {useParams} from 'react-router-dom'
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import apiClient from "../../services/api-client";

export const ArtigoPage = () => {

  const [artigo, setArtigo] = useState<ArticleThumbnailProps>({
    conteudo:'',
    autor:{nome:'',id:0,avatar:''},
    id:'',
    titulo:'',
    dataPublicacao:new Date(),
    resumo:'',
    imagem:''
  });
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(true);

  async function loadArticle() {
    try{
      const response = await apiClient.get<ArticleThumbnailProps>(
        `/artigos/${id}`,
      );
      console.log(response.data)
      setArtigo(response.data);
      setIsLoading(false);
    }catch (e){
      alert("Erro ao carregar artigo. Tente novamente mais tarde.")
    }
  }

  useEffect(() => {   
    loadArticle();
  },[]);
  
  return (
    isLoading ? <div></div>
     :
      <div className="my-10 mx-20">
        <ArticleView
          article={artigo.conteudo}
          autor={artigo.autor}
          dataPublicacao={new Date(artigo.dataPublicacao)}
          tempoLeitura={ '10min' }
        />
      </div>
  );
};