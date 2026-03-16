// Duurzaam Drag and Drop Functionaliteit
let initialEnergyData = null;
let initialEnergyLabels = null;
let themeChartAdjusted = false;

document.addEventListener('DOMContentLoaded', function() {
    const draggableElements = document.querySelectorAll('.legend-block.draggable');
    const dropBox1 = { box: document.getElementById('dropBox'), images: document.getElementById('droppedImages') };
    const dropBox2 = { box: document.getElementById('dropBox2'), images: document.getElementById('droppedImages2') };

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

    function bindDropBox1(box, imagesContainer) {
        if (!box || !imagesContainer) return;

        box.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.classList.add('drag-over');
        });

        box.addEventListener('dragleave', function(e) {
            if (e.target === this) {
                this.classList.remove('drag-over');
            }
        });

        box.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');

            if (draggedElement) {
                imagesContainer.innerHTML = '';

                const droppedItem = document.createElement('div');
                droppedItem.className = 'dropped-item';

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-drop-btn';
                removeBtn.type = 'button';
                removeBtn.textContent = 'Verwijder';

                removeBtn.addEventListener('click', function() {
                    droppedItem.remove();
                    box.classList.remove('has-items');
                    incrementEnergyStatistics();
                });

                const imgSrc = draggedElement.querySelector('.block-icon img').src;
                const imgAlt = draggedElement.querySelector('p').textContent;
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = imgAlt;
                droppedItem.appendChild(img);

                droppedItem.appendChild(removeBtn);
                imagesContainer.appendChild(droppedItem);
                box.classList.add('has-items');

                decrementEnergyStatistics();
            }
        });
    }

    function bindDropBox2(box, imagesContainer) {
        if (!box || !imagesContainer) return;

        box.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.classList.add('drag-over');
        });

        box.addEventListener('dragleave', function(e) {
            if (e.target === this) {
                this.classList.remove('drag-over');
            }
        });

        box.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');

            if (draggedElement) {
                imagesContainer.innerHTML = '';

                const droppedItem = document.createElement('div');
                droppedItem.className = 'dropped-item';

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-drop-btn';
                removeBtn.type = 'button';
                removeBtn.textContent = 'Verwijder';

                removeBtn.addEventListener('click', function() {
                    droppedItem.remove();
                    box.classList.remove('has-items');
                    incrementEnergyStatistics();
                });

                const fillBar = document.createElement('div');
                fillBar.className = 'drop-fill-bar';
                fillBar.textContent = 'Element toegevoegd';
                droppedItem.appendChild(fillBar);

                droppedItem.appendChild(removeBtn);
                imagesContainer.appendChild(droppedItem);
                box.classList.add('has-items');

                decrementEnergyStatistics();
            }
        });
    }

    bindDropBox1(dropBox1.box, dropBox1.images);
    bindDropBox2(dropBox2.box, dropBox2.images);

    // Theme toggle listener
    const themeToggle = document.getElementById("themeToggle");
    const bottomScreenshot = document.querySelector('.bottom-screenshot img');
    const originalImage = bottomScreenshot ? bottomScreenshot.src : null;
    const swappedImage = originalImage ? originalImage.replace('013200', '132136') : null;

    if (themeToggle) {
        themeToggle.addEventListener("change", () => {
            if (themeToggle.checked) {
                document.body.classList.add("night-mode");
                if (bottomScreenshot && swappedImage) {
                    bottomScreenshot.src = swappedImage;
                }
                applyNightChart();
            } else {
                document.body.classList.remove("night-mode");
                if (bottomScreenshot && originalImage) {
                    bottomScreenshot.src = originalImage;
                }
                revertNightChart();
            }
        });
    }
});

// Functie om chartstatistieken met 1 te verlagen
function decrementEnergyStatistics() {
    if (typeof energyChart === 'undefined' || !energyChart.data || !energyChart.data.datasets) {
        return;
    }

    energyChart.data.datasets.forEach((dataset, idx) => {
        const decrement = dataset.label === 'Warmte verbruik' ? 0.2 : 1;

        dataset.data = dataset.data.map(value => {
            if (typeof value === 'number') {
                const newValue = value - decrement;
                if (dataset.label === 'Warmte verbruik') {
                    return Math.max(0.1, newValue);
                }
                return Math.max(0, newValue);
            }
            return value;
        });
    });

    energyChart.update();
}

function incrementEnergyStatistics() {
    if (typeof energyChart === 'undefined' || !energyChart.data || !energyChart.data.datasets || !initialEnergyData) {
        return;
    }

    energyChart.data.datasets.forEach((dataset, idx) => {
        const increment = dataset.label === 'Warmte verbruik' ? 0.2 : 1;

        dataset.data = dataset.data.map((value, index) => {
            if (typeof value === 'number') {
                const restoredValue = Math.min(initialEnergyData[idx][index], value + increment);
                return restoredValue;
            }
            return value;
        });
    });

    energyChart.update();
}

function applyNightChart() {
    if (!window.energyChart || themeChartAdjusted) return;

    if (!initialEnergyLabels) {
        initialEnergyLabels = energyChart.data.labels ? energyChart.data.labels.slice() : [6,7,8,9,10,11,12,13,14,15,16,17,18];
    }

    energyChart.data.labels = [18,19,20,21,22,23,0,1,2,3,4,5,6];

    energyChart.data.datasets.forEach(dataset => {
        dataset.data = dataset.data.map(value => {
            if (typeof value === 'number') {
                return value + 1;
            }
            return value;
        });
    });

    themeChartAdjusted = true;
    energyChart.update();
}

function revertNightChart() {
    if (!window.energyChart || !themeChartAdjusted) return;

    if (initialEnergyLabels) {
        energyChart.data.labels = initialEnergyLabels.slice();
    }

    energyChart.data.datasets.forEach(dataset => {
        dataset.data = dataset.data.map(value => {
            if (typeof value === 'number') {
                return Math.max(0, value - 1);
            }
            return value;
        });
    });

    themeChartAdjusted = false;
    energyChart.update();
}

/* ===== STATISTICS PANEL ===== */

const statsToggle = document.getElementById("statsToggle");
const statsPanel = document.getElementById("statsPanel");
const dashboardContainer = document.querySelector('.dashboard-container');

statsToggle.addEventListener("click", () => {
    statsPanel.classList.toggle("open");
    statsToggle.classList.toggle("open");

    if (dashboardContainer) {
        dashboardContainer.classList.toggle('stats-open');
    }
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

// Bewaar originele datasetwaarden voor correct herstel na verwijderen
if (typeof energyChart !== 'undefined' && energyChart.data && energyChart.data.datasets) {
    initialEnergyData = energyChart.data.datasets.map(dataset => dataset.data.slice());
}