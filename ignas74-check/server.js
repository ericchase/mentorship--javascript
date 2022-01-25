const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

const PORT = 3000;

const viewPages = ['Home', 'CV', 'Contact'];

router.get('/*', (req, res, next) => {
    if (viewPages.includes(req.url.substring(1))) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        next();
    }
});

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || PORT);

console.log(`Server is running on http://localhost:${PORT}`);
