import { Button } from "../Button";
import { Input } from "../Input";
import { RitchTextEditor } from "../RitchTextEditor";
import {useState,useEffect} from 'react'
import { ArticleThumbnailProps } from "../ArticleThumbnail/ArticleThumbnail.types";
import {useNavigate} from 'react-router-dom'

type ArticleFormProps = {
  article?: ArticleThumbnailProps;
  // adicionamos uma propriedade de onSubmit, a ser disparada quando o usuário enviar o form.
  onSubmit?: (article: ArticleThumbnailProps) => void;
  onDelete?:(article: ArticleThumbnailProps) => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  onSubmit,
  onDelete,
}) => {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [imagem, setImagem] = useState("");
  const [conteudo, setConteudo] = useState("");
  const[deletavel,setDeletavel] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    
    const usuarioAtual = Number(localStorage.getItem('id'));
    if (article) {
      if (usuarioAtual === article.autor.id) {
        setTitulo(article.titulo);
        setResumo(article.resumo);
        setImagem(article.imagem);
        setConteudo(article.conteudo || '');
        setDeletavel(true);
      } else{
        navigate('/')
      }
    }
  }, [article,navigate]);

  // criamos um novo evento para este componente: sempre que o usuário 
  // fizer o submit do form, vamos enviar para o componente pai o artigo
  // que deve ser submetido.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const articleToSubmit = {
        ...article,
        titulo,
        resumo,
        imagem,
        conteudo,
      };
      onSubmit(articleToSubmit as ArticleThumbnailProps)
    }
  }

  const handleDelete = () => {
    if(article){
      if (onDelete) {
          onDelete(article)
      }
    }
  }  

  const transformaImagemEmBase64 = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImagem(event.target.result);
    };
  };

  return (
    <div className="grid min-h-screen mx-10 ">
      <div>
        <h1 className="text-xl font-semibold">
          Hello there 👋,&nbsp;
          <span className="font-normal">please fill in your information to continue</span>
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <Input
            placeholder="Digite aqui o título"
            type="text"
            name="titulo"
            label="Titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <Input
            placeholder="Breve resumo do artigo"
            type="textarea"
            name="resumo"
            label="Resumo"
            value={ resumo }
            onChange={(e) => setResumo(e.target.value)}
            required
          />

          <Input
            placeholder="Breve resumo do artigo"
            type="file"
            name="image"
            label="Banner"
            onChange={transformaImagemEmBase64}
            required
          />

          <RitchTextEditor
            label="Conteúdo"
            name="conteudo"
            value={ conteudo }
            onChange={ setConteudo }
          />
          <div className="flex flex-wrap -mx-3 mb-6">
            <Button type="submit">Salvar</Button>
            <Button type="button" primaryColor="gray"
              onClick={()=>navigate('/')}>
                Voltar
            </Button>
            <Button type="button" primaryColor="red"
              onClick={handleDelete}>
              Deletar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};