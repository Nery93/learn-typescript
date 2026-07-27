// ============================================================
// FICHEIRO DE REFERÊNCIA — exemplos rápidos de cada conceito
// Não é para correr tudo de uma vez, é para reler quando esqueceres a sintaxe.
// ============================================================


// ---------- Arrays e destructuring ----------

const numeros = [1, 2, 3, 4, 5];
const [primeiro, segundo, ...resto] = numeros;
console.log(primeiro, segundo, resto); // 1 2 [3, 4, 5]


// ---------- Objetos e destructuring ----------

const utilizador = { nome: "Nery", idade: 26, cargo: "Backend Dev" };
const { nome, cargo } = utilizador;
console.log(nome, cargo); // Nery Backend Dev

// destructuring com renomear + valor default
const { idade: anos, pais = "Portugal" } = utilizador as typeof utilizador & { pais?: string };
console.log(anos, pais); // 26 Portugal


// ---------- Funções e callbacks ----------

function saudar(nome: string, callback: (mensagem: string) => void) {
  callback(`Olá, ${nome}!`);
}

saudar("Nery", (msg) => console.log(msg)); // Olá, Nery!


// ---------- filter, map, reduce, forEach ----------

const idades = [15, 20, 25, 30, 35];

const maioresDeIdade = idades.filter((idade) => idade >= 18);
const emMeses = idades.map((idade) => idade * 12);
const somaTotal = idades.reduce((acumulador, idade) => acumulador + idade, 0);

idades.forEach((idade) => console.log(`Idade: ${idade}`));

console.log(maioresDeIdade); // [20, 25, 30, 35]
console.log(emMeses);        // [180, 240, 300, 360, 420]
console.log(somaTotal);      // 125


// ---------- Classes e métodos estáticos ----------

class ContaBancaria {
  private saldo: number;

  constructor(private titular: string, saldoInicial: number) {
    this.saldo = saldoInicial;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  identificar(): string {
    return `Conta de ${this.titular}`;
  }

  // método estático: pertence à classe, não a uma instância
  static criarContaVazia(titular: string): ContaBancaria {
    return new ContaBancaria(titular, 0);
  }
}

const conta = ContaBancaria.criarContaVazia("Nery");
conta.depositar(100);
console.log(conta.consultarSaldo()); // 100


// ---------- Promises e async/await ----------

const atrasoDB = (segundos: number): Promise<string> =>
  new Promise((resolve) =>
    setTimeout(() => resolve("DB: Todos os utilizadores prontos!"), segundos * 1000),
  );

const buscarDados = async () => {
  try {
    console.log("A iniciar a busca de dados...");
    const resultado = await atrasoDB(1);
    console.log(resultado);
  } catch (erro) {
    console.error("Ocorreu um erro ao buscar os dados:", erro);
  }
};

buscarDados();


// ---------- Ecossistema TS (npm, tsconfig, ts-node) ----------
// Não é código, é comando/config — deixo como nota:
//
// npm init -y                 -> cria package.json
// npm install -D typescript   -> instala TS como dependência de dev
// npx tsc --init              -> cria tsconfig.json
// npx tsx src/index.ts        -> corre .ts diretamente sem compilar (usado neste projeto)
// npx tsc                     -> compila .ts -> .js para dist/ (usa "outDir" do tsconfig)


// ---------- Tipos básicos e type annotations ----------

let idade: number = 26;
let nomeVar: string = "Nery";
let ativo: boolean = true;
let tags: string[] = ["backend", "go", "typescript"];
let coordenadas: [number, number] = [10, 20]; // tuple

// inferência: TS adivinha o tipo sem precisares de anotar
let inferido = "isto é uma string"; // TS sabe que é string


// ---------- Interfaces, types, union types ----------

interface Pessoa {
  nome: string;
  idade: number;
  email?: string; // propriedade opcional
}

type StatusPedido = "pendente" | "enviado" | "entregue"; // union type

function processarPedido(status: StatusPedido) {
  if (status === "entregue") {
    console.log("Pedido concluído!");
  }
}

const pessoa: Pessoa = { nome: "Nery", idade: 26 };
processarPedido("enviado");


// ---------- Generics básicos ----------

// Significa que a função pode trabalhar com qualquer tipo, 
// e o tipo é definido quando a função é chamada.
function primeiroDoArray<T>(itens: T[]): T {
  return itens[0];
}

console.log(primeiroDoArray<number>([1, 2, 3])); // 1
console.log(primeiroDoArray<string>(["a", "b"])); // "a"

// generic com interface
// Significa que a interface pode ter qualquer tipo de conteúdo,
// e o tipo é definido quando a interface é usada.
interface Caixa<T> {
  conteudo: T;
}

const caixaDeNumero: Caixa<number> = { conteudo: 42 };
const caixaDeTexto: Caixa<string> = { conteudo: "olá" };
