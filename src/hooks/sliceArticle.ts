import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Status } from '../types/enum';
import { shortenedText } from '../utils/utils';
import { Article, ArticlesState } from '../types/types';

const initialState: ArticlesState = {
  article: null,
  status: Status.IDLE,
  articles: [],
  error: null,
};

export const fetchArticles = createAsyncThunk(
  'aritcles/fetchArticles',
  async () => {
    const response = await axios.get(
      'https://api.spaceflightnewsapi.net/v3/articles/'
    );

    return response.data;
  }
);

export const fetchOneArticle = createAsyncThunk(
  'aritcles/fetchOneArticle',
  async (id: number) => {
    const response = await axios.get(
      `https://api.spaceflightnewsapi.net/v3/articles/${id}`
    );

    return response.data;
  }
);

const setStatus = (state: ArticlesState) => {
  state.status = Status.LOADING;
};

const setError = (state: ArticlesState) => {
  state.status = Status.FAILED;
  state.error = 'Something is wrong';
};

const articlesSlice = createSlice({
  initialState,
  reducers: {},
  name: 'articles',
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, setStatus)
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.status = Status.SUCCEEDED;
          state.articles = action.payload.map(artilce => {
            artilce.title = shortenedText(artilce.title, 40);
            artilce.summary = shortenedText(artilce.summary, 100);

            return artilce;
          });
        }
      )
      .addCase(fetchArticles.rejected, setError);

    builder
      .addCase(fetchOneArticle.pending, setStatus)
      .addCase(
        fetchOneArticle.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.status = Status.SUCCEEDED;
          state.article = action.payload;
        }
      )
      .addCase(fetchOneArticle.rejected, setError);
  },
});

export default articlesSlice.reducer;
