require("dotenv").config();
async function sha256(plainText) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hash;
}

// Hàm mã hóa Base64 (không padding)
function base64urlEncode(arrayBuffer) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); 
    return base64;
}


async function generateCodeChallenge(codeVerifier) {
    const hash = await sha256(codeVerifier);
    return base64urlEncode(hash);
}


async function Zaloverify() {
    const codeVerifier = process.env.CODE_VERIFIER;
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    return codeChallenge
}

module.exports ={
    Zaloverify : Zaloverify
}