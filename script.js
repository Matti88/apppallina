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

    // Mouse Event Listeners
    ball.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    // Touch Event Listeners
    ball.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDragging);

    function startDragging(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === ball) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
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
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function stopDragging() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
});