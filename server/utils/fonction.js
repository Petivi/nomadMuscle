const Transaction = require('./../models/transaction');
const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');
const Salle = require('./../models/salle');
const nodemailer = require("nodemailer");


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

  module.exports.sendCustomMail = (mailContent) => {

    sendingMail();

  }

  async function sendingMail(){
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        // Message object
        let message = {
            from: 'Sender Name <sender@example.com>',
            to: 'Recipient <tanguy.dumay@hotmail.fr>',
            subject: 'Nodemailer is unicode friendly ✔',
            text: 'Hello to myself!',
            html: '<p><b>Hello</b> to myself!</p>'
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
  }
