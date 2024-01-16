# 1.0 Configuração

Abaixo descrevo as etapas para criação do ambiente.

## 1.1 Arquivo *.gitignore*:

Neste arquivo inclui os diretórios que não serão carregados no repositório git.

```
touch .gitignore

```

## 1.2 Instalação do TypeScript.

O comando criará os arquivo package.json e node_modules:

``` 
npm i typescript --save-dev
```

Criar o arquivo tsconfig.json:

```
npx tsc --init
```

Alterar o *tsconfig.json*:

```
//habilitar
"increment" : true,

//configurar diretório
"outDir" : "./dist",

//incluir no final do arquivo :
{
    ....
},
"include" : [
    "src/**/*.ts"
],
```

Build:

```
npx tsc
```

Instalar o TsLint:

```
npm i tslint --save-dev
npx tslist --init
```

## 1.3 UUID

Gerar ID para as entidades:

``` bash
npm i uuid @types/uuid
```

## 1.4 Sequelize

ORM para realizar os testes:

``` bash
npm install sequelize reflect-metadata sequelize-typescript
```

## 1.5 Sqlite

Banco de dados em memória para os testes:

``` bash
npm install sqllite
```

## 1.6 JEST

Ralizar os testes:

``` bash
npm i -D jest @types/jest ts-node --save-dev
npm i -D jest @types/jest ts-node --save-
npx jest --init
```

Abrir o arquivo *jest.config.ts* , e incluir o código abaixo:

``` js
export default {
    transform: {
        "^.t\.(t|j)sx?$":["swc/jest"],
    },
    ....
}
```

Criar um teste básico:

``` js
describe("Customer unit tests", () => {

    it("should get 1 as result", () => {
        const result = 1;
        expect(result).toBe(1);
    });

});
```

Executar testes:

``` bash
npm test
```

Incluido o comando *tsc --noEmit* para verificação de tipo, e compilador não produza nenhum código.

No package.json :

``` json
"scripts": {
    "test": "npm run tsc -- --noEmit && jest",
    "tsc": "tsc"
}
```

Comando para executar todos os testes :

``` bash
cd src/folder-with-spec-ts
npm test
```

Comando para executar um teste especifico:

``` bash
cd src/folder-with-spec-ts
npm test -t src/folder-with-spec-ts
```

