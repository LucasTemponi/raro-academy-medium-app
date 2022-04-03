import { ArticleForm } from "../../components/ArticleForm";
import apiClient from '../../services/api-client';
import { useState,useEffect} from "react";
import {useParams} from 'react-router-dom'
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import{useNavigate} from 'react-router-dom'


export const EditarArquivoPage = () => {

  const [ artigo, setArtigo ] = useState<ArticleThumbnailProps>();
  const navigate = useNavigate()
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      buscarArtigo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function buscarArtigo() {
    const response = await apiClient.get<ArticleThumbnailProps>(
      `/artigos/${id}`
    );
    setArtigo(response.data);
  }

async function handleSubmit(artigo: ArticleThumbnailProps){
    if (artigo.id) {
      await apiClient.patch(
        `/artigos/${artigo.id}`,
        {...artigo}
      );
      navigate('/artigos')
    } else {
      await apiClient.post(
        '/artigos',
        {...artigo}
      );
      navigate('/artigos')
    }
  }

async function handleDelete(artigo: ArticleThumbnailProps){
  await apiClient.delete(
    `/artigos/${artigo.id}`
  );
  navigate('/artigos')
}

  return (
    <>
      <div className="items-center justify-center m-10">
        <ArticleForm
          article={artigo}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
          
      </div>
    </>
  );
}
