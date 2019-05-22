export class User {
    prenom: string;
    nom: string;
    mail: string;
    dateNaissance: Date;
    password: string;
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
}

export class Disponibilite {
    semaine: Jour[];
    exception: Date[];
}

export class Jour {
    titre: string;
    debut: number;
    fin: number;
}