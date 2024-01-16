# DDD - Driver Domain Design

## 1.0 Visão Estratégica

Antes de codificar é necessário ter uma visão estratégica do domínio:

- Entender o Problema;
- Entender a Solução;
- Criar o Mapa de Contexto;
- Definir contextos delimitados (subdomínios);
- Cada contexto tem um problema a ser resolvido.

## 1.1 O que é DDD ?

É uma forma de desenvolver software com o foco no coração da aplicação.
Tendo como objetivo entender usas Regras de Negócio, Processos e Complexidades.

## 1.2 Como o DDD pode ajudar ?

- Entender com profundidade o domonio e subdominio da aplicação;
- Ter uma linguagem universal (linguagem ublíqua);
- Criar o `design estratégico` utilizando Bounded Contexts;
- Criar o `desing tático`para conseguir mapear e agregar as entidades e objetos de valor da aplicação, bem como os eventos de dominio;
- Clareza do que é `complexidade de negócio` e `complexidade técnica`.

## 1.3 Visão do Domínio e Subdomínios

- Core Domain
- Generic Subdomain
- Support Subdomain

No **Core Domain** identificamos o coração do dominio, é o diferencial competitivo da empressa.

O **Generic Subdomain** são os softwares auxiliares e sem diferencial competitivo.

E **Support Domain** apoiam o dominio, e faz a operação do dominio seja possivel.


## 1.4 Problemas vs Solução

No DDD o `Problema`é a visão geral do dominio e suas complexidades e com isso geramos `subdominios`.

Através de análises e modelagem do dominio chegamos a `Solução`, que representamos em `Contextos Delimitados`.

Os subdominios representam os `contextos delimitados`.

## 1.5 Contexto

Dependendo do subdominio uma entidade pode ser tratada de formas diferentes.

Exemplo, a entidade **Cliente**, num sistema de **Venda de Ingressos**.

Basicamente o cliente irá realizar um compra.

Se for implementado um subdominio de  **Suporte ao Cliente**, o cliente irá registrar um reclamação. 

O Cliente poderá ser representado de formas diferentes nos subdomnios.



## 2.0 Elementos Táticos

Os elementos táticos ajudam a resolver os problemas dos contextos delimitados.


### 2.1 Entidade

A **Entidade** , ela é única, representada por uma classe que possui atributos e comportamentos que atuam no domínio da aplicação.

### 2.2 Entidade Anêmica

A **Entidade Anêmica**,  é uma classe que não possui regra de negócios, utilizada apenas para transportar dados. 

Podemos citar como exemplo: *DTO (Data Transfer Object)*.

### 2.3 Regras de Negócio

A **Regras de negócio**,  numa entidade isto demonstra motivos para mudança.

O método abaixo, é um setter, ele expressa apenas a intenção de armazenar um valor no atributo _name:

``` js
set name(name: string){
     this._name = name;
}
``` 

Já neste outro exemplo,  expressa a intenção de negócio em alterar o nome por algum motivo.

``` js
set changeName(name: string){
     this._name = name;
}
``` 

O resultado será o mesmo,  porém o método *changeName()* demonstra um motivo para mudança, a semântica faz a diferença.

### 2.4 Validação

**Entidades incompletas não validam regras de negócios**.

Os atributos obrigatórios de uma Entidade devem estar consistentes, assim o estado atual de uma Entidade conseguirá validar as regras de negócios.

Uma entidade tem que se auto validar para garantir a consistência do estado atual.


### 2.5 Entidade X ORM

Ao criarmos um aplicação por vezes partimos para modelagem da base de dados.

Na proposta do **DDD** o ideal é dividir isto em duas fases:
- Na camada de *persistência de dados* criamos classes com getters e setters para atender requisitos de um ORM;
- Na camada de *complexidade de negócios* Entitade deve possuir métodos que expressem as regras de negócios.

O ideal é partimos com a criação da camada da *complexidade de negócios", para entendimento do **Coração do Dominio da Aplicação".

A fase de persistência de dados é realizada posteriormente pois é uma complexidade técnica.


### 2.6 Value Objects

Por padrão utilizamos os tipos primitivos para declarar os atributos de uma classe.

Value Object, ele é imutável.

Um exemplo de Value Object é o CPF.

Geralmente podemos tratar o CPF como string.

Mas o CPF ele é único e possui digito verificador, então podemos tratá-lo como um Value Object e não uma String.

Outro exemplo,  seria o endereço  onde ele é  composto por Rua, Número, Complemento, Bairro, Cidade e CEP. 

Este conjunto de dados pode ser expressado por uma classe Endereço, sem setters e getters. O Endereço seria uma propriedade e não uma entidade, porém, depende do contexto.

A ideia é que os atributos expressem um valor para o negócio.


### 2.7 Agregados

Um conjunto de Entidades e Objetos de Valor que estão associados e são tratados como uma unidade, com propósito de mudança de dados.

Ao desenvolver um sistema temos que pensar em agregados , que são blocos com diversos objetos, ao invés de pensar em entidades isoladas.

Exemplo de uma Agregado Cliente:

- Uma Entidade Cliente e um Objeto de Valor Endereço.
Não faz sentido termos um Endereço sem a existência de uma entidade Cliente. 
Nesta associação temos um Agregado de Clientes.

- Uma Entidade Pedido e ItensDoPedido.
A entidade ItensDoPedido não existiria se não houvesse a entidade Pedido.
Aqui temos um outro Agregado.

- A classe Pedido tem uma relação com a classe Cliente, e estão em agregados diferentes.
Aqui não existe um relação muito forte. 
Se criarmos um Cliente , não é necessário criar um Pedido.

- No caso de criarmos um Pedido é necessário termos um Cliente.
E os Itens do Pedido possuem uma relação muito forte com a classe Pedido.

- Como não há uma relação muito forte entre Cliente e Pedido, então na classe Pedido basta referenciar o ID do Cliente.

- Já no caso do Pedido e ItensDoPedido há uma relação muito forte a relação deve ser através da entidade.


### 2.8 Domain Service

O **Domain Service** não mantém estado (stateless) e cumpre uma tarefa específica do domínio.

A indicação para criar um Domain Servcice é quando uma operação não se encaixa como um método em um Agregado ou Objeto de Valor.

Ou quando uma operação não for Responsabilidade de uma Entidade ou Obejto de Valor adicione uma interface de Serviço.

Domain Service executa apenas operações (estático).

### 2.9 Repositório

O **Repositório** se refere a um local de armazenamento e recuperação do estado.

Geralmente teremos uma relação de um para um, um Agregado e um Repositório.


### 2.10 Eventos de Dominio

Segundo Vernon: *"Use um evento de dominio para capturar uma ocorrência de algo que aconteceu no dominio."*

Segundo Martin Fowler: *A essência de um evento de domínio é que você o usa para capturar coisas que podem
desencadear uma mudança no estado do aplicativo que você está desenvolvendo. Esses objetos de evento são 
processados para causar alterações no sistema e armazenados para fornecer um Audit.log*.

Todo evento deve ser representado em um ação do passado:
- UserCreated;
- OrderPlaced;
- EmailSent.

Geralmente utilizamos *Domain Event* quando queremos notificar outros *Bounded Context* de uma mudança de estado.

Componentes:
- Event;
- Handler;
- EventDispatcher.

O *Handler* executa o processamento quando um evento é chamado.
Já *EventDispatcher* armazena e executa os *handlers* de um evento quando ele for disparado.

Dinâmica:
- Criar um **Event Dispatcher**;
- Criar um **Evento**;
- Criar um **Handler** para o **Evento**;
- Registrar o **Evento**, juntamente com o Handler no **Event Dispatcher**.

Quando o metódo **notify** do **Event Dispatcher** for executado, todos os **handlers** registrados no evento
serão disparados.

### 2.11 Módulos

Modulos servem como conteirners nomeados para classes de objetos de dominio que são altamente coesas entre si.
O objetivo deve ser de baixo acoplamento entre as classes que estão em módulos diferentes.
Como os módulos usados no DDD não são compartimentos de armazenamento anêmicos ou genéricos, também é importante nomear adequadamente os Módulos.

`Vernon Vaughn. Implementando Design Orientado a Domínio.Pearson Educação. Edição Kindle.`
 

### 2.12 Factory

Desloque a responsabilidade de criar instâncias de objetos complexos e agregados para um objeto separado, que pode não ter responsabilidade no modelo de dominio, mas ainda faz parte do design do dominio. 

Forneça uma interface que encaplsule toda a criação complexa e que não exija que o cliente faça referência às classes concretas dos objetos que estão sendo instanciados.

`Evans, Eric. Domain Driven Design (p. 138). Pearson Educação. Edição Kindle.`
