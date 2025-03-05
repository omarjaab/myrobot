const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Robot Movement Logic
const directions = ["N", "E", "S", "W"];

const moveRobot = (roomWidth, roomHeight, startX, startY, startDir, commands) => {
    let x = parseInt(startX);
    let y = parseInt(startY);
    let direction = startDir;

    for (let command of commands) {
        if (command === "L") {
            direction = directions[(directions.indexOf(direction) + 3) % 4]; // Turn Left
        } else if (command === "R") {
            direction = directions[(directions.indexOf(direction) + 1) % 4]; // Turn Right
        } else if (command === "F") {
            let newX = x;
            let newY = y;
            if (direction === "N") newY += 1;
            if (direction === "E") newX += 1;
            if (direction === "S") newY -= 1;
            if (direction === "W") newX -= 1;

            if (newX >= 0 && newX < roomWidth && newY >= 0 && newY < roomHeight) {
                x = newX;
                y = newY;
            } else {
                return { error: "Robot moved out of bounds!" };
            }
        }
    }
    return { x, y, direction };
};

// API Endpoint
app.post("/move-robot", (req, res) => {
    const { roomWidth, roomHeight, startX, startY, startDir, commands } = req.body;
    if (!roomWidth || !roomHeight || !startX || !startY || !startDir || !commands) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    const result = moveRobot(roomWidth, roomHeight, startX, startY, startDir, commands);
    res.json(result);
});

// Start Server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
