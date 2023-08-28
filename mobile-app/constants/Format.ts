import dayjs from 'dayjs';

const Format = {
  currency: {
    EUR: (amount: number, withSymbol = false) =>
      amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + (withSymbol ? '€' : ''),
  },
  date: {
    ACTIVITY_LIST: (date: Date) => dayjs(date).format('MMMM D'),
  },
  percentage: {
    INTEGER: (percentage: number) =>
      percentage.toLocaleString(undefined, { maximumFractionDigits: 0 }) + '%',
  },
};
export default Format;
