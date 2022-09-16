import React, { useState, useContext, createContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

function LoginPage() {
  let navigate = useNavigate();
  let from = navigate.state?.from?.pathname || "/";

  return (
    <Stack sx={{ p: 4, alignItems: "center" }}>
      <LoginForm />
    </Stack>
  );
}

export default LoginPage;

export let AuthContext = createContext(null); // AuthContext = global provider to check login status

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [password, setPassword] = useState(null);

  const navigate = useNavigate();

  let signIn = (newUser, password) => {
    setUser(newUser);
    setPassword(password);
    navigate("/");
  };

  let signOut = () => {
    setUser(null);
    setPassword(null);
    navigate("/login");
  };

  let value = { user, password, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // set value for AuthContext  (global provider)
}

export const RequireAuth = ({ children }) => {
  let auth = useAuth();
  const location = useLocation();

  if ((!auth.user && !auth.password) || !auth.user || !auth.password) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export function LoginForm({ handleClose }) {
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
        <button type="submit" onClick={handleClose}>
          Login
        </button>
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
