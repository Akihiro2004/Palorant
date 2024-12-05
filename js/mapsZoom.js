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

function setTransform() {
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

zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);
zoomResetBtn.addEventListener('click', resetZoom);

minimapImg.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
document.addEventListener('mousemove', mouseMove);

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