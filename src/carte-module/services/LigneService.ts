import { Ligne, TypeLigne } from "../model/Ligne";

export class LigneService {
    static isLigneAventurier(ligne: string): boolean {
        return ligne.startsWith(TypeLigne.AVENTURIER);
    }

    static isLigneMontagne(ligne: string): boolean {
        return ligne.startsWith(TypeLigne.MONTAGNE);
    }

    static isLigneTresor(ligne: string): boolean {
        return ligne.startsWith(TypeLigne.TRESOR);
    }

    static isLigneCarte(ligne: string): boolean {
        return ligne.startsWith(TypeLigne.CARTE);
    }

    static isLigneComment(ligne: string): boolean {
        return ligne.startsWith(TypeLigne.COMMENTAIRE);
    }

    static getLigne(ligneFichier: string): Ligne | undefined {
        let ligne: Ligne = new Ligne();
        ligne.contenu = ligneFichier;
        if (this.isLigneCarte(ligneFichier)) {
            ligne.typeDeLigne = TypeLigne.CARTE
        } else if(this.isLigneAventurier(ligneFichier)) {
            ligne.typeDeLigne = TypeLigne.AVENTURIER
        } else if(this.isLigneMontagne(ligneFichier)) {
            ligne.typeDeLigne = TypeLigne.MONTAGNE
        } else if(this.isLigneTresor(ligneFichier)) {
            ligne.typeDeLigne = TypeLigne.TRESOR
        }
        return ligne;
    }
}