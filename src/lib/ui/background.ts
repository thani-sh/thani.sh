// blocks are 6px by 6px (grid cell size)
const BLOCK_SIZE = 6;

// rendered dot fills most of the cell, leaving a 1px gap on each side
const DOT_SIZE = 4;
const DOT_OFFSET = (BLOCK_SIZE - DOT_SIZE) / 2;

// render 1 frame per FRAME_DURATION ms
const FRAME_DURATION = 200;

// list of available shapes (kept from original — non-glider patterns so the
// simulation trends toward stable structures rather than migrating off-screen)
const AVAILABLE_SHAPES = [
	[[1]],
	[[1, 1, 1]],
	[
		[0, 1, 1, 1],
		[1, 1, 1, 0]
	],
	[
		[0, 0, 1],
		[1, 0, 1],
		[0, 1, 1]
	]
];

// Read a CSS custom property at runtime so colors stay in sync with the theme.
function readCssVar(name: string, fallback: string): string {
	if (typeof window === 'undefined') return fallback;
	const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	return value || fallback;
}

/**
 * BackgroundCanvas is an animated Conway's Game of Life backdrop.
 * Adapted from aivara.se, retinted to the thani.sh warm palette, with a few
 * quality-of-life fixes (resize handling, prefers-reduced-motion, cleanup).
 */
export class BackgroundCanvas {
	private ctx: CanvasRenderingContext2D;
	private previousTs = Date.now();
	private width = 0;
	private widthPx = 0;
	private height = 0;
	private heightPx = 0;
	private threshold = 0;
	private currBuffer: boolean[][] = [];
	private nextBuffer: boolean[][] = [];
	private resizeObserver: ResizeObserver | null = null;
	private rafId: number | null = null;
	private running = false;
	private paused = false;
	private reducedMotion = false;

	constructor(private canvas: HTMLCanvasElement) {
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
		this.reducedMotion =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	/**
	 * Starts the animation. Call once after the canvas is in the DOM.
	 */
	public start(): void {
		if (this.running) return;
		this.running = true;
		this.resetCanvas();
		this.setupListeners();
		this.runAnimation();
	}

	/**
	 * Stops the animation and releases listeners. Call on cleanup.
	 */
	public stop(): void {
		this.running = false;
		if (this.rafId !== null) {
			cancelAnimationFrame(this.rafId);
			this.rafId = null;
		}
		this.resizeObserver?.disconnect();
		this.canvas.removeEventListener('click', this.onClick);
		document.removeEventListener('visibilitychange', this.onVisibilityChange);
	}

	/**
	 * Pauses the animation loop without tearing down listeners. Used when the
	 * tab is hidden so we stop burning CPU/GPU on a frame nobody sees.
	 */
	public pause(): void {
		if (!this.running || this.paused) return;
		this.paused = true;
		if (this.rafId !== null) {
			cancelAnimationFrame(this.rafId);
			this.rafId = null;
		}
	}

	/**
	 * Resumes the animation loop after a pause. Resets the frame timer so we
	 * don't fast-forward through missed frames on resume.
	 */
	public resume(): void {
		if (!this.running || !this.paused) return;
		this.paused = false;
		this.previousTs = Date.now();
		this.runAnimation();
	}

	private onVisibilityChange = (): void => {
		if (document.hidden) {
			this.pause();
		} else {
			this.resume();
		}
	};

	/**
	 * Resize canvas to match the parent's current size and re-initialize buffers.
	 */
	private resetCanvas = (): void => {
		const parent = this.canvas.parentElement;
		if (!parent) return;
		const rect = parent.getBoundingClientRect();
		const calculatedWidth = Math.max(0, rect.width);
		const calculatedHeight = Math.max(0, rect.height);
		this.width = Math.max(1, Math.ceil(calculatedWidth / BLOCK_SIZE));
		this.height = Math.max(1, Math.ceil(calculatedHeight / BLOCK_SIZE));
		this.widthPx = this.canvas.width = this.width * BLOCK_SIZE;
		this.heightPx = this.canvas.height = this.height * BLOCK_SIZE;
		this.canvas.style.width = `${this.widthPx}px`;
		this.canvas.style.height = `${this.heightPx}px`;
		this.threshold = Math.floor((this.width * this.height) / 40);
		this.resetBuffer(this.currBuffer);
		this.resetBuffer(this.nextBuffer);
	};

	private onClick = (event: MouseEvent): void => {
		const rect = this.canvas.getBoundingClientRect();
		const x = Math.floor((event.clientX - rect.left) / BLOCK_SIZE) - 1;
		const y = Math.floor((event.clientY - rect.top) / BLOCK_SIZE) - 1;
		this.addRandomShape(x, y);
	};

	private setupListeners(): void {
		this.canvas.addEventListener('click', this.onClick);
		document.addEventListener('visibilitychange', this.onVisibilityChange);
		// If the page mounted while the tab was already hidden (e.g. background
		// tab being focused), start paused to avoid a burst of catch-up frames.
		if (document.hidden) this.pause();
		const parent = this.canvas.parentElement;
		if (parent && typeof ResizeObserver !== 'undefined') {
			this.resizeObserver = new ResizeObserver(() => this.resetCanvas());
			this.resizeObserver.observe(parent);
		}
	}

	private runAnimation = (): void => {
		if (!this.running) return;
		if (!this.reducedMotion && this.updateState()) {
			this.renderFrame();
		}
		this.rafId = requestAnimationFrame(this.runAnimation);
	};

	private resetBuffer(buffer: boolean[][]): boolean[][] {
		for (let y = 0; y < this.height; y++) {
			const row: boolean[] = (buffer[y] = []);
			for (let x = 0; x < this.width; x++) {
				row[x] = false;
			}
		}
		return buffer;
	}

	private neighboursCount(x: number, y: number): number {
		let count = 0;
		if (this.currBuffer[y - 1]?.[x - 1]) count++;
		if (this.currBuffer[y - 1]?.[x]) count++;
		if (this.currBuffer[y - 1]?.[x + 1]) count++;
		if (this.currBuffer[y]?.[x - 1]) count++;
		if (this.currBuffer[y]?.[x + 1]) count++;
		if (this.currBuffer[y + 1]?.[x - 1]) count++;
		if (this.currBuffer[y + 1]?.[x]) count++;
		if (this.currBuffer[y + 1]?.[x + 1]) count++;
		return count;
	}

	private resolveNext(): number {
		let liveCells = 0;
		for (let y = 0; y < this.height; y++) {
			const row = this.nextBuffer[y];
			for (let x = 0; x < this.width; x++) {
				const neighbours = this.neighboursCount(x, y);
				if (this.currBuffer[y][x]) {
					row[x] = neighbours === 2 || neighbours === 3;
				} else {
					row[x] = neighbours === 3;
				}
				if (row[x]) liveCells++;
			}
		}
		return liveCells;
	}

	private getRandomShape(): number[][] {
		const randomIdx = Math.floor(Math.random() * AVAILABLE_SHAPES.length);
		return AVAILABLE_SHAPES[randomIdx];
	}

	private addRandomShape(
		x = Math.floor(Math.random() * this.width),
		y = Math.floor(Math.random() * this.height)
	): void {
		const shape = this.getRandomShape();
		this.copyToBuffer(x, y, shape);
	}

	private copyToBuffer(x: number, y: number, shape: number[][]): void {
		for (let sy = 0; sy < shape.length; sy++) {
			for (let sx = 0; sx < shape[sy].length; sx++) {
				if (shape[sy][sx] && x + sx < this.width && y + sy < this.height) {
					this.nextBuffer[y + sy][x + sx] = true;
				}
			}
		}
	}

	private updateState(): boolean {
		const currentTs = Date.now();
		if (currentTs - this.previousTs < FRAME_DURATION) {
			return false;
		}
		const prevBuffer = this.currBuffer;
		const liveCells = this.resolveNext();
		if (liveCells < this.threshold || Math.random() < 0.01) {
			this.addRandomShape();
		}
		this.currBuffer = this.nextBuffer;
		this.nextBuffer = this.resetBuffer(prevBuffer);
		this.previousTs = currentTs;
		return true;
	}

	private renderFrame(): void {
		// Transparent background — let the page paper show through where there
		// are no cells, and let cards (rendered translucent on top) reveal the
		// cells behind them.
		this.ctx.clearRect(0, 0, this.widthPx, this.heightPx);

		const foregroundStyle = readCssVar('--color-primary', 'oklch(58% 0.15 35)');
		this.ctx.fillStyle = foregroundStyle;
		for (let y = 0; y < this.height; y++) {
			const row = this.currBuffer[y];
			for (let x = 0; x < this.width; x++) {
				if (row[x]) {
					this.ctx.fillRect(
						x * BLOCK_SIZE + DOT_OFFSET,
						y * BLOCK_SIZE + DOT_OFFSET,
						DOT_SIZE,
						DOT_SIZE
					);
				}
			}
		}
	}
}