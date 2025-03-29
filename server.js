const express = require('express');
const app = express();
const path = require('path');

// Inline styles (CSS) as a string
const cssContent = `
body {
    background-color: black;
    color: green;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin-right: 20px;
}

nav ul li a {
    color: green;
    text-decoration: none;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
}

h1, h2 {
    color: green;
}
`;

// Serve CSS directly as a response
app.get('/styles.css', (req, res) => {
    res.header('Content-Type', 'text/css');
    res.send(cssContent);
});

// Route to serve the homepage (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes for software pages
app.get('/audiobang.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'audiobang.html'));
});

app.get('/broadcastme.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'broadcastme.html'));
});

// Catch-all route for 404 error if the page doesn't exist
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Maintenance route (optional)
const isMaintenance = false; // Set this to true if the site is in maintenance mode

app.use((req, res, next) => {
    if (isMaintenance) {
        res.send('<h1>Website in Maintenance, Come back later!</h1>');
    } else {
        next();
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
