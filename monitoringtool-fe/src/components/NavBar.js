import React from "react";
import logo from "../assets/openmazeLogo.svg";
import Logout from "../pages/Logout/Logout";
import Box from "@mui/material/Box";
import {useAuth} from "../context/AuthProvider";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function NavBar() {
    const { authState } = useAuth();
 return (
     <Box style={{width:'100vw', display: "flex",
         justifyContent: "space-between", flexDirection:"row",
         alignItems: "center", mr:5}}>
         <Box sx={{ minWidth: "300px", mt:1}} > <img src={logo} alt={"logo"}/> </Box>
         {
             authState &&
                 <Box style={{width:'100vw', display: "flex",
                     justifyContent: "end", flexDirection:"row",
                     alignItems: "center", mr:10 }}>

                     <Logout/>
                 </Box>

         }

     </Box>
 )
}
export default NavBar;
