import React, { useEffect, useState } from "react";
import { Button, Alert,AlertTitle } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";

const Generos = () => {
  // UseState => Capturando os elementos da tela.
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(false)

  // GET => Colocando todos os elementos em tela.
  useEffect(() => {
    axios.get("/api/genres")
    .then((response) => setDatas(response.data.data));
  });

  // DELETE
  const deletarGenero = (id) => {
    axios.delete(`/api/genres/${id}`)
    .then(response => setShow(true));
  };

  return (
    <div className="container mt-2">
      {show && <Alert severity="success" onClose={() => setShow(false)}><AlertTitle>Deletado</AlertTitle>Deletado com sucesso!</Alert>}
      <table className="table mt-3">
        <thead className="bg-warning">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Gêneros</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => (
            <tr key={data.id}>
              <th scope="row">{data.id}</th>
              <td>{data.name}</td>
              <td>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deletarGenero(data.id)}
                >
                  Excluir
                </Button>
                <Button variant="outlined" color="primary">
                  <Link
                    to={`/generos/` + data.id}
                    className="text-decoration-none"
                  >
                    Editar
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="contained" color="success">
        <Link
          to="/generos/CadastroDeGeneros"
          className="text-light text-decoration-none"
        >
          CADASTRO DE NOVO GÊNERO
        </Link>
      </Button>
    </div>
  );
};

export default Generos;
