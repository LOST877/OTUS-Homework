'use client'

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Routes } from "../types";

export const defaultContext = Routes.TOP;

export const RouteContext = createContext({
  fromRoute: defaultContext,
  setFromRoute: useState as Dispatch<SetStateAction<Routes.SEARCH | Routes.TOP>>,
});

export default function RoutesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fromRoute, setFromRoute] = useState(defaultContext);
  return (
    <RouteContext.Provider value={{ fromRoute, setFromRoute }}>
      {children}
    </RouteContext.Provider>
  );
}