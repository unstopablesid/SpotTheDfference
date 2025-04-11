class SpotTheDifference {
    constructor() {
        this.config = null;
        this.foundDifferences = new Set();
        this.score = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.initializeGame();
    }

    async initializeGame() {
        try {
            const response = await fetch('config.json');
            this.config = await response.json();
            this.setupGame();
        } catch (error) {
            console.error('Error loading game configuration:', error);
            document.getElementById('game-title').textContent = 'Error loading game';
        }
    }

    setupGame() {
        document.getElementById('game-title').textContent = this.config.gameTitle;
        
        const image1 = document.getElementById('image1');
        const image2 = document.getElementById('image2');
        
        image1.src = this.config.images.image1;
        image2.src = this.config.images.image2;

        // Wait for images to load
        Promise.all([
            new Promise(resolve => image1.onload = resolve),
            new Promise(resolve => image2.onload = resolve)
        ]).then(() => {
            this.setupCanvases();
            this.startTimer();
            this.setupClickHandlers();
        });
    }

    setupCanvases() {
        const canvas1 = document.getElementById('canvas1');
        const canvas2 = document.getElementById('canvas2');
        
        canvas1.width = document.getElementById('image1').width;
        canvas1.height = document.getElementById('image1').height;
        canvas2.width = document.getElementById('image2').width;
        canvas2.height = document.getElementById('image2').height;
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            document.getElementById('timer').textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    setupClickHandlers() {
        const image1 = document.getElementById('image1');
        const image2 = document.getElementById('image2');

        image1.addEventListener('click', (e) => this.handleClick(e, 0));
        image2.addEventListener('click', (e) => this.handleClick(e, 1));
    }

    handleClick(event, imageIndex) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check if click is within any difference area
        for (let i = 0; i < this.config.differences.length; i++) {
            const diff = this.config.differences[i];
            if (!this.foundDifferences.has(i) && 
                x >= diff.x && x <= diff.x + diff.width &&
                y >= diff.y && y <= diff.y + diff.height) {
                
                this.markDifference(i, imageIndex);
                this.foundDifferences.add(i);
                this.updateScore();
                break;
            }
        }
    }

    markDifference(index, imageIndex) {
        const canvas = document.getElementById(`canvas${imageIndex + 1}`);
        const ctx = canvas.getContext('2d');
        const diff = this.config.differences[index];

        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(diff.x + diff.width/2, diff.y + diff.height/2, 
                Math.max(diff.width, diff.height)/2, 0, 2 * Math.PI);
        ctx.stroke();

        // Add animation
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.fill();
    }

    updateScore() {
        this.score = this.foundDifferences.size;
        document.getElementById('score').textContent = this.score;

        if (this.score === this.config.differences.length) {
            this.gameComplete();
        }
    }

    gameComplete() {
        clearInterval(this.timerInterval);
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        document.getElementById('message').textContent = 
            `Congratulations! You found all differences in ${minutes}m ${seconds}s!`;
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new SpotTheDifference();
}); 