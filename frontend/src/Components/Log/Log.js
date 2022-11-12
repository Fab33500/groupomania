import React, { useState } from "react";

import "../../Styles/log.css";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function Log() {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setSignInModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <>
      <div className="d-flex nav-login">
        <div className="col-6 register">
          <section
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn active-btn-left" : null}
          >
            S'inscrire
          </section>
        </div>

        <div className="col-6 login">
          <section
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </section>
        </div>
      </div>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </>
  );
}
