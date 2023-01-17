import React, { useEffect } from 'react';
import { fetchArticles } from '../../hooks/sliceArticle';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Status } from '../../types/enum';
import { Article } from '../../types/types';
import { PostItem } from '../PostItem/PostItem';
import Loader from '../UI/Loader/Loader';
import './PostList.scss';

interface CardListProps {
  articles: Article[];
  value: string;
}

export const PostList: React.FC<CardListProps> = ({ articles, value }) => {
  const dispatch = useAppDispatch();
  const fetchRequestStatus = useAppSelector(state => state.articles.status);
  const errorMessage = useAppSelector(state => state.articles.error);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <>
      {fetchRequestStatus === Status.LOADING &&
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}> 
        <Loader />
      </div>
      }

      {fetchRequestStatus === Status.FAILED && <p>{errorMessage}</p>}

      {fetchRequestStatus === Status.SUCCEEDED && (
        <div className="post-list home-page__post-list">
          {articles.map(article => (
            <PostItem value={value} article={article} key={article.id} />
          ))}
        </div>
      )}
    </>
  );
};