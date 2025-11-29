import { BibliotecaService } from './servicios/BibliotecaService.js';
import { mostrarInfoFlecha } from './helpers/Funciones.js';
import { Libro } from './entidades/Libro.js';

console.log(mostrarInfoFlecha());

const biblioteca = new BibliotecaService();
console.log(biblioteca.infoSistema());

biblioteca.agregarLibro("Los juegos del hambre", "Suzane Collis", "123456");
biblioteca.registrarUsuario("Estephany Vanessa Delgadillo Salgado", "001");

const libroDemo = Libro.crearLibroDemo();
biblioteca.libros.push(libroDemo);

biblioteca.buscarLibroPorTitulo("soledad", function(resultados) {
  console.log("\nResultados de búsqueda (tradicional):");
  resultados.forEach(libro => console.log(libro.descripcion));
});

biblioteca.buscarUsuarioPorNombre("ana", resultados => {
  console.log("\nUsuarios encontrados (flecha):");
  resultados.forEach(user => console.log(user.nombre));
});

const prestamo = biblioteca.registrarPrestamo("123456", "001");
if (prestamo) {
  
prestamo.fechaPrestamo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);
  
  console.log("\nPréstamo registrado:");
  console.log(prestamo.infoPrestamo());
}
setTimeout(() => {
  console.log("\nSimulando devolución después de 20 días...");
  prestamo.registrarDevolucion();
  console.log("Devolución registrada:");
  console.log(prestamo.infoPrestamo());

  biblioteca.buscarPrestamosPorUsuario("001", function(prestamos) {
    console.log("\nPréstamos del usuario:");
    prestamos.forEach(p => console.log(p.infoPrestamo()));
  });

  const totalMultas = biblioteca.calcularMultasPendientes();
  console.log(`\nMultas pendientes totales: $${totalMultas}`);

  biblioteca.usuarios[0].mostrarHistorial();

}, 2000);
