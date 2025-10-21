import { REACT_APP_API_URL } from "@/config/config"

export const serviceVerifyUser = async (username) => {

    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/auth/verify-user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username})
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en la verificación")
        }

        return data;

    } catch (error) {
        console.error("serviceVerifyUser Error:", error)
        throw error
    }

}

export const serviceRegisterEmail = async (username, email) => {

    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/auth/register-email`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email})
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en el registro de correo electrónico")
        }

        return data;

    } catch (error) {
        console.error("serviceRegisterEmail Error:", error)
        throw error
    }

}

export const serviceCreateAccount = async (email, password) => {

    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/auth/create-account`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en la creación de la cuenta")
        }

        return data;

    } catch (error) {
        console.error("serviceCreateAccount Error:", error)
        throw error
    }

}

export const serviceCompletAccount = async (sub, name, username) => {

    try {

        const response = await fetch(`${REACT_APP_API_URL}/auth/complete-account`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({sub, name, username})
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en completar tu información")
        }

        return data;
    } catch (error) {
        console.error("serviceCompletAccount Error:", error)
        throw error
    }

}


export const serviceSearchUser = async (email) => {

    try {
        const response = await fetch(`${REACT_APP_API_URL}/auth/verify-email`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email})
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en buscar tu cuenta")
        }

        return data;
    } catch (error) {
        console.error("serviceSearchUser Error:", error)
        throw error
    }

}

export const serviceLoginUser = async (sub, password) => {

    try {
        const response = await fetch(`${REACT_APP_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({sub, password})
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en buscar tu cuenta")
        }

        return data;
    } catch (error) {
        console.error("serviceSearchUser Error:", error)
        throw error
    }

}