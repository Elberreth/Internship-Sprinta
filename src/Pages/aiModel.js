// aiModel.js

const aiModel = (user) => {
    const min = 0;
    const max = 1;
    const randomChurnProbability = Math.random() * (max - min) + min;
    return randomChurnProbability;
  };
  
  export default aiModel;