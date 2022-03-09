import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { Footer } from "./Footer";
import { Fade } from "react-awesome-reveal";
import FeaturedScreen from "./screens/FeaturedScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MenuScreen from "./screens/MenuScreen";
import SignupScreen from "./screens/SignupScreen";
import FormInvestingCoin from "./FormInvesting/FormInvestingCoin";
import FormInvestingDay from "./FormInvesting/FormInvestingDay";
import MyBets from "./About/myBets/MyBets";
import Succes from "./FormInvesting/AfterCheckOut/Succes";
import Cancel from "./FormInvesting/AfterCheckOut/Cancel";
import Analisis from "./About/myBets/Analisis";
import MyAccount from "./About/myAcount/MyAccount";
import VerifyEmail from "./VerifyEmail";
import Train from "./InfoInvesting/Train";
import { getAuth } from "firebase/auth";
import FormInvestingMoney from "./FormInvesting/FormInvestingMoney";
import FormInvestingBet from "./FormInvesting/FormInvestingBet";
import ReviewBet from "./FormInvesting/ReviewBet";
import HowInvest from "./InfoInvesting/HowInvest/HowInvest";
function App() {

  function Stap() {setLoad(true)}

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [bet, setBet] = useState({ Coin: '', Money:'', CoinBet:'', Day:''})
  console.log(bet)
  const setCoin = (Coin) => {
    setBet({...bet, Coin})
  }
  const setDay = (Day) => {
    setBet({...bet, Day})
  }
  const setMoney = (Money) => {
    setBet({...bet, Money})
  }
  const setCoinBet = (CoinBet) => {
    setBet({...bet, CoinBet})
  }

  const [profile, setProfile] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    Stap()
    setProfile(getAuth())
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }
    });
  }, [dispatch]);
console.log(profile.currentUser)
 return (
    <div className="app">
      {load === true ? 
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <HomeScreen />
            <Fade>
              <Footer />
            </Fade>
          </Route>
          <Route exact path="/account/signin">
            {user ? <Redirect to="/menu" /> : <LoginScreen />}
          </Route>
          <Route exact path="/account/create">
            {user ? <Redirect to="/menu" /> : <SignupScreen />}
          </Route>
          {/* For the menu */}
          <Route exact path="/menu">
            {!user ? (
              <Redirect to="/account/signin" />
            ) : (
              <>
                <Header menuPage />
                <MenuScreen />
              </>
            )}
          </Route>
          <Route exact path="/formCoin">
            {!user ? (
              <Redirect to="/formCoin" />
            ) : (
              <>
                <Header />
                <FormInvestingCoin setCoin={setCoin} bet={bet} />
              </>
            )}
          </Route>
          <Route exact path="/formDay">
            {!user ? (
              <Redirect to="/formDay" />
            ) : (
              <>
                <Header />
                <FormInvestingDay setDay={setDay} bet={bet} />
              </>
            )}
          </Route>
          <Route exact path="/formMoney">
            {!user ? (
              <Redirect to="/formMoney" />
            ) : (
              <>
                <Header />
                <FormInvestingMoney setMoney={setMoney} bet={bet} />
              </>
            )}
          </Route>
          <Route exact path="/formCoinBet">
            {!user ? (
              <Redirect to="/formCoinBet" />
            ) : (
              <>
                <Header />
                <FormInvestingBet setCoinBet={setCoinBet} bet={bet} />
              </>
            )}
          </Route>
          <Route exact path="/ReviewBet">
            {!user ? (
              <Redirect to="/ReviewBet" />
            ) : (
              <>
                <Header />
                <ReviewBet setCoinBet={setCoinBet} bet={bet} />
              </>
            )}
          </Route>
          <Route exact path="/cancel">
            <Header />
            <Cancel />
          </Route>
          <Route exact path="/succes">
            <Header />
            <Succes />
          </Route>
          <Route exact path="/about/Mybets">
            {profile.currentUser === null ? (
              <Redirect to="/account/signin" />
            ) : (
              <>
                <Header menuPage />
                <MyBets />
              </>
            )}
          </Route>
          <Route exact path="/about/Analisis">
            {!user ? (
              <Redirect to="/account/signin" />
            ) : (
              <>
                <Header menuPage />
                <Analisis />
              </>
            )}
          </Route>
          <Route exact path="/about/MyAccount">
            {!user ? (  
              <Redirect to="/account/signin" />
            ) : (
              <>
                <Header menuPage />
                <MyAccount />
              </>
            )}
          </Route>
          <Route exact path="/VerifyEmail">
            {!user ? (
              <Redirect to="/account/signin" />
            ) : (
              <>
                <VerifyEmail />
              </>
            )}
          </Route>
          <Route exact path="/Train">
            {!user ? (
              <Redirect to="/account/signin" />
            ) : (
              <>
                <Header menuPage />
                <Train />
              </>
            )}
          </Route>
          <Route exact path="/HowInvest">
            {!user ? (
              <Redirect to="/account/signin" />
            ) : (
              <>
                <Header menuPage />
                <HowInvest />
              </>
            )}
          </Route>

          <Route exact path="/menu/featured">
            <Header />
            <FeaturedScreen />
            <Fade>
              <Footer />
            </Fade>
          </Route>
        </Switch>
      </Router> : <p>Loading</p>}
      
    </div>
  );
}

export default App;
