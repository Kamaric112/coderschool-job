import React, { useState, useContext, createContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

function LoginPage() {
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
  const commonStyle = {
    display: "inline-block",
    font: "bold 1.5rem sans-serif",
    marginBottom: "0.5rem",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "0.3em 1.2em",
    margin: "0 0.1em 0.1em 0",
    border: "0.16em solid rgba(255,255,255,0)",
    borderRadius: "2em",
    boxSizing: "border-box",
    textDecoration: "none",
    fontFamily: "sans-serif",
    fontWeight: "300",
    color: "rgba(0,0,0,0.35)",
    textShadow: "0 0.04em 0.04em rgba(0,0,0,0.7)",
    textAlign: "center",
    transition: "all 0.2s",
  };
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
        <label style={commonStyle}>
          Username: <input name="username" type="text" />
        </label>{" "}
        <label style={commonStyle}>
          Password <input name="password" type="text" />
        </label>{" "}
        <br />
        <button type="submit" onClick={handleClose} style={buttonStyle}>
          Login
        </button>
      </form>

      <button
        onClick={() => {
          auth.signOut(() => navigate("/"));
        }}
        style={buttonStyle}
      >
        Logout
      </button>
    </div>
  );
}
