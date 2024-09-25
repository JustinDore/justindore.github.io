document.addEventListener('DOMContentLoaded', () => {
    const paragraph = document.querySelector('p');
    const text = paragraph.textContent;
    paragraph.innerHTML = '';
    
    const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.position = 'relative';
        span.style.display = 'inline-block';
        paragraph.appendChild(span);
        return span;
    });

    let mouse = { x: 0, y: 0 };
    let containerRect = paragraph.getBoundingClientRect();

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX - containerRect.left;
        mouse.y = e.clientY - containerRect.top;
    });

    function animate() {
        chars.forEach((char, index) => {
            const delay = (chars.length - index) * 0.02;
            const targetX = mouse.x - char.offsetLeft - char.offsetWidth / 2;
            const targetY = mouse.y - char.offsetTop - char.offsetHeight / 2;

            const currentX = parseFloat(char.style.transform.split(',')[0].split('(')[1]) || 0;
            const currentY = parseFloat(char.style.transform.split(',')[1]) || 0;

            const newX = currentX + (targetX - currentX) * 0.1;
            const newY = currentY + (targetY - currentY) * 0.1;

            char.style.transform = `translate(${newX}px, ${newY}px)`;
            char.style.transition = `transform ${delay}s ease-out`;
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        containerRect = paragraph.getBoundingClientRect();
    });
});
