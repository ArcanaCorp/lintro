export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
}

export function isValidPassword(password) {
    const rules = [
        { test: /.{6,}/, message: "La contraseña debe tener al menos 6 caracteres" },
        { test: /[a-z]/, message: "La contraseña debe incluir al menos una letra minúscula" },
        { test: /[A-Z]/, message: "La contraseña debe incluir al menos una letra mayúscula" },
        { test: /[0-9]/, message: "La contraseña debe incluir al menos un número" },
        { test: /[!@#$%^&*(),.?":{}|<>]/, message: "La contraseña debe incluir al menos un carácter especial" }
    ];

    for (const rule of rules) {
        if (!rule.test.test(password)) {
            return { isValid: false, message: rule.message };
        }
    }

    return { isValid: true, message: "" };
}