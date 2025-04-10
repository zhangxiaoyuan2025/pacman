class SlopeGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        // Game state
        this.score = 0;
        this.gameOver = false;
        this.paused = false;
        
        // Ball properties
        this.ball = {
            x: this.width / 2,
            y: this.height / 2,
            radius: 20,
            speed: 5,
            color: '#4a90e2'
        };
        
        // Track properties
        this.track = {
            segments: [],
            width: 200,
            segmentLength: 100,
            curve: 0,
            speed: 5
        };
        
        // Initialize track
        this.initTrack();
        
        // Controls
        this.keys = {
            left: false,
            right: false
        };
        
        // Event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.lastTime = 0;
        this.animate(0);
    }
    
    initTrack() {
        for (let i = 0; i < 100; i++) {
            this.track.segments.push({
                z: i * this.track.segmentLength,
                curve: Math.sin(i * 0.1) * 2,
                y: Math.sin(i * 0.05) * 100
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.keys.left = true;
            if (e.key === 'ArrowRight') this.keys.right = true;
            if (e.key === ' ') this.paused = !this.paused;
        });
        
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') this.keys.left = false;
            if (e.key === 'ArrowRight') this.keys.right = false;
        });
    }
    
    update(deltaTime) {
        if (this.gameOver || this.paused) return;
        
        // Update ball position
        if (this.keys.left) this.ball.x -= this.ball.speed;
        if (this.keys.right) this.ball.x += this.ball.speed;
        
        // Keep ball within canvas bounds
        this.ball.x = Math.max(this.ball.radius, Math.min(this.width - this.ball.radius, this.ball.x));
        
        // Update track
        this.track.segments.forEach(segment => {
            segment.z -= this.track.speed;
            if (segment.z < 0) {
                segment.z = this.track.segments[this.track.segments.length - 1].z + this.track.segmentLength;
                segment.curve = Math.sin(segment.z * 0.1) * 2;
                segment.y = Math.sin(segment.z * 0.05) * 100;
            }
        });
        
        // Check collision
        this.checkCollision();
        
        // Update score
        this.score += 1;
    }
    
    checkCollision() {
        const currentSegment = this.track.segments[0];
        const ballX = this.ball.x - this.width / 2;
        const trackX = currentSegment.curve * this.track.width;
        
        if (Math.abs(ballX - trackX) > this.track.width / 2 - this.ball.radius) {
            this.gameOver = true;
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw track
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        
        this.track.segments.forEach((segment, index) => {
            const scale = 1 / (segment.z / 1000);
            const x = segment.curve * this.track.width * scale;
            const y = segment.y * scale;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x - this.track.width * scale, y);
            this.ctx.lineTo(x + this.track.width * scale, y);
            this.ctx.strokeStyle = index % 2 === 0 ? '#4a90e2' : '#50e3c2';
            this.ctx.lineWidth = 5 * scale;
            this.ctx.stroke();
        });
        
        // Draw ball
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x - this.width / 2, 0, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.ball.color;
        this.ctx.fill();
        
        this.ctx.restore();
        
        // Draw score
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 40);
        
        // Draw game over or paused message
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over', this.width / 2, this.height / 2);
            this.ctx.font = '24px Arial';
            this.ctx.fillText(`Final Score: ${this.score}`, this.width / 2, this.height / 2 + 40);
            this.ctx.fillText('Press Space to Restart', this.width / 2, this.height / 2 + 80);
        } else if (this.paused) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Paused', this.width / 2, this.height / 2);
        }
    }
    
    animate(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update(deltaTime);
        this.draw();
        
        if (!this.gameOver) {
            requestAnimationFrame((timestamp) => this.animate(timestamp));
        }
    }
    
    reset() {
        this.score = 0;
        this.gameOver = false;
        this.paused = false;
        this.ball.x = this.width / 2;
        this.track.segments = [];
        this.initTrack();
        this.animate(0);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new SlopeGame(canvas);
    
    // Add restart functionality
    window.addEventListener('keydown', (e) => {
        if (e.key === ' ' && game.gameOver) {
            game.reset();
        }
    });
}); 