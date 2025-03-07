import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import Footer from "../components/Footer"
import { useUser } from '../context/UserContext';

function Layout() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, login, logout } = useUser();

    const toggleLogoutButton = () => {
        const logoutButton = document.getElementById("logout-button");
        if (user.id >= 1) {
            logoutButton.style.display = "block";
        } else {
            logoutButton.style.display = "none";
        }
    }

    useEffect(() => {
        toggleLogoutButton();
    });

    const handleLoginClick = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleLogoutClick = async () => {
        await fetch("/api/logout", {
            method: "DELETE",
            credentials: "include"
        });
        logout(); // Use context logout instead of localStorage
        console.log("Logout successful!");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            login(data); // Use context login instead of localStorage
            console.log("Login successful!", data);
            console.log(data.id, data.firstname, data.email, data.role, data.company);

        } else {
            console.error("Login failed!");
        }

        setIsDialogOpen(false);
    };

    return <>
        <header>
            <nav className="navbar">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/pokemon"}>PokemonTrade</NavLink>
                <NavLink to={"/exercises"}>Exercises</NavLink>
                <NavLink to={"/products"}>Products from database</NavLink>
                <NavLink to={"/cart"}>Cart</NavLink>
                <NavLink to={"/backoffice"}>Backoffice</NavLink>
                <NavLink to={"/support"}>Support Forms</NavLink>
                {user.role != 'guest' ? (
                    <span id="logged-in-user">Welcome, {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}</span>
                ) : (
                    <button id="login-button" onClick={handleLoginClick}>Login</button>
                )}<button id="logout-button" onClick={handleLogoutClick}>Logout</button>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <Footer />
        {isDialogOpen && (
            <div className="dialog-overlay">
                <div className="dialog">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <div className="button-group">
                            <button type="button" onClick={handleDialogClose}>Close</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </>
}

export default Layout