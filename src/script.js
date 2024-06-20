const backgroundImage = document.getElementById('backgroundImage');
const images = [
  './assets 2/background/background.png',
];

let currentImageIndex = 0;

function changeBackgroundImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  backgroundImage.style.backgroundImage = `url(${images[currentImageIndex]})`;
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY >= window.innerHeight) {
    changeBackgroundImage();
  }
});

// Initial background image
backgroundImage.style.backgroundImage = `url(${images[currentImageIndex]})`;
