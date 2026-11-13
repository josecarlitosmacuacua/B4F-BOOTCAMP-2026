/**
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

let balance = 3479.87;
let pin = 1522;
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

/*
Esta função vai verificar se o usuário tem saldo suficiente para efectuar a transação. 
Retorna 'true' se o saldo for suficiente e retorna 'false' caso contrário.
*/
function isBalanceEnough(value, balance) {
  return balance > value;
}

//Esta função vai verificar se o pin esta correcto.
function validatePIN() {
  const pins = Number(prompt(`Insira o Pin`));

  if (pin !== pins) {
    alert("Pin incorrecto");
  } else {
    return true;
  }
}

//Esta função vai calcular a taxa de levantamento.
function calculateRate(value) {
  if (value >= 10 && value <= 100) {
    return 4;
  } else if (value >= 101 && value <= 1000) {
    return 10;
  } else if (value >= 1001 && value <= 2000) {
    return 20;
  } else if (value >= 2001 && value <= 5000) {
    return 40;
  } else if (value >= 5001 && value <= 10000) {
    return 80;
  } else if (value >= 10001 && value <= 15000) {
    return 100;
  } else if (value >= 15001 && value <= 20000) {
    return 120;
  } else if (value >= 20001 && value <= 25000) {
    return 150;
  } else {
    return null;
  }
}

/*
    =================================================
    FUNÇÃO LEVANTAR DINHEIRO
    =================================================
*/

function withdrawMoney() {
  const option = prompt(`
        Bem-vindo(a) ao M-pesa. Selecione a opção que deseja:

        1. No agente
        2. Na ATM
  `);

  if (isNumber(option)) {
    switch (Number(option)) {
      // ========== LEVANTAMENTO NO AGENTE ==========
      case 1:
        // 1. Pedir o código do agente
        const agentCodeInput = prompt("Digita o código do agente");
        if (!isNumber(agentCodeInput)) {
          alert("Código inválido. Digite apenas números.");
          break;
        }

        // 2. Pedir o valor
        const amountInput = prompt("Digita o valor");
        if (!isNumber(amountInput) || Number(amountInput) <= 0) {
          alert("Valor inválido.");
          break;
        }
        const amount = Number(amountInput);

        // 3. Calcular a taxa e o total
        const fee = calculateRate(amount);
        const total = amount + fee;

        // 4. Verificar saldo suficiente (incluindo taxa)
        if (!isBalanceEnough(total, balance)) {
          alert(`Saldo insuficiente. Precisas de ${total} MT (incluindo taxa de ${fee} MT).`);
          break;
        }

        // 5. Validar o PIN
        if (!validatePIN()) {
          
          break;
        }

        // 6. Confirmar a operação
        const confirmOption = Number(prompt(`Levantar ${amount} MT no agente ${agentCode} - ${ageentName} \n Digita 1 para confirmar ou 2 para cancelar`
        ));

        if (confirmOption === 1) {
          balance -= total;
          alert(`Confirmado AHSHAFAS4SFACS. Aos 4/9/26
as 4:09 PM levantaste ${amount} MT no agente 
${agentCode} - ${ageentName}. O novo saldo M-pesa 
e de ${balance} MT e taxa foi de ${fee} MT.
Em caso de duvida, ligue 100. M-pesa 
e facil.`);
        } else if (confirmOption === 2) {
          alert("Levantamento cancelado.");
        } else {
          alert("Opção inválida. Operação cancelada.");
        }
        break;

      // ========== LEVANTAMENTO NA ATM ==========
      case 2:
        const option = prompt(`
        Bem-vindo(a) ao M-pesa. Selecione a opção que deseja:

        1. ponto 24
        2. conta movel/simo
        `);

        if (isNumber(option)) {
          switch (Number(option)) {
            /*
                =========================================
                LEVANTAMENTO NO PONTO 24
                =========================================
            */

            case 1:
              // Inserir o PIN
              if (validatePIN() == true) {
                // Confirmar ou cancelar o levantamento
                const confirm = Number(
                  prompt(`
        Digite:

        1 - Para confirmar
        2 - Para cancelar o levantamento no Ponto 24
                `),
                );

                switch (confirm) {
                  case 1:
                    // Gera um código aleatório de 5 dígitos para o levantamento
                    const withdrawalCode = Math.floor(
                      10000 + Math.random() * 90000,
                    );

                    alert(`
                    Caro cliente, o código para efectuar levantamento na conta M-Pesa é 1 ${withdrawalCode}.

                    Tens 15 min para usá-lo na ATM-Ponto24 antes que expire.

                    O teu saldo é de ${balance} MT.

                    O M-Pesa é fácil.
                    `);

                    break;

                  case 2:
                    alert("Levantamento no Ponto 24 cancelado.");

                    break;

                  default:
                    alert("Opção inválida.");
                }
              }

              break;

            /*
                =========================================
                LEVANTAMENTO NA CONTA MÓVEL/SIMO
                =========================================
            */

            case 2:
              // Inserir o PIN
              if (validatePIN() == true) {
                // Confirmar ou cancelar o levantamento
                const confirm = Number(
                  prompt(`
        Digite:

        1 - Para confirmar
        2 - Para cancelar o levantamento na ATM
                `),
                );

                switch (confirm) {
                  case 1:
                    // Gera um código aleatório de 5 dígitos para o levantamento
                    const withdrawalCode = Math.floor(
                      10000 + Math.random() * 90000,
                    );

                    alert(`
                    Caro cliente, o código para efectuar levantamento na conta M-Pesa é 2 ${withdrawalCode}.

                    Tens 15 min para usá-lo na ATM-Ponto24 antes que expire.

                    O teu saldo é de ${balance} MT.

                    O M-Pesa é fácil.
                    `);

                    break;

                  case 2:
                    alert("Levantamento na ATM cancelado.");

                    break;

                  default:
                    alert("Opção inválida.");
                }
              }

              break;
          }
        } else {
          alert("Insira um número");
        }

        break;

      default:
        alert("Opção inválida.");
    }
  } else {
    alert("Insira um número");
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

if (isNumber(option)) {
  switch (Number(option)) {
    case 1:
      alert("Transferindo dinheiro");
      break;
    case 2:
      withdrawMoney();
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