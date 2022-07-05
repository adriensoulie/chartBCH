import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { SpotPrice } from '../../types/type';

export interface spotState {
  status: 'idle' | 'loading' | 'failed';
  spotPrice: SpotPrice | null
  error: string | null
}   

const initialState: spotState = {
    status: 'idle',
    spotPrice: null,
    error: null
};


export const fetchCurrentSpotPrice = createAsyncThunk(
  'spot/fetch', 
  async () => {
    const response = await fetch(
      `https://index-api.bitcoin.com/api/v0/cash/price/usd`
    );
    const data: SpotPrice = await response.json();
    return data;
  }
);


export const spotSlice = createSlice({
  name: 'spot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchCurrentSpotPrice.pending, (state) => {
        state.status = 'loading';
        state.error = null;
    });

    builder.addCase(fetchCurrentSpotPrice.rejected, 
    (state, { payload }) => {
        if (payload) state.error = 'API ERROR';
        state.status = 'idle';
    });

    builder.addCase(fetchCurrentSpotPrice.fulfilled, 
      (state, { payload }) => {
        state.spotPrice = payload
        state.status = 'idle';}
    );
  }
});

export const selectSpotPrice = (state: RootState) => state.spot.spotPrice;


export default spotSlice.reducer;
