import { Component, Input } from "@angular/core";

@Component({
  selector: "app-selecao",
  templateUrl: "./selecao.component.html",
  styleUrls: ["./selecao.component.scss"],
})
export class SelecaoComponent {
  @Input()
  titulo: string;

  @Input()
  opcoes: string[];

  @Input()
  escolhaAte: number;

  opcoesSelecionadas: string[];

  constructor() {
    this.titulo = "";
    this.opcoes = [];
    this.escolhaAte = 1;
    this.opcoesSelecionadas = [];
  }

  toggleOpcao(opcao: string) {
    if (this.escolhaAte === 1) {
      this.opcoesSelecionadas = [opcao];
    } else {
      const index = this.opcoesSelecionadas.indexOf(opcao);
      if (index === -1) this.opcoesSelecionadas.push(opcao);
      else this.opcoesSelecionadas.splice(index, 1);
    }
  }

  opcaoSelecionada(opcao: string): boolean {
    return (
      this.escolhaAte !== 1 &&
      this.opcoesSelecionadas.indexOf(opcao) === -1 &&
      this.opcoesSelecionadas.length >= this.escolhaAte
    );
  }
}
