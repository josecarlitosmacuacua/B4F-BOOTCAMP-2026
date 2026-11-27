
import './App.css';
import { Cabecalho } from './assets/components/Cabecalho';
interface Produto {
  id: number;
  nome: string;
  preco: string;
}

const produtos: Produto[] = [
  { id: 1, nome: 'Arroz agulha 10 kg', preco: '986,00 MT' },
  { id: 2, nome: 'Óleo de cozinha 5 L', preco: '800,40 MT' },
  { id: 3, nome: 'Açúcar castanho 2 kg', preco: '179,80 MT' },
  { id: 4, nome: 'Feijão manteiga 1 kg', preco: '139,20 MT' },
  { id: 5, nome: 'Sumo de maçanica 1 L', preco: '162,40 MT' },
  { id: 6, nome: 'Refrigerante 2 L', preco: '110,20 MT' },
];


function App() {
  return (
    <div className="pagina">
      <Cabecalho />

      <main className="catalogo">
        {produtos.map((produto) => (
          <article key={produto.id} className="cartao">
            <div className="imagem-placeholder"></div>
            <h2>{produto.nome}</h2>
            <p className="preco">{produto.preco}</p>
          </article>
        ))}
      </main>

      <footer className="rodape">
        © Mercearia Xiluva · Malhangalene, Maputo
      </footer>
    </div>
  );
}

export default App;
