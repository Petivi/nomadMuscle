

export class SalleComplete {
    bailleur: Bailleur;
    salle: Salle;
    ttTransaction: Transaction[];
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class Bailleur {
    dateNaissance: string;
    mail: string;
    nom: string;
    pieceValidated: boolean
    prenom: string;
    solde: number
    _id: string;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}
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
    disponibilites: Dispo[];
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

export class Dispo {
    debut: Date;
    fin: Date;
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

    constructor(public src: string, public file: File) { }
}

export class JourCalendar {
    libelle: string;
    optionDisplayed: boolean;
    eventDisplayed: boolean;
    moisCourant: boolean;
    mois: Mois
    numero: number;
    ttEvent: Evennement[];
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class Mois {
    libelle: string;
    numero: number;
    max: number;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class Evennement {
    libelle: string;
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
