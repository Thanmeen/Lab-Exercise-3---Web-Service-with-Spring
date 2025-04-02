import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListSuperHuman = () => {
    const [superhumans, setSuperhumans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/heroes')
            .then(response => {
                setSuperhumans(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the heroes!", error);
            });
    }, []);

    return (
        <div>
            {superhumans.map((hero) => (
                <div key={hero.id} style={styles.card}>
                    <img src={hero.imageURL} alt={hero.name} style={styles.image} />
                    <div style={styles.info}>
                        <h2 style={styles.name}>{hero.name}</h2>
                        <p><strong>Type:</strong> {hero.type}</p>
                        <p><strong>Superpower:</strong> {hero.superpower}</p>
                        <div>
                            <h3>Friends:</h3>
                            {hero.humanFriends && hero.humanFriends.length > 0 ? (
                                <ul>
                                    {hero.humanFriends.map((friend, index) => (
                                        <li key={index}>{friend.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No friends listed.</p>
                            )}
                        </div>
                        <div>
                            <h3>Weapons:</h3>
                            {hero.weapons && hero.weapons.length > 0 ? (
                                <ul>
                                    {hero.weapons.map((weapon, index) => (
                                        <li key={index}>{weapon.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No weapons available.</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
    },
    info: {
        marginTop: '16px',
    },
    name: {
        margin: '0 0 8px',
        fontSize: '24px',
        fontWeight: 'bold',
    },
};

export default ListSuperHuman;
