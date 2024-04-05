import { useState, useEffect } from "react";
import axios from "axios";
import { obtenerToken } from "../auth/auth";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import { TableUser } from "./TableUser";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export function CrearUser() {
  const apiKey = import.meta.env.VITE_BASE_URL_BACKEND;

  const [datosRegistro, setDatosRegistro] = useState([]);
  const [errorDatosRegistro, setErrorDatosRegistro] = useState(null);

  // const [, set] = useState([]);
  // const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [errorRoles, setErrorRoles] = useState(null);

  const [sucursales, setSucursales] = useState([]);
  const [errorSucursales, setErrorSucursales] = useState(null);

  const registerUserUrl = `${apiKey}/usuarios`;
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    ci: "",
    complemento: null,
    es_activo: true,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let uppercaseValue = value;
    if (name === "nombres" || name === "apellidos") {
      uppercaseValue = value.toUpperCase();
    }

    setFormData({ ...formData, [name]: uppercaseValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(registerUserUrl, formData, { headers });

      if (response.data) {
        setErrorDatosRegistro(null);
        setDatosRegistro(response.data);
      }
    } catch (error) {
      if (error.response) {
        setDatosRegistro([]);
        const { status, data } = error.response;
        if (status === 400) {
          setErrorDatosRegistro(`RS: ${data.message}`);
        } else if (status === 401) {
          setErrorDatosRegistro(`RS: ${data.message}`);
        } else if (status === 500) {
          setErrorDatosRegistro(`RS: ${data.message}`);
        }
      } else if (error.request) {
        setErrorDatosRegistro("RF: No se pudo obtener respuesta del servidor");
      } else {
        setErrorDatosRegistro("RF: Error al enviar la solicitud");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiKey}/sucursales`;
        const response = await axios.get(url, { headers });

        if (response.status === 200) {
          setErrorSucursales(null);
          setSucursales(response.data);
        }
      } catch (error) {
        setSucursales(null);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 || status === 500) {
            setErrorSucursales(`RS: ${data.message}`);
          }
        } else if (error.request) {
          setErrorSucursales("RF: No se pudo obtener respuesta del servidor");
        } else {
          setErrorSucursales("RF: Error al enviar la solicitud");
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiKey}/roles`;
        const response = await axios.get(url, { headers });

        if (response.status === 200) {
          setErrorRoles(null);
          setRoles(response.data);
        }
      } catch (error) {
        setRoles([]);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 || status === 500) {
            setErrorRoles(`RS: ${data.error}`);
          }
        } else if (error.request) {
          setErrorRoles("RF: No se pudo obtener respuesta del servidor");
        } else {
          setErrorRoles("RF: Error al enviar la solicitud");
        }
      }
    };
    fetchData();
  }, []);

  console.log(roles);
  console.log(sucursales);
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography className="text-c600 " variant="h5" gutterBottom>
              Crear Usuario
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form className="space-y-1" onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2 }}>
                      <Grid xs={12} sm={6}>
                        <TextField
                          id="nombres"
                          label="Nombres"
                          variant="outlined"
                          name="nombres"
                          required
                          fullWidth
                          value={formData.nombres}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <TextField
                          id="apellidos"
                          label="Apellidos"
                          variant="outlined"
                          name="apellidos"
                          required
                          fullWidth
                          value={formData.apellidos}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <TextField
                          id="ci"
                          label="CI"
                          variant="outlined"
                          name="ci"
                          required
                          fullWidth
                          value={formData.ci}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <TextField
                          id="complemento"
                          label="Complemento"
                          variant="outlined"
                          name="complemento"
                          // required
                          fullWidth
                          value={formData.complemento}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <TextField
                          id="correo"
                          label="Correo"
                          variant="outlined"
                          name="correo"
                          required
                          fullWidth
                          value={formData.correo}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Estado
                          </InputLabel>
                          <Select
                            label="Estado"
                            id="es_activo"
                            name="es_activo"
                            required
                            value={formData.es_activo}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                es_activo: e.target.value === "true", // Convertir a booleano
                              })
                            }
                          >
                            <MenuItem value="Seleccionar">Seleccionar</MenuItem>
                            <MenuItem value="true">Activo</MenuItem>
                            <MenuItem value="false">Inactivo</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="outlined"
                  color="success"
                >
                  Guardar
                </Button>
              </DialogActions>
            </form>
            {errorDatosRegistro && (
              <p className="text-red-700 text-center p-5">
                {errorDatosRegistro}
              </p>
            )}
          </AccordionDetails>
        </Accordion>
        <TableUser datosUsuario={datosRegistro} />
      </div>
    </>
  );
}
