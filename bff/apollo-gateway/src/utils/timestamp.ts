export const convertTimestampToInt = (timestamp: {
  nanos: number;
  seconds: number;
}): number => {
  //  Convert seconds to 32-bit integer (Fit the seconds from the epoch into a 32-bit integer)
  if (timestamp.seconds > Number.MAX_SAFE_INTEGER) {
    throw new Error('Timestamp exceeds 32-bit integer range');
  }
  return Math.floor(timestamp.seconds);
};
