// "use client";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
// import { AppStore, makeStore } from "./store";
// import { useRef } from "react";

// export default function ReduxStoreProvider({ children }: { children: React.ReactNode }) {

//   const storeRef = useRef<{ store: AppStore; persistor: ReturnType<typeof persistStore> }>();

//   if (!storeRef.current) {
//     const store = makeStore();
//     const persistor = persistStore(store);
//     storeRef.current = { store, persistor };
//   }

//   return (
//     <Provider store={storeRef.current.store}>
//       <PersistGate loading={null} persistor={storeRef.current.persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {  makeStore } from "./store";
import { useMemo } from "react";

export default function ReduxStoreProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { store, persistor } = useMemo(() => {
    const store = makeStore();
    const persistor = persistStore(store);
    return { store, persistor };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate 
        loading={<div>Loading Redux state...</div>} 
        persistor={persistor}
      >
        
        {children}
      </PersistGate>
    </Provider>
  );
}