import * as React from "react";
import "./FormInvestingCoin.css";
import { motion } from "framer-motion";
import {
  Link
} from "react-router-dom";
import Button from '../Button'
  


export default function FormInvestingCoin({ profile, load, setCoin, bet }) {
 
  const [value, setValue] = React.useState("Etherum");
  const [Doit, setDoit] = React.useState(false);
  const coins = ["Etherum", "Bitcoin"];
  return (
    <div className="Total"> 
     
      <motion.div
        transition={{ type: "spring", duration: 2 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="FormInvesting_card"
      >
        <h3>
          In what Coin do you wanna make this bet{" "}
          <h3 style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </h3>
        </h3>
        <div style={{ marginTop: "5%" }}>
          {coins.map((coin) => {
            let spanClass = bet.Coin === coin ? "active" : "";
            return (
              <motion.li
                whileHover={{
                  scale: 1.4,
                  originX: 0,
                }}
                className="li"
                key={coin}
                onClick={() => setCoin(coin)}
              >
                <span className={spanClass}>{coin}</span>
              </motion.li>
            );
          })}
        </div>
        {bet.Coin && (
          <Link to="/formDay">
<motion.button initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="buttonForm">
  <span className="spanForm"> Next </span>
</motion.button>
 
          </Link>
        )}
      </motion.div>
    </div>
  );
}
