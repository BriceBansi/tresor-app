import { AventurierService } from "../aventurier-module/service/AventurierService";
import { CarteService } from "../carte-module/services/CarteService";
import { FichierError } from "../fichier-module/FichierError";
import { FichierService } from "../fichier-module/FichierService";

describe('Jeu carte de trésor : Chemin du fichier d\'entrée valide', function () {
const inputFile = 'D:/ProjetsWeb/tresorApp/jeu.txt'
let fichierServiceFunction = () => FichierService.getLignesFichier(inputFile);
  it('L\'accès au fichier d\'entrée devrait générée une erreur ', function () {
    expect(fichierServiceFunction).toThrowError();
  });
});

describe('Jeu carte de trésor : Format du fichier d\'entrée valide', function () {
  let tabFichier = 'C - 3 - 4\nM - 0 - 2\nT - 0 - 1 - 2\nA - Lara - 1 - 1 - S - A\n#A - Lara - 1 - 1 - S - A'.split('\n') as Array<string>
  let tab = FichierError.getLignesFormat(tabFichier)

  it('Le format de toutes les lignes du fichier est bon et ignore les lignes de commentaires ', function () {
    expect(tab.length).toEqual(4);
  });
});

describe('Jeu carte de trésor : Erreur sur le format du fichier d\'entrée', function () {
  let tabFichier1 = 'G - 3 - 4\nM - 0 - 2\nT - 0 - 1 - 2\nA - Lara - 1 - 1 - S - A'.split('\n')
  let tabFichier1Function = () => tabFichier1.map(ligne => FichierError.formatLigne(ligne))

  it('Une ligne du fichier déclenche une erreur  ', function () {
    expect(tabFichier1Function).toThrowError(/G-3-4/g);
  });
});


describe('Jeu carte de trésor : Déplacement de l\'aventurier', function () {
  let tabFichier = 'T - 3 - 4\nM - 0 - 2\nT - 0 - 1 - 2\nA - Lara - 1 - 1 - S - A'.split('\n')
  let tab = FichierError.getLignesFormat(tabFichier)
  let listeAventuriers = AventurierService.getListeAventuriers(tab);
  let listeCellules = CarteService.getListeCellules(tab);
  let listeAventuriersFunction = () => AventurierService.traiterLesDeplacementsAventurier(listeCellules, listeAventuriers)
  
  it('Le jeu ne peut commencer sans carte de trésor et aventurier ', function () {
    expect(listeAventuriersFunction).toThrowError(/Le jeu doit avoir au minimum une carte et un aventurier/g);
  });
});

describe('Jeu carte de trésor : Mise à jour des coordonnées de l\'aventurier lorsqu\'il est en direction S et avance', function () {
  let tabFichier = 'C - 3 - 4\nM - 0 - 2\nT - 0 - 1 - 2\nA - Lara - 1 - 1 - S - A'.split('\n')
  let tab = FichierError.getLignesFormat(tabFichier)
  let listeAventuriers = AventurierService.getListeAventuriers(tab);
  let listeCellules = CarteService.getListeCellules(tab);

  it('Les coordonnées de l\'aventurier devraient être de 1 en abscisse et 0 en ordonnée et direction Sud  ', function () {
    listeAventuriers = AventurierService.traiterLesDeplacementsAventurier(listeCellules, listeAventuriers)
    const aventurier = listeAventuriers[0];
    
    expect(aventurier.coordonnees.pointX).toEqual(1) && expect(aventurier.coordonnees.pointY).toEqual(0) && expect(aventurier.orientation).toEqual('S')
  });
});

describe('Jeu carte de trésor : Mise à jour des coordonnées de l\'aventurier lorsqu\'il est en direction S et tourne à gauche', function () {
  let tabFichier = 'C - 3 - 4\nM - 0 - 2\nT - 0 - 1 - 2\nA - Lara - 1 - 1 - S - AG'.split('\n')
  let tab = FichierError.getLignesFormat(tabFichier)
  let listeAventuriers = AventurierService.getListeAventuriers(tab);
  let listeCellules = CarteService.getListeCellules(tab);

  it('Les coordonnées de l\'aventurier devraient être de 2 en abscisse et 0 en ordonnée et direction E  ', function () {
    listeAventuriers = AventurierService.traiterLesDeplacementsAventurier(listeCellules, listeAventuriers)
    const aventurier = listeAventuriers[0];
    
    expect(aventurier.coordonnees.pointX).toEqual(2) && expect(aventurier.coordonnees.pointY).toEqual(0) && expect(aventurier.orientation).toEqual('S')
  });
});

describe('Jeu carte de trésor : Mise à jour des coordonnées de l\'aventurier lorsqu\'il est en direction E et tourne à gauche', function () {
  let tabFichier = 'C - 3 - 4\nM - 0 - 2\nT - 0 - 1 - 2\nA - Lara - 1 - 1 - S - AGG'.split('\n')
  let tab = FichierError.getLignesFormat(tabFichier)
  let listeAventuriers = AventurierService.getListeAventuriers(tab);
  let listeCellules = CarteService.getListeCellules(tab);

  it('Les coordonnées de l\'aventurier devraient être de 2 en abscisse et 1 en ordonnée et direction N  ', function () {
    listeAventuriers = AventurierService.traiterLesDeplacementsAventurier(listeCellules, listeAventuriers)

    const aventurier = listeAventuriers[0];
    expect(aventurier.coordonnees.pointX).toEqual(2) && expect(aventurier.coordonnees.pointY).toEqual(1) && expect(aventurier.orientation).toEqual('N')
  });
});

describe('Jeu carte de trésor : Mise à jour des coordonnées de l\'aventurier lorsqu\'il est en direction E et tourne à gauche', function () {
  let tabFichier = 'C - 3 - 4\nM - 0 - 2\nT - 2 - 1 - 2\nA - Lara - 1 - 1 - S - AGG'.split('\n')
  let tab = FichierError.getLignesFormat(tabFichier)
  let listeAventuriers = AventurierService.getListeAventuriers(tab);
  let listeCellules = CarteService.getListeCellules(tab);

  it('Les coordonnées de l\'aventurier devraient être de 2 en abscisse et 1 en ordonnée et direction N avec 1 trésor trouvé ', function () {
    listeAventuriers = AventurierService.traiterLesDeplacementsAventurier(listeCellules, listeAventuriers)
    const aventurier = listeAventuriers[0];
    const tresor = listeCellules.find(t => t.isTresor)

    expect(aventurier.coordonnees.pointX).toEqual(2) && 
    expect(aventurier.coordonnees.pointY).toEqual(1) && 
    expect(aventurier.orientation).toEqual('N') &&
    expect(aventurier.tresorTrouves).toEqual(1) &&
    expect(tresor.nbTresor).toEqual(1)
  });
});

describe('Jeu carte de trésor : Mise à jour des coordonnées de l\'aventurier lorsqu\'il est en direction E et tourne à droite', function () {
  let tabFichier = 'C - 3 - 4\nM - 2 - 0\nT - 0 - 1 - 2\nA - Lara - 1 - 1 - S - AG'.split('\n')
  let tab = FichierError.getLignesFormat(tabFichier)
  let listeAventuriers = AventurierService.getListeAventuriers(tab);
  let listeCellules = CarteService.getListeCellules(tab);
  let listeAventuriersFunction = () => listeAventuriers = AventurierService.traiterLesDeplacementsAventurier(listeCellules, listeAventuriers)
  
  it('Les coordonnées de l\'aventurier devraient générées une erreur indiquant qu\'il a rencontré une montagne et ne peut plus avancer ', function () {

    expect(listeAventuriersFunction).toThrowError('L\'aventurier ne peut pas continuer dans cette direction')
  });
});

describe('Jeu carte de trésor : Mise à jour des coordonnées de l\'aventurier lorsqu\'il est en direction E et tourne à droite', function () {
  let tabFichier = 'C - 3 - 4\nM - 0 - 2\nT - 0 - 1 - 2\nA - Lara - 1 - 1 - S - AGD'.split('\n')
  let tab = FichierError.getLignesFormat(tabFichier)
  let listeAventuriers = AventurierService.getListeAventuriers(tab);
  let listeCellules = CarteService.getListeCellules(tab);
  let listeAventuriersFunction = () => AventurierService.traiterLesDeplacementsAventurier(listeCellules, listeAventuriers)

  it('Les coordonnées de l\'aventurier devraient générées une erreur de dépassement limite de la carte au trésor ', function () {
    const aventurier = listeAventuriers[0];

    expect(listeAventuriersFunction).toThrowError('Limite du jeu')
  });
});