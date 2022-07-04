import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chartReducer from '../features/chart/chartSlice'
import newsReducer  from '../features/news/newsSlice'
import spotReducer from '../features/spot/spotSlice';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    news: newsReducer,
    spot: spotReducer
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
