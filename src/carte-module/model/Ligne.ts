export class Ligne {
    contenu?: string;
    typeDeLigne?: TypeLigne;
}


export enum TypeLigne {
    CARTE = 'C',
    AVENTURIER = 'A',
    MONTAGNE = 'M',
    TRESOR = 'T',
    COMMENTAIRE = "#"
}