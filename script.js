document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'block';
    
    // Position the menu at cursor
    const x = e.clientX;
    const y = e.clientY;
    
    // Adjust menu position if it would go off screen
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    if (x + menuWidth > windowWidth) {
        contextMenu.style.left = (windowWidth - menuWidth) + 'px';
    } else {
        contextMenu.style.left = x + 'px';
    }
    
    if (y + menuHeight > windowHeight) {
        contextMenu.style.top = (windowHeight - menuHeight) + 'px';
    } else {
        contextMenu.style.top = y + 'px';
    }
});

// Close context menu when clicking anywhere else
document.addEventListener('click', function() {
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
});

// Prevent the context menu from closing when clicking inside it
document.getElementById('contextMenu').addEventListener('click', function(e) {
    e.stopPropagation();
}); 