const TicTacEngine = {
	turn: "X",
	grid: null,
	setup() {
		this.reset();
		return this;
	},
	reset() {
		this.grid = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
	},
	move(turn, [i, j]) {
		if (turn != this.turn) return;
		if (this.grid[i][j] != null) return;

		const grid = [...this.grid];

		grid[i][j] = turn;

		this.grid = grid;

		this.switch();
	},
	switch() {
		this.turn = this.turn === "O" ? "X" : "O";
	},
	evaluate() {},
};

export default TicTacEngine;
