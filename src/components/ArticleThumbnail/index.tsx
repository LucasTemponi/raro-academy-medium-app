import React from "react";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { formataData } from "../../helpers/date";
import { ArticleThumbnailProps } from "./ArticleThumbnail.types";


export const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({
  imagem,
  titulo,
  resumo,
  dataPublicacao,
  tempoLeitura = '7 min',
  autor,
  id,
}) => {

  const [editavel, setEditavel] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // este Number(...) é necessário, pois o localStorage armazena strings. Nosso autor.id é
    // numérico.
   const usuarioAtual = Number(localStorage.getItem('id'));
   setEditavel(autor.id === usuarioAtual);
   if(autor.id === usuarioAtual){
   }
  }, [autor]);

  function enterArticle(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    navigate(`/artigo/${id}`);
  }

  function handleEdit(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    navigate(`/artigos/editar/${id}`);
  }

  return (
    <>
    <div className="w-2/3 flex flex-row mt-6 cursor-pointer" onClick={enterArticle}> 
      <div className="w-2/3 flex flex-col justify-between items-flex-left">   
        <header className="flex flex-row gap-3 items-center">
          <img
            src={ autor.avatar }
            className="rounded-full w-8 h-8 rounded-full"
            alt={ autor.nome }
          />
          <div>{ autor.nome }</div>
          <div className="text-sm text-gray-500">{ formataData(dataPublicacao) }</div>
        </header>
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3 flex flex-col">
            <div className="font-bold text-lg pt-3">
              { titulo }
            </div>
            <div className="font-light pt-2 text-base text-gray-600" >
              { resumo }
            </div>
          </div>
        </div>
        <footer className="flex flex-row pt-7 gap-3 items-center">
          <div className="text-gray-500 text-xs my-1">
            { tempoLeitura } de leitura
          </div>
          {
            editavel && (
              <button
                className={
                  `
                  hover:bg-blue-400 bg-blue-300 text-white
                  delay-100 duration-100
                  rounded-full py-1 px-2 text-xs
                  `
                }
                onClick={handleEdit}
              >
                Editar
              </button> 
            )
          }
        </footer>
      </div>
      <div className="flex items-center h-[10em]">
            <img className="object-cover aspect-video h-[10em]" src={ imagem } alt={`Imagem do artigo ${titulo}`} />
      </div>
    </div>  
    <hr className="mt-4 w-3/5" />    
    </>
  );
}