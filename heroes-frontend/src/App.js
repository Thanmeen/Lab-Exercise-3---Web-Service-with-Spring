import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListSuperHuman from './Component/ListSuperHuman';
import AddSuperHuman from './Component/AddSuperHuman';
import ModifySuperHuman from './Component/ModifySuperHuman';
import DeleteSuperHuman from './Component/DeleteSuperHuman';

const App = () => {
    return (
        <Router>
            <div style={styles.container}>
                <h1>SuperHuman Management</h1>
                <div style={styles.navbar}>
                    <Link to="/list" style={styles.link}>List SuperHuman</Link>
                    <Link to="/add" style={styles.link}>Add SuperHuman</Link>
                    <Link to="/modify" style={styles.link}>Modify SuperHuman</Link>
                    <Link to="/delete" style={styles.link}>Delete SuperHuman</Link>
                </div>

                <Routes>
                    <Route path="/list" element={<ListSuperHuman />} />
                    <Route path="/add" element={<AddSuperHuman />} />
                    <Route path="/modify" element={<ModifySuperHuman />} />
                    <Route path="/delete" element={<DeleteSuperHuman />} />
                </Routes>
            </div>
        </Router>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    navbar: {
        marginBottom: '20px',
    },
    link: {
        margin: '10px',
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: '#007bff',
        borderRadius: '5px',
    }
};

export default App;
