import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {LoginPage} from './pages/Login';
import {ArtigosPage} from './pages/ArtigosPage/index';
import {ArtigoPage} from './pages/ArtigoPage/index';
import {MeusArtigosPage} from './pages/MeusArtigosPage';
import {EditarArquivoPage} from './pages/EditarArquivoPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {Layout} from './components/Layout';
import { RequireAuth } from "./components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<ArtigosPage />} />
        <Route path="/artigo/:id" element={<ArtigoPage />} />

        <Route element={ <RequireAuth /> }>
          <Route path="/artigos" element={<MeusArtigosPage />} />
          <Route path="/artigos/editar/:id" element={<EditarArquivoPage />} />
          <Route path="/artigos/novo" element={<EditarArquivoPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;