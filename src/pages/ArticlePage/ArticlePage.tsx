import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchOneArticle } from '../../hooks/sliceArticle';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Status } from '../../types/enum';
import Loader from '../../components/UI/Loader/Loader';
import './ArticlePage.scss';


export const ArticlePage: React.FC = () => {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const fetchRequestStatus = useAppSelector(state => state.articles.status);
  const article = useAppSelector(state => state.articles.article);
  const errorMessage = useAppSelector(state => state.articles.error);

  useEffect(() => {
    dispatch(fetchOneArticle(+id));
  }, []);

  return (
    <>
      {fetchRequestStatus === Status.LOADING && <Loader />}

      {fetchRequestStatus === Status.FAILED && <p>{errorMessage}</p>}

      {fetchRequestStatus === Status.SUCCEEDED && (
        <div className="article">
          <div className="article__img-wrapper">
            <img
              src={article?.imageUrl}
              alt="article image"
              className="article__img"
            />
          </div>

          <div className="container">
            <div className="article__wrapper">
              <h2 className="article__title">{article?.title}</h2>

              <p className="article__description">{`${article?.summary}`}</p>
            </div>

            <Link to="/" className="article__link">
              <span className="article__link-icon"></span>
              Back to homepage
            </Link>
          </div>
        </div>
      )}
    </>
  );
};