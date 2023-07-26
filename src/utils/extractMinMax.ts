const extractMinMaxNumbers = (
  ranges: string[]
): { smallest: number; biggest: number } => {
  const numbers: number[] = ranges.flatMap((range) =>
    range.split("-").map(Number)
  );
  const smallest: number = Math.min(...numbers);
  const biggest: number = Math.max(...numbers);
  return { smallest, biggest };
};

export default extractMinMaxNumbers;
