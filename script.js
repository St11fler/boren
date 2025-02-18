document.addEventListener('DOMContentLoaded', function () {
  // Hamburger меню за мобилни устройства
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenu.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Плавно превъртане при клик върху навигационните връзки
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      // Скриване на мобилното меню ако е отворено
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
      const targetId = this.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Бутон за връщане към началото
  const scrollToTopBtn = document.getElementById('scrollToTop');
  scrollToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('home').scrollIntoView({
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  // Fade-in анимация при скролване
  const fadeElements = document.querySelectorAll('.fade-in');
  window.addEventListener('scroll', checkFadeIn);
  
  function checkFadeIn() {
    const triggerBottom = window.innerHeight * 0.9;
    fadeElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  }

  // Lightbox функционалност за Галерията
  const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', function() {
      currentImageIndex = index;
      openLightbox(img.src, img.alt);
    });
  });
  
  function openLightbox(src, alt) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
    lightboxImg.alt = alt;
  }
  
  function closeLightbox() {
    lightbox.style.display = 'none';
  }
  
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentImageIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
  
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const img = galleryImages[currentImageIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrevImage);
  lightboxNext.addEventListener('click', showNextImage);
  
  // Затваряне на lightbox при клик извън изображението
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Клавишна навигация за lightbox
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    }
  });
});
