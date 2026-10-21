/* EXERCICIO NUMERO 1 Cria variáveis para guardar o teu nome, idade, se estás a estudar (booleano) e a tua profissão. Mostra os valores
na consola usando console.log().
*/
let name = "Jose";
let age = 25;
let ifistudy = true;
console.log(
  `my name is ${name} and i have ${age} years old , iam student ${ifistudy}`,
);

/*EXERCICIO NUMERO 2:2. Identificar tipos
Declara uma variável string, uma number, uma boolean, uma undefined e uma null. Usa typeof para verificar o
tipo de cada uma. Observa especialmente o resultado de typeof null.
*/
let text = "65";
let year = 2026;
let isstudent = false;
let nickname;
let surname = null;
console.log(typeof text);
console.log(typeof year);
console.log(typeof isstudent);
console.log(typeof nickname);
console.log(typeof surname);

/*3. Conversão de texto para número
Guarda o texto "25" numa variável. Converte-o para número com Number() e soma-lhe 5. Mostra o resultado e o
tipo do resultado.*/
let sometext = Number("25");
let anothertext = parseInt("45");
let nexttext = parseFloat("23.65");
console.log(sometext + 5);
console.log(anothertext + 10);
console.log(nexttext + 15);

/*Operações aritméticas
Cria duas variáveis numéricas e apresenta a soma, subtracção, multiplicação, divisão e resto da divisão entre
elas.*/
let numbers1 = 21;
let number2 = 12;
let sum = numbers1 + number2;
let sub = numbers1 - number2;
let mult = number2 * numbers1;
let rest = numbers1 % number2;
console.log(sum);
console.log(sub);
console.log(mult);
console.log(rest);
/*5. Comparar valores
Declara duas variáveis com valores semelhantes, por exemplo 10 e "10". Compara-as com == e === e explica a
diferença nos comentários*/

let value1 = 10;
let value2 = "10";
console.log(value1 == value2);
console.log(value1 === value2);
/* no js o == ignora o tipo e vai alem ao que esta dentro dos panos , 
por exemplo o "10" que e string mas com == ele fica como se fose 10 normal
 e comparando com 10 fica true , mas o === nao ignora , e muito rigoroseo ,
  tudo tem de ser totalmente identico paa ser true*/

/*6. Verificar valores verdadeiros
Testa Boolean() com 0, 1, "", "JavaScript", null e undefined. Mostra cada resultado*/
console.log(Boolean(0));
console.log(Boolean(1));
console.log(Boolean(""));
console.log(Boolean("Javascript"));
console.log(Boolean(null));
console.log(Boolean(" "));
console.log(Boolean(undefined));
/*7. Calcular idade futura
Guarda a tua idade numa variável e calcula quantos anos terás daqui a 5 e a 10 anos.*/
let ages = 25 ;
for ( let i =1; i<=5; i++){
    ages=ages+1 ;

}
    console.log(ages);
    const IDADE = 25;
    console.log(IDADE +5);

/*8. Temperatura
Guarda uma temperatura em Celsius e
 converte-a para Fahrenheit usando a fórmula F = (C × 9/5) + 3*/
 let C =26 ;
 let F = (C*9/5) + 3 ;
 console.log(F) ;
  const FRUTAS = ["maca","banana","feijao","batata"];
  console.log(FRUTAS[0]);
  console.log(FRUTAS[FRUTAS.length-1]);
  console.log(FRUTAS.length);
/*10. Adicionar elementos
Usa push() para adicionar duas frutas ao fim do array e
 unshift() para adicionar uma ao início. Mostra o arra*/
 FRUTAS.push("caju") ;
 FRUTAS.push("manga");
 FRUTAS.unshift("noses");
 console.log(FRUTAS);
 /*11. Remover elementos
Num array de seis cores, usa pop() e 
shift() para remover elementos. Mostra o valor removido e 
o array depois decada operação.*/
const COLORS = ["vermelho", "laranja", "amarelo", "verde", "azul", "violeta"];

console.log(COLORS); // Mostra a lista completa
console.log(COLORS.length); // Resultado: 

COLORS.pop();
COLORS.shift();
let afterpop = COLORS.pop();
let aftershift = COLORS.shift();
/*12. Procurar um elemento
Cria um array de nomes. Usa includes() para verificar
 se um nome existe e indexOf() para descobrir a posição de
outro.*/
const NOMES = ["Lucas", "Mariana", "Carlos", "Beatriz", "Pedro"];
let existname = NOMES.includes("Lucas");
let theindex = NOMES.indexOf("Mariana");
console.log(theindex);
console.log(existname);

/*Com o array [10, 20, 30, 40, 50, 60], usa slice() para criar um novo array
 com os elementos do meio, sem alterar o
origina*/
const ARRAY = [10, 20, 30, 40, 50, 60];
let afterslice = ARRAY.slice(1,6);
console.log(afterslice);
/*14. Alterar com splice()
Num array de tarefas, usa splice() para remover uma tarefa 
e inserir outra na mesma posição. Mostra o array
antes e depois.*/
const TODOLIST = ["study JavaScript", " go to gymy", "buy clohtes"];


let aftersplice = TODOLIST.splice(1,1,"eat ") ;
console.log(TODOLIST);
console.log(aftersplice);
/*. Percorrer com forEach()
Cria um array de nomes
e usa forEach() para apresentar cada nome com uma mensagem de boas-vindas.*/



const nomes = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo"];
 nomes.forEach((nome)=>
console.log("bem vindo(a),"+nome));

 /*16. Transformar com map()
Dado o array [2, 4, 6, 8], 
usa map() para criar um novo array com cada valor multiplicado por 3.*/
 const numbery = [2, 4, 6, 8];
let number = numbery.map((mumbers) => mumbers+3);
console.log("a soma e : " +number);

/*7. Filtrar com filter()
Dado o array [12, 5, 19, 8, 23, 10],
 usa filter() para obter apenas os números maiores que 10.*/

 const NEXTARRAY =  [12, 5, 19, 8, 23, 10] ;
 let listnumber = NEXTARRAY.filter((listn) => listn >10 )
 console.log(listnumber)
 
 /*8. Somar com reduce()
Usa reduce() para calcular a soma de [5, 10, 15, 20].*/
const SUMM =[5, 10, 15, 20];
let total = SUMM.reduce((summ) => 
console.log(total)) ;
/*22. Criar um objecto
Cria um objecto estudante com as propriedades nome, idade, curso e activo. Mostra cada propriedade com a
notação de ponto.*/

const estudante = {
    nome: "Ana Silva",
    idade: 21,
    curso: "Engenharia Informática",
    activo: true
};
console.log("o mome do estudante e :" +estudante.nome);
console.log(" a idadedo estudante e :" +estudante.idade);
console.log("o curso do studante e :" +estudante.curso);
console.log("o estudante esta ativo?  :" +estudante.activo);