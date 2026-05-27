const makeUnit = (limit: number, divisor: number, suffix: string) => ({
  limit,
  divisor,
  suffix,
});

const TIME_UNITS = [
  makeUnit(3600, 60, "m"),
  makeUnit(86400, 3600, "h"),
  makeUnit(Infinity, 86400, "d"),
];

export function timeAgo(unix: number): string {
  const diff = Date.now() / 1000 - unix;
  const { divisor, suffix } = TIME_UNITS.find((u) => diff < u.limit)!;
  return `${Math.floor(diff / divisor)}${suffix} ago`;
}
