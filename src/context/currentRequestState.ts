import { createContext } from 'react';
import type { RequestItem, RequestType } from '../types/models';

export interface CurrentRequestState {
  type: RequestType | null;
  department: string;
  items: RequestItem[];
}

export type CurrentRequestAction =
  | { type: 'START_REQUEST'; payload: { requestType: RequestType; department: string } }
  | { type: 'LOAD_ITEMS'; payload: RequestItem[] } // used when duplicating a past request
  | { type: 'ADD_ITEM'; payload: RequestItem }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'RESET' };

export const initialCurrentRequestState: CurrentRequestState = {
  type: null,
  department: '',
  items: [],
};

export function currentRequestReducer(
  state: CurrentRequestState,
  action: CurrentRequestAction
): CurrentRequestState {
  switch (action.type) {
    case 'START_REQUEST':
      return {
        ...initialCurrentRequestState,
        type: action.payload.requestType,
        department: action.payload.department,
      };

    case 'LOAD_ITEMS':
      return { ...state, items: action.payload };

    case 'ADD_ITEM': {
      // If the product is already in the list, bump its quantity instead of duplicating the row
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.productId !== action.payload.productId),
      };

    case 'RESET':
      return initialCurrentRequestState;

    default:
      return state;
  }
}

export interface CurrentRequestContextValue {
  state: CurrentRequestState;
  dispatch: React.Dispatch<CurrentRequestAction>;
}

export const CurrentRequestContext = createContext<CurrentRequestContextValue | undefined>(
  undefined
);
