import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import apiClient from "../../services/api-client";
import { geraArtigos } from "../../stories/helpers/gerador-artigos";

export const ArtigosPage = () => { 
    const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);
 
    async function buscaArtigos() {
        // através de generics, posso informar ao axios o tipo de objeto que vamos
        // operar.
        const response = await apiClient.get<ArticleThumbnailProps[]>(
          '/artigos'
        );
        setArticles(response.data);
      }
    
      useEffect(() => {
        buscaArtigos();
      }, []);

return (
    <div className="my-30">
        <ArticleList articles={articles} />
    </div>

); };
