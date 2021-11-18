export const getFirstItemFromStr = (str) => {
  let result = str?.split(",")?.[0];

  return result;
};
