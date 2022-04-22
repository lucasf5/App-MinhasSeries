import React, { useEffect, useState } from "react";
import { Button, Alert, AlertTitle } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";

const Series = () => {
  // UseState => Capturando os elementos da tela.
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);

  // GET => Colocando todos os elementos em tela.
  useEffect(() => {
    axios.get("/api/series").then((response) => setDatas(response.data.data));
  });

  // DELETE
  const deleteSerie = (id) => {
    axios.delete(`/api/series/${id}`).then((response) => setShow(true));
  };

  return (
    <div className="container mt-2">
      {show && (
        <Alert severity="success" onClose={() => setShow(false)}>
          <AlertTitle>Deletado</AlertTitle>Deletado com sucesso!
        </Alert>
      )}
      <table className="table mt-3">
        <thead className="bg-warning">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Status</th>
            <th scope="col">Gênero</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => (
            <tr key={data.id}>
              <th scope="row">{data.id}</th>
              <td>{data.name}</td>
              <td>
                {data.status === "Assistido" ? (
                  <Button variant="contained" color="success">
                    Assistido
                  </Button>
                ) : (
                  <Button variant="contained" color="error">
                    Para Assistir
                  </Button>
                )}
              </td>
              <td>{data.genre_id !== null ? data.genre_id : "Sem gênero"}</td>

              <td>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteSerie(data.id)}
                >
                  Excluir
                </Button>
                <Button variant="outlined" color="primary">
                  <Link
                    to={`/series/` + data.id}
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
          to="/series/CadastroDeSeries"
          className="text-light text-decoration-none"
        >
          CADASTRO DE NOVA SERIE
        </Link>
      </Button>
    </div>
  );
};

export default Series;
