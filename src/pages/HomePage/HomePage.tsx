import React, { useCallback, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { filteredArticles } from '../../utils/utils';
import { PostList } from '../../components/PostList/PostList';
import { PostFilter } from '../../components/PostFilter/PostFilter';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const [value, setValue] = useState('');
  const articles = useAppSelector(state => state.articles.articles);

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value.trimStart());
    },
    []
  );

  let content;

  (value)
    ? (content = filteredArticles(articles, value))
    : (content = articles);

  return (
    <div className="home-page">
      <div className="container">
        <PostFilter
          onChange={onChangeInput}
          amountArticles={content.length}
          value={value}
        />
        <PostList value={value} articles={content}  />
      </div>
    </div>
  );
};