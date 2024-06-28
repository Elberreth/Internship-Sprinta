// Utils/RandomCodeGenerator.js
const generateRandomCode = () => {
    const part1 = Math.floor(1000 + Math.random() * 9000);
    const part2 = Math.floor(1000 + Math.random() * 9000);
    return `${part1}-${part2}`;
};

export default generateRandomCode;

