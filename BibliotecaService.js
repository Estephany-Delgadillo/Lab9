import { Libro } from '../entidades/Libro.js';
import { Usuario } from '../entidades/Usuario.js';
import { Prestamo } from '../entidades/Prestamo.js';
import { formatearFechaTradicional } from '../helpers/Funciones.js';

export class BibliotecaService {
  constructor() {
    this.libros = [];
    this.usuarios = [];
    this.prestamos = [];
    this.inicioSistema = new Date();
  }

  agregarLibro(titulo, autor, isbn) {
    const libro = new Libro(titulo, autor, isbn);
    this.libros.push(libro);
    return libro;
  }

  registrarUsuario = (nombre, id) => {
    const usuario = new Usuario(nombre, id);
    this.usuarios.push(usuario);
    return usuario;
  };

  infoSistema() {
    return `Sistema iniciado el: ${formatearFechaTradicional(this.inicioSistema)}`;
  }

  buscarLibroPorTitulo(titulo, callback) {
    const resultado = this.libros.filter(function(libro) {
      return libro.titulo.toLowerCase().includes(titulo.toLowerCase());
    });
    callback(resultado);
  }

  buscarUsuarioPorNombre(nombre, callback) {
    const resultado = this.usuarios.filter(user => 
      user.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    callback(resultado);
  }

  registrarPrestamo = (libroId, usuarioId) => {
    const libro = this.libros.find(l => l.isbn === libroId);
    const usuario = this.usuarios.find(u => u.id === usuarioId);

    if (libro && usuario && libro.estaDisponible()) {
      libro.prestar();
      const prestamo = new Prestamo(libro, usuario);
      this.prestamos.push(prestamo);
      return prestamo;
    }
    return null;
  };

  buscarPrestamosPorUsuario(usuarioId, callback) {
    const prestamos = this.prestamos.filter(p => p.usuario.id === usuarioId);
    callback(prestamos);
  };

  calcularMultasPendientes = () => {
    return this.prestamos
      .filter(p => p.fechaDevolucion && p.multa > 0)
      .reduce((total, p) => total + p.multa, 0);
  };
}