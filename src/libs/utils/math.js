const getRandomNumber = (max) => {
  const rand = Math.floor(Math.random() * max);
  return rand;
};
const getNextRoundRobin = (current, total) => {
  let pos = current;
  if (current >= total - 1) {
    pos = 0;
  } else {
    pos += 1;
  }
  return pos;
};
export { getRandomNumber, getNextRoundRobin };
