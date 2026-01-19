export default function (array, key) {
  return array.flatMap((value) => value[key]);
}
