// Destructuring assignment
let primos = [2, 3, 5, 7, 11, 13];
let [p1, p2, ...resto] = primos;

console.log(p2);

let pessoa = {
  nome: "Marcos Paulo",
  idade: 24,
  sexo: "M",
  formado: false,
};
let { nome: nomePessoa, idade, ...outrosDados } = pessoa;

console.log(idade);
console.log(nomePessoa);

// Spread operators
let primos2 = [...primos, 17];
let pessoa2 = {
  ...pessoa,
  biografia: "Lorem ipsum dolor",
};

// Template literals
let a = 2,
  b = 3;
let soma = a + b;

console.log(`${a} + ${b} = ${soma}`);
