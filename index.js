const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('./Database/Volunteers.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS Events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Event_name VARCHAR(255) NOT NULL,
    Event_Date INTEGER NOT NULL,
    Location TEXT NOT NULL,
    Organizer VARCHAR(255) NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS Tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Task_name VARCHAR(255) NOT NULL,
    Assigned_To VARCHAR(255) NOT NULL,
    Deadline DATE NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS Hours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    Hours_Worked INTEGER NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS Volunteers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL
)`);

// CRUD for Events
app.get('/events', (req, res) => {
    db.all('SELECT * FROM Events', (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});

app.get('/events/:id', (req, res) => {
    db.get('SELECT * FROM Events WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send('Event not found');
        }
        res.status(200).json(row);
    });
});

app.post('/events', (req, res) => {
    const { Event_name, Event_Date, Location, Organizer } = req.body;
    if (!Event_name || !Event_Date || !Location || !Organizer) {
        return res.status(400).send('Missing required fields');
    }
    db.run('INSERT INTO Events (Event_name, Event_Date, Location, Organizer) VALUES (?, ?, ?, ?)', [Event_name, Event_Date, Location, Organizer],
        function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(201).json({ id: this.lastID, ...req.body });
        });
});

app.put('/events/:id', (req, res) => {
    const { Event_name, Event_Date, Location, Organizer } = req.body;
    if (!Event_name || !Event_Date || !Location || !Organizer) {
        return res.status(400).send('Missing required fields');
    }
    db.run('UPDATE Events SET Event_name = ?, Event_Date = ?, Location = ?, Organizer = ? WHERE id = ?', [Event_name, Event_Date, Location, Organizer, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).json(req.body);
        });
});

app.delete('/events/:id', (req, res) => {
    db.run('DELETE FROM Events WHERE id = ?', req.params.id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(204).send();
    });
});

// CRUD for Tasks
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM Tasks', (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});

app.get('/tasks/:id', (req, res) => {
    db.get('SELECT * FROM Tasks WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send('Task not found');
        }
        res.status(200).json(row);
    });
});

app.post('/tasks', (req, res) => {
    const { Task_name, Assigned_To, Deadline } = req.body;
    if (!Task_name || !Assigned_To || !Deadline) {
        return res.status(400).send('Missing required fields');
    }
    db.run('INSERT INTO Tasks (Task_name, Assigned_To, Deadline) VALUES (?, ?, ?)', [Task_name, Assigned_To, Deadline],
        function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(201).json({ id: this.lastID, ...req.body });
        });
});

app.put('/tasks/:id', (req, res) => {
    const { Task_name, Assigned_To, Deadline } = req.body;
    if (!Task_name || !Assigned_To || !Deadline) {
        return res.status(400).send('Missing required fields');
    }
    db.run('UPDATE Tasks SET Task_name = ?, Assigned_To = ?, Deadline = ? WHERE id = ?', [Task_name, Assigned_To, Deadline, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).json(req.body);
        });
});

app.delete('/tasks/:id', (req, res) => {
    db.run('DELETE FROM Tasks WHERE id = ?', req.params.id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(204).send();
    });
});

// CRUD for Hours
app.get('/hours', (req, res) => {
    db.all('SELECT * FROM Hours', (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});

app.get('/hours/:id', (req, res) => {
    db.get('SELECT * FROM Hours WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send('Hours not found');
        }
        res.status(200).json(row);
    });
});

app.post('/hours', (req, res) => {
    const { name, Hours_Worked } = req.body;
    if (!name || !Hours_Worked) {
        return res.status(400).send('Missing required fields');
    }
    db.run('INSERT INTO Hours (name, Hours_Worked) VALUES (?, ?)', [name, Hours_Worked],
        function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(201).json({ id: this.lastID, ...req.body });
        });
});

app.put('/hours/:id', (req, res) => {
    const { name, Hours_Worked } = req.body;
    if (!name || !Hours_Worked) {
        return res.status(400).send('Missing required fields');
    }
    db.run('UPDATE Hours SET name = ?, Hours_Worked = ? WHERE id = ?', [name, Hours_Worked, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).json(req.body);
        });
});

app.delete('/hours/:id', (req, res) => {
    db.run('DELETE FROM Hours WHERE id = ?', req.params.id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(204).send();
    });
});

// CRUD for Volunteers
app.get('/volunteers', (req, res) => {
    db.all('SELECT * FROM Volunteers', (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});

app.get('/volunteers/:id', (req, res) => {
    db.get('SELECT * FROM Volunteers WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send('Volunteer not found');
        }
        res.status(200).json(row);
    });
});

app.post('/volunteers', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).send('Missing required fields');
    }
    db.run('INSERT INTO Volunteers (name, age) VALUES (?, ?)', [name, age],
        function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(201).json({ id: this.lastID, ...req.body });
        });
});

app.put('/volunteers/:id', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).send('Missing required fields');
    }
    db.run('UPDATE Volunteers SET name = ?, age = ? WHERE id = ?', [name, age, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).json(req.body);
        });
});

app.delete('/volunteers/:id', (req, res) => {
    db.run('DELETE FROM Volunteers WHERE id = ?', req.params.id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(204).send();
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});