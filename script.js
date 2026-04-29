document.addEventListener("DOMContentLoaded", () => {
   
    const introVideo = document.getElementById("intro-video");
    const introContainer = document.getElementById("intro-container");
    const mainUI = document.getElementById("main-ui");
    const tvBezel = document.getElementById("tv-bezel");
    

    const mainViewer = document.getElementById("main-viewer");
    const modelWrapper = document.getElementById("model-wrapper");
    const artifactSections = document.querySelectorAll(".artifact-section");

   
    introVideo.addEventListener("ended", () => {
        const tl = gsap.timeline();

        tl.to(introContainer, {
            scale: 5,
            opacity: 0,
            duration: 1.2,
            ease: "power3.in"
        })
        .set(introContainer, { display: "none" })
        .set([mainUI, tvBezel], { visibility: "visible" })
        .to([mainUI, tvBezel], {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    
    const observerOptions = {
        root: document.getElementById("scroll-track"),
        rootMargin: "0px",
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                artifactSections.forEach(sec => sec.classList.remove("active"));
                entry.target.classList.add("active");

                // Get the target 3D model file path
                const newModelSrc = entry.target.getAttribute("data-model");

                
                if (mainViewer.src !== newModelSrc) {
                    // Fade out
                    modelWrapper.style.opacity = 0;
                    
                    setTimeout(() => {
                        // Swap source
                        mainViewer.src = newModelSrc;
                        // Reset camera angle slightly for dramatic effect
                        mainViewer.cameraOrbit = "0deg 75deg 105%"; 
                        // Fade in
                        modelWrapper.style.opacity = 1;
                    }, 400); 
                }
            }
        });
    }, observerOptions);

   
    artifactSections.forEach(section => {
        sectionObserver.observe(section);
    });
});