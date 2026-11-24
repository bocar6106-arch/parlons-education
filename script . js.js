// Menu mobile
const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("nav");
const prefereMouvementReduit = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (menu && navigation) {
    menu.addEventListener("click", function () {
        const ouvert = menu.getAttribute("aria-expanded") === "true";
        menu.setAttribute("aria-expanded", String(!ouvert));
        menu.setAttribute("aria-label", ouvert ? "Ouvrir le menu" : "Fermer le menu");
        navigation.classList.toggle("active", !ouvert);
    });

    navigation.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            navigation.classList.remove("active");
            menu.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-label", "Ouvrir le menu");
        }
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
                behavior: prefereMouvementReduit ? "auto" : "smooth"
            });
        }
    });
});

// Animation d'écriture et apparition progressive au défilement
if (!prefereMouvementReduit) {
    const textesAnimes = document.querySelectorAll(
        ".hero h1, .hero h2, section h2, section > p"
    );

    textesAnimes.forEach(function (element) {
        const texte = element.textContent.trim().replace(/\s+/g, " ");
        if (!texte) {
            return;
        }

        const texteVisuel = document.createElement("span");
        texteVisuel.className = "typing-visual";
        texteVisuel.setAttribute("aria-hidden", "true");

        const mots = texte.split(" ");
        const intervalle = Math.min(20, 1400 / texte.length);
        let indexLettre = 0;

        mots.forEach(function (mot, indexMot) {
            if (indexMot > 0) {
                texteVisuel.appendChild(document.createTextNode(" "));
            }

            const motVisuel = document.createElement("span");
            motVisuel.className = "typing-word";

            Array.from(mot).forEach(function (lettre) {
                const lettreVisuelle = document.createElement("span");
                lettreVisuelle.className = "typing-letter";
                lettreVisuelle.style.setProperty(
                    "--letter-delay",
                    `${indexLettre * intervalle}ms`
                );
                lettreVisuelle.textContent = lettre;
                motVisuel.appendChild(lettreVisuelle);
                indexLettre += 1;
            });

            texteVisuel.appendChild(motVisuel);
        });

        const texteAccessible = document.createElement("span");
        texteAccessible.className = "visually-hidden";
        texteAccessible.textContent = texte;

        element.replaceChildren(texteVisuel, texteAccessible);
        element.classList.add("typing-target");
    });

    const textesAAnimer = document.querySelectorAll(".typing-target");
    const cartesAAnimer = document.querySelectorAll(
        ".points-forts article, .missions-grid article, .thematiques-list li, " +
        ".galerie-grid figure, .rubriques article, .guide-contribution li, " +
        ".partenaires-grid article, .contact-social-link"
    );

    if ("IntersectionObserver" in window) {
        const observateurTexte = new IntersectionObserver(function (entrees, observateur) {
            entrees.forEach(function (entree) {
                if (entree.isIntersecting) {
                    entree.target.classList.add("is-typing");
                    observateur.unobserve(entree.target);
                }
            });
        }, { threshold: 0.15 });

        const observateurCartes = new IntersectionObserver(function (entrees, observateur) {
            entrees.forEach(function (entree) {
                if (entree.isIntersecting) {
                    entree.target.classList.add("is-visible");
                    observateur.unobserve(entree.target);
                }
            });
        }, { threshold: 0.12 });

        textesAAnimer.forEach(function (element) {
            observateurTexte.observe(element);
        });

        cartesAAnimer.forEach(function (element, index) {
            element.classList.add("scroll-reveal");
            element.style.setProperty(
                "--reveal-delay",
                `${(index % 4) * 90}ms`
            );
            observateurCartes.observe(element);
        });
    } else {
        textesAAnimer.forEach(function (element) {
            element.classList.add("is-typing");
        });
    }
}