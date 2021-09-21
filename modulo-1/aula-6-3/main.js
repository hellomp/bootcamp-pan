class Retangulo {
  constructor(altura, largura) {
    this.altura = altura;
    this.largura = largura;
  }

  area() {
    console.log(this.altura * this.largura);
  }
}

class Quadrado extends Retangulo {
  constructor(lado) {
    super(lado, lado);
  }
}

let retangulo1 = new Retangulo(3, 4);
retangulo1.area();

let quadrado1 = new Quadrado(2);
quadrado1.area();
