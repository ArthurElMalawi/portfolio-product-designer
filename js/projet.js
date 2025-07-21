// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Référence au bouton de retour en haut
  const scrollTopBtn = document.getElementById("scrollTopBtn")
  // Référence à la navigation du projet
  const projetNavigation = document.querySelector(".projet-navigation")
  // Référence à la section hero du projet
  const projetHero = document.querySelector(".projet-hero")
  // Références aux éléments spécifiques des pages projets
  const galleryItems = document.querySelectorAll(".gallery-item")
  const timelineItems = document.querySelectorAll(".timeline-item")
  const personaCards = document.querySelectorAll(".persona-card")
  const learningItems = document.querySelectorAll(".learnings-list li")
  const statBadges = document.querySelectorAll(".stat-badge")

  // La fonction handleStickyNavigation est maintenant importée depuis navigation.js

  // Fonction spécifique pour la navigation de la page projet
  function handleProjetNavigation() {
    if (projetNavigation && projetHero) {
      handleStickyNavigation(projetNavigation, projetHero)
    }
  }

  // Écouter l'événement de défilement pour la navigation sticky
  window.addEventListener("scroll", handleProjetNavigation)
  // Appeler une fois au chargement pour initialiser l'état
  handleProjetNavigation()

  // Animation d'entrée pour la page
  function animatePageElements() {
    // Ajouter la classe CSS pour l'animation
    const style = document.createElement("style")
    style.textContent = `
            .projet-title, .projet-context, .projet-cover, .pitch-bubble, 
            .timeline-item, .persona-card, .gallery-item, .learnings-list li, 
            .stat-badge, .stakeholder-map, .retrospective-container, .contact-container {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .timeline-item:nth-child(odd).animate-in {
                transform: translateX(0);
            }
            
            .timeline-item:nth-child(even).animate-in {
                transform: translateX(0);
            }
            
            .stat-badge.animate-in {
                transform: scale(1);
            }
        `
    document.head.appendChild(style)

    // Utiliser Intersection Observer pour une animation plus efficace
    const animateElements = document.querySelectorAll(
      ".projet-title, .projet-context, .projet-cover, .pitch-bubble, " +
        ".timeline-item, .persona-card, .gallery-item, .learnings-list li, " +
        ".stat-badge, .stakeholder-map, .retrospective-container, .contact-container"
    )

    // Forcer l'animation immédiate de la section rétrospective
    const retrospectiveContainer = document.querySelector(
      ".retrospective-container"
    )
    if (retrospectiveContainer) {
      retrospectiveContainer.classList.add("animate-in")
      // Ensure the animation is applied by setting inline styles as a fallback
      retrospectiveContainer.style.opacity = "1"
      retrospectiveContainer.style.transform = "translateY(0)"
    } else {
      console.error("Retrospective container not found")
    }

    // Configuration de l'Intersection Observer
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // 10% de l'élément visible
    }

    // Callback de l'observer
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target) // Arrêter d'observer une fois animé
        }
      })
    }

    // Créer l'observer
    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observer chaque élément
    animateElements.forEach((element) => {
      observer.observe(element)
    })

    // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      animateElements.forEach((element) => {
        element.classList.add("animate-in")
      })
    }
  }

  // Appeler la fonction d'animation immédiatement
  animatePageElements()

  // Appeler à nouveau après un court délai pour s'assurer que le DOM est complètement chargé
  setTimeout(animatePageElements, 500)

  // Et une fois de plus après un délai plus long pour s'assurer que tout est bien chargé
  setTimeout(animatePageElements, 1000)

  // Effet de zoom sur les images de la galerie
  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      // Ajouter un effet de mise en avant sur l'élément survolé
      item.style.zIndex = "10"

      // Réduire légèrement les autres éléments
      galleryItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.style.opacity = "0.7"
          otherItem.style.transform = "scale(0.98)"
        }
      })
    })

    item.addEventListener("mouseleave", () => {
      // Réinitialiser l'effet
      item.style.zIndex = "2"

      // Réinitialiser les autres éléments
      galleryItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.style.opacity = "1"
          otherItem.style.transform = "scale(1)"
        }
      })
    })
  })

  // Animation des badges de statistiques
  statBadges.forEach((badge) => {
    badge.addEventListener("mouseenter", () => {
      badge.style.transform = "scale(1.1)"
      badge.style.boxShadow = "var(--shadow-md)"
    })

    badge.addEventListener("mouseleave", () => {
      badge.style.transform = "scale(1)"
      badge.style.boxShadow = "var(--shadow-sm)"
    })
  })

  // Animation des éléments de la timeline au survol
  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const dot = item.querySelector(".timeline-dot")
      dot.style.transform = "scale(1.3)"
      dot.style.backgroundColor = "var(--color-secondary)"
    })

    item.addEventListener("mouseleave", () => {
      const dot = item.querySelector(".timeline-dot")
      dot.style.transform = "scale(1)"
      dot.style.backgroundColor = "var(--color-primary)"
    })
  })

  // Animation des cartes persona au survol
  personaCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)"
      card.style.boxShadow = "var(--shadow-lg)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "var(--shadow-md)"
    })
  })

  // Animation des éléments d'apprentissage au survol
  learningItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const icon = item.querySelector("i")
      icon.style.transform = "scale(1.2) rotate(5deg)"
      icon.style.color = "var(--color-primary)"
    })

    item.addEventListener("mouseleave", () => {
      const icon = item.querySelector("i")
      icon.style.transform = "scale(1) rotate(0)"
      icon.style.color = "var(--color-lilac)"
    })
  })

  // Animation de transition douce lors du chargement de la page
  function smoothPageTransition() {
    const transitionStyle = document.createElement("style")
    transitionStyle.textContent = `
            body {
                animation: fadeIn 0.8s ease-in-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `
    document.head.appendChild(transitionStyle)
  }

  smoothPageTransition()

  // Effet de parallaxe subtil sur l'image de couverture
  const projetCover = document.querySelector(".projet-cover img")
  if (projetCover) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      if (scrollPosition < 600) {
        // Limiter l'effet aux premiers pixels de défilement
        projetCover.style.transform = `rotate(-1deg) translateY(${
          scrollPosition * 0.05
        }px)`
      }
    })
  }

  // Ancres de navigation fluide
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

  // Gestion du bouton de retour en haut
  if (scrollTopBtn) {
    // Afficher/masquer le bouton en fonction du défilement
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible")
      } else {
        scrollTopBtn.classList.remove("visible")
      }
    })

    // Action de retour en haut lors du clic
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
})
