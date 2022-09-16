import React from "react";

import { Routes, Route } from "react-router-dom";
import LayoutPage from "./mui/LayoutPage.js";
import ProtectedPage from "./mui/ProtectedPage.js";
import LoginPage from "./mui/LoginPage.js";
import { AuthProvider, RequireAuth } from "./mui/LoginPage.js";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="/jobs/:id" element={<ProtectedPage />}></Route>

          <Route
            path="protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
