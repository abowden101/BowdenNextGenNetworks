document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    // Move a background container slightly
    document.querySelector('.hero-bg').style.transform = 
        `translate(${x * 20}px, ${y * 20}px)`;
});
