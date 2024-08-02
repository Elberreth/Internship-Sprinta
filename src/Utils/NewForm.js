import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Dropdown } from 'react-bootstrap';
import '../CSS/UserProfile.css'; // Importera UserProfile.css
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faShare, faComment } from '@fortawesome/free-solid-svg-icons';

const userFriends = [
  { id: 1, name: 'Friend 1', contact: 'user2@example.com' },
  { id: 2, name: 'Friend 2', contact: 'friend2@example.com' },
  { id: 3, name: 'Friend 3', contact: 'friend3@example.com' }
];

const currentUser = { id: 4, name: 'Current User', contact: 'currentuser@example.com' };

const NewForm = () => {
  const [newInfo, setNewInfo] = useState('');
  const [newMedia, setNewMedia] = useState('');
  const [newMediaType, setNewMediaType] = useState('');
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');
  const [editMedia, setEditMedia] = useState('');
  const [editMediaType, setEditMediaType] = useState('');
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().getTime();
    if (newInfo.trim() || newMedia.trim()) {
      setEntries([{ info: newInfo, media: newMedia, mediaType: newMediaType, timestamp, comments: [], likes: 0, dislikes: 0, liked: false, disliked: false }, ...entries]);
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
    newEntries[editIndex] = { ...newEntries[editIndex], info: editText, media: editMedia, mediaType: editMediaType };
    setEntries(newEntries);
    setEditIndex(-1);
    setEditText('');
    setEditMedia('');
    setEditMediaType('');
  };

  const handleLike = (index) => {
    const newEntries = [...entries];
    if (newEntries[index].liked) {
      newEntries[index].likes -= 1;
      newEntries[index].liked = false;
    } else {
      if (newEntries[index].disliked) {
        newEntries[index].dislikes -= 1;
        newEntries[index].disliked = false;
      }
      newEntries[index].likes += 1;
      newEntries[index].liked = true;
    }
    setEntries(newEntries);
  };

  const handleDislike = (index) => {
    const newEntries = [...entries];
    if (newEntries[index].disliked) {
      newEntries[index].dislikes -= 1;
      newEntries[index].disliked = false;
    } else {
      if (newEntries[index].liked) {
        newEntries[index].likes -= 1;
        newEntries[index].liked = false;
      }
      newEntries[index].dislikes += 1;
      newEntries[index].disliked = true;
    }
    setEntries(newEntries);
  };

  const handleShare = (index) => {
    const entry = entries[index];
    const shareText = `${entry.info}\n${entry.media}`;
    userFriends.forEach(friend => {
      console.log(`Sharing with ${friend.name}: ${shareText}`);
    });
    alert('Shared with all friends!');
  };

  const handleComment = (index) => {
    setCurrentEntryIndex(index);
    setShowCommentModal(true);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newEntries = [...entries];
      newEntries[currentEntryIndex].comments.push({ user: currentUser.name, text: newComment });
      setEntries(newEntries);
      setNewComment('');
      setShowCommentModal(false);
    }
  };

  const toggleShowComments = (index) => {
    setShowComments(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
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

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <>
      <form className="new-form card p-3 mb-4" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center align-items-center">
          <h5 className="card-title text-center bold-text">What is New</h5>
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
        <div className="mb-3 d-flex align-items-center justify-content-center">
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
              <Dropdown.Item onClick={() => fileInputRef.current && fileInputRef.current.click()}>Browse</Dropdown.Item>
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
          {entries.sort((a, b) => b.timestamp - a.timestamp).map((entry, index) => (
            <div key={index} className="entry card p-3 mb-2 position-relative">
              <Dropdown className="position-absolute top-0 end-0">
                <Dropdown.Toggle variant="link" id={`dropdown-custom-${index}`} className="text-decoration-none">
                  &#8942;
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEdit(index)}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(index)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {editIndex === index ? (
                <div className="mb-3">
                  <textarea
                    className="form-control mb-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="3"
                    required
                  />
                  <div className="mb-3 d-flex align-items-center justify-content-center">
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
                        <Dropdown.Item onClick={() => editFileInputRef.current && editFileInputRef.current.click()}>Browse</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={handleEditMediaChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className="button-group mt-2 d-flex justify-content-center">
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
                      <img
                        src={entry.media}
                        alt="Media"
                        className="img-fluid mb-2"
                        onClick={() => handleImageClick(entry.media)}
                        style={{ cursor: 'pointer' }}
                      />
                    ) : entry.mediaType === 'video' || ReactPlayer.canPlay(entry.media) ? (
                      <div className="react-player-wrapper">
                        <ReactPlayer url={entry.media} controls className="react-player" />
                      </div>
                    ) : null
                  )}
                  <div className="d-flex justify-content-end align-items-center mt-2">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      onClick={() => handleLike(index)}
                      style={{ cursor: 'pointer', marginRight: '10px' }}
                    />
                    <span>{entry.likes}</span>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      onClick={() => handleDislike(index)}
                      style={{ cursor: 'pointer', marginLeft: '15px', marginRight: '10px' }}
                    />
                    <span>{entry.dislikes}</span>
                    <FontAwesomeIcon
                      icon={faShare}
                      onClick={() => handleShare(index)}
                      style={{ cursor: 'pointer', marginLeft: '15px', marginRight: '10px' }}
                    />
                    <FontAwesomeIcon
                      icon={faComment}
                      onClick={() => handleComment(index)}
                      style={{ cursor: 'pointer', marginLeft: '15px', marginRight: '10px' }}
                    />
                  </div>
                  <span
                    className="text-muted"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleShowComments(index)}
                  >
                    {showComments[index] ? 'Hide comments' : 'Show comments'} ({entry.comments.length})
                  </span>
                  {showComments[index] && (
                    entry.comments && entry.comments.map((comment, commentIndex) => (
                      <div key={commentIndex} className="comment mt-2">
                        <p className="mb-1"><strong>{comment.user}:</strong> {comment.text}</p>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalImage} alt="Modal" className="img-fluid" />
        </Modal.Body>
      </Modal>
      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control mb-3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
          />
          <button
            className="btn btn-primary submit-button"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewForm;




























