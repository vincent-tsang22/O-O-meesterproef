// Dashboard Drag and Drop Functionaliteit
document.addEventListener('DOMContentLoaded', function() {
    const draggableElements = document.querySelectorAll('.legend-block.draggable');
    const kasDropzone = document.getElementById('kasDropzone');
    const droppedElementsData = {};

    // Element data met energie waarden
    const elementData = {
        'warmte-pomp': { name: 'Warmte Pomp', icon: '🔥', warmte: 15, verbruik: 8 },
        'solar-panel': { name: 'Zonnepaneel', icon: '☀️', warmte: 10, verbruik: 0 },
        'ventilatie': { name: 'Ventilatie', icon: '💨', warmte: 0, verbruik: 5 },
        'verwarming': { name: 'Verwarming', icon: '🌡️', warmte: 20, verbruik: 18 },
        'water-systeem': { name: 'Water Systeem', icon: '💧', warmte: 2, verbruik: 3 },
        'isolatie': { name: 'Isolatie', icon: '🧊', warmte: 5, verbruik: 0 }
    };

    let draggedElement = null;

    // Drag Start Event
    draggableElements.forEach(element => {
        element.addEventListener('dragstart', function(e) {
            draggedElement = this;
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('element-type', this.getAttribute('data-element'));
        });

        element.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
            draggedElement = null;
        });
    });

    // Drop Zone Events
    kasDropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('drag-over');
    });

    kasDropzone.addEventListener('dragleave', function(e) {
        if (e.target === this) {
            this.classList.remove('drag-over');
        }
    });

    kasDropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');

        const elementType = e.dataTransfer.getData('element-type');
        const elementInfo = elementData[elementType];

        if (elementInfo) {
            addElementToKas(elementType, elementInfo);
        }
    });

    // Functie om element aan kas toe te voegen
    function addElementToKas(elementType, elementInfo) {
        const elementId = `dropped-${elementType}-${Date.now()}`;

        // Maak het dropped element
        const droppedElement = document.createElement('div');
        droppedElement.className = 'dropped-element';
        droppedElement.id = elementId;
        droppedElement.innerHTML = `
            <span>${elementInfo.icon}</span>
            <span>${elementInfo.name}</span>
            <button class="remove-btn" type="button">×</button>
        `;

        // Sleutel hint als dit eerste element is
        if (Object.keys(droppedElementsData).length === 0) {
            kasDropzone.classList.add('has-items');
        }

        // Opslaan van element data
        droppedElementsData[elementId] = elementInfo;

        // Remove button functionaliteit
        const removeBtn = droppedElement.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            droppedElement.remove();
            delete droppedElementsData[elementId];

            // Verberg hint als er geen elementen meer zijn
            if (Object.keys(droppedElementsData).length === 0) {
                kasDropzone.classList.remove('has-items');
            }

            updateEnergyBalance();
        });

        kasDropzone.appendChild(droppedElement);
        updateEnergyBalance();
    }

    // Functie om energie balans bij te werken
    function updateEnergyBalance() {
        let totalWarmte = 0;
        let totalVerbruik = 0;

        Object.values(droppedElementsData).forEach(element => {
            totalWarmte += element.warmte;
            totalVerbruik += element.verbruik;
        });

        const efficiency = totalVerbruik > 0 
            ? Math.round(((totalWarmte - totalVerbruik) / totalWarmte) * 100) 
            : 0;

        document.getElementById('warmte-productie').textContent = totalWarmte;
        document.getElementById('energie-verbruik').textContent = totalVerbruik;
        document.getElementById('efficiëntie').textContent = efficiency >= 0 ? efficiency : 0;
    }
});
