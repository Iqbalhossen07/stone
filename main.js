
      AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
      // Mobile menu
      const menuBtn = document.getElementById('menuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
      mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
      // Scroll progress
      const progressBar = document.getElementById('progressBar');
      window.addEventListener('scroll', () => {
        const h = document.documentElement; const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100; progressBar.style.width = p + '%';
      });


       // Hero Video Player Logic
   // Hero Video Player Logic
  const heroPlayBtn = document.getElementById('heroPlayBtn');
  const heroVideoFrame = document.getElementById('heroVideoFrame');
  const heroVideoPoster = document.getElementById('heroVideoPoster');

  if (heroPlayBtn) {
    heroPlayBtn.addEventListener('click', () => {
      // আপনার দেওয়া নতুন ভিডিও লিঙ্কটি এখানে যুক্ত করা হয়েছে
      heroVideoFrame.src = 'https://www.youtube.com/embed/1ucLq6JTxac?autoplay=1&rel=0&showinfo=0&modestbranding=1';
      heroVideoPoster.classList.add('opacity-0');
      heroPlayBtn.classList.add('opacity-0', 'pointer-events-none');
      
      setTimeout(() => {
        if(heroVideoPoster) heroVideoPoster.remove();
        if(heroPlayBtn) heroPlayBtn.remove();
      }, 500);
    });
  }


//  about 

let currentSlide = 0;
  const carouselImages = document.querySelectorAll('.carousel-image');
  const carouselIndicators = document.querySelectorAll('.carousel-indicator');
  
  if (carouselImages.length > 0) {
    const totalSlides = carouselImages.length;

    function showSlide(index) {
      carouselImages.forEach((img, i) => {
        img.classList.remove('active', 'opacity-100');
        img.classList.add('opacity-0');
        if (i === index) {
          img.classList.add('active', 'opacity-100');
        }
      });

      carouselIndicators.forEach((indicator, i) => {
        indicator.classList.remove('active-indicator', 'bg-primary');
        indicator.classList.add('bg-slate-300');
        if (i === index) {
          indicator.classList.add('active-indicator', 'bg-primary');
          indicator.classList.remove('bg-slate-300');
        }
      });
    }

    function changeSlide(direction) {
      currentSlide += direction;
      if (currentSlide >= totalSlides) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
      }
      showSlide(currentSlide);
    }
    
    // Initial display
    showSlide(currentSlide);
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
      changeSlide(1);
    }, 5000);
  }


//   why choose us


const tabs = document.querySelectorAll('.w-choose-us-tab');
  const panels = document.querySelectorAll('.w-choose-us-panel');

  const activateTab = (tab) => {
    // Deactivate all tabs and panels
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.classList.remove('active');
    });
    panels.forEach(p => p.classList.add('hidden'));

    // Activate the clicked tab and its corresponding panel
    tab.setAttribute('aria-selected', 'true');
    tab.classList.add('active');
    const targetPanelId = tab.getAttribute('data-tab-target');
    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
    }
  };
  
  // Set the first tab as active by default
  if (tabs.length > 0) {
      activateTab(tabs[0]);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activateTab(tab);
    });
  });


    const scrollers = document.querySelectorAll(".scroller");

  if (scrollers.length > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      if (scroller.getAttribute("data-animated")) return; // Prevent re-running the animation setup

      scroller.setAttribute("data-animated", true);
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }



    // ভিডিও মডাল এর জন্য JavaScript
  const videoCardContainers = document.querySelectorAll('.video-card-container');
  const modal = document.getElementById('videoModal');
  const closeModalBtn = document.getElementById('closeModal');
  const player = document.getElementById('youtubePlayer');

  if (modal) {
    videoCardContainers.forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video-id');
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.classList.remove('hidden');
      });
    });

    const closeModal = () => {
      modal.classList.add('hidden');
      player.src = '';
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }



   const carouselWrapper = document.getElementById('testimonialCarouselWrapper');
  const carousel = document.getElementById('testimonialCarousel');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.getElementById('testimonialDots');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let slideIndex = 0;
  let autoSlideInterval;

  const getCardsPerPage = () => {
    return window.innerWidth >= 768 ? 2 : 1;
  };

  const updateCarousel = () => {
    const cardsPerPage = getCardsPerPage();
    const slideWidth = carouselWrapper.offsetWidth / cardsPerPage * cardsPerPage; // Get the full width of one slide (e.g., 2 cards)
    carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    updateDots();
  };

  const createDots = () => {
    dotsContainer.innerHTML = '';
    const cardsPerPage = getCardsPerPage();
    const numSlides = Math.ceil(testimonialCards.length / cardsPerPage);

    for (let i = 0; i < numSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('testimonial-dot');
      if (i === slideIndex) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        slideIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  };

  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === slideIndex) {
        dot.classList.add('active');
      }
    });
  };
  
  const handleNext = () => {
    const cardsPerPage = getCardsPerPage();
    const numSlides = Math.ceil(testimonialCards.length / cardsPerPage);
    if (slideIndex < numSlides - 1) {
      slideIndex++;
    } else {
      slideIndex = 0; // Loop to beginning
    }
    updateCarousel();
  };

  const handlePrev = () => {
    const cardsPerPage = getCardsPerPage();
    const numSlides = Math.ceil(testimonialCards.length / cardsPerPage);
    if (slideIndex > 0) {
      slideIndex--;
    } else {
      slideIndex = numSlides - 1; // Loop to end
    }
    updateCarousel();
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval = setInterval(handleNext, 5000);
  };
  
  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  prevBtn.addEventListener('click', () => { stopAutoSlide(); handlePrev(); startAutoSlide(); });
  nextBtn.addEventListener('click', () => { stopAutoSlide(); handleNext(); startAutoSlide(); });
  
  if(carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
    carouselWrapper.addEventListener('mouseleave', startAutoSlide);
  }
  
  window.addEventListener('resize', () => {
    slideIndex = 0;
    createDots();
    updateCarousel();
    startAutoSlide();
  });

  // Initial setup
  createDots();
  updateCarousel();
  startAutoSlide();



    // ফুটারের বছর স্বয়ংক্রিয়ভাবে আপডেট করার জন্য
  const footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }
   