'use strict'
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const nodemailer = require('nodemailer-wrapper');
const dbconfig = require('../dbconfig');
const Mailchimp = require('mailchimp-api-v3')


router.get('/', (req, res) => {
    //const mailchimp = new Mailchimp({

    //})

    res.render('index.hbs');
});



const transporterConfig = {

    transportType: 'smtp',
    config: {
        host: 'smtp.ethereal.email', // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user: 'gage.carter@ethereal.email',
            pass: 'ppf67NBTFEVgYfTCjT'
        },
        // use up to 20 parallel connections
        maxConnections: 20,
        // do not send more than 10 messages per connection
        maxMessages: 10,
        tls: {
            rejectUnauthorized: false // for non-authorized mail server
        }
    }
};


// email subscriptions for notifications

router.post('/subscribe', [
        // check & validate
        check('fname').isLength({ min: 5 }).trim().escape(),
        check('message').isLength({ min: 5 }),
        check('email').isEmail().normalizeEmail()
    ],
    (req, res) => {

        let db = dbconfig.dev.connectionstring || dbconfig.live.connectionstring
        let mailer = new nodemailer(db, transporterConfig) // the wrspper insatnce config 
        let name = req.body.fname; // user fnmame
        let message = req.body.message; // message to the admin
        let email = req.body.email; // user email for notification
        let adminName = 'Tal'

        console.log(name + message + email);

        const errors = validationResult(req);

        const mailoAdmin = {

            from: email,
            to: 'gage.carter@ethereal.email', // test email to admin by @ethereal
            subject: 'Hello,' + 'Iam' + name + 'am looking foward to the holocaust survivors project',
            text: message,

        };

        const mailToUser = {
            from: 'gage.carter@ethereal.email',
            to: email, // test email to admin by @ethereal
            subject: 'Hello,' + 'Iam' + adminName + 'am looking foward to the holocaust survivors project',
            text: 'hello, welcome. Thanks for stopping by. Holocaust project is set ro kick off in 14 day',
            html: '<b>Welcome and THanks for stopping by!</b>'

        }


        // save emails before sending
        mailer.prepareMail(mailoAdmin);
        mailer.prepareMail(mailToUser);

        // do the saving
        mailer.saveEmails((err) => {
            if (err) {
                console.log('oops snap' + err);

            } else {
                console.log('yay! chicken time, our emils are saved');
                return

            }
        })

        // send email

        /*mailer.send((err) => {
            if (err) {
                console.log('what the heck!' + err);

            } else {
                console.log('yaay, more chicken :)');

            }
            let data = res.json('success');
            return data;
            // log
            console.table(data)
        })
        */

        res.json(name + message + email)


    });

module.exports = router;