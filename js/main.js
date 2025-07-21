// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Références aux éléments
  const loader = document.querySelector(".loader-container")
  const nav = document.querySelector(".nav")
  const header = document.querySelector(".header")
  const projectCards = document.querySelectorAll(".project-card")
  const cursorEffect = document.querySelector(".cursor-effect")

  // Fonction pour masquer le loader après le chargement
  function hideLoader() {
    setTimeout(() => {
      loader.classList.add("loader-hidden")
      setTimeout(() => {
        loader.style.display = "none"
      }, 500)
    }, 2000) // Afficher le loader pendant 2 secondes
  }

  // Appeler la fonction pour masquer le loader
  hideLoader()

  // La fonction handleStickyNavigation est maintenant importée depuis navigation.js

  // Fonction spécifique pour la navigation de la page d'accueil
  function handleHomeNavigation() {
    if (nav && header) {
      handleStickyNavigation(nav, header);
    }
  }

  // Écouter l'événement de défilement pour la navigation sticky
  window.addEventListener("scroll", handleHomeNavigation)
  // Appeler une fois au chargement pour initialiser l'état
  handleHomeNavigation()

  // Animation au défilement pour les éléments
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".project-card, .about-stamp, .contact-content"
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight * 0.8) {
        element.classList.add("animate-in")
      }
    })
  }

  // Ajouter la classe CSS pour l'animation
  const style = document.createElement("style")
  style.textContent = `
        .project-card, .about-stamp, .contact-content {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `
  document.head.appendChild(style)

  // Appeler la fonction d'animation au chargement et au défilement
  window.addEventListener("scroll", animateOnScroll)
  window.addEventListener("load", animateOnScroll)

  // Effet de curseur personnalisé
  function updateCursorEffect(e) {
    if (window.innerWidth >= 768) {
      // Seulement sur les écrans plus grands
      cursorEffect.style.left = `${e.clientX}px`
      cursorEffect.style.top = `${e.clientY}px`
    }
  }

  function enlargeCursor() {
    cursorEffect.style.width = "50px"
    cursorEffect.style.height = "50px"
    cursorEffect.style.backgroundColor = "rgba(248, 179, 209, 0.5)"
  }

  function resetCursor() {
    cursorEffect.style.width = "30px"
    cursorEffect.style.height = "30px"
    cursorEffect.style.backgroundColor = "rgba(248, 179, 209, 0.3)"
  }

  // Ajouter les écouteurs d'événements pour le curseur
  document.addEventListener("mousemove", updateCursorEffect)

  // Ajouter l'effet de survol sur les projets
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", enlargeCursor)
    card.addEventListener("mouseleave", resetCursor)
  })

  // Liens de navigation fluide
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Ajuster pour la navigation
          behavior: "smooth",
        })
      }
    })
  })

  // Animation des projets au survol
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const index = card.getAttribute("data-index")
      const otherCards = document.querySelectorAll(
        `.project-card:not([data-index="${index}"])`
      )

      otherCards.forEach((otherCard) => {
        otherCard.style.transform = "scale(0.98)"
        otherCard.style.opacity = "0.8"
      })
    })

    card.addEventListener("mouseleave", () => {
      const otherCards = document.querySelectorAll(".project-card")

      otherCards.forEach((otherCard, i) => {
        if (i === 0) {
          otherCard.style.transform = "rotate(-1deg)"
        } else if (i === 1) {
          otherCard.style.transform = "rotate(1deg)"
        } else if (i === 2) {
          otherCard.style.transform = "rotate(-0.5deg)"
        }
        otherCard.style.opacity = "1"
      })
    })
  })

  // Effet de bruit visuel subtil
  function createNoiseOverlay() {
    const noise = document.createElement("div")
    noise.classList.add("noise-overlay")
    document.body.appendChild(noise)

    const noiseStyle = document.createElement("style")
    noiseStyle.textContent = `
            .noise-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0.02"/></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>');
                pointer-events: none;
                opacity: 0.03;
                z-index: 9998;
            }
        `
    document.head.appendChild(noiseStyle)
  }

  createNoiseOverlay()
})
