import React, { useState, useRef } from 'react';
import '../CSS/UserProfile.css'; // Korrekt importväg för CSS-filen
import 'bootstrap/dist/css/bootstrap.min.css'; // Importera Bootstrap CSS

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
        fileInputRef.current.value = ''; // Återställ filinmatningen
      }
    }
  };

  return (
    <div className="container-fluid user-profile">
      <header className="header"></header>
      <div className="row justify-content-start">
        <div className="col-auto">
          <form className="profile-form card p-3">
            <h2 className="card-title text-center">Profile Picture</h2>
            <div className="image-preview card-img-top">
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
              ref={fileInputRef} // Referens till filinmatningen
            />
            <div className="button-group mt-3">
              <button type="button" className="btn btn-primary btn-add" onClick={() => fileInputRef.current.click()}>
                Add Image
              </button>
              <button type="button" className="btn btn-danger btn-remove" onClick={handleRemoveImage}>
                Remove Image
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;











