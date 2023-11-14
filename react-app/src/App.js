import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/users";
import MainPage from "./pages/MainPage";
import { ModalProvider } from "./context/ModalContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch])

  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
}

export default App;
