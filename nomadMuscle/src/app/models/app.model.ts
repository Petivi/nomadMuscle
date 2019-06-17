export class User {
    prenom: string;
    nom: string;
    mail: string;
    dateNaissance: Date;
    password: string;
    solde: number;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class Salle {
    idBailleur: string;
    nom: string;
    adresse: string;
    dimension: number;
    equipements: string[];
    utilisateurMax: number;
    disponibilite: Disponibilite;
    service: string[];
    photos: string[];
    validationAuto: boolean;
    tarifHoraire: number;
    pourcentageRemboursement: number;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class Disponibilite {
    semaine: Jour[];
    exception: Date[];
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class Jour {
    titre: string;
    debut: number;
    fin: number;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class Transaction {
    idSalle: string;
    idLocataire: number;
    montant: number;
    date: Date;
    dateString: string;
    debut: number;
    heureDebut: String;
    fin: number;
    heureFin: String;
    confirmee: boolean;
    annulee: boolean;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';
  
    constructor(public src: string, public file: File) {}
  }