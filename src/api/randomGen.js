const genRand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const genRandoms = (randomCount) => {
  let randomArray = [];
  for (let i = 1; i <= 1000; i++) {
    const randomObj = { number: i, count: 0 };
    randomArray[i] = randomObj;
  }

  for (let i = 0; i < randomCount; i++) {
    const randomNumber = genRand(1, 1000);
    randomArray[randomNumber].count++;
  }

  randomArray.shift();
  return randomArray;
};

process.on("message", (msg) => {
  if (msg.action === "start") {
    const randomArray = genRandoms(msg.count);
    process.send(randomArray);
  }
});
