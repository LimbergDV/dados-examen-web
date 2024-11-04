import { Component } from '@angular/core';
import { Dado } from '../interfaces/dado';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {
  dados: Dado[] = [];
  chances: number = 3;
  recomendaciones: string[] = [];

  constructor() {
    this.inicializarDados();
  }

  inicializarDados() {
    this.dados = Array(5).fill(null).map(() => ({
      value: this.obtenerNumeroDado(),
      isLocked: false
    }));
  }

  obtenerNumeroDado(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  tirarDados() {
    if (this.chances > 0) {
      this.dados.forEach(dado => {
        if (!dado.isLocked) {
          dado.value = this.obtenerNumeroDado();
        }
      });
      this.chances--;
      this.evaluarDados();
    }
  }

  bloquearDado(dado: Dado) {
    dado.isLocked = !dado.isLocked;
  }

  reiniciarJuego() {
    this.chances = 3;
    this.inicializarDados();
  }

  evaluarDados(){
    const contador = Array(7).fill(0);
    this.dados.forEach(dado => contador[dado.value]++);

    const tieneTresDeUnTipo = contador.some(count => count >= 3);
    const tieneCuatroDeUnTipo = contador.some(count => count >= 4);
    const tieneFullHouse = contador.filter(count => count === 3).length === 1 && contador.filter(count => count === 2).length === 1;
    const tieneYatzy = contador.some(count => count === 5);
    const esSecuenciaBaja = this.verificarSecuenciaBaja(contador);
    const esSecuenciaAlta = this.verificarSecuenciaAlta(contador);

    this.recomendaciones = [];


    for (let i = 1; i <= 6; i++) {
      if (contador[i] > 0) {
        this.recomendaciones.push(`${contador[i]} ${i}s`);
      }
    }

    if (tieneTresDeUnTipo) this.recomendaciones.push('Tres de un tipo');
    if (tieneCuatroDeUnTipo) this.recomendaciones.push('Cuatro de un tipo');
    if (tieneYatzy) this.recomendaciones.push('¡Yatzy! (Cinco de un tipo)');
    if (tieneFullHouse) this.recomendaciones.push('Full House (Tres de un tipo y dos de otro)');
    if (esSecuenciaBaja) this.recomendaciones.push('Secuencia baja');
    if (esSecuenciaAlta) this.recomendaciones.push('Secuencia alta');
  }

  verificarSecuenciaBaja(contador: number[]): boolean {
    return contador[1] > 0 && contador[2] > 0 && contador[3] > 0 && contador[4] > 0;
  }

  verificarSecuenciaAlta(contador: number[]): boolean {
    return contador[2] > 0 && contador[3] > 0 && contador[4] > 0 && contador[5] > 0;
  }
}
