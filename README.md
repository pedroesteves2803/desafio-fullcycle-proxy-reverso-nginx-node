# 🐳 Desafio Full Cycle - Proxy Reverso

Este desafio, parte do Curso Full Cycle, tem como objetivo configurar um Proxy Reverso utilizando Nginx e Node.js, tudo dentro de containers Docker.

## 📝 Instruções

Nesse desafio você colocará em prática o que aprendemos em relação a utilização do nginx como proxy reverso. A idéia principal é que quando um usuário acesse o `nginx`, o mesmo fará uma chamada em nossa aplicação `Node.js`. Essa aplicação por sua vez adicionará um registro em nosso banco de dados `Mysql`, cadastrando um nome na tabela `people`.

O retorno da aplicação Node.js para o nginx deverá ser:

```html
<h1>Full Cycle Rocks!</h1>
```

- Lista de nomes cadastradas no banco de dados.

Gere o `docker-compose` de uma forma que basta apenas rodarmos que tudo deverá estar funcionando e disponível na porta: 8080.
                                                            
```bash
docker-compose up -d 
```

Suba tudo em um repositório e faça a entrega.

> Observação: A linguagem de programação para este desafio é Node/JavaScript.


## 💻 Como executar o projeto

1. execute o comando docker-compose para iniciar os containers:

```bash
docker-compose up -d
```

2. Acesse a aplicação em seu navegador:

```bash
http://localhost:8080
```

> Observação: A cada vez que a página for atualizada, cinco novos nomes serão adicionados ao banco de dados.
