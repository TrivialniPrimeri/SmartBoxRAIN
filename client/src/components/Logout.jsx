import { UserContext } from "../userContext";
import { useContext, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from 'react-router-dom';

function Logout(){

	const navigator = useNavigate();

    const userCxt = useContext(UserContext);

	useEffect(() => {
		axios.get("/auth/logout").then(() => {
			userCxt.setUserContext(null);
			navigator('/login');
		});
	});

    return null;
}

export default Logout;