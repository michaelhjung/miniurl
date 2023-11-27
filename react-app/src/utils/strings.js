export const toTitleCase = (str) =>
  str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());

export const toLowerCase = (str) => str.toLowerCase();
