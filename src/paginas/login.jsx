import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { guardarToken } from "../auth/auth";
import { guardarUserId, guardarRoles } from "../utils/userdata";

import { jwtDecode } from "jwt-decode";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// import portadalogin from "../assets/portadalogin.jpg";
// import portalabajo2 from "../assets/portalabajo2.jpg";

import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardActionArea } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Unstable_Grid2";

import portadalogin from "../assets/portadalogin.jpg";

export function Login() {
  const apiKey = import.meta.env.VITE_BASE_URL_BACKEND;
  const navigate = useNavigate();

  const loginUrl = `${apiKey}/auth/login`;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    ci: "",
    contrasenia: "",
  });
  const [loginError, setLoginError] = useState(null);

  const [loginErrorMensaje, setLoginErrorMensaje] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginUrl, formData);

      if (response.status === 200 || response.status === 201) {
        setLoginError(null);
        const { tk } = response.data;
        const { sub, username, camb_contra, roles } = jwtDecode(tk);
        const user = { sub, username, camb_contra, roles };
        if (user.camb_contra === false) {
          navigate("updatepassword");
          // } else if (arraysSonIguales(user.roles, [1, 2, 3])) {
        } else if (roles.some((role) => [1, 2, 3].includes(role))) {
          navigate("dashboard/userstablas");
        }
        console.log(jwtDecode(tk));
        guardarUserId(user.sub);
        guardarRoles(user.roles);
        guardarToken(tk);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setLoginError(`RS: ${data.message}`);
          setLoginErrorMensaje(`RS: ${data.error}`);
        } else if (status === 401) {
          setLoginError(`RS: ${data.message}`);
          setLoginErrorMensaje(`RS: ${data.error}`);
        } else if (status === 500) {
          setLoginError(`RS: ${data.message}`);
          setLoginErrorMensaje(`RS: ${data.error}`);
        }
      } else if (error.request) {
        setLoginError("RF: No se pudo obtener respuesta del servidor");
      } else {
        setLoginError("RF: Error al enviar la solicitud");
      }
    }
  };

  useEffect(() => {
    setIsButtonDisabled(formData.username === "" || formData.password === "");
  }, [formData.username, formData.password]);
  return (
    <div className="flex justify-center items-center h-full px-10">
      <div className="py-10">
        <Card
          elevation={24}
          sx={{
            maxWidth: { xs: 350, md: 500 },
          }}
        >
          <CardActionArea>
            <CardMedia sx={{ height: 130 }} image={portadalogin} />
            <CardContent>
              <Typography
                className="text-center text-c600"
                variant="h4"
                gutterBottom
              >
                Iniciar Sesión
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2 }}>
                  <Grid xs={12}>
                    <TextField
                      id="xi"
                      label="CI de Usuario"
                      variant="outlined"
                      name="ci"
                      required
                      fullWidth
                      value={formData.ci}
                      onChange={handleInputChange}
                    />
                    {loginErrorMensaje && (
                      <p className="text-red-700 text-center">
                        {loginErrorMensaje}
                      </p>
                    )}
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      id="contrasenia"
                      label="Contraseña"
                      variant="outlined"
                      name="contrasenia"
                      type={showPassword ? "text" : "password"}
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
                </Grid>
                <br />
                <Grid className="flex flex-wrap mx-auto justify-center items-center">
                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={isButtonDisabled}
                  >
                    Iniciar sesión
                  </Button>
                </Grid>
              </form>
              {loginError && (
                <p className="text-red-700 text-center">{loginError}</p>
              )}
            </CardContent>
            {/* <CardMedia sx={{ height: 300 }} image={portalabajo2} /> */}
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
