export const getUniqId = (prefix = ""): string => {
  const timestamp = Date.now().toString(16);
  const random = Math.random().toString(16).substring(2);
  const uniqueId = `${prefix}${timestamp}-${random}`;

  return uniqueId;
};
