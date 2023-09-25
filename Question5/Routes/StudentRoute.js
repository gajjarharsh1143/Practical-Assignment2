const verifyToken = require("../auth");
const route = require("express").Router();

route.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'example' && password === 'password') {
        const token = jwt.sign({ username }, config.secret, { expiresIn: '1h' });
        res.json({ auth: true, token });
    } else {
        res.status(401).json({ auth: false, message: 'Authentication failed.' });
    }
});

route.post('/logout', (req, res) => {
    res.json({ auth: false, token: null });
});

route.get('/students', verifyToken, (req, res) => {
    const students = [
        { id: 1, name: 'John Doe', age: 22 },
        { id: 2, name: 'Jane Smith', age: 20 },
    ];
    res.json(students);
});

route.get('/students/:id', verifyToken, (req, res) => {
    const studentId = req.params.id;
    const student = { id: studentId, name: 'John Doe', age: 22 };
    res.json(student);
});

route.post('/students', verifyToken, (req, res) => {
    const newStudent = req.body;
    res.json(newStudent);
});

route.put('/students/:id', verifyToken, (req, res) => {
    const studentId = req.params.id;
    const updatedStudent = req.body;
    updatedStudent.id = studentId;
    res.json(updatedStudent);
});

route.delete('/students/:id', verifyToken, (req, res) => {
    const studentId = req.params.id;
    res.json({ message: `Student with ID ${studentId} has been deleted.` });
});

module.exports = route;