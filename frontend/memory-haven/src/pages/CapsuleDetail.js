import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../api"; // Import backend URL

function CapsuleDetail() {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCapsuleDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await fetch(`${API_URL}/api/memoryhaven/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch capsule details.");
        }

        const data = await response.json();
        setCapsule(data);
      } catch (error) {
        console.error("Error fetching capsule details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsuleDetails();
  }, [id]);

  return (
    <div>
      <h1>Capsule Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : capsule ? (
        <div>
          <h2>{capsule.title}</h2>
          <p>{capsule.description}</p>
          <p>Created on: {new Date(capsule.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Capsule not found.</p>
      )}
    </div>
  );
}

export default CapsuleDetail;