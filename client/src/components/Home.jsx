import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <header>
                <h1>Welcome to Our Data-Driven Application</h1>
                <p>
                    Explore exercises, learn how to fetch data, and see real-time updates from a database.
                </p>
                <Link
                    to="/exercises"
                >
                    Get Started
                </Link>
            </header>

            {/* Content Section */}
            <main>
                <section>
                    <h2>What This Website Offers</h2>
                    <p>
                        This website showcases **interactive exercises** while demonstrating **how to fetch, manipulate, and display data** dynamically.
                        Whether you are a beginner or an experienced developer, you will find useful examples on handling **API requests**, **database integration**, and **dynamic UI updates**.
                    </p>
                </section>

                <section>
                    <h2>Features</h2>
                    <ul>
                        <li>🏋️ **Exercise Library** - Browse and interact with different exercises.</li>
                        <li>📡 **Live Data Fetching** - Learn how to request and display real-time data.</li>
                        <li>💾 **Database Integration** - Understand how backend data is processed.</li>
                        <li>🔍 **Search & Filter** - Explore features that improve data usability.</li>
                        <li>📊 **Dynamic UI Updates** - Watch content change instantly based on user actions.</li>
                        <li> **Session Management** - To be able to provide content related to a specific user</li>
                    </ul>
                </section>

                <section>
                    <h2>How It Works</h2>
                    <p>
                        We use modern web technologies to **fetch data from a database** and display it in an organized, user-friendly way.
                        You will find examples using **REST APIs.
                    </p>
                </section>
            </main>
        </div>
    );
}
