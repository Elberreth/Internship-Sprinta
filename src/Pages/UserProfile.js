import React, { useState, useRef } from 'react';
import '../CSS/UserProfile.css'; 

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleRemoveImage = () => {
    const confirmed = window.confirm("Are you sure you want to remove the image?");
    if (confirmed) {
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    }
  };

  return (
    <div className="user-profile">
      <form className="profile-form">
        <h2>Profile Picture</h2>
        <div className="image-preview">
          {image ? (
            <img src={image} alt="Profile" />
          ) : (
            <p>No image selected</p>
          )}
        </div>
        <input
          type="file"
          onChange={handleImageChange}
          className="image-input"
          ref={fileInputRef} 
        />
        <div className="button-group">
          <button type="button" className="btn-add" onClick={() => fileInputRef.current.click()}>
            Add Image
          </button>
          <button type="button" className="btn-remove" onClick={handleRemoveImage}>
            Remove Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;




