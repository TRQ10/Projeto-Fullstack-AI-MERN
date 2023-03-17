import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';


const PASSWORD = process.env.PASSWORD

const EMAIL = process.env.EMAIL




// https://ethereal.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: EMAIL, // generated ethereal user
        pass: PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
        body : {
            name: username,
            intro : text || 'Bem vindo a DaiSy! Estamos bem animados por ter você abordo.',
            outro: 'Precisa de ajuda, ou tem perguntas? Apenas responda esse email. adorariamos ajuda-lo!.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : ENV.EMAIL,
        to: userEmail,
        subject : subject || "Cadastro bem sucessido",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "Você deve receber um email da gente."})
        })
        .catch(error => res.status(500).send({ error }))

}