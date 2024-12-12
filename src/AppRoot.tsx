import { useEffect, useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    Outseta: any;
  }
}
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
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [respons, setRespons] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Removing the access_token from the url is considered best practice
    // so that its not accidentally copied when sharing content.
    if (searchParams.get("access_token")) {
      //   setSearchParams({});
    }
    if (window.Outseta) {
      window.Outseta.getUser()
        .then(async (profile) => {
          console.log("User Profile:", profile);
          const tocken = await callXanoApi(searchParams.get("access_token"));
          sendDataToXano(profile, tocken);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [searchParams, setSearchParams]);

  const callXanoApi = async (token) => {
    const url = "https://x8ki-letl-twmt.n7.xano.io/api:u4WP2Kh2/outseta/auth"; // Xano URL

    try {
      const res = await axios.post(url, { token }); // Send token as input
      setResponse(res.data); // Store response data
      console.log("Response:", String(res.data.authToken));
      return Number(res.data.authToken);
    } catch (err) {
      setError(err.message);
    }
  };

  const sendDataToXano = async (profile, accessToken) => {
    const url = "https://x8ki-letl-twmt.n7.xano.io/api:u4WP2Kh2/user";

    // Extract the required data from the profile object
    const payload = {
      email: profile.Email || "",
      password: "", // Fill if required, or leave empty
      code: 0, // Replace with actual code if necessary
      expiration: null, // Replace with expiration date if required
      outseta: {
        accountUid: profile?.Account?.Uid || "",
        name: profile?.FullName || "",
        email: profile?.Email || "",
        nameid: profile?.Uid || "",
        subscriptionUid: profile?.CurrentSubscription?.Uid || "",
        planUid: profile?.CurrentSubscription?.Plan?.Uid || "",
        isPrimary: profile?.PrimaryContact ? 1 : 0,
        access_token: accessToken,
      },
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setRespons(data); // Store response data
    } catch (err) {
      setErro(err.message);
    }
  };

  return children;
}

export default AppRoot;
