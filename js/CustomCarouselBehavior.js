document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          const carouselElements = document.querySelectorAll('.carousel');
          carouselElements.forEach((carouselElement) => {
            const carouselInstance = new bootstrap.Carousel(carouselElement, {
              wrap: true,
              touch: true
            });
          });
        }, 1000);
      });