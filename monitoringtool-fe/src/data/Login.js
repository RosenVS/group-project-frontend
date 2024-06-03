
import axios from "axios";
export function login(email, password){
    const ax = axios.create({
        baseURL: 'http://localhost:5075'
    });
    return ax.post("/login", JSON.stringify({ email, password }),
        {
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Credentials':true},
            withCredentials: true
        })
}

export function signup(name, email, password){

    const ax = axios.create({
        baseURL: 'http://localhost:5075'
    });
    return ax.post("/register", JSON.stringify({ name, email, password }),
        {
            headers: { 'Content-Type': 'application/json' ,
                'Access-Control-Allow-Credentials':true},
            withCredentials: true
        })



}
