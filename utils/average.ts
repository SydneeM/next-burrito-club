export const average = (input: number[]) => {
  const arrayLength = input.length;
  const average = arrayLength > 0 ? Math.round(input.reduce((a, b) => a + b) / arrayLength) : 0;
  return average;
}
