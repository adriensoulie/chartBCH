import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chartReducer from '../features/chart/chartSlice'
import newsReducer  from '../features/news/newsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chart: chartReducer,
    news: newsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
