import React, { createContext, useContext, useReducer } from "react";

enum ActionTypes {
  setHoveredElement,
  resetHoveredElement,
}

interface SocialState {
  hoveredElement: React.Ref<JSX.Element>;
}

interface SocialStateAction {
  type: ActionTypes;
  payload?: SetHoveredElementPayload;
}

type SetHoveredElementPayload = React.Ref<JSX.Element>;

type UseSocialState = [
  SocialState,
  {
    setHoveredElement: (payload: SetHoveredElementPayload) => void;
    resetHoveredElement: () => void;
  }
];

const initialState: SocialState = { hoveredElement: undefined };

const useSocialState = (): UseSocialState => {
  const reducer = (state: SocialState, action: SocialStateAction) => {
    switch (action.type) {
      case ActionTypes.setHoveredElement:
        return { ...state, hoveredElement: action.payload };
      case ActionTypes.resetHoveredElement:
        return { ...state, hoveredElement: undefined };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setHoveredElement = (payload: React.Ref<JSX.Element>): void =>
    dispatch({ type: ActionTypes.setHoveredElement, payload });
  const resetHoveredElement = (): void =>
    dispatch({ type: ActionTypes.resetHoveredElement });

  return [state, { setHoveredElement, resetHoveredElement }];
};

export const SocialStateContext = createContext(undefined);

export const SocialStateProvider: React.FunctionComponent = ({
  children,
}): React.ReactElement => (
  <SocialStateContext.Provider value={useSocialState()}>
    {children}
  </SocialStateContext.Provider>
);
export const useSocialStateValue = (): UseSocialState =>
  useContext(SocialStateContext);
