import React, { useEffect, useState } from "react";
import { TextField, Typography, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { Navigate } from "react-router-dom";

const currencies = ["Assistido", "Para assistir"];

const CadastroDeSeries = () => {
  const padrao = {
    name: "",
    status: "",
    comments: "",
    genre_id: "",
    options: "",
  };

  const [obj, setObj] = useState(padrao);

  const lista = ["name", "comments"];

  const [show, SetShow] = useState(false);

  const [genres, setGenres] = useState([]);


  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setObj({
      ...obj,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get("/api/genres").then((resp) => {
      setGenres(resp.data.data);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post("/api/series", {
        name: obj.name,
        status: obj.status,
        comments: obj.comments,
        genre_id: obj.genre_id,
      })
      .then((response) => {
        SetShow(true);
      });
  };

  if (show) {
    return <Navigate to="/series" />;
  }

  return (
    <div className="container mt-5">
      <Typography variant="h2" component="h2" color="primary" className="mb-3">
        Cadastro de Series
      </Typography>
      <div className="d-flex flex-column gap-2">
        {lista.map((item) => (
          <TextField
            key={item.name}
            id="outlined-basic"
            label={item}
            variant="outlined"
            name={item}
            value={obj[item]}
            onChange={handleChange}
          />
        ))}

        <TextField
          id="outlined-select-currency"
          select
          label="Status"
          value={obj["status"]}
          name="status"
          onChange={handleChange}
          helperText="Selecione o status"
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select-currency"
          select
          label="Gênero"
          value={obj["genre_id"]}
          name="genre_id"
          onChange={handleChange}
          helperText="Selecione o gênero"
        >
          {genres.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" color="success" onClick={handleSubmit}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default CadastroDeSeries;
