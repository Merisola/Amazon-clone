import React, { useContext, useEffect } from "react";
import "./App.css";
import Router from "./Router";
import { DataContext } from "./Components/DataProvider/DataContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.type";


const App = () => {
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // cleanup to avoid memory leaks / duplicate listeners
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
