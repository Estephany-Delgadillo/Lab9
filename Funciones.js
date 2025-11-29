export function formatearFechaTradicional(fecha) {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const formatearFechaFlecha = fecha => 
  new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

function mostrarInfoTradicional() {
  return `Ejecutado el: ${new Date().toLocaleString()}`;
}

const mostrarInfoFlecha = () => mostrarInfoTradicional();

export { mostrarInfoTradicional, mostrarInfoFlecha };