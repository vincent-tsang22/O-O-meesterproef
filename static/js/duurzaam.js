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

/* ===== STATISTICS PANEL ===== */

const statsToggle = document.getElementById("statsToggle");
const statsPanel = document.getElementById("statsPanel");

statsToggle.addEventListener("click", () => {

    statsPanel.classList.toggle("open");
    statsToggle.classList.toggle("open");

});

/* ===== ENERGY CHART ===== */

const ctx = document.getElementById("energyChart").getContext("2d");

const energyChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [6,7,8,9,10,11,12,13,14,15,16,17,18],

        datasets: [
            {
                label: "Warmte verbruik",
                data: [1.6,1.7,1.0,1.5,1.4,1.0,0.5,0.4,0.8,0.6,0.9,1.0,1.1],
                backgroundColor: "#b7d67c"
            },
            {
                label: "Energie verbruik",
                data: [3.7,3.5,3.6,2.6,2.8,3.0,2.5,2.2,2.0,1.7,2.2,2.8,3.5],
                backgroundColor: "#355e2b"
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "top"
            }
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: "Uur"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Joule × 10¹¹"
                },
                beginAtZero: true
            }
        }
    }
});