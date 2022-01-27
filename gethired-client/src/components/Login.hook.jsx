import { useNavigate } from "react-router-dom";
import  Login from "./login.component";

export default function LoginHook() {
    const navigation = useNavigate();
    return <Login navigation={navigation} />;
}