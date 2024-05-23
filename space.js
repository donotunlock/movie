document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 15;
    const invaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44
    ];
    let currentShooterIndex = 202;
    let direction = 1;
    let invaderId;
    const squares = [];
  
    // Create the grid
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
    }
  
    // Draw the invaders
    invaders.forEach(invader => squares[invader].classList.add('invader'));
  
    // Draw the shooter
    squares[currentShooterIndex].classList.add('player');
  
    // Move the shooter along a line
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('player');
        switch(e.key) {
            case 'ArrowLeft':
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                break;
            case 'ArrowRight':
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                break;
        }
        squares[currentShooterIndex].classList.add('player');
    }
    document.addEventListener('keydown', moveShooter);
  
    // Move the invaders
    function moveInvaders() {
        const leftEdge = invaders[0] % width === 0;
        const rightEdge = invaders[invaders.length - 1] % width === width - 1;
  
        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;
        } else if (direction === width) {
            direction = leftEdge ? 1 : -1;
        }
  
        for (let i = 0; i <= invaders.length - 1; i++) {
            squares[invaders[i]].classList.remove('invader');
        }
        for (let i = 0; i <= invaders.length - 1; i++) {
            invaders[i] += direction;
        }
        for (let i = 0; i <= invaders.length - 1; i++) {
            squares[invaders[i]].classList.add('invader');
        }
  
        // Check for game over
        if (squares[currentShooterIndex].classList.contains('invader', 'player')) {
            clearInterval(invaderId);
            alert('Game Over');
        }
  
        for (let i = 0; i <= invaders.length - 1; i++) {
            if (invaders[i] > squares.length) {
                clearInterval(invaderId);
                alert('Game Over');
            }
        }
    }
    invaderId = setInterval(moveInvaders, 500);
  
    // Shoot the lasers
    function shoot(e) {
        let laserId;
        let currentLaserIndex = currentShooterIndex;
        function moveLaser() {
            if (currentLaserIndex >= width) {
                squares[currentLaserIndex].classList.remove('laser');
                currentLaserIndex -= width;
                squares[currentLaserIndex].classList.add('laser');
                if (squares[currentLaserIndex].classList.contains('invader')) {
                    squares[currentLaserIndex].classList.remove('laser');
                    squares[currentLaserIndex].classList.remove('invader');
                    squares[currentLaserIndex].classList.add('boom');
  
                    setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
                    clearInterval(laserId);
  
                    const alienRemoved = invaders.indexOf(currentLaserIndex);
                    invaders.splice(alienRemoved, 1);
                }
            } else {
                squares[currentLaserIndex].classList.remove('laser');
                clearInterval(laserId);
            }
        }
        switch(e.key) {
            case 'ArrowUp':
                laserId = setInterval(moveLaser, 100);
                break;
        }
    }
    document.addEventListener('keydown', shoot);
});
