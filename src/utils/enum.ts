function getKeys(theEnum: any) {
  return Object.keys(theEnum).filter(
    (k) => typeof theEnum[k as any] === "number"
  );
}

function getValues(theEnum: any) {
  return getKeys(theEnum).map((k) => theEnum[k as any]);
}

export default {
  getKeys,
  getValues,
};
