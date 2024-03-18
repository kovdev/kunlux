document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach((el) => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Nav background change on scroll
   */
  const navbar = document.querySelector('#navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach((navbarlink) => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach((el) => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    };
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener(
      'click',
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    );
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {
    let portfolioFilter = portfolionIsotope.getAttribute(
      'data-portfolio-filter'
    )
      ? portfolionIsotope.getAttribute('data-portfolio-filter')
      : '*';
    let portfolioLayout = portfolionIsotope.getAttribute(
      'data-portfolio-layout'
    )
      ? portfolionIsotope.getAttribute('data-portfolio-layout')
      : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort')
      ? portfolionIsotope.getAttribute('data-portfolio-sort')
      : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(
        document.querySelector('.portfolio-container'),
        {
          itemSelector: '.portfolio-item',
          layoutMode: portfolioLayout,
          filter: portfolioFilter,
          sortBy: portfolioSort,
        }
      );

      let menuFilters = document.querySelectorAll(
        '.portfolio-isotope .portfolio-flters li'
      );
      menuFilters.forEach(function (el) {
        el.addEventListener(
          'click',
          function () {
            document
              .querySelector(
                '.portfolio-isotope .portfolio-flters .filter-active'
              )
              .classList.remove('filter-active');
            this.classList.add('filter-active');
            portfolioIsotope.arrange({
              filter: this.getAttribute('data-filter'),
            });
            if (typeof aos_init === 'function') {
              aos_init();
            }
          },
          false
        );
      });
    });
  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false,
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });
});
const fullscreenImage = document.getElementById('fullscreenImage');
const fullscreenBackdrop = document.getElementById('fullscreenBackdrop');
const overlayText = document.getElementById('overlayText');
const prevBtn = document.getElementById('prevButton');
const nextBtn = document.getElementById('nextButton');
let currentIndex = 0;

let touchStartX = 0;
let touchEndX = 0;

function showFullscreenImage(imageSrc, overlayContent) {
  fullscreenImage.src = imageSrc;
  overlayText.innerHTML = overlayContent;
  fullscreenImage.style.display = 'block';
  fullscreenBackdrop.style.display = 'block';
  [prevBtn, nextBtn].forEach((btn) => (btn.style.opacity = 1));
  if (overlayContent !== '') {
    overlayText.style.display = 'block';
  }
}

function closeFullscreen() {
  fullscreenImage.style.display = 'none';
  overlayText.style.display = 'none';
  fullscreenBackdrop.style.display = 'none';
  [prevBtn, nextBtn].forEach((btn) => (btn.style.opacity = 0));
}

function navigate(direction, images, index) {
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < images.length) {
    showFullscreenImage(
      images[newIndex].href,
      images[newIndex].textContent.trim()
    );
    currentIndex = newIndex;
  } else if (newIndex < 0) {
    showFullscreenImage(
      images[images.length - 1].href,
      images[images.length - 1].textContent.trim()
    );
    currentIndex = images.length - 1;
  } else {
    showFullscreenImage(images[0]?.href, images[0].textContent.trim());
    currentIndex = 0;
  }
}

document.querySelectorAll('.gallery .img a').forEach((image, index) => {
  image.addEventListener('click', (e) => {
    e.preventDefault();
    const images = Array.from(
      image.closest('.gallery').querySelectorAll('.img a')
    );
    showFullscreenImage(image.href, image.textContent.trim());
    currentIndex = images.indexOf(image);
  });
});
[fullscreenBackdrop, fullscreenImage].forEach((el) => {
  el?.addEventListener('click', (e) => {
    if (e.target === el) {
      closeFullscreen();
    }
  });
});
prevBtn?.addEventListener('click', () =>
  navigate(-1, document.querySelectorAll('.gallery .img a'), currentIndex)
);
nextBtn?.addEventListener('click', () =>
  navigate(1, document.querySelectorAll('.gallery .img a'), currentIndex)
);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeFullscreen();
  } else if (e.key === 'ArrowLeft') {
    navigate(-1, document.querySelectorAll('.gallery .img a'), currentIndex);
  } else if (e.key === 'ArrowRight') {
    navigate(1, document.querySelectorAll('.gallery .img a'), currentIndex);
  }
});

fullscreenImage?.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

fullscreenImage?.addEventListener('touchmove', (e) => {
  touchEndX = e.touches[0].clientX;
});

fullscreenImage?.addEventListener('touchend', () => {
  if (touchEndX < touchStartX) {
    // Swiped left
    navigate(1, document.querySelectorAll('.gallery .img a'), currentIndex);
  } else if (touchEndX > touchStartX) {
    // Swiped right
    navigate(-1, document.querySelectorAll('.gallery .img a'), currentIndex);
  }
});
