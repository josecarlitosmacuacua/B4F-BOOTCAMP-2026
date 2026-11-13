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

/*
    =================================================
    2. Criação de funções utilitárias
    =================================================
*/

/*este campo define se o pin e valido ou invalido */
function security(){
    const passeword= prompt ('Digita o Pin')
    if(pin!==passeword){
        return end()
    }else{
        return alert('Invalido')
    }
}
/*esta funcao difine o numero de carateres e como o numero deve iniciar obedecendo somente "84" e "85"*/
function isNumberValid(){
    const phone= prompt(`digita o numero`)
    if(phone.length===9 && (phone.startsWith("84")||phone.startsWith("85"))){
        return offers()
    }else{
        return alert("NUMERO INVALIDO")
    }
    
}

/*
Esta função vai verificar se um valor é um número ou não. Retorna 'true' se for número
e retorna 'false' caso contrário.
*/
function isNumber(value) {
    return !isNaN(Number(value))
}

/*
Esta função vai verificar se o usuário tem saldo suficiente para efectuar a transação. 
Retorna 'true' se o saldo for suficiente e retorna 'false' caso contrário.
*/
function isBalanceEnough(value, balance) {
    return balance > value
}


/*Esta funcao vai permitir com que o progrma volte ao menu principal */



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
    `) 

if(isNumber(option)) {
    switch (Number(option)) {
        case 1:
            alert("Transferindo dinheiro")
            break;
        case 2:
             alert("Levantando dinheiro")
            break;
        case 3:
            alert("Comprando Credelec")
            break;
        case 4:
         buyData()

            break;
        case 5:      
            break;
        default:
            alert("Insira uma opção válida")
            break;
    }
} else {
    alert("Insira um número")
}

    
   function buyData(){
     const buy = prompt(`
        1. Para o meu numero
        2. Para outro numero

        00. Menu Principal  

        
    `) 
    switch (Number(buy)){

        case 1: 
         offers()
        break;
         case 2:
            isNumberValid()
            break;
        case 3:
            break;
            default:
            options()
        
            break;
            

    }


   }
function options(){
const inser = prompt(`
        Bem-vindo(a) ao M-pesa. Selecione a opção que deseja:

        1. Transferir dinheiro
        2. Levantar dinheiro
        3. Comprar credelec
        4. Comprar Megas
        5. Sair
    `) }
    function offers(){
        const section= prompt(` 
            1. WFTTI+
            2. Por Hora
            3. Diario
            4. Semanal
            5. Mensal
            6. Infinito
            
            7. Voltar
            00. Menu Principal`)

    switch(Number(section)){
      case 1:
           wftti() 
           break;
        case 2:
            atTime()
            break;
        case 3:
            daily()
            break;
        case 4:
            weekly()
          break;  
        case 5:
            monthly()
            break;
        case 6:
            Infinite()
            break;

        case 7:
            options()
            break   
    }

    }


    function wftti(){
        const wftti= prompt(`
            1. 50MT =WFTTI(1.9GB)/7d
            2. 15MT =WFTTI(572MB)/d
            3. 10MT =WFTTI(381MB)/1d

            0. Voltar
            00. Menu Principal
            `)

        switch(Number(wftti)){
      case 1:
         if(balance>50){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
         break;
        case 2:
         if(balance>15){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
            break;
        case 3:
         if(balance>10){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
            break;
        case 4:
          break;  
    }
    }

   

    function atTime(){
        const time= prompt(`
            Por Hora
            1. 5MT =188 MB
            2. 6MT =226MB
            3. 7MT =264MB

            0. Voltar
            00. Menu Principal
            `)
    
    switch(Number(time)){
      case 1:
         if(balance>5){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
            break;
        case 2:
         if(balance>6){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
            break;
        case 3:
         if(balance>7){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
            break;
        case 4:
          break;  
     }
    }
    function daily(){
        const daily= prompt(`
            24 Horas
            1. 7MT =247 MB
            2. 10MT =353MB
            3. 15MT =529MB
            4. 20MT =715MB
            5. 30MT =1GB
            6. 40MT =1.4GB
            7. 50MT =1.4GB

            0. Voltar
            00. Menu Principal
            `)

     switch(Number(daily)){
      case 1:
        if(balance>7){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
            break;
        case 2:
         if(balance>10){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
            break;
        case 3:
         if(balance>15){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
            break;
        case 4:
         if(balance>20){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
          break; 
        case 5:
         if(balance>30){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
         break;
        case 6:
         if(balance>40){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
         break
         case 7:
         if(balance>50){
            return security()
         }else{
            return alert('Nao tens saldo')
         }
    }
    }

    function weekly(){
        const weekly= prompt(`
            valido por 7 dias
            1. 30MT =850MB
            2. 50MT =1.7GB
            3. 85MT =2.9GB
            4. 100MT =3.7GB
            5. 150MT =5GB
            6. 200MT =7.1GB

            0. Voltar
            00. Menu Principal
            `)
    switch(Number(weekly)){
      case 1:
         if(balance>30){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 2:
         if(balance>50){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 3:
         if(balance>85){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 4:
         if(balance>100){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
          break;
        case 5:
         if(balance>150){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
        case 6:
         if(balance>200){
            return security()
         }else{
            return alert('Nao tens saldo')
         }      
    }
    }

    function monthly(){
        const monthly= prompt(`
            valido por 30 dias
            1. 100MT =2.8GB
            2. 200MT =7GB
            3. 300MT =10.9GB
            4. 500MT =17.7GB
            5. 1000MT =35GB
            6. 1500MT =53.1GB

            0. Voltar
            00. Menu Principal
            `)
    switch(Number(monthly)){
      case 1:
         if(balance>100){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 2:
         if(balance>200){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 3:
         if(balance>300){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 4:
         if(balance>500){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
          break; 
        case 5:
         if(balance>1000){
            return security()
         }else{
            return alert('Nao tens saldo')
         }  
         break;
        case 6:
         if(balance>1500){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
    }
    }

     function Infinite(){
        const INFINITE= prompt(`
            Sem Validade
            1. 10MT = 181 MB
            2. 20MT = 353MB
            3. 30MT =529MB
            4. 50MT =715MB
            5. 100MT =1GB
            6. 150MT =14GB

            0. Voltar
            00. Menu Principal
            `)
     switch(Number(Infinite)){
        case 1:
         if(balance>10){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 2:
         if(balance>20){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 3:
         if(balance>30){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
            break;
        case 4:
         if(balance>50){
            return security()
         }else{
            return alert('Nao tens saldo')
         }     
          break;
        case 5:
         if(balance>100){
            return security()
         }else{
            return alert('Nao tens saldo')
         } 
        case 6:
         if(balance>150){
            return security()
         }else{
            return alert('Nao tens saldo')
         }        
    }
    }

         function end(){
        const final= prompt(`
            Deseja continuar com a compra 
            1. Enviar
            2. cancelar
          
            `)
     switch(Number(final)){
      case 1:
            alert('compra bem sucedida')
            break;
        case 2:
             default:
            break; 
    }
    }





