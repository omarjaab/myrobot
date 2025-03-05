import React, { useState, useEffect, useRef } from "react";

const GRID_SIZE = 100; // Size of each grid cell in pixels
const ANIMATION_SPEED = 100; // Delay between movement steps (ms)

function App() {
  const [roomWidth, setRoomWidth] = useState(5);
  const [roomHeight, setRoomHeight] = useState(5);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startDir, setStartDir] = useState("N");
  const [commands, setCommands] = useState("");
  const [robotPosition, setRobotPosition] = useState({ x: startX, y: startY, direction: startDir });
  const canvasRef = useRef(null);

  const sendCommandsToBackend = async () => {
    try {
      const response = await fetch("http://localhost:5000/move-robot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomWidth, roomHeight, startX, startY, startDir, commands }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        animateRobotMovement(startX, startY, data.x, data.y, data.direction);
      }
    } catch (error) {
      console.error("Error sending commands:", error);
    }
  };

  const animateRobotMovement = (startX, startY, endX, endY, direction) => {
    let currentX = startX;
    let currentY = startY;
    const steps = 10;
    let stepCount = 0;

    const interval = setInterval(() => {
      if (stepCount < steps) {
        currentX += (endX - startX) / steps;
        currentY += (endY - startY) / steps;
        setRobotPosition({ x: currentX, y: currentY, direction });
        stepCount++;
      } else {
        clearInterval(interval);
        setRobotPosition({ x: endX, y: endY, direction });
      }
    }, ANIMATION_SPEED);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#ccc";
      for (let i = 0; i < roomWidth; i++) {
        for (let j = 0; j < roomHeight; j++) {
          ctx.strokeRect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
      }
    };

    const drawRobot = () => {
      ctx.fillStyle = "blue";
      ctx.fillRect(
        robotPosition.x * GRID_SIZE + 10,
        robotPosition.y * GRID_SIZE + 10,
        GRID_SIZE - 20,
        GRID_SIZE - 20
      );

      ctx.fillStyle = "white";
      ctx.font = "bold 20px Arial";
      ctx.fillText(
        robotPosition.direction,
        robotPosition.x * GRID_SIZE + 15,
        robotPosition.y * GRID_SIZE + 30
      );
    };

    drawGrid();
    drawRobot();
  }, [robotPosition, roomWidth, roomHeight]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Robot Visualizer 🤖</h1>

      <div>
        <input type="number" placeholder="Room Width" value={roomWidth} onChange={(e) => setRoomWidth(Number(e.target.value))} />
        <input type="number" placeholder="Room Height" value={roomHeight} onChange={(e) => setRoomHeight(Number(e.target.value))} />
        <input type="number" placeholder="Start X" value={startX} onChange={(e) => setStartX(Number(e.target.value))} />
        <input type="number" placeholder="Start Y" value={startY} onChange={(e) => setStartY(Number(e.target.value))} />
        <input type="text" placeholder="Start Direction (N, E, S, W)" value={startDir} onChange={(e) => setStartDir(e.target.value.toUpperCase())} />
      </div>

      <input type="text" placeholder="Enter commands (L, R, F)" value={commands} onChange={(e) => setCommands(e.target.value.toUpperCase())} />

      <button onClick={sendCommandsToBackend}>Move Robot</button>

      <canvas ref={canvasRef} width={roomWidth * GRID_SIZE} height={roomHeight * GRID_SIZE} className="border mt-4"></canvas>
    </div>
  );
}

export default App;
