export function checkPasswordStrength (password, setPasswordStrengthError, setError) {
    const lengthCheck = password.length >= 8;
    const capitalCheck = /[A-Z]/.test(password);
    const specialCharacterCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const numberCheck = /\d/.test(password);
    setPasswordStrengthError(true)
    if (!lengthCheck) {
        setError("Password must be at least 8 characters.");
    } else if (!capitalCheck) {
        setError("Password must contain at least one uppercase letter.");
    } else if (!specialCharacterCheck) {
        setError("Password must contain at least one special character.");
    } else if (!numberCheck) {
        setError("Password must contain at least one number.");
    } else {
        setError("");
        setPasswordStrengthError(false);
    }
    return setPasswordStrengthError;
};


export const googleClientId = "1099016382974-m8eqob6dcrf31l946ldj8t0u1m33qabs.apps.googleusercontent.com";



