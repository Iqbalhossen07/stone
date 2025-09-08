
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
  // Helper function to extract YouTube Video ID from various URLs
  function getYouTubeVideoId(url) {
    let videoId = null;
    try {
      // Handle embed URL
      const embedMatch = url.match(/(?:youtube\.com\/(?:embed\/|v\/)|youtu\.be\/|\/(?:ytc|yts)\/)([\w-]{11})/);
      if (embedMatch && embedMatch[1]) {
        videoId = embedMatch[1];
      } else {
        // Handle watch URL
        const urlObj = new URL(url);
        if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
          videoId = urlObj.searchParams.get('v');
        } else if (urlObj.hostname === 'youtu.be') {
          videoId = urlObj.pathname.split('/')[1];
        }
      }
    } catch (e) {
      console.error("Invalid URL provided:", url, e);
    }
    return videoId;
  }

  // ভিডিও মডাল এবং থাম্বনেইল লোড করার জন্য JavaScript
  document.addEventListener('DOMContentLoaded', () => {
    const videoCardContainers = document.querySelectorAll('.video-card-container');
    const modal = document.getElementById('videoModal');
    const closeModalBtn = document.getElementById('closeModal');
    const player = document.getElementById('youtubePlayer');

    if (modal) {
      videoCardContainers.forEach(card => {
        const videoUrlString = card.getAttribute('data-video-url');
        const imgElement = card.querySelector('.video-thumbnail');

        if (videoUrlString && imgElement) {
          const videoId = getYouTubeVideoId(videoUrlString);
          if (videoId) {
            // Try to load maxresdefault.jpg first, then fall back to others
            const potentialThumbnails = [
              `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
              `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
              `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
              `https://img.youtube.com/vi/${videoId}/default.jpg`
            ];

            let loaded = false;
            for (let i = 0; i < potentialThumbnails.length; i++) {
              const testImg = new Image();
              testImg.onload = () => {
                if (!loaded) {
                  imgElement.src = potentialThumbnails[i];
                  loaded = true;
                }
              };
              testImg.onerror = () => {
                // If this thumbnail fails, try the next one
              };
              testImg.src = potentialThumbnails[i];
              if (loaded) break; // Stop trying if a thumbnail successfully loaded
            }
          } else {
            console.warn(`Could not extract video ID from URL: ${videoUrlString}`);
          }
        }

        card.addEventListener('click', () => {
          const clickedVideoUrlString = card.getAttribute('data-video-url');
          if (clickedVideoUrlString) {
            let finalVideoUrl = new URL(clickedVideoUrlString);
            
            // Add necessary parameters for a clean, autoplaying embed
            finalVideoUrl.searchParams.set('autoplay', '1');
            finalVideoUrl.searchParams.set('rel', '0');
            finalVideoUrl.searchParams.set('modestbranding', '1');

            player.src = finalVideoUrl.toString();
            modal.classList.remove('hidden');
          }
        });
      });

      const closeModal = () => {
        modal.classList.add('hidden');
        player.src = ''; // Stop the video
      };

      closeModalBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
  });


    // ফুটারের বছর স্বয়ংক্রিয়ভাবে আপডেট করার জন্য
  const footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }
   


  