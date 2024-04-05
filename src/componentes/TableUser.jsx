import { useState, useEffect } from "react";

import axios from "axios";
import { obtenerToken } from "../auth/auth";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function TableUser({ datosUsuario }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [reloadComponents, setReloadComponents] = useState(false);

  useEffect(() => {
    const dataLoaded =
      datosUsuario && Array.isArray(datosUsuario) && datosUsuario.length > 0;
    setIsDataLoaded(dataLoaded);
  }, [datosUsuario]); // Dependencias en las que re-ejecutar este efecto

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "actualizar", label: "ACTUALIZAR", minWidth: 100, align: "center" },
    {
      id: "habilitardes",
      label: "DESHABILITADO / HABILITADO",
      minWidth: 150,
      align: "center",
    },
    { id: "nombres", label: "NOMBRES", minWidth: 150 },
    { id: "apellidos", label: "APELLIDOS", minWidth: 150 },
    { id: "ci", label: "CI", minWidth: 150 },
    { id: "complemento", label: "COMPLEMENTO", minWidth: 150 },
    { id: "correo", label: "CORREO", minWidth: 150 },
    { id: "complemento", label: "COMPLEMENTO", minWidth: 50 },
    { id: "es_activo", label: "ACTIVO", minWidth: 50 },
    // { id: "last_login", label: "LAST LOGIN", minWidth: 50 },
  ];

  return (
    <>
      {isDataLoaded && (
        <div
          key={reloadComponents}
          className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4"
        >
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosUsuario.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            style={{ textAlign: "center" }}
                          >
                            {column.id === "es_activo" ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {value ? "Activo" : "Inactivo"}
                              </div>
                            ) : column.id === "actualizar" ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                HOLA
                                {/* <ActualizarUser idActualizarUser={row.id} /> */}
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      )}
      {/* <AcordeonUserWrapper
        isVisible={isActualizarUserVisible}
        userId={selectedUserId}
        urltable={urltable}
        selectedHabilitado={selectedHabilitado}
        onHide={setIsActualizarUserVisible}
      /> */}
      <br />
    </>
  );
}
