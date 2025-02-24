import { useEffect, useState } from "react";
import API_URL from "../api"; // Import backend URL

function Profile() {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCapsules = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debugging Token

      if (!token) {
        setError("You are not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching from:", `${API_URL}/api/memoryhaven`); // Check API URL

        const response = await fetch(`${API_URL}/api/memoryhaven`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", response.status); // Debug response status

        if (!response.ok) {
          throw new Error(`Failed to fetch capsules. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Capsules:", data); // Debug response data
        setCapsules(data);
      } catch (error) {
        console.error("Error fetching user capsules:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCapsules();
  }, []);

  return (
    <div>
      <h1>❤️ Your Profile ✨</h1>
      <p>Manage your time capsules here.</p>

      <h2>Your Capsules</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : capsules.length > 0 ? (
        <ul>
          {capsules.map((capsule) => (
            <li key={capsule._id}>
              <h3>{capsule.title}</h3>
              <p>{capsule.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't created any capsules yet.</p>
      )}
    </div>
  );
}

export default Profile;
