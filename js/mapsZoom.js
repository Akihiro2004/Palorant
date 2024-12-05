const modalBody = document.querySelector('.modal-body');
const minimapImg = document.querySelector('.minimap-image');
const zoomInBtn = document.querySelector('.zoom-in');
const zoomOutBtn = document.querySelector('.zoom-out');
const zoomResetBtn = document.querySelector('.zoom-reset');

let scale = 1;
let panning = false;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };
let lastTouchDistance = 0;

function getBoundaries() {
    const containerRect = modalBody.getBoundingClientRect();
    const imgRect = minimapImg.getBoundingClientRect();
    
    const verticalLimit = Math.max(0, (imgRect.height * scale - containerRect.height) / 2);
    const horizontalLimit = Math.max(0, (imgRect.width * scale - containerRect.width) / 2);
    
    return {
        minX: -horizontalLimit,
        maxX: horizontalLimit,
        minY: -verticalLimit,
        maxY: verticalLimit
    };
}

function clampPosition(x, y) {
    const boundaries = getBoundaries();
    return {
        x: Math.min(Math.max(x, boundaries.minX), boundaries.maxX),
        y: Math.min(Math.max(y, boundaries.minY), boundaries.maxY)
    };
}

function setTransform() {
    const clamped = clampPosition(pointX, pointY);
    pointX = clamped.x;
    pointY = clamped.y;
    minimapImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

function zoomIn(e) {
    if (e) e.preventDefault();
    if (scale < 4) {
        scale *= 1.2;
        setTransform();
    }
}

function zoomOut(e) {
    if (e) e.preventDefault();
    if (scale > 0.5) {
        scale /= 1.2;
        setTransform();
    }
}

function resetZoom(e) {
    if (e) e.preventDefault();
    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();
}

function mouseDown(e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
    minimapImg.classList.add('dragging');
}

function mouseUp() {
    panning = false;
    minimapImg.classList.remove('dragging');
}

function mouseMove(e) {
    e.preventDefault();
    if (!panning) return;
    
    pointX = (e.clientX - start.x);
    pointY = (e.clientY - start.y);
    setTransform();
}

function getTouchDistance(touches) {
    return Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
    );
}

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        start = { x: touch.clientX - pointX, y: touch.clientY - pointY };
        panning = true;
        minimapImg.classList.add('dragging');
    } 
    else if (e.touches.length === 2) {
        lastTouchDistance = getTouchDistance(e.touches);
    }
}

function handleTouchMove(e) {
    e.preventDefault();

    if (e.touches.length === 1 && panning) {
        const touch = e.touches[0];
        pointX = (touch.clientX - start.x);
        pointY = (touch.clientY - start.y);
        setTransform();
    } 
    else if (e.touches.length === 2) {
        const currentDistance = getTouchDistance(e.touches);
        const difference = currentDistance - lastTouchDistance;
        
        if (Math.abs(difference) > 1) {
            const zoomFactor = 1 + (difference / 200);
            const newScale = scale * zoomFactor;
            
            if (newScale >= 0.5 && newScale <= 4) {
                scale = newScale;
                setTransform();
            }
            
            lastTouchDistance = currentDistance;
        }
    }
}

function handleTouchEnd() {
    panning = false;
    minimapImg.classList.remove('dragging');
}

zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);
zoomResetBtn.addEventListener('click', resetZoom);

minimapImg.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
document.addEventListener('mousemove', mouseMove);

minimapImg.addEventListener('touchstart', handleTouchStart, { passive: false });
minimapImg.addEventListener('touchmove', handleTouchMove, { passive: false });
minimapImg.addEventListener('touchend', handleTouchEnd);
minimapImg.addEventListener('touchcancel', handleTouchEnd);

modalBody.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (e.deltaY < 0 && scale < 4) {
        scale *= 1.1;
    } else if (e.deltaY > 0 && scale > 0.5) {
        scale /= 1.1;
    }
    
    setTransform();
});

function handleModalClose() {
    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();
}

const closeBtn = document.querySelector('.close-button');
const mapModal = document.querySelector('.minimap-modal');

closeBtn.addEventListener('click', handleModalClose);
mapModal.addEventListener('click', (e) => {
    if (e.target === mapModal) {
        handleModalClose();
    }
});

document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', handleModalClose);
});