import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("SESSION:", session);
      setSession(data.session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) return <p>Cargando...</p>;

  // si no hay sesión → lo manda al login
  if (!session) return <Navigate to="/" />;

  return children;
}