import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

// https://ethereal.email/create


/** POST http://localhost:6969/api/v1/registerMail 
 * @parm: {
 *  "username": "",
 * "userEmail": "",
 * "text": "",
 * "assunto": "",
 * }
*/


let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL, // generated ethereal user
        pass: ENV.PASSWORD, // generated ethereal password
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // Corpo do email

    let email = {
        body: {
            name: username,
            intro: text || "Bem vindos a **** estamos animados por ter você a bordo.",
            outro: "Precisando de ajuda, ou tem uma duvida? apenas responda esse email, nós adoraríamos ajudar."
        }
    }


    let emailBody = MailGenerator.generate(email);

    let message = {
        De: ENV.EMAIL,
        para: userEmail,
        subject: subject || "Logado com Sucesso",
        html: emailBody
    }

    // Enviar email
    transporter.sendMail(message)
        .then(() =>{
            return res.status(200).send({ msg: "Você dever ter recebido um email nosso." })
        })
        .catch(error => res.status(500).send({ error }))

}