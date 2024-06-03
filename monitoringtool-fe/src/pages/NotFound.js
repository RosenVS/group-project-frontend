import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const NotFound = ()=>{
    return (
        <Container sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "85%",
            mt: 30

        }}>

            <Typography sx={{fontSize:"8em", pl:20}}> NOT FOUND</Typography>
        </Container>

    );
}
export default NotFound;
