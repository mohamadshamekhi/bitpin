import { configureStore } from "@reduxjs/toolkit";
import markets from "../slice/markets";

export const store = configureStore({
  reducer: {
    markets: markets,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
