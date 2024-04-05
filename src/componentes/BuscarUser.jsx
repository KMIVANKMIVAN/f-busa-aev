import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
import { obtenerToken } from "../auth/auth";

import ZoomInIcon from "@mui/icons-material/ZoomIn";

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { TableUser } from "./TableUser";

export function BuscarUser() {
  const apiKey = import.meta.env.VITE_BASE_URL_BACKEND;

  const [buscar, setBuscar] = useState("");
  const [datoscontratoData, setDatoscontratoData] = useState([]);
  const [errorDatoscontratoData, setErrorDatoscontratoData] = useState([]);

  const [reloadComponents, setReloadComponents] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setBuscar(value);
  };

  const handleSearch = async () => {
    try {
      const url = `${apiKey}/usuarios/buscarci/${buscar}`;
      const token = obtenerToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        setReloadComponents(!reloadComponents);
        setErrorDatoscontratoData(null);
        setDatoscontratoData(response.data);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setErrorDatoscontratoData(`RS: ${data.message}`);
        } else if (status === 500) {
          setErrorDatoscontratoData(`RS: ${data.message}`);
        }
      } else if (error.request) {
        setErrorDatoscontratoData(
          "RF: No se pudo obtener respuesta del servidor"
        );
      } else {
        setErrorDatoscontratoData("RF: Error al enviar la solicitud");
      }
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <Typography
          className="p-3 text-c600 text-2xl"
          variant="h4"
          gutterBottom
        >
          Buscar
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={1}></Grid>
          <Grid xs={10}>
            <TextField
              name="codigo"
              helperText="Ejemplo: nombre.apellido o 123456789"
              id="standard-basic"
              label="Nombre de Usuario o Carnet de Identidad:"
              variant="standard"
              className="w-full "
              value={buscar}
              onChange={handleInputChange}
            />
            <br />{" "}
            <Button
              onClick={handleSearch}
              variant="outlined"
              endIcon={<ZoomInIcon />}
            >
              Buscar
            </Button>
          </Grid>
          <Grid xs={1}></Grid>
        </Grid>
      </div>
      {errorDatoscontratoData && (
        <p className="text-red-700 text-center">{errorDatoscontratoData}</p>
      )}
      <br />
      <TableUser datosUsuario={datoscontratoData} />
    </>
  );
}
