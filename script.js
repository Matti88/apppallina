document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const container = document.getElementById('game-container');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let activeTouchId = null;

    // Rainbow colors array for the trail
    const rainbowColors = [
        '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', 
        '#0000FF', '#4B0082', '#8B00FF'
    ];
    let colorIndex = 0;

    // Mouse Event Listeners
    ball.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    container.addEventListener('click', moveBallToClick);

    // Touch Event Listeners
    ball.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDragging);
    document.addEventListener('touchcancel', stopDragging);
    container.addEventListener('touchend', handleTouchEnd);

    function moveBallToClick(e) {
        // Only move if we didn't just finish dragging
        if (!isDragging) {
            const containerRect = container.getBoundingClientRect();
            const ballRect = ball.getBoundingClientRect();
            const ballSize = ballRect.width;
            
            // Calculate new position, centering the ball on the click
            let newX = e.clientX - containerRect.left - (ballSize / 2);
            let newY = e.clientY - containerRect.top - (ballSize / 2);
            
            // Constrain to boundaries
            newX = Math.max(0, Math.min(newX, containerRect.width - ballSize));
            newY = Math.max(0, Math.min(newY, containerRect.height - ballSize));
            
            // Update position
            currentX = newX;
            currentY = newY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, ball);
        }
    }

    function handleTouchEnd(e) {
        // Only handle touch end if it wasn't a drag
        if (!isDragging && e.changedTouches.length > 0) {
            const touch = e.changedTouches[0];
            moveBallToClick({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    }

    function startDragging(e) {
        if (e.type === "touchstart") {
            // Only start dragging if touch is on the ball
            const touch = e.touches[0];
            const ballRect = ball.getBoundingClientRect();
            
            if (touch.clientX >= ballRect.left && touch.clientX <= ballRect.right &&
                touch.clientY >= ballRect.top && touch.clientY <= ballRect.bottom) {
                activeTouchId = touch.identifier;
                initialX = touch.clientX - xOffset;
                initialY = touch.clientY - yOffset;
                isDragging = true;
                e.preventDefault(); // Only prevent default when touching the ball
            }
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            if (e.target === ball) {
                isDragging = true;
            }
        }
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();

        if (e.type === "touchmove") {
            // Find the active touch point
            let activeTouch = null;
            for (let i = 0; i < e.touches.length; i++) {
                if (e.touches[i].identifier === activeTouchId) {
                    activeTouch = e.touches[i];
                    break;
                }
            }
            
            // If we lost the active touch, stop dragging
            if (!activeTouch) {
                isDragging = false;
                return;
            }

            currentX = activeTouch.clientX - initialX;
            currentY = activeTouch.clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        // Boundary checking
        const ballRect = ball.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Constrain horizontal movement
        if (currentX < 0) currentX = 0;
        if (currentX > containerRect.width - ballRect.width) {
            currentX = containerRect.width - ballRect.width;
        }

        // Constrain vertical movement
        if (currentY < 0) currentY = 0;
        if (currentY > containerRect.height - ballRect.height) {
            currentY = containerRect.height - ballRect.height;
        }

        setTranslate(currentX, currentY, ball);
    }

    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.width = '20px';
        particle.style.height = '20px';
        particle.style.backgroundColor = rainbowColors[colorIndex];
        particle.style.left = `${x + 30}px`; // Center relative to ball
        particle.style.top = `${y + 30}px`;  // Center relative to ball
        
        container.appendChild(particle);
        colorIndex = (colorIndex + 1) % rainbowColors.length;

        // Fade out and remove the particle
        setTimeout(() => {
            particle.style.opacity = '0';
            setTimeout(() => particle.remove(), 800);
        }, 100);
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        // Create trail particle when the ball moves
        if (isDragging || Math.abs(xPos - initialX) > 5 || Math.abs(yPos - initialY) > 5) {
            createTrailParticle(xPos, yPos);
        }
    }

    function stopDragging(e) {
        if (e.type === "touchend" || e.type === "touchcancel") {
            // Check if the ended touch was our active touch
            let found = false;
            for (let i = 0; i < e.touches.length; i++) {
                if (e.touches[i].identifier === activeTouchId) {
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                isDragging = false;
                activeTouchId = null;
            }
        } else {
            isDragging = false;
        }
        
        initialX = currentX;
        initialY = currentY;
    }
});