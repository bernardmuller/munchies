export default function sum(numbers: number[]): number {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
