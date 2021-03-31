import { Coordonnee } from "./Coordonnee";

export class Cellule {
    positions?: Coordonnee;
    isMontagne?: boolean;
    isCarte?: boolean;
    isTresor?: boolean;
    nbTresor?: number;
}