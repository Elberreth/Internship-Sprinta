import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewForm = () => {
  const [newInfo, setNewInfo] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newInfo.trim()) {
      setEntries([...entries, newInfo]);
      setNewInfo('');
    }
  };

  const handleDelete = (index) => {
    const newEntries = entries.filter((entry, i) => i !== index);
    setEntries(newEntries);
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setNewInfo(entry);
    handleDelete(index);
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
      <div className="entries mt-3">
        {entries.map((entry, index) => (
          <div key={index} className="entry card p-3 mb-2">
            <p>{entry}</p>
            <div className="button-group mt-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm me-2"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewForm;






