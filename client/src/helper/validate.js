import toast from 'react-hot-toast'

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
}

/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate password */
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
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

/** validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Insira o usuário...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Usuário inválido...!')
    }

    return error;
}

/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("As senhas não são iguais...!");
    }

    return errors;
}

/** validate register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate email */
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

/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}