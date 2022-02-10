import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import Add from "./pages/Add";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Error from "./pages/Error";

function App() {
  return (
    <ErrorBoundary FallBackComponent={Error}>
      <BrowserRouter>
        <Routes>
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/book/:id" element={<Detail />} />
          <Route path="/add" element={<Add />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
