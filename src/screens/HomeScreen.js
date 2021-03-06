import React from "react";
import "./HomeScreen.css";
import { Link } from "react-router-dom";
import Featured from "../Featured";
import Heading from "../Heading";
import Info from "../Info";
import { Fade } from "react-awesome-reveal";
import Bitcoin from "../images/Bitcoin _Monochromatic.svg";
import { motion } from "framer-motion";
import undraw_Investing from "../images/undraw_Investing.svg";
import '../Responsive.css'
import undraw_Bitcoin from "../images/undraw_Bitcoin.svg";
import undraw_wallet from "../images/undraw_wallet.svg";

function HomeScreen() {
  return (
    <div className="homeScreen">
  
        <div className="homeScreen__bottom">
          <motion.div className="homeScreen__bottomLeft">
            <h4>Investing in our communities😏</h4>
            <p style={{color:'#C6C6C6'}}>
            Start using the new online cryptocurrency betting method, nothing is needed! Learn about this new way to earn digital money
            </p>
            <motion.button whileHover={{ scale: 1.2 }}>
              Learn more
            </motion.button>
          </motion.div>
          <div className="homeScreen__bottomRight none">
            <motion.img
              animate={{ y: 25, x: 25 }}
              initial={{ y: -30 }}
              transition={{ yoyo: Infinity, duration: 1.5 }}
              drag
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
              src={undraw_Bitcoin}
              alt="Image of bitcoin"
            />
          </div>
        </div>
    

      <div class="custom-shape-divider-bottom-1648319121">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
    </svg>
</div>

      <div className="homeScreen__featured">

     

          <Featured
            title="A sure way to win"
            info="All our transactions are with metamask, the safest way to send money, this is how bets are made and prizes are distributed"
            link="Explore this world"
            path="/account/signin"
            image={undraw_Investing}
            background="#f0ebe0"
            color="#000"
            className="featured__hoverLight"
          />
         
       
          <Featured
            title="Multiply your income"
            info="No more winning small percentages, invest a little and win a lot, this is how modernLotery works"
            link="Lets go!"
            path="/account/signin"
            image={undraw_wallet}
            order="2"
            background="#f0ebe0"
            color="#000"
            className="featured__hoverLight"
          />
        
      </div>

      
    </div>
  );
}

export default HomeScreen;
