/**
 * Common navigation functionality for both homepage and project pages
 */

// Fonction commune pour gérer la navigation sticky
function handleStickyNavigation(navigationElement, referenceElement) {
    const referenceBottom = referenceElement.offsetTop + referenceElement.offsetHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > referenceBottom) {
        navigationElement.classList.add("sticky");
    } else {
        navigationElement.classList.remove("sticky");
    }
}