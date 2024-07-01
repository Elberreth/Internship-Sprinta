import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

const NewForm = () => {
    const [newInfo, setNewInfo] = useState('');
    const [entries, setEntries] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newInfo.trim()) {
            setEntries([...entries, { info: newInfo }]);
            setNewInfo('');
        }
    };

    const handleDelete = (index) => {
        const newEntries = entries.filter((entry, i) => i !== index);
        setEntries(newEntries);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(entries[index].info);
    };

    const handleSave = () => {
        const newEntries = [...entries];
        newEntries[editIndex] = { info: editText };
        setEntries(newEntries);
        setEditIndex(-1);
        setEditText('');
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
                        rows="5"
                        required
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
        </>
    );
};

export default NewForm;











