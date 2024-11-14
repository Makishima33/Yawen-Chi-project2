import "./RulesPage.css";

function RulesPage() {
  return (
    <div className="rules-container">
      <h1>Minesweeper Rules</h1>
      <p>
        The goal of Minesweeper is to uncover all the squares on the grid that
        do not contain mines without being &quot;blown up&quot; by clicking on a
        square with a mine underneath.
      </p>
      <h2>How to Play:</h2>
      <ul>
        <li>Click on a square to reveal what&apos;s underneath.</li>
        <li>If you reveal a mine, you lose the game.</li>
        <li>If you reveal an empty square, you can continue playing.</li>
        <li>
          Numbers on revealed squares indicate how many mines are adjacent to
          that square.
        </li>
        <li>
          Right-click (or tap and hold) to place a flag where you think a mine
          is hidden.
        </li>
      </ul>
      <h2>Tips:</h2>
      <ul>
        <li>Use the numbers to deduce where mines are located.</li>
        <li>Plan your moves carefully to avoid mines.</li>
        <li>Flag suspected mines to keep track.</li>
      </ul>
    </div>
  );
}

export default RulesPage;
