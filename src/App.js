import { BrowserRouter, Route, Routes } from "react-router-dom";
import Generos from "./Data/Generos";
import Header from "./Header/Header";
import EditarGenero from "./Pages/Generos/AtualizaCadastroDeGeneros";
import CadastroDeGeneros from "./Pages/Generos/CadastroDeGeneros";
import Series from "./Data/Series";
import CadastroDeSeries from "./Pages/Series/CadastroDeSeries";
import EditarSeries from "./Pages/Series/AtualizaCadastroDeSeries";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/generos" element={<Generos />} />
          <Route exact path="/series" element={<Series />} />

          <Route exact path="/generos/CadastroDeGeneros" element={<CadastroDeGeneros />} />
          <Route exact path="/series/CadastroDeSeries" element={<CadastroDeSeries />} />

          <Route exact path="/generos/:id" element={<EditarGenero />} />
          <Route exact path="/series/:id" element={<EditarSeries />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
