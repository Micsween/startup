import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return <div>
        <header> 
            <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <a className="nav-link" href="index.html">Login</a>
                        <a className="nav-link" href="join.html">Join Game</a>
                        <a className="nav-link" href="match-history.html">Match History</a>                     
                        <a className="nav-link" href="lobby.html">Lobby</a>
                        <a className="nav-link" href="game.html">Game</a>
                    </div>
                </div>
            </nav>
        </header>
        <main className="container-fluid bg-secondary text-center"> App components go here
        </main>
        <footer id="footer" className="d-flex flex-wrap justify-content-between align-items-center p-1 px-md-4 mb-2 bg-light border-top">
            <span>Michelle Sweeney is awesome.</span>
            <a className="nav-link" href="https://github.com/Micsween/startup.git">My GitHub!</a>
        </footer>
    </div>;
}