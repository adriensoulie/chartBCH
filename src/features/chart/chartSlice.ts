import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface chartState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
  data: Chart[];
  error: string | null
}   

type Chart = [time: string, price: number]


const initialState: chartState = {
  value: 0,
  status: 'idle',
  data: [],
  error: null,
};

export const fetchChart = createAsyncThunk(
    'chart/fetch', 
    async () => {
      const response = await fetch(
        `https://index-api.bitcoin.com/api/v0/cash/history`
      );
      const data: Chart[] = await response.json();
      return data;
    }
  );


export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      });

    builder.addCase(fetchChart.fulfilled, 
        (state, { payload }) => {
        state.data.push(...payload);
        state.status = 'idle';
      });
      
    builder.addCase(fetchChart.rejected, 
        (state, { payload }) => {
        if (payload) state.error = 'API ERROR';
        state.status = 'idle';
      });
  }

});

export const selectCount = (state: RootState) => state.chart.value;
export const selectChart = (state: RootState) => state.chart.data;


export default chartSlice.reducer;
