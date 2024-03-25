import { useState } from "react";
import axios from "axios";
import { obtenerToken } from "../auth/auth";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

// import { obtenerUserNivel } from "../utils/userdata";

// import { useDispatch } from "react-redux";
// import { setUser } from "../contexts/features/user/userSlice";
// import { increment } from "../contexts/features/user/counterUserSlice";

export function CrearUser() {
  const apiKey = import.meta.env.VITE_BASE_URL_BACKEND;

  // const dispatch = useDispatch();
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [submit, setSubmit] = useState(false);
  // const [isFormValid, setIsFormValid] = useState(false);
  // const registerUserUrl = `${apiKey}/users/create/${obtenerUserNivel()}`;
  const registerUserUrl = `${apiKey}/usuarios`;
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [formData, setFormData] = useState({
    nombre_usuario: "",
    contrasenia: "",
    nombres: "",
    apellidos: "",
    correo: "",
    ci: "",
    complemento: "",
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
        setSubmit(true);
        setErrorSubmit(null);
        // dispatch(setUser(response.data));
        // dispatch(increment());
      }
    } catch (error) {
      if (error.response) {
        setSubmit(false);
        const { status, data } = error.response;
        if (status === 400) {
          setErrorSubmit(`RS: ${data.message}`);
        } else if (status === 401) {
          setErrorSubmit(`RS: ${data.message}`);
        } else if (status === 500) {
          setErrorSubmit(`RS: ${data.message}`);
        }
      } else if (error.request) {
        setErrorSubmit("RF: No se pudo obtener respuesta del servidor");
      } else {
        setErrorSubmit("RF: Error al enviar la solicitud");
      }
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack className="pl-7" spacing={2} direction="row">
        <Button
          variant="outlined"
          endIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleClickOpen}
        >
          Crear Usuarios
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        /* onClose={() => {
          if (submit) {
            handleClose();
          }
          if (!errorSubmit) {
            handleClose();
          }
        }} */
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form className="space-y-1" onSubmit={handleSubmit}>
          <Typography
            className="text-center text-c600  pt-5"
            variant="h4"
            gutterBottom
          >
            Crear Usuario
          </Typography>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2 }}>
                  <Grid xs={12} sm={6}>
                    <TextField
                      id="nombre_usuario"
                      label="Nombre de Usuario"
                      variant="outlined"
                      name="nombre_usuario"
                      required
                      fullWidth
                      value={formData.nombre_usuario}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      id="contrasenia"
                      label="Contraseña"
                      variant="outlined"
                      name="contrasenia"
                      required
                      fullWidth
                      value={formData.contrasenia}
                      onChange={handleInputChange}
                    />
                  </Grid>
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
                      label="ci"
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
            <Button onClick={handleClose} variant="outlined">
              Cerrar
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              /* onClick={() => {
                if (!errorSubmit) {
                  handleClose();
                }
                if (submit) {
                  handleClose();
                }
              }} */
              variant="outlined"
              color="success"
            >
              Guardar
            </Button>
          </DialogActions>
        </form>
        {errorSubmit && (
          <p className="text-red-700 text-center p-5">{errorSubmit}</p>
        )}
      </Dialog>
    </>
  );
}
