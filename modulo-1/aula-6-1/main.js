function Retangulo(altura, largura) {
  this.altura = altura;
  this.largura = largura;
  this.area = () => {
    console.log(this.largura * this.altura);
  };
}

let retangulo1 = new Retangulo(10, 15);
let retangulo2 = new Retangulo(8, 9);

console.log(retangulo1.area === retangulo2.area); //false

function RetanguloV2(altura, largura) {
  this.altura = altura;
  this.largura = largura;
}

RetanguloV2.prototype.area = () => {
  console.log(this.largura * this.altura);
};

let retangulo3 = new RetanguloV2(10, 15);
let retangulo4 = new RetanguloV2(8, 9);

console.log(retangulo3.area === retangulo4.area); //true
