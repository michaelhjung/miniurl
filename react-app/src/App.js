import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/users";
import { ModalProvider } from "./context/ModalContext";
import Landing from "./pages/Landing";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
}

export default App;
