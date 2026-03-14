// Duurzaam Drag and Drop Functionaliteit
document.addEventListener('DOMContentLoaded', function() {
    const draggableElements = document.querySelectorAll('.legend-block.draggable');
    const dropBox = document.getElementById('dropBox');
    const droppedImages = document.getElementById('droppedImages');

    let draggedElement = null;

    // Drag Start Event
    draggableElements.forEach(element => {
        element.addEventListener('dragstart', function(e) {
            draggedElement = this;
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'copy';
        });

        element.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
            draggedElement = null;
        });
    });

    // Drop Box Events
    dropBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('drag-over');
    });

    dropBox.addEventListener('dragleave', function(e) {
        if (e.target === this) {
            this.classList.remove('drag-over');
        }
    });

    dropBox.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');

        if (draggedElement) {
            const imgSrc = draggedElement.querySelector('.block-icon img').src;
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = draggedElement.querySelector('p').textContent;

            // Verwijder vorige afbeeldingen
            droppedImages.innerHTML = '';
            droppedImages.appendChild(img);
            dropBox.classList.add('has-items');
        }
    });
});