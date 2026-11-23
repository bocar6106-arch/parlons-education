// Menu mobile
const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("nav");

if (menu && navigation) {
    menu.addEventListener("click", function () {
        navigation.classList.toggle("active");
    });
}

// Affichage complet de la galerie
const boutonGalerie = document.querySelector(".btn-galerie");
const grilleGalerie = document.querySelector(".galerie-grid");

if (boutonGalerie && grilleGalerie) {
    boutonGalerie.addEventListener("click", function () {
        const ouverte = boutonGalerie.getAttribute("aria-expanded") === "true";

        grilleGalerie.classList.toggle("galerie-complete", !ouverte);
        boutonGalerie.setAttribute("aria-expanded", String(!ouverte));
        boutonGalerie.querySelector(".btn-galerie-label").textContent =
            ouverte ? "Voir toutes les photos" : "Réduire la galerie";
    });
}

// Défilement fluide vers les différentes sections
document.querySelectorAll('a[href^="#"]').forEach(function (lien) {
    lien.addEventListener("click", function (event) {
        const cible = document.querySelector(this.getAttribute("href"));

        if (cible) {
            event.preventDefault();
            cible.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});