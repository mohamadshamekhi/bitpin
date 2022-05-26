import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../helper/coockieHandler";

const initialState = {
  markets: "",
  favoriteMarkets: [],
  financial: "empty",
  pageCondition: {
    page: 1,
    nextPage: null,
    prevPage: null,
  },
};

export const markets = createSlice({
  name: "markets",
  initialState,
  reducers: {
    addMarkets: (state, action) => {
      let { markets } = action.payload;

      state.markets = markets;
    },

    addPageCondition: (state, action) => {
      state.pageCondition = action.payload;
    },
    addFavoriteMarkets: (state, action) => {
      let { favoriteMarkets } = action.payload;

      state.favoriteMarkets = favoriteMarkets;
    },

    addItemToFavorite: (state, action) => {
      let { cookieName, favoriteItem } = action.payload;
      let cookieData = getLocalStorage(cookieName);

      if (cookieData) {
        setLocalStorage(cookieName, [...cookieData, favoriteItem]);
        state.favoriteMarkets = [...cookieData, favoriteItem];
        return;
      }
      state.favoriteMarkets = [favoriteItem];
      setLocalStorage(cookieName, [favoriteItem]);
    },

    removeItemOfFavorite: (state, action) => {
      let { cookieName, favoriteItem } = action.payload;
      let cookieData = getLocalStorage(cookieName);
      let removeResult = cookieData.filter(
        (item) => item.id !== favoriteItem.id && item
      );
      state.favoriteMarkets = removeResult;
      setLocalStorage(cookieName, removeResult);
    },

    addFinancial: (state, action) => {
      let { financial } = action.payload;
      state.financial = financial;
    },
  },
});

export const {
  addMarkets,
  addFavoriteMarkets,
  addPageCondition,
  addItemToFavorite,
  removeItemOfFavorite,
  addFinancial,
} = markets.actions;

export default markets.reducer;
