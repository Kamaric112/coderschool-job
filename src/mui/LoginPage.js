import React from "react";

function LoginPage({ auth }) {
  return (
    <div>
      <div>LoginPage</div>
      <button onClick={auth.signIn}>Log in</button>
    </div>
  );
}

export default LoginPage;
