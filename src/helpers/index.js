// for ASC sort use direction = 1, otherwise -1
export const compare = (a, b, value, direction) => {
  const aVal = String (a[value]).toUpperCase ().replace (/\s/g, '');
  const bVal = String (b[value]).toUpperCase ().replace (/\s/g, '');

  if (aVal > bVal) return 1 * direction;
  if (bVal > aVal) return -1 * direction;

  return 0;
};

export const generateShortStrings = number => {
  const strings = ['charA', 'charD', 'charFGKS'];

  for (let i = 0; i < number - 3; i++) {
    let string = Math.random ().toString (36).substring (7);
    strings.push (string);
  }

  return strings;
};
