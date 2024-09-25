// Sélectionne le paragraphe
const paragraph = document.querySelector('p');
const originalText = paragraph.textContent;
paragraph.innerHTML = '';

// Crée un span pour chaque caractère
const chars = originalText.split('').map(char => {
  const span = document.createElement('span');
  span.textContent = char;
  span.style.display = 'inline-block';
  paragraph.appendChild(span);
  return span;
});

// Fonction pour obtenir une position aléatoir
const randomPosition = () => ({
  x: (Math.random() - 0.5) * window.innerWidth * 0.8,
  y: (Math.random() - 0.5) * window.innerHeight * 0.8
});

// Fonction pour animer les lettres
function animateLetters() {
  chars.forEach(span => {
    const pos = randomPosition();
    anime({
      targets: span,
      translateX: [0, pos.x, 0],
      translateY: [0, pos.y, 0],
      scale: [1, Math.random() + 0.5, 1],
      rotate: [0, Math.random() * 360, 0],
      duration: 2000 + Math.random() * 1000,
      easing: 'easeInOutQuad',
      complete: animateLetters
    });
  });
}

// Démarrer l'animation
animateLetters();

// Ajouter un effet de survol
paragraph.addEventListener('mouseenter', () => {
  anime({
    targets: chars,
    rotateY: '360deg',
    scale: 1.2,
    duration: 1000,
    delay: anime.stagger(50)
  });
});

paragraph.addEventListener('mouseleave', () => {
  anime({
    targets: chars,
    rotateY: '0deg',
    scale: 1,
    duration: 1000,
    delay: anime.stagger(50)
  });
});
