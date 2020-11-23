export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

export const padZero = (n) => `${n + 100}`.substring(1);

export const getDateParams = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const weekday = date.getDay();
  return {
    year,
    month,
    day,
    weekday,
    formatted: `${year}-${month}-${day}`,
  };
};

export const getMonthInfo = (date = new Date()) => {
  const firstDayIndex = date.getDay();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;
  const prevDays = firstDayIndex === 0 ? 7 - firstDayIndex : firstDayIndex;
  const monthDaysArray = Array.from({ length: lastDay }, (_, i) => i + 1);
  const prevDaysArray = Array.from({ length: prevDays }, (_, i) => prevLastDay - i).reverse();
  const nextDaysArray = Array.from({ length: 42 - prevDaysArray.length - monthDaysArray.length }, (_, i) => i + 1);
  return {
    lastDay,
    prevLastDay,
    firstDayIndex,
    lastDayIndex,
    nextDays,
    prevDays,
    monthDaysArray,
    nextDaysArray,
    prevDaysArray,
  }
};
