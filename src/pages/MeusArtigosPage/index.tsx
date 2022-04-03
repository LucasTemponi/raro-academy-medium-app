import { useEffect, useState } from "react";

import { ArticleList } from "../../components/ArticleList";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import apiClient from '../../services/api-client';


export const MeusArtigosPage = () => {
  const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function buscaMeusArtigos() {
    // através de generics, posso informar ao axios o tipo de objeto que vamos
    // operar.
    const response = await apiClient.get<ArticleThumbnailProps[]>(
      '/artigos/meus-artigos'
    );
    setArticles(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    buscaMeusArtigos();
  }, []);

  return (
    isLoading ? <div></div> :
    <div className="my-30">
      <ArticleList articles={articles} />
    </div>
  );
};