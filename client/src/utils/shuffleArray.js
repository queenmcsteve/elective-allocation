// an implementation of the Durstenfeld shuffle (optimized Fisher-Yates)

export function shuffleArray(a) {
  const array = [...a];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tempIndex = array[i].matchingIndex;
    array[i].matchingIndex = array[j].matchingIndex;
    array[j].matchingIndex = tempIndex;
  }
  return array;
}
