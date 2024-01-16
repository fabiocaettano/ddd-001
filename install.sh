#!/bin/bash

#################################################################
## Nome do Script : install.sh                                 ##
##                                                             ##
## Descrição: Instalar curl, NVM e Node, as dependências do    ##
## projeto e configurar as credenciais do GitHub.              ##
##                                                             ## 
## Autor: Fabio Almeida Caetano                                ##
##                                                             ##  
## Email: fabio.caettano74@gmail.com                           ##   
#################################################################

# Atualizar Repositório
echo -e "\n"
echo "etapa 1/6 | Atualizar repositório"
apt-get update

# CURL
echo -e "\n"
echo "etapa 2/6 | Instalar Curl"
if ! [ -x "$(command -v curl)" ]; then
    apt install curl -y
else    
    echo "Curl já instalado"    
fi

# NVM
echo -e "\n"
echo "etapa 3/6  Instalação do NVM"
DIR_PROJETO=$PWD
cd ~/
DIR_ROOT=$PWD
FOLDER_NVM=".nvm"
declare -a DIR_ROOT_NVM=($DIR_ROOT'/'$FOLDER_NVM)

if ! [ -d ${DIR_ROOT_NVM[@]} ]; 
then
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
    source ~/.profile
else
    echo "NVM já instalado";
fi;

cd $DIR_PROJETO

# Node
echo -e "\n"
echo "etapa 4/6 | Instalação Node"

VERSAO_NODE_DESEJADA="v14.21.1"

if ! [ -x "$(command -v node)" ]; then
    echo "Node não instalado"
    nvm install $VERSAO_NODE_DESEJADA
    nvm use $VERSAO_NODE_DESEJADA
else
    VERSAO_NODE_INSTALADA=`node -v`    
    echo Versão Node Instalada $VERSAO_NODE_INSTALADA
    echo Versão Desejada $VERSAO_NODE_DESEJADA
fi

if [ "$VERSAO_NODE_INSTALADA" != "$VERSAO_NODE_DESEJADA" ];
then
    nvm install $VERSAO_NODE_DESEJADA
    nvm use $VERSAO_NODE_DESEJADA
fi

# Dependências do Projeto
echo -e "\n"
echo "etapa 5/6 | Instalação das depedências do projeto"
FOLDER_NODE_MODULES="node_modules"
declare -a DIR_ROOT_NODE_MODULES=($DIR_PROJETO'/'$FOLDER_NODE_MODULES)
if ! [ -d ${DIR_ROOT_NODE_MODULES[@]} ]; 
then
    npm install
else    
    echo "Dependênicas já instaladas"
fi;

# Git Config Global
echo -e "\n"
echo "etapa 6/6 | Configurar as credenciais do Git"

GIT_GLOBAL_USER_EMAIL=`git config --global user.email`

if [[ -z "$GIT_GLOBAL_USER_EMAIL" ]];
then
    echo -n "Informar o email do Git : "
    read email
    git config --global user.email '"'${email}'"'
else
    echo "E-mail já cadastado"
fi;

GIT_GLOBAL_USER_NAME=`git config --global user.name`

if [[ -z "$GIT_GLOBAL_USER_NAME" ]];
then
    echo -n "Informar o user do Git : "
    read user
    git config --global user.name '"'${user}'"'
else    
    echo "User já cadastrado"
fi;