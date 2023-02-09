# DDD - Domain Driver Desingn

## Configuração:

1. Criar o arquivo *.gitignore*:

```
touch .gitignore

```

2. Instalação do typescript, o comando criará os arquivo package.json e node_modules:

``` 
npm i typescript --save-dev
```

3. Criar o arquivo tsconfig.json:

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

4. Build:

```
npx tsc
```

5. TsLint:

```
npm i tslint --save-dev
npx tslist --init
```

6. JEST:

```
npm i -D jest @types/jest ts-node --save-dev
npm i -D jest @types/jest ts-node --save-
npx jest --init
```

Abrir o arquivo *jest.config.ts* , e incluir o código abaixo:

``` jest
export default {
    transform: {
        "^.t\.(t|j)sx?$":["swc/jest"],
    },
    ....
}
```

Criar um teste básico:

``` jest
describe("Customer unit tests", () => {

    it("should get 1 as result", () => {
        const result = 1;
        expect(result).toBe(1);
    });

});
```

Executar testes:

```
npm test
```

