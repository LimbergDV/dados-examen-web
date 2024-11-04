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
  }
}
