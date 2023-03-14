import UserModel from '../mongodb/models/User.model.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator';

export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Não foi possivel encontrar o usuário!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Erro de autenticação"});
    }
}

export async function register(req,res){

    try {
        const { username, password, profile, email } = req.body;        

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({ error : "Por favor escolha um usuario unico"});

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function(err, email){
                if(err) reject(new Error(err))
                if(email) reject({ error : "Por favor escolha um email unico"});

                resolve();
            })
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcryptjs.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "Usuário registrado com sucesso"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Habilite senha com hash"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error);
    }

}

export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcryptjs.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Senha inválida"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "A senha não bate"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Usuário não encontrado"});
            })

    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function getUser(req,res){
    
    const { username } = req.params;

    try {
        
        if(!username) return res.status(501).send({ error: "Usuário inválido"});

        UserModel.findOne({ username }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Não foi possível encontrar o usuário"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Não foi possível encontrar informações"});
    }

}

export async function updateUser(req,res){
    try {
        
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ msg : "Informações atualizadas...!"});
            })

        }else{
            return res.status(401).send({ error : "Usuário não encontrado...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}

export async function generateOTP(req,res) {
    req.app.locals.OTP = await otpGenerator.generate(7, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP })
}

export async function verifyOTP(req,res) {
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // Resetar o valor da OTP
        req.app.locals.resetSession = true; // Começar sessão para resetar senha
        return res.status(201).send({ msg: "Verificado com sucesso!" })
    }
    return res.status(400).send({ error: "OTP inválida" });
}

export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Sessão expirada!"})
 }

export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Sessão expirada!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcryptjs.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Dados atualizados...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Ativar senha hashed"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Usuário não encontrado..."});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}