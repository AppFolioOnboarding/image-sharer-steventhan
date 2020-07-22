import { useState, useReducer, Reducer } from "react";

interface AsyncState<R> {
  data: R;
  error: {
    message: string;
    // eslint-disable-next-line
    [key: string]: any;
  };
  pending: boolean;
}

export enum ActionType {
  RESET,
  PENDING,
  SUCCESS,
  FAILURE,
}

interface Action<T> {
  type: ActionType;
  payload?: T;
}

function initialState<T>(initialData: T): AsyncState<T> {
  return {
    data: initialData,
    pending: false,
    error: null,
  };
}

function reducer<T>(
  state: AsyncState<T>,
  action: Action<T | Error>
): AsyncState<T> {
  switch (action.type) {
    case ActionType.RESET:
      return initialState<T>(action.payload as T);

    case ActionType.PENDING:
      return {
        ...state,
        pending: true,
      };

    case ActionType.SUCCESS:
      return {
        ...state,
        data: action.payload as T,
        error: null,
        pending: false,
      };

    case ActionType.FAILURE:
      return {
        ...state,
        error: action.payload as Error,
        pending: false,
      };

    default:
      return state;
  }
}

export function useAsyncReducer<T>(
  initialData: T = null
): readonly [AsyncState<T>, React.Dispatch<Action<T | Error>>] {
  const [state, dispatch] = useReducer<
    Reducer<AsyncState<T>, Action<T | Error>>
  >(reducer, initialState(initialData));
  return [state, dispatch] as const;
}

type StateValidator<T> = (state: T) => Error;

export function useStateWithCheck<T>(
  initialState: T,
  validateState: StateValidator<T>
): readonly [T, Error, (state: T) => void] {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState<Error>(null);

  function setStateWithCheck(state: T) {
    setState(state);
    setError(validateState(state));
  }
  return [state, error, setStateWithCheck] as const;
}
