import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";

function useUserAttributes() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchAttributes() {
      try {
        const { email, name } = await fetchUserAttributes();
        setName(name || "");
        setEmail(email || "");
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    }

    fetchAttributes();
  }, []);

  return { name, email };
}

export default useUserAttributes;
