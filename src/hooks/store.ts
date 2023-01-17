import { configureStore } from '@reduxjs/toolkit';
import sliceArticle from './sliceArticle';


export const store = configureStore({
  reducer: {
    articles: sliceArticle,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;