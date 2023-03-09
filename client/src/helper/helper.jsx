import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

/** Make API Requests */



/** Authenticate functions */
export async function authenticate(username){
    try {
        return await axios.post('/api/v1/authenticate', { username })
    } catch (error) {
        return { error : "Usuário não existe...!"}
    }
}

/** get user details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/v1/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Senha inválida" }
    }
}

/** register user function */
export async function regiterUser(credentials){
    try {
        const { data: { msg }, status } = await axios.post('/api/v1/register', credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/v1/registerMail', { username, userEmail : email, text: msg })
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** Login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/v1/login', { username, password })
            return Promise.resolve({ data });

        }
    } catch (error) {
        return Promise.reject({ error: "Senha inválida...!" })
    }
}

/** Update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/v1/updateuser', response, { header : { "Autorização" : `Portador ${token}` }});
        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error: "Não foi possível atualizar o seu perfil...!" })
    }
}

/** Generate OTP */
export async function generateOTP(username){
    try {
        const { data: { code }, status } = await axios.get('/api/v1/generateOTP', { params : { username } });

        /** send mail with the OTP */
        if(status == 201){
            let { data : { email } } = await getUser({ username });
            let text = `Seu código para recuperar a senha é ${code}. Verifique e recupere a sua senha.`;
            await axios.post('/api/v1/registerMail', { username, userEmail : email, text, subject : "OTP para recuperação de senha" })
        }  
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
        const { data, status } = await axios.get('/api/v1/verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject(error)
    }
}

/** Reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/v1/resetPassword', { username, password });
        return Promise.resolve({ data, status }) 
    } catch (error) {
        return Promise.reject(error)
    }
}