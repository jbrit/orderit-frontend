export const getError = (error) => {
  const message = error?.body?.message;
  if (!message) return null;
  if (typeof message === "string") return message;
  return message[Object.keys(message)[0]][0];
};
