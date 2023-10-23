const { exec } = require('child_process');

// Chemin vers les fichiers index.js dans les dossiers Morpion et Chat_Final
const morpionPath = './Morpion/index.js';
const chatFinalPath = './Chat_Final/server.js';

// Exécute le fichier index.js dans le dossier Morpion
exec(`node ${morpionPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur lors de l'exécution de ${morpionPath}: ${error}`);
    return;
  }
  console.log(`Sortie de ${morpionPath}: ${stdout}`);
});

// Exécute le fichier index.js dans le dossier Chat_Final
exec(`node ${chatFinalPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur lors de l'exécution de ${chatFinalPath}: ${error}`);
    return;
  }
  console.log(`Sortie de ${chatFinalPath}: ${stdout}`);
});
console.log(`Serveur en écoute sur le port 5000`);
