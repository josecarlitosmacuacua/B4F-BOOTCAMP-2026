const carrinha = [];



// 1. O teu array original
const amigos = ["Ana", "Pedro", "João", "Maria"];

// 2. Descobrir em que posição está o "João" (neste caso, posição 2)
const indice = amigos.indexOf("caneta");

// 3. Se o nome existir no array, remove-o diretamente
if (indice !== -1) {
  amigos.splice(indice, 1); // Corta 1 elemento a partir daquela posição
}

console.log(amigos);
// Saída: ["Ana", "Pedro", "Maria"] -> O original mudou mesmo!
