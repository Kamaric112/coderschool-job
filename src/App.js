import { Container } from "@mui/system";
import React, { useEffect, useState, useContext, createContext } from "react";
import ResponsiveAppBar from "./mui/Appbar1.js";
import jobs from "./jobs.json";
import BasicCard from "./mui/Contentbox.js";
import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Switch, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import LayoutPage from "./mui/LayoutPage.js";
import ProtectedPage from "./mui/ProtectedPage.js";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="login" element={<LoginPage />}></Route>
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

let AuthContext = createContext(null); // AuthContext = global provider to check login status

const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [password, setPassword] = useState(null);

  const navigate = useNavigate();

  let signIn = (newUser, password) => {
    setUser(newUser);
    setPassword(password);
    navigate("/protected");
  };

  let signOut = () => {
    setUser(null);
    setPassword(null);
    navigate("/login");
  };

  let value = { user, password, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // set value for AuthContext  (global provider)
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  console.log(auth);

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");
    let password = formData.get("password");

    auth.signIn(username, password, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <label>
          Password <input name="password" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => {
          auth.signOut(() => navigate("/"));
        }}
      >
        Logout
      </button>
    </div>
  );
}

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  const location = useLocation();

  if ((!auth.user && !auth.password) || !auth.user || !auth.password) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

//click button to sign in + get user+password ( link + router)
