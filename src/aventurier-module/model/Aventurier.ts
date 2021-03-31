
import { Coordonnee } from "../../carte-module/model/Coordonnee";
import { Direction } from "./AventurierEnum";

export class Aventurier {
    typeLigne?: string;
    name?: string;
    orientation?: Direction;
    coordonnees?: Coordonnee;
    tresorTrouves?: number;
    deplacements?: string[];

}