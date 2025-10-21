import { REACT_APP_API_URL } from "@/config/config";

export const serviceGetAccount = async (tkn) => {

    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/account`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tkn}`
            }
        })
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Error en completar tu información")
        }
        
        return data;

    } catch (error) {
        console.error("serviceGetAccount Error:", error)
        throw error
    }

}