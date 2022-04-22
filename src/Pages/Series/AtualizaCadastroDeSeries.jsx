import React, { useEffect, useState } from "react";
import { Typography, Button, MenuItem, TextField } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const EditarSeries = () => {
  let { id } = useParams();

  const [obj, setObj] = useState({});

  const [show, SetShow] = useState(false);

  const lista = ["name", "status", "comments"];

  const [genres, setGenres] = useState([]);
  
  useEffect(() => {
    axios.get("/api/genres").then((resp) => setGenres(resp.data.data));
  }, []);

  useEffect(() => {
    axios.get(`/api/series/${id}`).then((res) => {
      setObj({
        name: res.data.name,
        status: res.data.status,
        comments: res.data.comments,
        genre_id: res.data.genre_id,
        background: res.data.background,
        poster: res.data.poster,
      });
    });
  }, [id]);

    const BackgroundDiv = styled.div`
    background: url(${obj["poster"]});
    width: 40vw;
    height: 600px;
    background-size: cover;
    background-position: center;
    margin-bottom: 2rem;
  `;

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setObj({
      ...obj,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios
      .put(`/api/series/${id}`, {
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
      <img
        src={`${obj["background"]}`}
        className="img-fluid mb-2"
        alt=""
        style={{ filter: "grayscale(70%)" }}
      />

      <Typography
        variant="h2"
        component="h2"
        color="primary"
        className="mb-3 text-center"
      >
        {`Editar Serie: ${obj.name}`}
      </Typography>

      <section className="d-flex g-2 justify-content-between">
        <BackgroundDiv className="img-thumbnail"></BackgroundDiv>
        <div className="d-flex flex-column gap-2 w-50">
          {lista.map((item) => (
            <>
              <label key={item.name}>{item}</label>
              <input
                key={item.name}
                id="outlined-basic"
                label={item}
                variant="outlined"
                name={item}
                value={obj[item]}
                onChange={handleChange}
              />
            </>
          ))}
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
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" color="info" onClick={handleSubmit}>
            Editar
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EditarSeries;
