import { useState, useEffect } from "react";
import { BuscarUser } from "../../componentes/BuscarUser";
import { CrearUser } from "../../componentes/CrearUser";
// import { useSelector } from "react-redux";

// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from "@mui/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    backgroundColor: "#C9FFC2",
  },
  tableCell: {
    fontSize: "0.75rem",
  },
});

export function UsersTablas() {
  const urltable = "/dashboard/usertablas";
  // const user = useSelector((state) => state.user.user);

  const [showContent, setShowContent] = useState(true);

  const classes = useStyles();
  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "nombres", label: "NOMBRES", minWidth: 50 },
    { id: "apellidos", label: "APELLIDOS", minWidth: 50 },
    { id: "ci", label: "CI", minWidth: 150 },
    { id: "complemento", label: "COMPLEMENTO", minWidth: 250 },
    { id: "correo", label: "CORREO", minWidth: 50 },
    { id: "complemento", label: "COMPLEMENTO", minWidth: 50 },
    { id: "es_activo", label: "ACTIVO", minWidth: 50 },
    // { id: "last_login", label: "LAST LOGIN", minWidth: 50 },
  ];

  /* const rows = Array.isArray(user) ? user : [user];

  useEffect(() => {
    setShowContent(true);
    const timeout = setTimeout(() => {
      setShowContent(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [user]); */
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        {/* {showContent && user && (
          <>
            <Typography
              className="p-3 pl-7 text-c600 text-2xl "
              variant="h4"
              gutterBottom
            >
              Usuario Actualizado y/o Creado
            </Typography>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{
                            minWidth: column.minWidth,
                            textAlign: "center",
                          }}
                          className={classes.tableCell}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align="center"
                            style={{ textAlign: "center" }}
                            className={classes.tableCell}
                          >
                            {row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )} */}
      </div>
      <br />
      <Typography
        className="p-3 pl-7 text-c600 text-2xl "
        variant="h4"
        gutterBottom
      >
        Usuarios
      </Typography>
      <CrearUser urltable={urltable} />
      <BuscarUser urltable={urltable} />
    </>
  );
}
