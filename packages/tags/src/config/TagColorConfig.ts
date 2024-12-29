export const generateDefaultColor = (key: string): number => {
  let numberHash = 0;

  for (let i = 0; i < key.length; i++) {
    numberHash += (i + 1) * key.charCodeAt(i);
  }

  return numberHash % 360;
};
