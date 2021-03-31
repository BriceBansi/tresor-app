import { Aventurier } from "../../aventurier-module/model/Aventurier";
import { Cellule } from "../model/Cellule";
import { Coordonnee } from "../model/Coordonnee";
import { Ligne, TypeLigne } from "../model/Ligne";
import { LigneService } from "./LigneService";

export class CarteService {


    private static separateur = '-';

    /**
     * Récupérer une cellule montagne, trésor, carte du jeu 
     * @param ligne 
     * @returns cellule
     */
    static getCellule (ligne: Ligne): Cellule {
        let cellule: Cellule = new Cellule();
        if (ligne && ligne.contenu) {
            cellule.isCarte = ligne.typeDeLigne === TypeLigne.CARTE ? true : false;
            cellule.isMontagne = ligne.typeDeLigne === TypeLigne.MONTAGNE ? true : false;;
            cellule.nbTresor = ligne.typeDeLigne === TypeLigne.TRESOR ? +ligne.contenu.split(this.separateur)[3] : 0;
            cellule.isTresor = ligne.typeDeLigne === TypeLigne.TRESOR ? true : false;
            cellule.positions = this.getCoordonnee(ligne) 
        }  
        return cellule;
    }

    static getListeCellules (lignesFichier: string[]): Cellule[] {
        return lignesFichier
        .filter((ligneFichier) => !LigneService.isLigneAventurier(ligneFichier))
        .map((ligneFichier) => {
            const ligne = LigneService.getLigne(ligneFichier) as Ligne;
            return CarteService.getCellule(ligne) as Cellule;
        }) as Cellule[];
    }

    /**
     * Récupérer la position d'une cellule
     * @param ligne 
     * @returns coordonnee
     */
    static getCoordonnee (ligne: Ligne): Coordonnee {
        let coordonnee: Coordonnee = new Coordonnee();
        if (ligne && ligne.contenu) {
            let infosLigne = ligne.contenu.split(this.separateur);      
            coordonnee.pointX = +infosLigne[1];
            coordonnee.pointY = +infosLigne[2];
        }    
        return coordonnee;
    }

    /**
     * Vérifier si l'aventurier se trouve sur une cellule carte, trésor, montagne
     * @param aventurier 
     * @param cellules 
     * @returns cellule
     */
    static getCelluleAventurier (aventurier: Aventurier, cellules: Cellule[]): Cellule | undefined {
        
        return cellules.find(cel => aventurier.coordonnees.pointX === cel.positions.pointX && aventurier.coordonnees.pointY === cel.positions.pointY)
    }

    /**
     * Vérifier si l'aventurier se trouve hors du jeu
     * @param aventurier 
     * @param cellules 
     * @returns true or false
     */
    static isAventurierEstSurCelluleMax (aventurier: Aventurier, cellules: Cellule[]): boolean | undefined {
        const celluleMax = cellules.find(cel => cel.isCarte)
        return aventurier.coordonnees.pointY < 0 || aventurier.coordonnees.pointX < 0 
               || aventurier.coordonnees.pointX > celluleMax.positions.pointX || aventurier.coordonnees.pointY > celluleMax.positions.pointY
    }

    /**
     * Vérifier si le jeu a au minimum une carte et un aventure avant de débuter le jeu
     * @param cellules 
     * @param aventuriers 
     * @returns true or false
     */
    static isCellulesPrincipalesDuJeu (cellules: Cellule[], aventuriers: Aventurier[]): boolean {   
       return cellules.find(cel => cel.isCarte) && aventuriers.length > 0
    }
}