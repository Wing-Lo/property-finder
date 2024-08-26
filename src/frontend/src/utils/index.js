import { jwtDecode } from "jwt-decode";

export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const handleFileUpload = async (e, setter) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setter(base64);
};

export const isTokenExpired = (token) => {
    if (!token) return true; // If there's no token, consider it expired.

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        return decodedToken.exp < currentTime; // Check if token is expired
    } catch (error) {
        console.error("Failed to decode token:", error);
        return true; // Consider the token expired if there's an error
    }
};

// Create our number formatter.
export const formatToAUD = (amount) => {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};
