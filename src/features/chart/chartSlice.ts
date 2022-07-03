import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface chartState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
  data: ChartOrdered[];
  error: string | null
}   

type ChartOrdered = {
    date: string,
    value: number
}

type ChartRaw = [time: string, price: number]


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
