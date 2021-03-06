import * as React from "react";
import "./FormInvestingDay.css";
import { motion } from "framer-motion";
import FormInvestingBet from "./FormInvestingBet"
import { Link } from "react-router-dom";
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {FaEthereum} from 'react-icons/fa'

export default function FormInvestingMoney({bet, setMoney}) {
  const optionsLotery = () => {
    db.collection("optionsLoteryMoney")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setOptions((options) => [...options, data]);
        });
      });
  };
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState("");
  const [Doit, setDoit] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Chose...");
  

  // const optionsLotery = async () => {
  //   const response = db.collection("optionsLotery");
  //   const data = await response.get();
  //   data.docs.forEach((item) => {
  //     setOptions([...options, item.data()]);
  //   });
  // };

  const Check = () => {
    if (bet) {
    if(bet.Coin === '' || bet.Day === ''){
      return <Redirect to='/FormCoin'></Redirect>
    }
    }
  };

  useEffect(() => {
    optionsLotery();
  }, []);
  return (
    <div className="Total">
      {Check()}
      <motion.div  transition={{type:'spring', duration:2}}
            initial={{ x:100, opacity:0 }}
            animate={{ x: 0, opacity:1 }} className="FormInvesting_card">
        <h3>
          Of how much you wanna make this bet{" "}
          <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </p>
        </h3>
        <div style={{ marginTop: "5%" }}>
          {options.map((Money) => {
        
            let spanClass = bet.Money === Money.Money ? "active" : "";
            return (
              <motion.li
                whileHover={{
                  scale: 1.4,
                  originX: 0,
                }}
                className="li"
                key={Money.Key}
                onClick={() => setMoney(Money.Money)}
              >
                <span className={spanClass}><FaEthereum /> {Money.Money}</span>
              </motion.li>
            );
          })}
        </div>
        {bet.Money && (
          <Link to="/formCoinBet">
<motion.button initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="buttonForm">
  <span className="spanForm"> Next </span>
</motion.button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
