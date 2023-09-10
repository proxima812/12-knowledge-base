import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Auth from "./auth/Auth";
import { supabase } from "./supabaseClient.js";

function MySession() {
  return (
    <>
      <SessionContextProvider supabaseClient={supabase}>
        <Auth />
      </SessionContextProvider>
    </>
  );
}

export default MySession;
