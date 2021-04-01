import { FichierService } from "./fichier-module/FichierService";

const PATH_IN = '/src/assets/jeu.txt'
const PATH_OUT = '/src/assets/result.txt'

try {

    const inputFile = FichierService.getPath(PATH_IN);
    const outputFile = FichierService.getPath(PATH_OUT);
     
    FichierService.majLignesFichier(inputFile, outputFile);
 
} catch (error) {
        console.error(error);   
}
