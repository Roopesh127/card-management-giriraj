import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../features/cards/cardsSlice";
import toastReducer from "../features/toast/toastSlice";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("cardManagerState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(
      "cardManagerState",
      JSON.stringify({ cards: state.cards }),
    );
  } catch {}
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    toast: toastReducer,
  },
  preloadedState,
});

store.subscribe(() => saveState(store.getState()));

export default store;
