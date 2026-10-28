# Como executar o VulnTracker

## Pré-requisitos

- Docker Desktop instalado e em execução.

Não é necessário instalar Node.js, npm, .NET ou MySQL, pois os serviços são executados em contêineres Docker.

## 1. Iniciar o projeto

Abra um terminal na pasta raiz do projeto, onde está localizado o arquivo `docker-compose.yml`, e execute:

```bash
docker compose up -d --build
```

Aguarde a construção das imagens e a inicialização dos serviços.

## 2. Acessar a aplicação

Abra o navegador e acesse:

```text
http://localhost:3000
```

## 4. Encerrar a aplicação

Para parar os serviços, execute:

```bash
docker compose down
```