export default function dateFilter(value, format = 'date') {
  const options = {};

  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = 'long';
    options.year = 'numeric';
  }

  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  if (format.includes('allshort')) {
    options.day = '2-digit';
    options.month = '2-digit';
    options.year = '2-digit';
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  if (format.includes('hourminute')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  if (format.includes('sec')) {
    options.second = '2-digit';
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value));
}