/*
 * O presente código tem o propósito de criação de um programa de simulação da
 * cartera móvel M-pesa Moçambique. Nesta simulação teremos apenas 4 opeções, nomeadamente:
 * - Transferência de dinhiero
 * - Levantamento de dinheiro
 * - Compra de Credelec
 * - Compra de dados móveis
 */

/*
    =================================================
    1. Definição de variáveis e constantes globais
    =================================================
*/

let balance = 21000;
let pin = 123456;
let name = "Jose Macuacua";
let tax = 5;
let agentCode = 67836;
let value = 100;
let ageentName ="BERTA GABI";

/*
    =================================================
    2. Criação de funções utilitárias
    =================================================
*/

/*
Esta função vai verificar se um valor é um número ou não. Retorna 'true' se for número
e retorna 'false' caso contrário.
*/

function isNumber(value) {
  return !isNaN(Number(value));
}

function isInRange(value, min, max) {
  return value >= min && value <= max;
}
/*
Esta função vai verificar se o usuário tem saldo suficiente para efectuar a transação. 
Retorna 'true' se o saldo for suficiente e retorna 'false' caso contrário.
*/
function isBalanceEnough(value, balance) {
  return balance > value;
}
/* Esta funcao verifica a quantidade de digitos do numero e verifica se os primeiros dois digitos sao 84 ou 85. Retorna `true` se as condicoes se verificarem, caso contrario `false`.*/

function verifyNumber(value) {
  const fullnumer = String(value);
  const firsttwonumbers = fullnumer.substring(0, 2);
  if (
    (firsttwonumbers === "84" || firsttwonumbers === "85") &&
    fullnumer.length === 9
  ) {
    return true;
  } else {
    return false;
  }
}


/*
Esta função vai verificar se o usuário tem saldo suficiente para efectuar a transação. 
Retorna 'true' se o saldo for suficiente e retorna 'false' caso contrário.
*/

function isBalanceEnough(value, balance) {
  return balance > value;
}


/*Esta funcao vai verificar se um pin que o usuario introduziu e o mesmo que o pin predefinido. Retorna `true` se for o mesmo e `false` se for o pin errado*/
function verifyPin(user_pin) {
  // vamos esperimentar receber o pin aqui e  no codigo  so chamar a funcao;
  if (pin === user_pin) {
    return true;
  } else {
    return false;
  }
}
///funcao opcional que verifica se o pin introduzido e valido ou nao, caso seja valido retorna true, caso contrario retorna false
function isValidadePin() {
  let user_pin = Number(prompt(`Digite o seu Pin`));
  if (pin !== user_pin) {
    return alert("PIN invalido");
  } else {
    return true;
  }
}
/*


    =================================================
    3. O início da execução do código
    =================================================
*/

const option = prompt(`
        Bem-vindo(a) ao M-pesa. Selecione a opção que deseja:

        1. Transferir dinheiro
        2. Levantar dinheiro
        3. Comprar credelec
        4. Comprar Megas
        5. Sair
    `);

if (isNumber(isInRange(option))) {
  switch (Number(option)) {
    /* .Neste case iniciamos o processo de transferencia de dinheiro para o m-pesa ou para as carteiras moveis. Verificamos se a opcao introduzida e um numero ou nao, se for um numero o codigo avanca, caso contrario notifica*/

    case 1:
      transferMoney();
      break;
    case 2:
      alert("Levantando dinheiro");
      break;
    case 3:
      alert("Comprando Credelec");
      break;
    case 4:
      alert("Comprando Megas");
      break;
    case 5:
      break;
    default:
      alert("Insira uma opção válida");
      break;
  }
} else {
  alert("Insira um número");
}

function transferMoney() {
  const transfer =
    prompt(`SEM TAXAS Transferencia de qualquer valor de M-pesa para M-pesa
                1. M-pesa(Sem Taxa)
                2. Carteira Movel`);

  if (isNumber(transfer))
    switch (Number(transfer)) {
      /* Se o usuario escolher a opcao m=pesa, voltamos a verficar ele introduziu um valor que e um numero e se o mesmo numero tem 9 digitos e inicia por 84 ou 85, caso contrario o codigo alerta*/

      case 1:
        transferToMpesa();
        break;
      case 2:
        transferToMobileWallet();
        break;
      default:
        alert("Insira uma opção válida");
        break;
    }
}
// transferir Para M-pesa
function transferToMpesa() {
  let destinyNumber = Number(prompt(`Digite um numero valido:`));

    if (verifyNumber(destinyNumber)) {
      /*Depois de verificado o numero, verifiamos se o montante introduzido esta dentro dos limites ou nao e se o montante esta e menor ou igual ao saldo atual do cliente, caso nao o codigo notifica*/

      let amount = Number(prompt(`Digite o valor:`));

      if (amount>=1 && amount<=200000) {
        /*verificacao do pin*/
        
         if (isBalanceEnough(amount, balance)) {
            //Comparamos o saldo da conta com o saldo introduzido
            let pin_number =Number(prompt(`Digite o seu Pin:`));

            if (verifyPin(pin_number)) {
              //Comparamos o pin introduzido com o pin configurado pelo usuario //CADA COMPARACAO TEM SEU DEVIDO ALERTA
               let confirmation = prompt(`Enviar ${amount}.00 MT para ${destinyNumber}, nome ${name}. Taxa: 0.00 MT. Por favor confirme:
                                                    1. Confirmar 
                                                    2. Cancelar`);

              if (isNumber(confirmation)) {
              //verificamos se a opcao intruduzida e um numero ou nao
              alert ("Transacao feita com sucesso")
              } else {
              alert("digite uma opcao valida");
              }
            } else {
              alert("PIN incorreto, tente novamente");
            }
          } else {
            alert("Saldo insuficiente");
          }

      } else {
        alert("Montante invalido. tente novamente:");
      }
    } else {
      alert("O conteudo nao esta correto. Por favor tente novamente");
    }
  
}

// transferir Para Carteira Movel
function transferToMobileWallet() {
  const mobile_wallets = prompt(`
                                1. e-Mola
                                2. mKesh`);

  if (isNumber(isInRange(mobile_wallets))) {
    switch (Number(mobile_wallets)) {
      case 1: {
        // para EMOLA
        // digitar numero> verificar se o numero e da EMOLA

        const emoladestinynumber = prompt("Digite um numero valido:");
        //verificando se o numero digitdo tem 9  e na posicao 1 do array do numero digitado tem 6 ou 7;
        if (
          emoladestinynumber.length === 9 &&
          (emoladestinynumber.charAt(1) === "6" ||
            emoladestinynumber.charAt(1) === "7")
        ) {
          // falta avisar ao utilisador usar somente numeros
          let emola_amount = Number(prompt("digite o valor"));
          //se o valor digitado + a tax for menor que o saldo
          if (emola_amount + tax < balance) {

            if (isValidadePin() == true) {
              const lastverification = Number(
                prompt(`Enviar ${emola_amount}.00 MT para ${emoladestinynumber}, nome ${name}. Por favor confirme:
                                                        1. Confirmar 
                                                        2. Cancelar`),
              );
              switch (lastverification) {
                case 1:
                  alert(
                    `Confirmado, transferiste ${emola_amount}MTs para ${emoladestinynumber} com sucesso a taxa é de ${tax}MTs`,
                  );
                  break;
                case 2:
                  alert("Opção Inválida");
                  break;
              }
            }
          }else{
            alert("Saldo Insuficiente");
          }
        }else{
          alert(" Digite um numero do emola");
        }
        break;
      }

      case 2: {
        // //para MKESH
         const Mkeshdestinynumber = prompt("Digite um numero valido:");

         if ( Mkeshdestinynumber.length === 9 &&
          (Mkeshdestinynumber.charAt(1) === "2" ||
            Mkeshdestinynumber.charAt(1) === "3")) {

           let mkes_amount = Number(prompt("Digite o valor:"));

           if (mkes_amount + tax < balance) {
            
             if(isValidadePin() == true){
              const lastverification = Number(
                prompt(`Enviar ${mkes_amount}.00 MT para ${Mkeshdestinynumber}, nome ${name}. Por favor confirme:
                                                        1. Confirmar 
                                                        2. Cancelar`),
              );

              switch (lastverification) {
                case 1:
                  alert(
                    `Confirmado, transferiste ${mkes_amount}MTs para ${Mkeshdestinynumber} com sucesso a taxa é de ${tax}MTs`,
                  );
                  break;
                case 2:
                  alert("Opção Inválida");
                  break;
              }
             }
           }else{
            alert("Saldo Insuficiente");
           }
          }else {
          alert("O conteudo nao esta correto. Por favor tente novamente");
        }
        break;
      }

      default:
        alert("Digite uma opcao valida");
        break;
    }
  } else {
    alert("Digite uma opcao valida");
  }
}
