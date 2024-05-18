// RandomCodeGenerator.js

const generateRandomCode = () => {
    // Generate a random code in the format "xxxx-xxxx"
    const code = Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 6);
    return code.toUpperCase();
};

export default generateRandomCode;
