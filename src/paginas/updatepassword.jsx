import { useState } from "react";
import axios from "axios";

import { obtenerToken } from "../auth/auth";
import { obtenerUserId } from "../auth/userdata";

import Bicentenario from "../assets/Bicentenario.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import validator from "validator";
import { Button } from "@mui/material";

export function UpdatePassword() {
  const userId = obtenerUserId();

  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);

  const [formData, setFormData] = useState({
    contrasenia: "",
    contraseniaAntigua: "",
    confirmContrasenia: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    `Mínimo 8 Caracteres, Símbolos, Números, Mayúsculas, Minúsculas: No se cambiará`
  );

  const validate = (contrasenia) => {
    if (!contrasenia) {
      setErrorMessage(
        "Mínimo 8 Caracteres, Símbolos, Números, Mayúsculas, Minúsculas: No se cambiará"
      );
    } else if (
      validator.isStrongPassword(contrasenia, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Contraseña Segura");
    } else {
      setErrorMessage(
        "Mínimo 8 Caracteres, Símbolos, Números, Mayúsculas, Minúsculas: No se cambiará"
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "contrasenia" || name === "confirmContrasenia") {
      validate(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contrasenia === formData.confirmContrasenia) {
      try {
        const token = obtenerToken();
        const url = `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/usuarios/updatepw/${userId}`;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const data = {
          contraseniaAntigua: formData.contraseniaAntigua,
          contrasenia: formData.contrasenia,
          confirmContrasenia: formData.confirmContrasenia,
        };
        const response = await axios.patch(url, data, { headers });

        window.location.href = "/";
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            setError(`RS: ${data.error}`);
          } else if (status === 401) {
            setError(`RS: ${data.error}`);
          } else if (status === 500) {
            setError(`RS: ${data.error}`);
          }
        } else if (error.request) {
          setError("RF: No se pudo obtener respuesta del servidor");
        } else {
          setError("RF: Error al enviar la solicitud");
        }
      }
    } else {
      setError2("Las contraseñas no coinciden");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="py-10">
          <Card sx={{ maxWidth: { xs: 350, md: 500 } }} elevation={24}>
            <CardActionArea>
              <CardMedia sx={{ height: 270 }} image={Bicentenario} />
              <CardContent>
                <Typography
                  className="text-center text-c600"
                  variant="h4"
                  gutterBottom
                >
                  Actualiza tu Contraseña
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={{ xs: 2 }}>
                    <Grid xs={12}>
                      <TextField
                        id="contraseniaAntigua"
                        name="contraseniaAntigua"
                        label="Contraseña Anterior"
                        variant="outlined"
                        required
                        fullWidth
                        value={formData.contraseniaAntigua}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        id="contrasenia"
                        name="contrasenia"
                        type={showPassword ? "text" : "password"}
                        label="Contraseña"
                        variant="outlined"
                        required
                        fullWidth
                        value={formData.contrasenia}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        id="confirmContrasenia"
                        name="confirmContrasenia"
                        type={showPassword ? "text" : "password"}
                        label="Actualizar contraseña"
                        variant="outlined"
                        required
                        fullWidth
                        value={formData.confirmContrasenia}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid className="flex flex-wrap mx-auto justify-center items-center">
                    <Button
                      variant="outlined"
                      type="submit"
                      className={`rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                        errorMessage.includes("No se cambiará") ||
                        formData.contrasenia !== formData.confirmContrasenia
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={
                        errorMessage.includes("No se cambiará") ||
                        formData.contrasenia !== formData.confirmContrasenia
                      }
                    >
                      Actualizar contraseña
                    </Button>
                  </Grid>
                </form>
                {error2 && (
                  <p className="text-red-500 text-lg text-center">{error2}</p>
                )}
                <p className="text-red-500 text-lg text-center">{error}</p>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </>
  );
}
