import toast from 'react-hot-toast'

/** validar login do usuario */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
}

/** validar senha */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validar senha */
function passwordVerify(errors = {}, values){

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Insira a senha...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Senha incorreta...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("A senha precisa ter mais que 4 caracteres");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("A senha precisa ter pelo menos um caractere especial");
    }

    return errors;
}

/** validar usuario */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Insira o usuário...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Usuário inválido...!')
    }

    return error;
}

/** validar reset senha */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("As senhas não são iguais...!");
    }

    return errors;
}

/** validar cadastro */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validar email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Insira o email...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Email inválido...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Email inválido...!")
    }

    return error;
}

/** validar perfil */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}
