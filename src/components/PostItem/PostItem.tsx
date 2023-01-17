import React from 'react';
import { Marker } from 'react-mark.js';
import { Link } from 'react-router-dom';
import { formattedDate } from '../../utils/utils';
import { Article } from '../../types/types';
import './PostItem.scss';


interface ICardProps {
  article: Article;
  value: string;
}

export const PostItem: React.FC<ICardProps> = ({ article, value }) => {
  const { id, title, imageUrl, summary, publishedAt } = article;

  return (
    <div className="post">
      <img src={imageUrl} alt="image_news" className="post__img" />

      <div className="post__content">
        <p className="post__publish">
          <span className="post__icon-calendar"></span>

          {formattedDate(publishedAt)}
        </p>

        <Marker mark={`${value}`}>
          <h3 className="post__title">{title}</h3>
          <p className="post__description">{summary}</p>
        </Marker>

        <Link to={`/articles/${id}`} className="post__link">
          Read more
          <span className="post__icon-arrow"></span>
        </Link>
      </div>
    </div>
  );
};