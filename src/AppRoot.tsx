import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const checkProfile = async (token: string) => {
    try {
      const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:u4WP2Kh2/outseta/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const hasExistingProfile = !!response.data;
      setHasProfile(hasExistingProfile);
      
      // Redirect based on profile existence
      if (!hasExistingProfile && window.location.pathname !== '/onboarding') {
        navigate('/onboarding');
      } else if (hasExistingProfile && window.location.pathname === '/onboarding') {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error checking profile:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    // Removing the access_token from the url is considered best practice
    // so that its not accidentally copied when sharing content.
    if (searchParams.get("access_token")) {
      //   setSearchParams({});
    }
    if (window.Outseta) {
      window.Outseta.getUser()
        .then(async (profile) => {
          const token = await callXanoApi(searchParams.get("access_token"));
          await checkProfile(token);
          sendDataToXano(profile, token);
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
      return String(res.data.authToken);
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
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

    } catch (err) {
      setError(err.message);
    }
  };

  return hasProfile === null ? <div>Loading...</div> : children;
}

export default AppRoot;
