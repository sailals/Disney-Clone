import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";

const initialState = {
  recommend: [],
  newDisney: [],
  original: [],
  trending: [],
  status: "",
};

export const movieFetch = createAsyncThunk("movie/movieFetch", async () => {
  const movieCollectionRef = collection(db, "movies");
  const data = await getDocs(movieCollectionRef);
  // console.log(data);
  return data.docs;
});

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [movieFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [movieFetch.fulfilled]: (state, action) => {
      state.status = "success";
      let data = action.payload;
      console.log(action.payload);
      action.payload.map((doc) => {
        // console.log(doc.data());
        switch (doc.data().type) {
          case "recommend":
            state.recommend = [
              ...state.recommend,
              { id: doc.id, ...doc.data() },
            ];
            break;
          case "new":
            state.newDisney = [
              ...state.newDisney,
              { id: doc.id, ...doc.data() },
            ];
            break;
          case "original":
            state.original = [...state.original, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            state.trending = [...state.trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });
      // data.docs.map((doc)=>{
      //   switch(doc.data().type){

      //   }
      // })
    },
    [movieFetch.rejected]: (state, action) => {
      state.status = "Failed";
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;

export default movieSlice.reducer;
