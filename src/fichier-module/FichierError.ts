export class FichierError {
    static formatLigne(ligneFichier: string): string {
        if (ligneFichier.startsWith('#')) {
            console.info(`Ligne de commentaire : ${ligneFichier}`)
        } else {
            ligneFichier = ligneFichier.replace(/\s/g,'');
            if( /([C|T|M|A]{1})-(\d+)-(\d+)$/gm.test(ligneFichier) ||
            /^([C|T|M|A]{1})-(\d+)-(\d+)-(\d+)$/gm.test(ligneFichier) ||
            /^([C|T|M|A]{1})-(.*)-(\d+)-(\d+)-(N|S|E|O{1})-([ADG]+)$/gm.test(ligneFichier) ) {
                return ligneFichier;
            } else {
                throw new Error(`La ligne suivante ne respecte pas le bon format : ${ligneFichier}`);
                
            }  
        }
      
    }

    static getLignesFormat(lignes: string[]) : string[] {
        return lignes.reduce(function(result, ligne) {
            const formatLigne = FichierError.formatLigne(ligne) 
            formatLigne ? result.push(formatLigne) : ''
            return result;
          }, []);
    }
}
