export const pageGenerate = (pages: number): number[] => {
  const arr = [...Array(pages + 1).keys()];
  arr.shift();
  return arr;
};

export const pageResolver = (
  pages: number[],
  currentPage: number,
): { pagesWithinRange: number[]; leftDots: boolean; rightDots: boolean } => {
  const pagesWithinRange = pages.slice(currentPage < 3 ? 0 : currentPage - 3, currentPage <= 5 ? 7 : currentPage + 2);
  const leftDots = currentPage > 4 && currentPage - 3 > 0;
  const rightDots = pages.length - (currentPage + 3) > 0;
  return { pagesWithinRange, leftDots, rightDots };
};
