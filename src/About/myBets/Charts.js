import React from "react";
import FirstChart from "./Charts/FirstChart";
import InfoBet from "./Charts/InfoBet";
import SecondChart from "./Charts/SecondChart";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import "./Charts.css";
function Charts(props) {
  const [priceB, setPriceB] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://blockchain.info/ticker")
      .then((res) => res.json())
      .then((data) => {
        setPriceB(data.USD.last);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div style={{ marginTop: 30 }}>
        {props.Changed === true ? (
          <div>
            <InfoBet
              AllBets={props.AllBets}
              SelectedBet={props.SelectedBet}
              Changed={props.Changed}
            ></InfoBet>
            <div className="charts">
              <h1 style={{ textAlign: "center", marginTop: "5%" }}>
                Formal Analisis
              </h1>
              <hr />

              <div className="charts_container">
                <div className="charts_card first">
                  <SecondChart
                    AllBets={props.AllBets}
                    SelectedBet={props.SelectedBet}
                    PriceBitcoin={priceB}
                  ></SecondChart>
                </div>
                <div className="charts_card second">
                  {" "}
                  <FirstChart
                    AllBets={props.AllBets}
                    SelectedBet={props.SelectedBet}
                  ></FirstChart>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Charts;
