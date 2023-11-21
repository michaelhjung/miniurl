export const copyToClipboard = (dataToCopy) => {
  if (!dataToCopy) return;
  navigator.clipboard.writeText(dataToCopy);
};
