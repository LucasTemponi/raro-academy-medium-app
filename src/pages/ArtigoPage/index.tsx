import { useState, useEffect } from "react";
import { ArticleView } from "../../components/ArticleView";
import {useParams} from 'react-router-dom'
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import apiClient from "../../services/api-client";

export const ArtigoPage = () => {

  const [artigo, setArtigo] = useState<ArticleThumbnailProps>();
  const {id} = useParams();

  async function loadArticle() {
    const response = await apiClient.get<ArticleThumbnailProps>(
      `/artigos/${id}`,
    );
    console.log(response.data)
    setArtigo(response.data);
  }

  useEffect(() => {   
    loadArticle();
  },[]);
  
  return (
    <div className="m-10">
      <ArticleView
        article={""}
        autor={{nome:"",id:43,avatar:""}}
        dataPublicacao={new Date()}
        tempoLeitura={ '10min' }
      />
    </div>
  );
};