/**
 * Grid Component:
 * - This React component renders a 10x10 grid.
 * - Each cell in the grid can be toggled on or off by clicking.
 * - When a cell is toggled on, its neighboring cells are also toggled on.
 * - The grid has two constraints:
 *   1. No row or column can have more than 3 filled cells.
 *   2. No 2x2 square of cells can all be filled.
 * - If a constraint is violated, a toast notification informs the user(Uses Toastify).
 * - The app provides buttons to reset the grid or fill it randomly.
 */

import React, { useState } from "react";
import { toast } from "react-toastify"; 
import "./Grid.css";

const Grid = () => {
  const gridSize = 10; // Define the grid size (10x10)
  const [grid, setGrid] = useState(
    Array(gridSize).fill().map(() => Array(gridSize).fill(0))
  );

  /**
   * Handles a cell click:
   * - Toggles the clicked cell.
   * - If the cell is toggled on, its neighbors are also toggled on.
   * - Checks if the constraints are satisfied; if not, reverts changes and shows a toast.
   */
  const handleClick = (row, col) => {
    // Create a copy of the grid
    let newGrid = grid.map((row) => [...row]);

    // Toggle the clicked cell and its neighbors
    if (newGrid[row][col] === 0) {
      newGrid[row][col] = 1;
      const neighbors = [
        [row - 1, col], // Top neighbor
        [row + 1, col], // Bottom neighbor
        [row, col - 1], // Left neighbor
        [row, col + 1], // Right neighbor
      ];
      for (const [nRow, nCol] of neighbors) {
        if (nRow >= 0 && nRow < gridSize && nCol >= 0 && nCol < gridSize) {
          newGrid[nRow][nCol] = 1;
        }
      }
    } else {
      newGrid[row][col] = 0; // Toggle off if already on
    }

    // Check constraints
    if (checkConstraints(newGrid)) {
      setGrid(newGrid); // Update grid if constraints are met
    } else {
      // Show error toast if constraints are violated
      toast.error("Action violates constraints!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  /**
   * Validates grid constraints:
   * - No row or column should have more than 3 filled cells.
   * - No 2x2 square of cells should all be filled.
   */
  const checkConstraints = (newGrid) => {
    // Check rows and columns for more than 3 filled cells
    for (let i = 0; i < gridSize; i++) {
      const rowCount = newGrid[i].filter((cell) => cell === 1).length;
      const colCount = newGrid.map((row) => row[i]).filter((cell) => cell === 1).length;
      if (rowCount > 3 || colCount > 3) return false;
    }

    // Check for 2x2 squares that are all filled
    for (let i = 0; i < gridSize - 1; i++) {
      for (let j = 0; j < gridSize - 1; j++) {
        if (
          newGrid[i][j] === 1 &&
          newGrid[i][j + 1] === 1 &&
          newGrid[i + 1][j] === 1 &&
          newGrid[i + 1][j + 1] === 1
        ) {
          return false;
        }
      }
    }

    return true; 
  };

  /**
   * Resets the grid to its initial empty state.
   */
  const resetGrid = () => {
    setGrid(Array(gridSize).fill().map(() => Array(gridSize).fill(0)));
  };

  
  const randomFill = () => {
    let newGrid;
    let valid = false;

    while (!valid) {
      // Generate a random grid
      newGrid = Array(gridSize)
        .fill()
        .map(() =>
          Array(gridSize)
            .fill()
            .map(() => (Math.random() > 0.8 ? 1 : 0))
        );

      valid = checkConstraints(newGrid); // Check constraints
    }

    setGrid(newGrid);
  };

  // Calculate row and column counts
  const rowCounts = grid.map((row) => row.filter((cell) => cell === 1).length);
  const colCounts = Array(gridSize)
    .fill(0)
    .map((_, colIndex) =>
      grid.map((row) => row[colIndex]).filter((cell) => cell === 1).length
    );

  return (
    <div className="container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="grid">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${cell === 1 ? "filled" : "empty"}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              ></div>
            ))
          )}
        </div>
        <div className="controls">
          <button onClick={resetGrid}>Reset Grid</button>
          <button onClick={randomFill}>Random Fill</button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="row-counts">
          <h3>Row Counts</h3>
          {rowCounts.map((count, index) => (
            <div key={`row-${index}`} className="count">
              Row {index + 1}: {count}
            </div>
          ))}
        </div>
        <div className="col-counts">
          <h3>Column Counts</h3>
          {colCounts.map((count, index) => (
            <div key={`col-${index}`} className="count">
              Column {index + 1}: {count}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
