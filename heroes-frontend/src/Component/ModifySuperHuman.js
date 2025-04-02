import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModifySuperHuman = () => {
    const [heroId, setHeroId] = useState('');
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleIdChange = (e) => {
        setHeroId(e.target.value);
    };

    const fetchHero = () => {
        if (!heroId) {
            setError('Please enter a valid ID');
            return;
        }

        setLoading(true);
        setError(null);
        axios.get(`http://localhost:8080/heroes/${heroId}`)
            .then(response => {
                setHero(response.data);
                setLoading(false);
            })
            .catch(() => {
                setHero({
                    id: heroId,
                    name: '',
                    type: 'hero',
                    superpower: '',
                    imageURL: '',
                    realname: '',
                    origin: '',
                    humanFriends: [],
                    weapons: []
                });
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHero(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // จัดการ Human Friends
    const addFriend = () => {
        setHero(prevState => ({
            ...prevState,
            humanFriends: [...prevState.humanFriends, { name: '' }]
        }));
    };

    const updateFriend = (index, value) => {
        const updatedFriends = [...hero.humanFriends];
        updatedFriends[index].name = value;
        setHero(prevState => ({
            ...prevState,
            humanFriends: updatedFriends
        }));
    };

    const removeFriend = (index) => {
        const updatedFriends = hero.humanFriends.filter((_, i) => i !== index);
        setHero(prevState => ({
            ...prevState,
            humanFriends: updatedFriends
        }));
    };

    // จัดการ Weapons
    const addWeapon = () => {
        setHero(prevState => ({
            ...prevState,
            weapons: [...prevState.weapons, { name: '' }]
        }));
    };

    const updateWeapon = (index, value) => {
        const updatedWeapons = [...hero.weapons];
        updatedWeapons[index].name = value;
        setHero(prevState => ({
            ...prevState,
            weapons: updatedWeapons
        }));
    };

    const removeWeapon = (index) => {
        const updatedWeapons = hero.weapons.filter((_, i) => i !== index);
        setHero(prevState => ({
            ...prevState,
            weapons: updatedWeapons
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hero) return;

        axios.put(`http://localhost:8080/heroes/${hero.id}`, hero)
            .then(() => alert('SuperHuman Updated!'))
            .catch(() => setError('Error updating superhuman. Please try again.'));
    };

    return (
        <div>
            <h2>Modify SuperHuman</h2>

            <div>
                <label>Enter SuperHuman ID:</label>
                <input type="text" value={heroId} onChange={handleIdChange} />
                <button onClick={fetchHero}>Load SuperHuman</button>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && hero && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ID:</label>
                        <input type="text" name="id" value={hero.id} disabled />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={hero.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select name="type" value={hero.type} onChange={handleChange}>
                            <option value="hero">Hero</option>
                            <option value="villain">Villain</option>
                        </select>
                    </div>
                    <div>
                        <label>Superpower:</label>
                        <input type="text" name="superpower" value={hero.superpower} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type="text" name="imageURL" value={hero.imageURL} onChange={handleChange} />
                    </div>

                    {hero.type === 'hero' && (
                        <div>
                            <label>Real Name:</label>
                            <input type="text" name="realname" value={hero.realname} onChange={handleChange} />
                        </div>
                    )}

                    {hero.type === 'villain' && (
                        <div>
                            <label>Origin:</label>
                            <input type="text" name="origin" value={hero.origin} onChange={handleChange} />
                        </div>
                    )}

                    {/* แก้ไข Human Friends */}
                    <div>
                        <h3>Human Friends</h3>
                        {hero.humanFriends.map((friend, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={friend.name}
                                    onChange={(e) => updateFriend(index, e.target.value)}
                                />
                                <button type="button" onClick={() => removeFriend(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addFriend}>Add Friend</button>
                    </div>

                    {/* แก้ไข Weapons */}
                    <div>
                        <h3>Weapons</h3>
                        {hero.weapons.map((weapon, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={weapon.name}
                                    onChange={(e) => updateWeapon(index, e.target.value)}
                                />
                                <button type="button" onClick={() => removeWeapon(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addWeapon}>Add Weapon</button>
                    </div>

                    <button type="submit">Update SuperHuman</button>
                </form>
            )}
        </div>
    );
};

export default ModifySuperHuman;
