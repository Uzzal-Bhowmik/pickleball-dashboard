/**
 * Format Transaction Id (Tnx Id)
 *
 * This function trims the middle part of the transaction ID and replaces it width '*'.
 * For example, if the input id is "1234567890", the output will be "1234******90".
 *
 * @param {string} id - The transaction id to be formatted.
 * @returns {string} - The formatted transaction id.
 */
const formatTransactionId = (id) => {
  // if (id.length < 6) return id;

  const divider = Math.floor(id.length / 3);

  const firstPart = id.slice(0, divider);
  const lastPart = id.slice(-divider);

  const middlePartInStars = id.slice(divider, -divider).replace(/./g, "*");

  return firstPart + middlePartInStars + lastPart;
};

export const formatString = {
  formatTransactionId,
};
