import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { redirectToOriginalUrl } from "../api/redirects";

export const Redirect = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const response = await redirectToOriginalUrl(token);
        const { originalUrl } = response;
        window.location.href = originalUrl;
      } catch (error) {
        // Handle error (e.g., display an error page)
        console.error("Error redirecting:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!loading) handleRedirect();

    return () => {
      setLoading(false);
    };
  }, [token, loading]);

  return loading ? <div>Redirecting...</div> : null;
};
