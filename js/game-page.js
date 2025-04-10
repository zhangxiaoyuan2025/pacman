document.addEventListener('DOMContentLoaded', function() {
    // Rating System
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.querySelector('.rating-value');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            updateStars(rating);
            // Here you can add AJAX call to save the rating
        });

        star.addEventListener('mouseover', () => {
            updateStars(index + 1);
        });

        star.addEventListener('mouseout', () => {
            const currentRating = ratingValue.dataset.rating;
            updateStars(currentRating);
        });
    });

    function updateStars(rating) {
        stars.forEach((star, index) => {
            star.textContent = index < rating ? '★' : '☆';
        });
        ratingValue.dataset.rating = rating;
    }

    // Fullscreen Toggle
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const gameFrame = document.querySelector('.game-frame');

    if (fullscreenBtn && gameFrame) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (gameFrame.requestFullscreen) {
                    gameFrame.requestFullscreen();
                } else if (gameFrame.mozRequestFullScreen) {
                    gameFrame.mozRequestFullScreen();
                } else if (gameFrame.webkitRequestFullscreen) {
                    gameFrame.webkitRequestFullscreen();
                } else if (gameFrame.msRequestFullscreen) {
                    gameFrame.msRequestFullscreen();
                }
                fullscreenBtn.textContent = 'Exit Fullscreen';
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                fullscreenBtn.textContent = 'Fullscreen';
            }
        });
    }

    // Share Buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const url = window.location.href;
            const platform = button.dataset.platform;
            let shareUrl;

            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Game Frame Loading
    const gameFrameContainer = document.querySelector('.game-frame-container');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = 'Loading Game...';
    
    if (gameFrameContainer) {
        gameFrameContainer.appendChild(loadingIndicator);
        
        gameFrame.addEventListener('load', () => {
            loadingIndicator.style.display = 'none';
        });
    }

    // Mobile Menu for Game Navigation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const gameNav = document.querySelector('.game-nav');

    if (mobileMenuBtn && gameNav) {
        mobileMenuBtn.addEventListener('click', () => {
            gameNav.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.game-nav') && !event.target.closest('.mobile-menu-btn')) {
                gameNav.classList.remove('active');
            }
        });
    }

    // Keyboard Controls
    document.addEventListener('keydown', (e) => {
        if (document.activeElement === gameFrame) {
            // Prevent default browser behavior for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
        }
    });

    // Game Progress Save (Local Storage Example)
    function saveGameProgress(progress) {
        const gameName = document.querySelector('.game-title').textContent;
        localStorage.setItem(`${gameName}_progress`, JSON.stringify(progress));
    }

    function loadGameProgress() {
        const gameName = document.querySelector('.game-title').textContent;
        return JSON.parse(localStorage.getItem(`${gameName}_progress`)) || {};
    }

    // Example of saving game progress
    window.addEventListener('beforeunload', () => {
        const progress = {
            lastPlayed: new Date().toISOString(),
            // Add other game-specific progress data here
        };
        saveGameProgress(progress);
    });
}); 