// Milliseconds for each time unit
const minuteMs = 60 * 1000;
const hourMs = 60 * minuteMs;
const dayMs = 24 * hourMs;
const weekMs = 7 * dayMs;
const monthMs = 4 * weekMs;
const yearMs = 12 * monthMs;
const farMs = yearMs * 100;

// Breakpoints for the change of relative time unit
const breakpoints = [
  { ceiling: minuteMs, unit: "Now" },
  { ceiling: hourMs, unit: "min" },
  { ceiling: dayMs, unit: "h" },
  { ceiling: weekMs, unit: "d" },
  { ceiling: monthMs, unit: "w" },
  { ceiling: yearMs, unit: "mo" },
  { ceiling: farMs, unit: "y" },
];

// Helper for returning the relative time in regards to a time
// and its timeout for the next relative time update display
export function getRelativeTime(startDate, finishDate) {
  const startDateMs = startDate.getTime();
  const finishDateMs = finishDate.getTime();
  const timeDiff = finishDateMs - startDateMs;

  let relativeTime, nextUpdateTimeout;
  breakpoints.some(({ ceiling, unit }, i) => {
    if (timeDiff < ceiling) {
      const isNow = unit === "Now";
      const prevCeiling = !isNow ? breakpoints[i - 1].ceiling : minuteMs;
      if (isNow) relativeTime = "Now";
      else {
        const relativeTimeAmount = Math.floor(timeDiff / prevCeiling);
        relativeTime = `${relativeTimeAmount} ${unit}`;
      }
      nextUpdateTimeout = Math.ceil(startDateMs + Math.ceil(timeDiff / prevCeiling) * prevCeiling - finishDateMs);
      return true;
    } else return false;
  });

  return { relativeTime, nextUpdateTimeout };
}
