import React, { useState } from "react";
import "./SignupForm.css";
import CloseIcon from "@material-ui/icons/Close";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import FormSubmit from "./FormSubmit";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useHistory } from "react-router-dom";
import db, { auth } from "./firebase";
import { getAuth, sendEmailVerification } from "firebase/auth";
function SignupForm() {
  const { register, handleSubmit, errors } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = ({ fName, lName, email, password }) => {
    //Hacer que se suba a firebase
    function addFirestore(userAuth) {
      db.collection("users").doc(userAuth.user.uid).set({
        name: fName,
        email: userAuth.user.email,
        password: password,
        uid: userAuth.user.uid,
        bets: 0,
      });
    }
    function SentEmailVerification() {

      const auth = getAuth();
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('Sended Verification')
        });
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        addFirestore(userAuth);
        SentEmailVerification()
        userAuth.user
          .updateProfile({
            displayName: fName,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: fName,
              })
            );
            history.replace("/VerifyEmail");
          });
      })

      .catch((error) => alert(error.message));
  };

  return (
    <div className="signupForm">
      <div className="signupForm__container">
        <form onSubmit={handleSubmit(onSubmit)} className="signupForm__form">
          <h4 className="signupForm__section">Personal Information</h4>
          <div className="signupForm__inputContainer">
            <TextField
              name="fName"
              label="First name"
              type="text"
              InputLabelProps={{
                style: { color: "#C6C6C6" },
              }}
              InputProps={{ style: { fontWeight: "800",color: "#C6C6C6" } }}
              className="signupForm__input"
              inputRef={register({ required: true })}
            />
            {errors.fName && (
              <div className="signupForm__error">
                <CloseIcon fontSize="small" />
                <span>Enter your first name.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="signupForm__reportIcon"
                />
              </div>
            )}
          </div>

          <div className="signupForm__inputContainer">
            <TextField
              name="lName"
              label="Last name"
              type="text"
              InputLabelProps={{
                style: { color: "#C6C6C6" },
              }}
              InputProps={{ style: { fontWeight: "800", color: "#C6C6C6" } }}
              className="signupForm__input"
              inputRef={register({ required: true })}
            />
            {errors.lName && (
              <div className="signupForm__error">
                <CloseIcon fontSize="small" />
                <span>Enter your last name.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="signupForm__reportIcon"
                />
              </div>
            )}
          </div>
          <h4 className="signupForm__section">Account Security</h4>
          <div className="signupForm__inputContainer">
            <TextField
              name="email"
              label="Email Address"
              type="email"
              InputLabelProps={{
                style: { color: "#C6C6C6", backgroundColor:'transparent' },
              }}
              InputProps={{ style: { fontWeight: "800",color: "#C6C6C6" } }}
              className="signupForm__input"
              inputRef={register({ required: true })}
            />
            {errors.email && (
              <div className="signupForm__error">
                <CloseIcon fontSize="small" />
                <span>Enter an email.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="signupForm__reportIcon"
                />
              </div>
            )}
          </div>

          <div className="signupForm__inputContainer">
            <TextField
              name="password"
              label="Password"
              type={passwordShown ? "text" : "password"}
              InputLabelProps={{
                style: { color: "#C6C6C6" },
              }}
              InputProps={{ style: { fontWeight: "800", color: "#C6C6C6" } }}
              className="signupForm__input"
              inputRef={register({ required: true })}
            />
            {passwordShown ? (
              <VisibilityOutlinedIcon
                onClick={() => setPasswordShown(!passwordShown)}
                className="signupForm__visibilityIcon"
              />
            ) : (
              <VisibilityOffOutlinedIcon
                onClick={() => setPasswordShown(!passwordShown)}
                className="signupForm__visibilityIcon"
              />
            )}
            {errors.password && (
              <div className="signupForm__error">
                <CloseIcon fontSize="small" />
                <span>Enter an password.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="login__reportIcon"
                />
              </div>
            )}
          </div>
          <h4 className="signupForm__rewards">
            COLLECT MORE STARS AND EARN REWARDS
          </h4>
          <span className="signupForm__span">
            Email is a great way to know about offers and what’s new from
            modernLotery®.
          </span>
          <FormSubmit name="Create account" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
