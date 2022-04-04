import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import apiClient from "../../services/api-client";

export const ArtigosPage = () => { 
  const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function buscaArtigos() {
    // através de generics, posso informar ao axios o tipo de objeto que vamos
    // operar.
    try{
      const response = await apiClient.get<ArticleThumbnailProps[]>(
        '/artigos'
      );
      setArticles(response.data);
      setIsLoading(false);
    }catch(e){
      alert("Erro ao carregar artigos. Tente novamente mais tarde.")
    }
  }

  useEffect(() => {      
    buscaArtigos();
  }, []);

  return (
      isLoading ? <div></div> :
      <div className="my-30">
          <ArticleList articles={articles} />
      </div>
  );
};
