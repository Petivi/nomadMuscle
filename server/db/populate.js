const Salle = require('./../models/salle');
const Bailleur = require('./../models/bailleur');
const Locataire = require('./../models/locataire');

const insert = () => {
  var salles = [
      {
        id: "",
        nom: "A la queue leu leu",
        adresse: "Oui rue du oui",
        dimension: 20,
        equipements: ['tapis, tapis2'],
        utilisateurMax: 3,
        disponibilite: { semaine: [
          {titre: "Lundi", debut: 5, fin: 12},
          {titre: "Mardi", debut: 35, fin: 48},
          {titre: "Mercredi", debut: 29, fin: 45},
          {titre: "Jeudi", debut: 25, fin: 32},
          {titre: "Vendredi", debut: 15, fin: 19},
          {titre: "Samedi", debut: 10, fin: 20},
          {titre: "Dimanche", debut: 6, fin: 15}
        ],
        mois: "mai",
        exception: []
      },
      service: [
        "douche", "parking", "pipe", "binouze"
      ],
      photo: [
        "nudes.jpg", "oui.png"
      ],
      validationAuto: true,
      tarifHoraire: 69,
      pourcentageRemboursement: 1
    },
      {
        id: "",
        nom: "Michel c'est le brésil",
        adresse: "chez moi",
        dimension: 45,
        equipements: ['seau d\'eau'],
        utilisateurMax: 3,
        disponibilite: { semaine: [
          {titre: "Lundi", debut: 10, fin: 13},
          {titre: "Mardi", debut: 40, fin: 45},
          {titre: "Mercredi", debut: 25, fin: 30},
          {titre: "Jeudi", debut: 18, fin: 20},
          {titre: "Vendredi", debut: 12, fin: 13},
          {titre: "Samedi", debut: 15, fin: 21},
          {titre: "Dimanche", debut: 8, fin: 19}
        ],
        mois: "juin",
        exception: []
      },
      service: [
        "tant pis"
      ],
      photo: [
        "3945.jpg"
      ],
      validationAuto: false,
      tarifHoraire: 50,
      pourcentageRemboursement: 5
    }
  ];

  var bailleurs = [
    {
      nom: "Lennon",
      prenom: "Bob",
      dateNaissance: '1944-06-06',
      mail: "bob@lennon.fr",
      pieceId: "boblennon.jpg",
      solde: 5000,
      password: "123"
    },
    {
      nom: "Master",
      prenom: "Yoda",
      dateNaissance: '1900-01-01',
      mail: "yoda@master.fr",
      pieceId: "masterofpuppets.jpg",
      solde: 10000,
      password: "123"
    },
    {
      nom: "Jack",
      prenom: "Sparrow",
      dateNaissance: '1962-05-15',
      mail: "jack@sparrow.fr",
      pieceId: "jacksparrow.jpg",
      solde: 250,
      password: "123"
    }
  ]

  var locataires = [
    {
      nom: "Michel",
      prenom: "Bertrand",
      dateNaissance: '1982-04-10',
      mail: "michel@bertrand.fr",
      pieceId: "michelbertrand.jpg",
      certificat: "certifMichel.png",
      solde: 1000,
      password: "123"
    },
    {
      nom: "Christine",
      prenom: "Boutin",
      dateNaissance: '1700-09-26',
      mail: "christine@boutin.fr",
      pieceId: "christineboutin.jpg",
      certificat: "certifOui.png",
      solde: 101,
      password: "123"
    },
    {
      nom: "Internet",
      prenom: "Explorer",
      dateNaissance: '1500-12-25',
      mail: "ie@ie.fr",
      pieceId: "internetexplorer.jpg",
      certificat: "certifIE.png",
      solde: 2500,
      password: "123"
    }
  ]



  salles.forEach(s => {
    var salle = new Salle(s);
    salle.save().then(res => console.log('Salle ajoutée !'))
  })

  bailleurs.forEach(b => {
    var bailleur = new Bailleur(b);
    bailleur.save().then(res => console.log('Bailleur ajouté !'))
  })

  locataires.forEach(l => {
    var locataire = new Locataire(l);
    locataire.save().then(res => console.log('Locataire ajouté !'))
  })

}


module.exports = {
  insert
}


/*

app.get('/films', (req, res) => {
  // Film.find({}).then(films => {
  //   res.send(films)
  // })
  Film.find({})
  .populate({ path: 'seances', model: Seance })
  .then(events => {
    res.send(events)
  })
})


*/
