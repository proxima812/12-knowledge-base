import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import ListBlocks from "./ListBlocks";

function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useUser();
  const supabase = useSupabaseClient();

  const handleAuthentication = async (email) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: "http://localhost:4321/auth",
        },
      });
      if (error) throw error;
      alert("Отлично!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      {user === null ? (
        <div className="flex gap-x-3">
          <input
            type="email"
            className="jbtn"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="jbtn"
            onClick={(e) => {
              e.preventDefault();
              handleAuthentication(email);
            }}
            disabled={loading}
          >
            {loading ? <>Входим...</> : <>Войти</>}
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-between gap-5">
            <div className="jbtn">{user.email}</div>
            <button className="jbtn" onClick={() => signOut()}>
              Выйти
            </button>
          </div>
          <ListBlocks user={user} />
        </>
      )}
    </>
  );
}

export default Auth;
