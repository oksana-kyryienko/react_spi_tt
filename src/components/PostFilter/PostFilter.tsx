import React from 'react';
import './PostFilter.scss';


interface FilterProps {
  amountArticles: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PostFilter: React.FC<FilterProps> = ({
  onChange,
  amountArticles,
  value,
}) => {
  return (
    <div className="filter home-page__filter">
      <label className="filter__tag">Filter by keywords</label>
      <input
        className="filter__input"
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Search"
      />

      <p className="filter__results">{`Results: ${amountArticles}`}</p>
    </div>
  );
};