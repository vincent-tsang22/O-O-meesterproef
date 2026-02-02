// Sidebar Toggle Functionaliteit
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    let sidebarOpenedByClick = false;

    // Function to update content class
    function updateContentClass() {
        if (sidebar.classList.contains('collapsed')) {
            content.classList.remove('sidebar-open');
        } else {
            content.classList.add('sidebar-open');
        }
    }

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        sidebarToggle.classList.toggle('active');
        sidebarOpenedByClick = !sidebarOpenedByClick;
        updateContentClass();
    });

    // Hover functionaliteit voor desktop
    sidebar.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('collapsed');
            updateContentClass();
        }
    });

    sidebar.addEventListener('mouseleave', function() {
        if (window.innerWidth > 768 && !sidebarOpenedByClick) {
            sidebar.classList.add('collapsed');
            updateContentClass();
        }
    });

    // Close sidebar when a link is clicked (only on mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for anchor links, allow normal navigation for page links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
            // Close sidebar only on mobile screens
            if (window.innerWidth <= 768) {
                sidebar.classList.add('collapsed');
                sidebarToggle.classList.remove('active');
                updateContentClass();
            }
        });
    });

    // Reset sidebar on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('collapsed');
            sidebarToggle.classList.remove('active');
            sidebarOpenedByClick = false;
            updateContentClass();
        }
    });

    // Image Dot Popup Functionaliteit
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