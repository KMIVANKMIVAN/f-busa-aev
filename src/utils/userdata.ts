export const guardarUserId = (id: number) => {
  if (typeof id !== "number") {
    console.error("Token no válido");
    return;
  }

  try {
    localStorage.setItem("userid", id.toString());
  } catch (error) {
    console.error("Error al guardar el user id:", error);
  }
};
export const obtenerUserId = () => {
  try {
    const userId = localStorage.getItem("userid");
    if (userId === null) {
      console.error("No se encontró el ID de usuario en el localStorage");
      return null; // o puedes devolver un valor predeterminado si lo deseas
    }

    return parseInt(userId, 10); // Convierte la cadena de ID a un número
  } catch (error) {
    console.error("Error al obtener el ID de usuario:", error);
    return null; // o un valor predeterminado en caso de error
  }
};
export const eliminarUserId = () => {
  try {
    console.log("se elimino el userid");

    localStorage.removeItem("userid");
  } catch (error) {
    console.error("Error al eliminar el userid:", error);
  }
};
////roles
export const guardarRoles = (roles) => {
  try {
    console.log("roles", roles);

    // Asegurarse de que roles es realmente un array
    if (!Array.isArray(roles)) {
      console.error("Los roles proporcionados no son válidos");
      return;
    }
    const rolesStr = JSON.stringify(roles);
    localStorage.setItem("roles", rolesStr);
  } catch (error) {
    console.error("Error al guardar los roles:", error);
  }
};
export const obtenerRoles = () => {
  try {
    const rolesStr = localStorage.getItem("roles");
    if (rolesStr === null) {
      console.error("No se encontraron roles en el localStorage");
      return null;
    }
    return JSON.parse(rolesStr);
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    return null;
  }
};
export const eliminarRoles = () => {
  try {
    console.log("Se eliminaron los roles");

    localStorage.removeItem("roles");
  } catch (error) {
    console.error("Error al eliminar los roles:", error);
  }
};

export const darPaso = (componente, rolesUsuario) => {
  try {
    if (Array.isArray(componente)) {
      // Si componente es un array, verificamos si hay intersección entre los roles del usuario y los componentes
      const tieneAcceso = componente.some(comp => rolesUsuario.includes(comp));
      return tieneAcceso;
    } else {
      // Si componente es un número único, verificamos si está presente en los roles del usuario
      const tieneAcceso = rolesUsuario.includes(componente);
      return tieneAcceso;
    }
  } catch (error) {
    console.error('Hubo un Error al verificar el componente con el módulo:', error);
    return false;
  }
};
