import React, { useEffect, useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const EditarGenero = () => {
  const [name, setNome] = useState("");
  const [status, SetStatus] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`/api/genres/${id}`)
    .then((res) => {
      setNome(res.data.name);
    });
  }, [id]);

  const handleChange = (evento) => {
    setNome(evento.target.value);
  };

  const handleSubmit = () => {
    axios.put(`/api/genres/${id}`, {
        name,
    }).then(response => SetStatus(true));
  };

  if (status) {
    return <Navigate to="/generos" />;
  }

  return (
    <div className="container mt-5">
      <Typography variant="h2" component="h2" color="primary" className="mb-3">
        Editar Gênero
      </Typography>
      <div className="d-flex flex-column gap-2">
        <TextField
          id="outlined-basic"
          label="Gênero"
          variant="outlined"
          value={name}
          onChange={handleChange}
        />
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Editar
        </Button>
      </div>
    </div>
  );
};

export default EditarGenero;
