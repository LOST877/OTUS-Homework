export const objectToQueryString = (
  object: Record<string, string | number | boolean>
) => {
  return Object.keys(object)
    .reduce((acc: string[], key) => {
      if (object.hasOwnProperty(key)) {
        acc.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
        );
      }
      return acc;
    }, [])
    .join('&');
};
