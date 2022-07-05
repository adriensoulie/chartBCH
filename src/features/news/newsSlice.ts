import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { News } from '../../app/types/type';

export interface newsState {
  status: 'idle' | 'loading' | 'failed';
  news: News[];
  error: string | null
}   

const initialState: newsState = {
  status: 'idle',
  news: [],
  error: null,
};

export const fetchNews = createAsyncThunk(
    'news/fetch', 
    async () => {
      const response = await fetch(
        `https://news.bitcoin.com/wp-content/weekly_popular_posts.json`
      );
      const data: News[] = await response.json();

      function dateFormat(date: string) {
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let newDate = day + "/" + month + "/" + year;
        return newDate;
      }

      let orderedNews = data.sort(function(a,b){
        const date1 = new Date(a.publish_date)
        const date2 = new Date(b.publish_date)
        return date1.getTime() - date2.getTime();
      });
  
      let newsDateFormated:News[] = [];
  
        orderedNews.map((chart) => {
          let newsObject = {
            ...chart,
            publish_date: dateFormat(chart.publish_date),
          };
          newsDateFormated.push(newsObject);
        });
      

      let recentNews = newsDateFormated.reverse().slice(0,4)
      
      return recentNews;
    }
  );


export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      });

    builder.addCase(fetchNews.fulfilled, 
        (state, { payload }) => {
        state.news = []
        state.news.push(...payload);
        state.status = 'idle';
      });

    builder.addCase(fetchNews.rejected, 
        (state, { payload }) => {
        if (payload) state.error = 'API ERROR';
        state.status = 'idle';
      });
  }
});

export const selectNews = (state: RootState) => state.news.news;


export default newsSlice.reducer;
