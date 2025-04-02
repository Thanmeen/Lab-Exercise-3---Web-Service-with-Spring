import React, { useState } from 'react';
import axios from 'axios';

const DeleteSuperHuman = () => {
    const [id, setId] = useState('');

    const handleChange = (e) => {
        setId(e.target.value);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/heroes/${id}`)
            .then(response => {
                alert('SuperHuman Deleted!');
            })
            .catch(error => {
                console.error('Error deleting superhuman:', error);
            });
    };

    return (
        <div>
            <h2>Delete SuperHuman</h2>
            <div>
                <label>ID:</label>
                <input type="number" value={id} onChange={handleChange} required />
            </div>
            <button onClick={handleDelete}>Delete SuperHuman</button>
        </div>
    );
};

export default DeleteSuperHuman;
