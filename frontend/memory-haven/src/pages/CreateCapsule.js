import React, { useState } from "react";
import "../index.css";

function CreateCapsule() {
  const [title, setTitle] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [message, setMessage] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  // Handle text input changes
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setOpenDate(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Handle file input changes
  const handleFileChange = (e, index) => {
    const files = [...mediaFiles];
    files[index] = e.target.files[0];
    setMediaFiles(files);
  };

  // Add more media inputs
  const addMediaInput = () => {
    setMediaFiles([...mediaFiles, null]);
  };

  // Remove a media input
  const removeMediaInput = (index) => {
    const files = mediaFiles.filter((_, i) => i !== index);
    setMediaFiles(files);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !openDate || !message) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("openDate", openDate);
    formData.append("description", message);
    
    // Append media files if available
    mediaFiles.forEach((file, index) => {
      if (file) formData.append(`media${index}`, file);
    });

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        alert("User not authenticated! Please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/memoryhaven", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach JWT token
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Capsule created successfully!");
      } else {
        alert(data.message || "Error creating capsule");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create capsule. Try again later.");
    }
  };

  return (
    <div>
      <h1>💖 Create a Time Capsule ✨</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
          <input type="date" value={openDate} onChange={handleDateChange} />
          <textarea placeholder="Write your message..." value={message} onChange={handleMessageChange}></textarea>

          {/* File Upload Inputs */}
          {mediaFiles.map((file, index) => (
            <div key={index} className="file-input-container">
              <input 
                type="file" 
                accept="image/*, video/*, audio/*" 
                onChange={(e) => handleFileChange(e, index)}
              />
              <button type="button" className="remove-btn" onClick={() => removeMediaInput(index)}>❌</button>
            </div>
          ))}

          {/* Button to Add More Media */}
          <button type="button" className="add-media-btn" onClick={addMediaInput}>➕ Add More Media</button>
            <br></br>
          {/* Submit Button */}
          <button type="submit" className="create-btn">Create Capsule</button>
        </form>
      </div>
    </div>
  );
}

export default CreateCapsule;
