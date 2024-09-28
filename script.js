// Récupération des éléments
const mainImage = document.getElementById('main-image');
const thumbnails = document.querySelectorAll('.thumbnail');

// Ajout de l'événement de clic sur chaque vignette
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
    // Mise à jour de l'image principale avec l'image pleine résolution
    const fullImageUrl = thumbnail.getAttribute('data-full');
    mainImage.src = fullImageUrl;

    // Mettre à jour la bordure active sur la vignette sélectionnée
    thumbnails.forEach(tn => tn.style.border = "2px solid transparent");
    thumbnail.style.border = "2px solid hsl(26, 100%, 55%)";
  });
});
