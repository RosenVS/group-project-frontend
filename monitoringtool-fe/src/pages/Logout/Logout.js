import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";
import Button from "@mui/material/Button";


const Logout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {

        setAuth({});
        navigate('/login');
    }
    return (
         <Button color={'secondary'} onClick={logout}>Log out</Button>

    )
}
export default Logout;
