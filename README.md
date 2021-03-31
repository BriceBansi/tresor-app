# TresorApplication
Cette application est un projet node permettant de suivre les déplacements et la collecte des trésors des aventuriers sur une carte

## Features

- Lire un fichier en entrée
- Simuler les mouvements des aventuriers
- Ecrire un fichier de sortie

## Tech

- [Typescript] - Langage de programmation
- [Jasmine] - Framework de test
- [node.js] - server js

## Installation

git clone  ce repo

npm i

## Development & Build

Dans index.ts indiquer les paths du fichier d'entrée de sortie
```
PATH_IN = '/assets/jeu.txt'
PATH_OUT = '/assets/result.txt'
```
Pour packager dans ./build/ et obtenir le fichier de sortie
```
npm run start
```
Pour lancer les tests
```
npm run test
```

