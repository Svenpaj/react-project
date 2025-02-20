const Header = () => {
    return (
        <header>
            <h1 style={headerStyle}>React övningar</h1>
        </header>
    )
}
const headerStyle = {
    // Gradient background color
    backgroundColor: 'linear-gradient(to right, #4CAF50, #4CAF50)',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    borderRadius: '20px'
}

export default Header;