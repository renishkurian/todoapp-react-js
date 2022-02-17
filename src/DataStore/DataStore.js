import React, { useReducer, createContext, useContext } from "react";

const DataStoreContext = createContext();
const DatastoreProvider = ({ initialState, reducer, children }) => (
  <DataStoreContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataStoreContext.Provider>
);

const useDataStore = () => useContext(DataStoreContext);

export { DatastoreProvider, useDataStore };
