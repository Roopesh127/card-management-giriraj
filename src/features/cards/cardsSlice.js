import { createSlice } from "@reduxjs/toolkit";

const sampleCards = [
  {
    id: "1",
    name: "Roopesh Vishwakarma",
    bankName: "SBI BANK",
    cardType: "credit", // 'credit' ya 'debit'
    cardNumber: "5500005555559340",
    validTill: "12/2026",
    cvv: "123",
    isDefault: true,
    isLocked: false,
    isArchived: false,
    isGPay: false,
  },
  {
    id: "2",
    name: "Shiya Awadhiya",
    bankName: "ICICI BANK",
    cardType: "credit",
    cardNumber: "5105105105105100",
    validTill: "08/2026",
    cvv: "456",
    isDefault: false,
    isLocked: false,
    isArchived: false,
    isGPay: true,
  },
  {
    id: "3",
    name: "Vishal Kumar",
    bankName: "HDFC BANK",
    cardType: "debit",
    cardNumber: "5500005555554321",
    validTill: "03/2027",
    cvv: "789",
    isDefault: true,
    isLocked: false,
    isArchived: false,
    isGPay: false,
  },
];

const resetCardStates = (card) => {
  card.isLocked = false;
  card.isArchived = false;
  card.isDefault = false;
  card.isGPay = false;
};

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: sampleCards,
    activeIndex: { credit: 0, debit: 0 },
    showNumber: { credit: false, debit: false },
  },
  reducers: {
    addCard: (state, action) => {
      state.cards.push({
        ...action.payload,
        id: Date.now().toString(),
      });
      const cardType = action.payload.cardType;
      const cardsOfType = state.cards.filter((c) => c.cardType === cardType);
      state.activeIndex[cardType] = cardsOfType.length - 1;
      state.showNumber[cardType] = false;
    },

    setActiveIndex: (state, action) => {
      const { cardType, index } = action.payload;
      state.activeIndex[cardType] = index;
      state.showNumber[cardType] = false;
    },

    toggleShowNumber: (state, action) => {
      const cardType = action.payload;
      state.showNumber[cardType] = !state.showNumber[cardType];
    },

    toggleLock: (state, action) => {
      const card = state.cards.find((c) => c.id === action.payload);

      if (card) {
        const newValue = !card.isLocked;

        resetCardStates(card);

        card.isLocked = newValue;
      }
    },

    toggleArchive: (state, action) => {
      const card = state.cards.find((c) => c.id === action.payload);

      if (card) {
        const newValue = !card.isArchived;

        resetCardStates(card);

        card.isArchived = newValue;
      }
    },

    setDefault: (state, action) => {
      const { id, cardType } = action.payload;
      state.cards.forEach((c) => {
        if (c.cardType === cardType) {
          c.isDefault = false;
        }
      });

      const card = state.cards.find((c) => c.id === id);

      if (card) {
        resetCardStates(card);

        card.isDefault = true;
      }
    },

    removeDefault: (state, action) => {
      const card = state.cards.find((c) => c.id === action.payload);
      if (card) card.isDefault = false;
    },
    toggleGPay: (state, action) => {
      const card = state.cards.find((c) => c.id === action.payload);

      if (card) {
        const newValue = !card.isGPay;

        resetCardStates(card);

        card.isGPay = newValue;
      }
    },
  },
});

export const {
  addCard,
  setActiveIndex,
  toggleShowNumber,
  toggleLock,
  toggleArchive,
  setDefault,
  removeDefault,
  toggleGPay,
} = cardsSlice.actions;

export default cardsSlice.reducer;
