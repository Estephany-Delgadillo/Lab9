export class Prestamo {
  constructor(libro, usuario) {
    this.libro = libro;
    this.usuario = usuario;
    this.fechaPrestamo = new Date();
    this.fechaDevolucion = null;
    this.multa = 0;
  }

  registrarDevolucion() {
    if (this.fechaDevolucion === null) {
      this.fechaDevolucion = new Date();
      this.multa = this.calcularMulta();
      this.libro.devolver();
    }
  }

  calcularMulta = () => {
    if (!this.fechaDevolucion) return 0;
    const dias = this._diasTranscurridos();
    if (dias > 15) {
      return (dias - 15) * 2;
    }
    return 0;
  };

  _diasTranscurridos() {
    const diffTime = Math.abs(this.fechaDevolucion - this.fechaPrestamo);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  infoPrestamo() {
    const estado = this.fechaDevolucion
      ? `Devuelto con multa: $${this.multa}`
      : `En préstamo (hace ${Math.ceil((new Date() - this.fechaPrestamo) / (1000 * 60 * 60 * 24))} días)`;

    const detalle = () => `Préstamo: ${this.libro.titulo} a ${this.usuario.nombre} - ${estado}`;
    return detalle();
  }
}