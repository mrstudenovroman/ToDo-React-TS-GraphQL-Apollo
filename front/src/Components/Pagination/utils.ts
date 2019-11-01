export const pageGenerate = (pages: number): number[] => {
  const arr = [...Array(pages + 1).keys()];
  arr.shift();
  return arr;
};
