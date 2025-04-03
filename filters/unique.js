export default function (array, key) {
  const map = new Map(array.map((value) => [value[key], value]));
  return [...map.values()];
}
