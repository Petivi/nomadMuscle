const Transaction = require('./../models/transaction');
const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');
const Salle = require('./../models/salle');
const nodemailer = require("nodemailer");
const security = require('./../config/security');


module.exports.confirmationTransaction = (transaction, salle = null, locataire = null) => {
    return new Promise((resolve, reject) => {
        console.log('oui')
        getSalleLocataire(transaction, salle, locataire).then(resultat => {
            console.log(resultat)
            salle = resultat.salle;
            locataire = resultat.locataire;
            return Bailleur.find({ _id: salle.idBailleur });
        }).then(bailleur => {
            bailleur = new Bailleur(bailleur[0]);
            bailleur.solde += transaction.montant;
            return bailleur.save();
        }).then(() => {
            return locataire.save();
        }).then(() => {
            return transaction.save();
        }).then(() => {
            resolve(true)
        }).catch(err => reject(err));
    });
}

getSalleLocataire = (transaction, salle = null, locataire = null) => {
    return new Promise((resolve, reject) => {
        let ttPromise = [];
        let result = {};
        if (!salle) {
            ttPromise.push(Salle.find({ _id: transaction.idSalle }));
        }
        if (!locataire) {
            ttPromise.push(Locataire.find({ _id: transaction.idLocataire }));
        }
        if (ttPromise.length > 0) {
            Promise.all(ttPromise).then(res => {
                if (salle) result.salle = salle;
                else result.salle = res[0];
                if (locataire) result.locataire = locataire;
                else if (salle) result.locataire = res[0];
                else result.locataire = res[1];
                resolve(result)
            });
        } else {
            resolve({salle: salle, locataire: locataire});
        }

    });
}

  module.exports.sendCustomMail = (mail, nom, prenom, subject, content) => {

    sendingMail(mail, nom, prenom, subject, content);

  }

  async function sendingMail(mail, nom, prenom, subject, content){
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }


        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
                user: security.GMAIL_MAIL,
                pass: security.GMAIL_PASS
            }
        });

        const mailOptions = {
          from: security.GMAIL_MAIL, // sender address
          to: mail, // list of receivers
          subject: subject, // Subject line
          html: "<p>Bonjour "+prenom+" "+nom+", <br>"+content+"</p>"// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
           if(err)
             console.log(err)
           else
             console.log(info);
        });
    });
  }

  module.exports.getCustomHeure = (heure) => {

    if(heure%2 == 1){ // avec demie heure
      var newHeure = (heure-1)/2;
      return newHeure.toString().padStart(2, "0")+":30";
    }else { // sans demie heure
      return (heure/2).toString().padStart(2, "0")+":00";
    }

  }
