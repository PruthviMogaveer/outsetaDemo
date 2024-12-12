import { useEffect } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  Outlet,
  BrowserRouter,
  useSearchParams,
} from "react-router-dom";

function AppRoot({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Removing the access_token from the url is considered best practice
    // so that its not accidentally copied when sharing content.
    if (searchParams.get("access_token")) {
      //   setSearchParams({});
    }
    fetchUser();
    
  }, [searchParams, setSearchParams]);

  const fetchUser = async () => {
    // fetch user data
    const response = await fetch("https://search-assistant.outseta.com/profile", {
        headers: {
          'Authorization': `Bearer ${searchParams.get("access_token")}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
  } 
  return children;
}

export default AppRoot;
