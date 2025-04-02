import React, { useState } from 'react';
import axios from 'axios';

const AddSuperHuman = () => {
    const [hero, setHero] = useState({
        id: '',
        name: '',
        type: '',
        superpower: '',
        imageURL: '',
        weapons: [],
        humanFriends: [],
        realname: '',  // Real name for heroes
        origin: ''     // Origin for villains
    });

    const [weapon, setWeapon] = useState({ name: '', description: '' });
    const [friend, setFriend] = useState({ name: '' });

    const handleHeroChange = (e) => {
        const { name, value } = e.target;
        setHero(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleWeaponChange = (e) => {
        const { name, value } = e.target;
        setWeapon(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFriendChange = (e) => {
        const { name, value } = e.target;
        setFriend(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddWeapon = () => {
        setHero(prevState => ({
            ...prevState,
            weapons: [...prevState.weapons, weapon]
        }));
        setWeapon({ name: '', description: '' }); // Clear weapon input
    };

    const handleAddFriend = () => {
        setHero(prevState => ({
            ...prevState,
            humanFriends: [...prevState.humanFriends, friend]
        }));
        setFriend({ name: '' }); // Clear friend input
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/heroes', hero)
            .then(response => {
                alert('SuperHuman Added!');
                // Optionally reset the form after successful submission
                setHero({
                    id: '',
                    name: '',
                    type: '',
                    superpower: '',
                    imageURL: '',
                    weapons: [],
                    humanFriends: [],
                    realname: '',
                    origin: ''
                });
            })
            .catch(error => {
                console.error('Error adding superhuman:', error);
            });
    };

    return (
        <div>
            <h2>Add New SuperHuman</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input type="number" name="id" value={hero.id} onChange={handleHeroChange} required />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={hero.name} onChange={handleHeroChange} required />
                </div>
                <div>
                    <label>Type:</label>
                    <select name="type" value={hero.type} onChange={handleHeroChange} required>
                        <option value="">Select Type</option>
                        <option value="hero">Hero</option>
                        <option value="villain">Villain</option>
                    </select>
                </div>
                <div>
                    <label>Superpower:</label>
                    <input type="text" name="superpower" value={hero.superpower} onChange={handleHeroChange} required />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="imageURL" value={hero.imageURL} onChange={handleHeroChange} required />
                </div>

                {hero.type === 'hero' && (
                    <div>
                        <label>Real Name:</label>
                        <input
                            type="text"
                            name="realname"
                            value={hero.realname}
                            onChange={handleHeroChange}
                            required
                        />
                    </div>
                )}

                {hero.type === 'villain' && (
                    <div>
                        <label>Origin:</label>
                        <input
                            type="text"
                            name="origin"
                            value={hero.origin}
                            onChange={handleHeroChange}
                            required
                        />
                    </div>
                )}

                <div>
                    <h3>Weapons</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Weapon Name"
                        value={weapon.name}
                        onChange={handleWeaponChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Weapon Description"
                        value={weapon.description}
                        onChange={handleWeaponChange}
                    />
                    <button type="button" onClick={handleAddWeapon}>Add Weapon</button>
                    <ul>
                        {hero.weapons.map((w, index) => (
                            <li key={index}>{w.name} - {w.description}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>Human Friends</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Friend Name"
                        value={friend.name}
                        onChange={handleFriendChange}
                    />
                    <button type="button" onClick={handleAddFriend}>Add Friend</button>
                    <ul>
                        {hero.humanFriends.map((f, index) => (
                            <li key={index}>{f.name}</li>
                        ))}
                    </ul>
                </div>

                <button type="submit">Add SuperHuman</button>
            </form>
        </div>
    );
};

export default AddSuperHuman;
