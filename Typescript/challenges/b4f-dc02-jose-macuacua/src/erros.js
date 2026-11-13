export class ErroCambio extends Error {
  constructor(mensagem, opcoes) {
    super(mensagem, opcoes);
    this.name = this.constructor.name;
  }
}

export class ErroRede extends ErroCambio {
  constructor(mensagem, cause) {
    super(mensagem, cause ? { cause } : undefined);
  }
}

export class ErroHttp extends ErroCambio {
  constructor(status, url) {
    super(`Resposta HTTP ${status} de ${url}`);
    this.status = status;
    this.url = url;
  }
}

export class ErroDados extends ErroCambio {
  constructor(mensagem, cause) {
    super(mensagem, cause ? { cause } : undefined);
  }
}

export class ErroMoeda extends ErroCambio {
  constructor(codigo) {
    super(`Moeda desconhecida: ${codigo}`);
    this.codigo = codigo;
  }
}
