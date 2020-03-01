import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'pirateSlice',
  initialState: {
    value: 0,
    loading: 'idle',
    pirate: {}
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to 'mutate' the state. It doesn't actually
      // mutate the state because it uses the immer library, which detects
      // changes to a "draft state" and produces a brand new immutable state
      // based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload.amount;
    },
    timesAThousand: state =>{
      state.value = state.value * 1000;
    },
    divAThousand: state => {
      state.value = state.value / 1000;
    },

    recievePirate: (state, data) => {
      console.log("in pirate slice reducer");
      console.log(data.payload.pirate);
      state.value = data.payload.pirate;
    },
    pirateLoading(state, action) {
      if(state.loading === 'idle') {
          state.loading = 'pending'
      }
    },
    pirateRecieved(state, action) {
      if(state.loading === 'pending') {
          state.loading = 'idle'
          state.pirate = action.payload
          console.log(action.payload);
      }
    }


  },
});



const getPirate = async () => {
  let response = await fetch(`http://localhost:8080/pirates/1`);
  let data = await response.json()
  return data;
}

export const fetchPirate = () => async dispatch => {
    dispatch(pirateLoading());
    const response = await getPirate()
    dispatch(pirateRecieved(response));

}

export const selectCount = state => state.counter.value;
export const selectPirate = state => state.counter.pirate;

export const {
  increment,
  decrement,
  incrementByAmount,
  timesAThousand,
  divAThousand,
  pirateLoading,
  pirateRecieved
 } = slice.actions;

export default slice.reducer;
