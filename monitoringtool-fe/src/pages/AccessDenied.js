
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const AccessDenied = () => {
   return(
       <Container sx={{
           display: "flex",
           flexDirection: "row",
           justifyContent: "center",
           alignItems: "center",
           width: "85%",
           mt: 20

       }}>

           <Typography sx={{fontSize:"8em"}}> ACCESS DENIED</Typography>
       </Container>

   )
}
export default AccessDenied;
