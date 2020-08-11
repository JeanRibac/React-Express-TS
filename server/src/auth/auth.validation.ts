import Validator from "validator";
import isEmpty from "is-empty";

interface I_LoginData {
    email: string,
    password: string
}
interface I_RegisterData extends I_LoginData {
    confirmedPassword: string,
}

interface I_LoginErrors {
    email?: string | undefined;
    password?: string | undefined;
}
interface I_RegisterErrors extends I_LoginErrors {
    confirmedPassword?: string,
    emailInvalid?: string
}

export interface I_ValidationReturn {
    errors: object,
    isValid: boolean,
}
export class UserValidation {

    validateLoginInput(data: I_LoginData): I_ValidationReturn {
        const errors: I_LoginErrors = {};
        // Convert empty fields to an empty string so we can use validator functions
        data.email = !isEmpty(data.email) ? data.email : "";
        //data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        //email checks
        if (Validator.isEmpty(data.email)) {
            errors.email = "Acest câmp este obligatoriu";
        }
        // Password checks
        if (Validator.isEmpty(data.password)) {
            errors.password = "Acest câmp este obligatoriu";
        }

        return { errors, isValid: isEmpty(errors) };
    }

    validateRegisterInput(data: I_RegisterData): I_ValidationReturn {
        const errors: I_RegisterErrors = {};
        // Convert empty fields to an empty string so we can use validator functions
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        data.confirmedPassword = !isEmpty(data.confirmedPassword) ? data.confirmedPassword : "";
        // Name checks
        if (Validator.isEmpty(data.email)) {
            errors.email = "Acest câmp este obligatoriu";
        } else if (!Validator.isEmail(data.email)) {
            errors.emailInvalid = "Acest email nu este valid";
        }
        // Password checks
        if (Validator.isEmpty(data.password)) {
            errors.password = "Acest câmp este obligatoriu";
        }
        if (Validator.isEmpty(data.confirmedPassword)) {
            errors.confirmedPassword = "Acest câmp este obligatoriu";
        }
        if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
            errors.password = "Parola trebuie să conțină minim 4 caractere";
        }
        if (!Validator.equals(data.password, data.confirmedPassword)) {
            errors.confirmedPassword = "Parolele nu se potrivesc";
        }
        return { errors, isValid: isEmpty(errors) };
    };
}