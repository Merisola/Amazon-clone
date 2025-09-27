import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      const updatedBasket = existingItem
        ? state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          )
        : [...state.basket, { ...action.item, amount: 1 }];

      return {
        ...state,
        basket: updatedBasket,
      };
    }

    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      const newBasket = [...state.basket];

      if (index >= 0) {
        const item = newBasket[index];
        if (item.amount > 1) {
          newBasket[index] = { ...item, amount: item.amount - 1 };
        } else {
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
    }

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
