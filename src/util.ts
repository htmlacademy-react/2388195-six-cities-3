export default function randomiseCity(array: string[]) : string {
  return array[Math.floor(Math.random() * array.length)];
}
