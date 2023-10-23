# Projet_SAE302

Ce projet a été conçu dans le cadre d'une SAE (Situation Apprentissage Évalué), le but de celui-ci est de créer une application communicante avec un client et un serveur.

## A. Etape d'installation
### Etape 1
Tout d'abord installer `Node.js`</br>

* Sur **Windows & macOS**</br>
1. Se rendre sur le site d'installation de node.js : https://nodejs.org/fr/download</br>
1. Choisir votre version.</br>
1. Suivre le programme d'installation</br>
1. Vérifier si l'installation à bien était effectué : 
```
Node --version
```
```
npm --version
```
* Sur **Linux**</br>
1. Il faut dans un premier temps voir la version disponible pour sa distribution Linux : https://github.com/nodesource/distributions/blob/master/README.md </br>
2. Installer l'utilitaire curl :
```
sudo apt install curl
```

3. Démarrer l'installation de Node.js:
```
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y nodejs
```
4. Vérifier si l'installation à bien était effectué : 
```
Node --version
```
```
npm --version
```

### Etape 2
1. Ouvrir le projet dans Visual Studio.</br>
1. Ouvrir le terminal avec `Ctrl + ù`</br>
1. Se rendre dans le dossier `/Morpion` : 
```
cd .\Morpion\
```
4. Exécuter les commandes suivantes afin d'installer les modules nécessaires :
 ```
npm install express
npm install socket.io
```
5. Faire la même chose pour le dossier `/Chat_Final`.</br>
6. Puis revenir dans le dossier principal avec la commande `cd ..`

## B. Lancer les serveurs
Afin de lancer les serveurs il faut exécuter la commande suivante dans le terminal : `node .\execute.js`</br>
Les serveurs sont fonctionnel.

## C. Modification pour que d'autres personnes du réseau puissent avoir accès aux serveurs
1. Afin que d'autres utilisateurs puissent vous rejoindre, il faut modifier l'adresse IP dans les fichiers afin de mettre celle de la machine hôte des serveurs.</br>
2. Rendez-vous dans le dossier `/Morpion`</br>
3. A la ligne 494, modifiez `localhost` par votre adresse IP.</br>
4. Puis rendez-vous dans le dossier `/Chat_Final/html`</br>
5. Modifiez le `localhost` à la ligne 89 par votre adresse IP.

## D. Rejoindre le serveur
Pour rejoindre le serveur il faut entrée l'adresse IP de votre machine suivie du port 5000: 
```
http://<Adresse IP>:5000
```

**Profitez ;)**