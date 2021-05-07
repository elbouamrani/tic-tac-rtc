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

		const result = this.evaluate();

		if (result) {
			if (result.length) {
				alert("player " + this.turn + " wins");
			} else {
				alert("draw");
			}
		}

		this.switch();
	},
	switch() {
		this.turn = this.turn === "O" ? "X" : "O";
	},
	combo: [
		[0, 1, 2], // Check first row.
		[3, 4, 5], // Check second Row
		[6, 7, 8], // Check third Row
		[0, 3, 6], // Check first column
		[1, 4, 7], // Check second Column
		[2, 5, 8], // Check third Column
		[0, 4, 8], // Check \ Diagonal
		[2, 4, 6], // Check / Diagonal
	],
	evaluate() {
		const flat = this.grid.flat();

		const full = flat.filter((element) => {
			return element == null;
		});

		if (full.length == 0) {
			return [];
		}

		for (let i = 0; i < 8; i++) {
			const equal =
				flat[this.combo[i][0]] == flat[this.combo[i][1]] &&
				flat[this.combo[i][1]] == flat[this.combo[i][2]];

			const symbol = flat[this.combo[i][0]] !== null ? true : false;

			if (symbol & equal) {
				return this.combo;
			}
		}
		return false;
	},
};

export default TicTacEngine;
