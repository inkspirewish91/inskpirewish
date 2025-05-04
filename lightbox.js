
document.addEventListener("DOMContentLoaded", function () {
  const mediaItems = document.querySelectorAll(".galeria img, .galeria video, .galeria-grid img");
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";

  const leftArrow = document.createElement("div");
  leftArrow.id = "lightbox-left";
  leftArrow.innerHTML = "&#10094;";
  const rightArrow = document.createElement("div");
  rightArrow.id = "lightbox-right";
  rightArrow.innerHTML = "&#10095;";

  lightbox.appendChild(leftArrow);
  lightbox.appendChild(rightArrow);
  document.body.appendChild(lightbox);

  let currentIndex = 0;

  function showMedia(index) {
    const media = mediaItems[index].cloneNode(true);
    if (media.tagName === "VIDEO") {
      media.controls = true;
    }
    lightbox.querySelectorAll("img, video").forEach(el => el.remove());
    lightbox.classList.add("active");
    lightbox.insertBefore(media, rightArrow);
    currentIndex = index;
  }

  mediaItems.forEach((item, index) => {
    item.addEventListener("click", () => showMedia(index));
  });

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    showMedia(currentIndex);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % mediaItems.length;
    showMedia(currentIndex);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  // Swipe support
  let startX = 0;
  function startSwipe(e) {
    startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  }
  function endSwipe(e) {
    const endX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
    const deltaX = endX - startX;
    if (deltaX > 50) {
      currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
      showMedia(currentIndex);
    } else if (deltaX < -50) {
      currentIndex = (currentIndex + 1) % mediaItems.length;
      showMedia(currentIndex);
    }
  }
  lightbox.addEventListener("touchstart", startSwipe);
  lightbox.addEventListener("touchend", endSwipe);

  // Keyboard support
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
      showMedia(currentIndex);
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % mediaItems.length;
      showMedia(currentIndex);
    }
    if (e.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });
});
