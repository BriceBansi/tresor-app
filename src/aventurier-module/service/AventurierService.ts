import { Cellule } from "../../carte-module/model/Cellule";
import { Coordonnee } from "../../carte-module/model/Coordonnee";
import { CarteService } from "../../carte-module/services/CarteService";
import { LigneService } from "../../carte-module/services/LigneService";
import { Aventurier } from "../model/Aventurier";
import { Deplacement, Direction } from "../model/AventurierEnum";



export class AventurierService {
    /**
     * Récupérer un aventurier dans le fichier
     * @param ligneFichier 
     * @returns aventurier
     */
    static getAventurier(ligneFichier: string) {
        let infosAventurier = ligneFichier.split('-');
        let [typeLigne, name, positionX, positionY, orientation, deplacement] = infosAventurier;
        let aventurier: Aventurier = new Aventurier;
        aventurier.typeLigne = typeLigne
        aventurier.name = name;
        aventurier.tresorTrouves = 0;
        aventurier.coordonnees = new Coordonnee();
        aventurier.coordonnees.pointX = +positionX;
        aventurier.coordonnees.pointY = +positionY;
        aventurier.orientation = <Direction>orientation;
        aventurier.deplacements = Array.from(deplacement)

        return aventurier;

    }

    /**
     * Récupérer la liste des aventuriers du jeu
     * @param lignesFichier 
     * @returns 
     */
    static getListeAventuriers(lignesFichier: string[]): Aventurier[] {
        return lignesFichier
            .filter((ligneFichier) => LigneService.isLigneAventurier(ligneFichier))
            .map((ligneFichier) =>
                AventurierService.getAventurier(ligneFichier)
            ) as Aventurier[];
    }

    /**
     * Mettre à jour les coordonnées de l'aventurier lorsqu'il passe d'une cellule à l'autre
     * @param aventurier 
     * @returns 
     */
    static majCoordonneesAventurier(aventurier: Aventurier): Aventurier {
        if (aventurier.orientation === Direction.NORD) {
            aventurier.coordonnees.pointY += 1
        } else if (aventurier.orientation === Direction.SUD) {
            aventurier.coordonnees.pointY -= 1
        } else if (aventurier.orientation === Direction.EST) {
            aventurier.coordonnees.pointX += 1
        } else if (aventurier.orientation === Direction.OUEST) {
            aventurier.coordonnees.pointX -= 1
        }
        return aventurier;
    }

    /**
     * Mettre à jour la direction de l'aventurier lorsqu'il se déplace à gauche
     * @param aventurier 
     * @returns aventurier
     */
    static majDirectionGaucheAventurier(aventurier: Aventurier): Aventurier {
        if (aventurier.orientation === Direction.NORD) {
            aventurier.orientation = Direction.OUEST
        } else if (aventurier.orientation === Direction.SUD) {
            aventurier.orientation = Direction.EST
        } else if (aventurier.orientation === Direction.EST) {
            aventurier.orientation = Direction.NORD
        } else if (aventurier.orientation === Direction.OUEST) {
            aventurier.orientation = Direction.SUD
        }
        return aventurier;
    }

    /**
     * Mettre à jour la direction de l'aventurier lorsqu'il se déplace à droite
     * @param aventurier 
     * @returns 
     */
    static majDirectionDroiteAventurier(aventurier: Aventurier): Aventurier {
        if (aventurier.orientation === Direction.NORD) {
            aventurier.orientation = Direction.EST
        } else if (aventurier.orientation === Direction.SUD) {
            aventurier.orientation = Direction.OUEST
        } else if (aventurier.orientation === Direction.EST) {
            aventurier.orientation = Direction.SUD
        } else if (aventurier.orientation === Direction.OUEST) {
            aventurier.orientation = Direction.NORD
        }
        return aventurier;
    }

    /**
     * Mettre à jour les propriétés de l'aventurier dans le cas où il est sur une cellule où se trouve un trésor ou une montagne
     * @param aventurier 
     * @param cellules 
     * @returns 
     */
    static avancerAventurier(aventurier: Aventurier, cellules: Cellule[]): Aventurier {
        aventurier = this.majCoordonneesAventurier(aventurier);
        if (!CarteService.isAventurierEstSurCelluleMax(aventurier, cellules)) {
            let cellule = CarteService.getCelluleAventurier(aventurier, cellules);       
            if (cellule?.isMontagne) {
                throw new Error(`L\'aventurier ${aventurier.name} ne peut pas continuer dans cette direction`)
            }
            if (cellule?.isTresor) {
                const idx = cellules.indexOf(cellule)
                aventurier.tresorTrouves += 1
                cellule.nbTresor = cellule.nbTresor > 0 ? cellule.nbTresor - 1 : 0
                cellules[idx] = cellule;
            }
            return aventurier;
        } else {
            throw new Error("Limite du jeu");
        }
    }

    /**
     * Exécuter l'avancement des joueurs et mettre à jour leur position
     * @param cellules 
     * @param aventuriers 
     * @returns aventuriers
     */
    static traiterLesDeplacementsAventurier(cellules: Cellule[], aventuriers: Aventurier[]): Aventurier[] {

        if (CarteService.isCellulesPrincipalesDuJeu(cellules, aventuriers)) {
            return aventuriers.map(aventurier => {
                for (let i in aventurier.deplacements) {
                    this.majDeplacementAventurier(aventurier, aventurier.deplacements[i], cellules);
                }
                return aventurier;       
            })
        } else {
            throw new Error("Le jeu doit avoir au minimum une carte et un aventurier");
        }
    }

    /**
     * Mettre à jour le déplacement du jour suivant la direction
     * @param aventurier 
     * @param deplacements 
     * @param cellules 
     * @returns aventurier
     */
    static majDeplacementAventurier(aventurier: Aventurier, deplacement: string, cellules: Cellule[]): Aventurier {
            if (deplacement === Deplacement.DROITE) {
                aventurier = AventurierService.majDirectionDroiteAventurier(aventurier);
            } else if (deplacement === Deplacement.GAUCHE) {
                aventurier = AventurierService.majDirectionGaucheAventurier(aventurier);
            }
            aventurier = AventurierService.avancerAventurier(aventurier, cellules);
            return aventurier;
        
    }


}