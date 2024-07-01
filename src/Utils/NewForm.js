import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player'; // Importera ReactPlayer

const NewForm = () => {
    const [newInfo, setNewInfo] = useState('');
    const [newMedia, setNewMedia] = useState('');
    const [entries, setEntries] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState('');
    const [editMedia, setEditMedia] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newInfo.trim() || newMedia.trim()) {
            setEntries([...entries, { info: newInfo, media: newMedia }]);
            setNewInfo('');
            setNewMedia('');
        }
    };

    const handleDelete = (index) => {
        setDeleteIndex(index);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        const newEntries = entries.filter((entry, i) => i !== deleteIndex);
        setEntries(newEntries);
        setShowConfirm(false);
        setDeleteIndex(null);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(entries[index].info);
        setEditMedia(entries[index].media);
    };

    const handleSave = () => {
        const newEntries = [...entries];
        newEntries[editIndex] = { info: editText, media: editMedia };
        setEntries(newEntries);
        setEditIndex(-1);
        setEditText('');
        setEditMedia('');
    };

    return (
        <>
            <form className="new-form card p-3" onSubmit={handleSubmit}>
                <h2 className="card-title text-center">What is New</h2>
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
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newMedia}
                        onChange={(e) => setNewMedia(e.target.value)}
                        placeholder="Paste image or video URL..."
                    />
                </div>
                <button type="submit" className="btn btn-primary submit-button mt-3">Submit</button>
            </form>
            {entries.length > 0 && (
                <div className="entries mt-3">
                    {entries.map((entry, index) => (
                        <div key={index} className="entry card p-3 mb-2 position-relative">
                            {editIndex === index ? (
                                <div className="mb-3">
                                    <textarea
                                        className="form-control mb-2"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        rows="3"
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        value={editMedia}
                                        onChange={(e) => setEditMedia(e.target.value)}
                                        placeholder="Paste image or video URL..."
                                    />
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
                                        <>
                                            {entry.media.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                                                <img src={entry.media} alt="Media" className="img-fluid mb-2" />
                                            ) : (
                                                <ReactPlayer url={entry.media} controls className="mb-2" width="100%" />
                                            )}
                                        </>
                                    )}
                                    <Dropdown className="position-absolute top-0 end-0">
                                        <Dropdown.Toggle variant="link" id={`dropdown-custom-${index}`} className="text-decoration-none">
                                            &#8942;
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEdit(index)}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDelete(index)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewForm;














