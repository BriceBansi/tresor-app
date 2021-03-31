import { FichierError } from "./FichierError";
import * as fs from "fs";
import * as path from 'path';

import { Aventurier } from "../aventurier-module/model/Aventurier";
import { AventurierService } from "../aventurier-module/service/AventurierService";
import { CarteService } from "../carte-module/services/CarteService";

export class FichierService {

    /**
     * Récuperer les lignes du fichier
     * @returns liste des ligne du fichier au bon format de lecture
     */
    static getLignesFichier(pathFile: string): string[] {
        try {
            const array = fs
                .readFileSync(pathFile, "utf8")
                .toString()
                .split("\n") as string[];
            return FichierError.getLignesFormat(array);
        } catch (error) {
            throw new Error(`Erreur fonctionnelle : Erreur survenue lors de la lecture du fichier. Erreur technique : ${error}`);
        }
    }

    static getFormatLigneAventurier(aventurier: Aventurier): string {
        return `A - ${aventurier.name} - ${aventurier.coordonnees.pointX} - ${aventurier.coordonnees.pointY} - ${aventurier.tresorTrouves} - ${aventurier.deplacements.join('')}`
    }

    /**
     * Créer le fichier de sortie avec la mise à jour des données des aventuriers
     * @param lignesFichier 
     * @param aventuriers 
     * @param outputFile 
     */
    static majLignesFichier(inputFile: string, outputFile: string) {
        try {
            const lignesFichier = FichierService.getLignesFichier(inputFile);

            let listeAventuriers = AventurierService.getListeAventuriers(lignesFichier);

            let listeCellules = CarteService.getListeCellules(lignesFichier);

            listeAventuriers = AventurierService.traiterLesDeplacementsAventurier(listeCellules, listeAventuriers)
            
            const lignesAventurier: string[] = listeAventuriers.map(aventurier => this.getFormatLigneAventurier(aventurier))
            
            const data = lignesFichier.filter(ligne => !ligne.startsWith('A')).map(ligne => ligne.replace( /\-/gi, ' - ')).concat(lignesAventurier).join('\n');
            fs.writeFileSync(outputFile, data)
        } catch (error) {
            throw new Error(`Erreur fonctionnelle : Erreur survenue lors de l'écriture du fichier. Erreur technique : ${error}`);
        }
    }

    /**
     * Récupérer le chemin fichier d'entrée ou le chemin de création du fichier de sortie
     * @param pathFile 
     * @returns chemin du fichier
     */
    static getPath(pathFile: string): string {
        return path.join(process.cwd(), pathFile);
    }

}