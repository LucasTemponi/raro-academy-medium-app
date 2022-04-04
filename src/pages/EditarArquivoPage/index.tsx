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
    try{        
      const response = await apiClient.get<ArticleThumbnailProps>(
        `/artigos/${id}`
      );
      setArtigo(response.data);
    }
    catch(error){
      alert("Erro ao buscar artigo. Tente novamente mais tarde.")
    }
  }

  async function handleSubmit(artigo: ArticleThumbnailProps){
    if (artigo.id) {
      try{          
        const response = await apiClient.patch(
          `/artigos/${artigo.id}`,
          {...artigo}
        );
        navigate(`/artigo/${artigo.id}`)
      }catch(e){
        alert("Erro ao salvar artigo. Tente novamente mais tarde.")
      }
    } else {
      try{
        const response = await apiClient.post(
          '/artigos',
          {...artigo}
        );
        navigate(`/artigo/${response.data.id}`)
      }catch(e){
        alert("Erro ao salvar artigo. Tente novamente mais tarde.")
      }
    }
  }

  async function handleDelete(artigo: ArticleThumbnailProps){
    try{
      await apiClient.delete(
        `/artigos/${artigo.id}`
      );
      navigate('/artigos')
    }catch(e){
      alert("Erro ao deletar artigo. Tente novamente mais tarde.")
    }
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