import { BuscarUser } from "../../componentes/BuscarUser";
import { CrearUser } from "../../componentes/CrearUser";

import Typography from "@mui/material/Typography";

export function UsersTablas() {
  return (
    <>
      <Typography
        className="p-3 pl-7 text-c600 text-2xl "
        variant="h4"
        gutterBottom
      >
        Usuarios
      </Typography>
      <CrearUser />
      <BuscarUser />
    </>
  );
}
