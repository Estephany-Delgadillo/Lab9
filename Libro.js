import { formatearFechaFlecha } from '../helpers/Funciones.js';

export class Libro {
  constructor(titulo, autor, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.disponible = true;
    this.fechaRegistro = new Date();
  }

  prestar() {
    if (this.disponible) {
      this.disponible = false;
      return true;
    }
    return false;
  }

  devolver = () => {
    this.disponible = true;
    console.log(`Libro devuelto: ${this.titulo}`);
  };

  infoRegistro() {
    return `Registrado el: ${formatearFechaFlecha(this.fechaRegistro)}`;
  }

  get descripcion() {
    return `${this.titulo} - ${this.autor}`;
  }

  static crearLibroDemo = () => new Libro("Libro Demo", "Autor Demo", "000000");

  diasPrestamo = () => (this.disponible ? 0 : 15);

  estaDisponible() {
    return this.disponible;
  }

  static validarISBN = (isbn) => {
    const regex = /^\d{6}$/;
    return regex.test(isbn);
  };
}