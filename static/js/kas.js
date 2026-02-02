// Image Dot Popup Functionaliteit voor De Kas pagina
document.addEventListener('DOMContentLoaded', function() {
    const imageDots = document.querySelectorAll('.image-dot');
    imageDots.forEach(dot => {
        const dotId = dot.getAttribute('data-dot');
        const popup = document.getElementById(`popup-${dotId}`);
        
        // Gebruik hover-only: tonen bij mouseenter, verbergen bij mouseleave
        dot.addEventListener('mouseenter', function() {
            popup.classList.add('active');
        });

        dot.addEventListener('mouseleave', function() {
            popup.classList.remove('active');
        });
    });

    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        imageDots.forEach(dot => {
            const dotId = dot.getAttribute('data-dot');
            const popup = document.getElementById(`popup-${dotId}`);
            if (!dot.contains(e.target)) {
                popup.classList.remove('active');
            }
        });
    });
});
