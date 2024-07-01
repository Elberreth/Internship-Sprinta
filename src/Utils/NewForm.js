import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const NewForm = () => {
  const [newInfo, setNewInfo] = useState('');
  const [newMedia, setNewMedia] = useState('');
  const [newMediaType, setNewMediaType] = useState(''); // Lägg till en state-variabel för att lagra typen av media
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');
  const [editMedia, setEditMedia] = useState('');
  const [editMediaType, setEditMediaType] = useState(''); // Lägg till en state-variabel för att lagra typen av media vid redigering
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newInfo.trim() || newMedia.trim()) {
      setEntries([...entries, { info: newInfo, media: newMedia, mediaType: newMediaType }]);
      setNewInfo('');
      setNewMedia('');
      setNewMediaType('');
    }
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      const newEntries = entries.filter((entry, i) => i !== index);
      setEntries(newEntries);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(entries[index].info);
    setEditMedia(entries[index].media);
    setEditMediaType(entries[index].mediaType);
  };

  const handleSave = () => {
    const newEntries = [...entries];
    newEntries[editIndex] = { info: editText, media: editMedia, mediaType: editMediaType };
    setEntries(newEntries);
    setEditIndex(-1);
    setEditText('');
    setEditMedia('');
    setEditMediaType('');
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMedia(URL.createObjectURL(file));
      setNewMediaType(file.type.startsWith('video') ? 'video' : 'image');
    } else {
      setNewMedia('');
      setNewMediaType('');
    }
  };

  const handleMediaUrlChange = (e) => {
    const url = e.target.value;
    setNewMedia(url);
    setNewMediaType(ReactPlayer.canPlay(url) ? 'video' : 'image');
  };

  const handleEditMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditMedia(URL.createObjectURL(file));
      setEditMediaType(file.type.startsWith('video') ? 'video' : 'image');
    } else {
      setEditMedia('');
      setEditMediaType('');
    }
  };

  const handleEditMediaUrlChange = (e) => {
    const url = e.target.value;
    setEditMedia(url);
    setEditMediaType(ReactPlayer.canPlay(url) ? 'video' : 'image');
  };

  return (
    <>
      <form className="new-form card p-3 mb-4" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="card-title text-center">What is New</h2>
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={newInfo}
            onChange={(e) => setNewInfo(e.target.value)}
            placeholder="Write something new..."
            rows="3"
            required
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            value={newMedia}
            onChange={handleMediaUrlChange}
            placeholder="Paste image or video URL..."
          />
          <Dropdown className="ms-2">
            <Dropdown.Toggle variant="link" className="text-decoration-none">
              &#8942;
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => fileInputRef.current.click()}>Browse</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleMediaChange}
            style={{ display: 'none' }}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-button mt-3">Submit</button>
      </form>
      {entries.length > 0 && (
        <div className="entries mt-3">
          {entries.map((entry, index) => (
            <div key={index} className="entry card p-3 mb-2">
              {editIndex === index ? (
                <div className="mb-3">
                  <textarea
                    className="form-control mb-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="3"
                    required
                  />
                  <div className="mb-3 d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      value={editMedia}
                      onChange={handleEditMediaUrlChange}
                      placeholder="Paste image or video URL..."
                    />
                    <Dropdown className="ms-2">
                      <Dropdown.Toggle variant="link" className="text-decoration-none">
                        &#8942;
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => fileInputRef.current.click()}>Browse</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleEditMediaChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className="button-group mt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditIndex(-1)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>{entry.info}</p>
                  {entry.media && (
                    entry.mediaType === 'image' ? (
                      <img src={entry.media} alt="Media" className="img-fluid mb-2" />
                    ) : entry.mediaType === 'video' || ReactPlayer.canPlay(entry.media) ? (
                      <ReactPlayer url={entry.media} controls className="img-fluid mb-2" />
                    ) : null
                  )}
                  <div className="button-group mt-2">
                    <Dropdown className="position-absolute top-0 end-0">
                      <Dropdown.Toggle variant="link" id={`dropdown-custom-${index}`} className="text-decoration-none">
                        &#8942;
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleEdit(index)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(index)}>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NewForm;















