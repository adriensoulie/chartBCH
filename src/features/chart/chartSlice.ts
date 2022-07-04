import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ChartRaw, ChartOrdered } from '../../app/types/type';

export interface chartState {
  status: 'idle' | 'loading' | 'failed';
  chart: ChartOrdered[];
  error: string | null
}   

const initialState: chartState = {
  status: 'idle',
  chart: [],
  error: null,
};

export const fetchChart = createAsyncThunk(
  'chart/fetch', 
  async () => {
    const response = await fetch(
      `https://index-api.bitcoin.com/api/v0/cash/history`
    );
    const data: ChartRaw[] = await response.json();

    let chartOrdered:ChartOrdered[] = [];

      data.map((chart) => {
        let newChartObject = {
          date: chart[0],
          value: chart[1],
        };
        chartOrdered.push(newChartObject);
      });

    return chartOrdered;
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
      state.chart.push(...payload);
      state.status = 'idle';
    });

    builder.addCase(fetchChart.rejected, 
      (state, { payload }) => {
      if (payload) state.error = 'API ERROR';
      state.status = 'idle';
    });
  }
});

export const selectChart = (state: RootState) => state.chart.chart;



export default chartSlice.reducer;
