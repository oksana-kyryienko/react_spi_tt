import { Article } from '../types/types';

export const formattedDate = (date: string) => {
  const currentDate = new Date(date).toLocaleString('en', {
    dateStyle: 'long',
  });

  const splitedDate = currentDate.split(',');

  return `${splitedDate[0]}th, ${splitedDate[1]}`;
};

export const shortenedText = (string: string, maxLength: number) => {
  return string.length > maxLength
    ? `${string.slice(0, maxLength)}...`
    : string;
};

export const filteredText = (text: string, values: string) => {
  return text.toLowerCase().includes(values.toLowerCase());
};

export const filteredArticles = (articles: Article[], value: string) => {
  const filteredByTitle = articles.filter(({ title }) =>
    filteredText(title, value)
  );

  const filteredBySummary = articles.filter(({ summary }) =>
    filteredText(summary, value)
  );
  console.log([...new Set([...filteredByTitle, ...filteredBySummary])]);

  return [...new Set([...filteredByTitle, ...filteredBySummary])];
};