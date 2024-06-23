import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

function useUserAttributes() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchAttributes() {
      try {
        const { email, name } = await fetchUserAttributes();
        const { userId } = await getCurrentUser();

        setName(name || "");
        setEmail(email || "");
        setId(userId);
        console.log(`The userId: ${userId}`);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    }

    fetchAttributes();
  }, []);

  return { name, email, id };
}

export default useUserAttributes;
