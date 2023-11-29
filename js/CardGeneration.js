function generateCards(jsonFileName, containerId, sectionName) {
  let placeholderRow = document.getElementById('PlaceholderRow');
  fetch(jsonFileName)
    .then(response => response.json())
    .then(data => {
      let itemsContainer = document.getElementById(containerId);
      let row = document.createElement('div');
      row.className = 'row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4';
      
      data.forEach((item, index) => {
        let col = document.createElement('div');
        col.className = 'col';
        
        let card = document.createElement('div');
        card.className = 'card item-card h-100 DtgA-Title-Text';
        
        let carousel = document.createElement('div');
        carousel.className = 'carousel slide';
        carousel.id = `carousel-${sectionName}-${index}`;

        let carouselInstance = new bootstrap.Carousel(carousel);
        
        let carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';
        
        let slideIndex = 0;
        item.imageSrc.forEach((image, imageIndex) => {
          let carouselItem = document.createElement('div');
          carouselItem.className = imageIndex === 0 ? 'carousel-item active' : 'carousel-item';
          carouselItem.dataset.slideIndex = slideIndex;
          
          let img = document.createElement('img');
          img.src = image;
          img.className = 'd-block w-100 mx-auto item-card-image';
          img.ariaLabel = 'Item Image';
          img.style = 'max-width: 235px; min-height: 235px;';
          
          carouselItem.appendChild(img);
          carouselInner.appendChild(carouselItem);

          slideIndex++;
        });
        
        carousel.appendChild(carouselInner);
        
        if (item.imageSrc.length > 1) {
          let prevControl = document.createElement('button');
          prevControl.className = 'carousel-control-prev';
          prevControl.type = 'button';
          prevControl.setAttribute('data-bs-target', `#carousel-${sectionName}-${index}`);
          prevControl.setAttribute('data-bs-slide', 'prev');
          prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';
          
          let nextControl = document.createElement('button');
          nextControl.className = 'carousel-control-next';
          nextControl.type = 'button';
          nextControl.setAttribute('data-bs-target', `#carousel-${sectionName}-${index}`);
          nextControl.setAttribute('data-bs-slide', 'next');
          nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';
          
          carousel.appendChild(prevControl);
          carousel.appendChild(nextControl);

          
        }
        
        card.appendChild(carousel);
        
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        let cardTitle = document.createElement('h3');
        cardTitle.className = 'card-title item-card-title ';
        cardTitle.textContent = item.title;
        
        cardBody.appendChild(cardTitle);
        
        if (Array.isArray(item.description)) {
          let genDesc = document.createElement('div');
          genDesc.className = 'item-card-description';
          genDesc.innerHTML = item.genDesc;
          cardBody.appendChild(genDesc);
         
          let container = document.createElement('div');
          container.className = 'container item-card-array-container';
          container.id = `container-${sectionName}-${index}`;
         
          let openAllButton = document.createElement('button');
          openAllButton.textContent = 'Open All';
          openAllButton.className = 'btn open-all-btn';
          openAllButton.id = `open-all-${sectionName}-${index}`;
          container.appendChild(openAllButton);
         
          let accordion = document.createElement('div');
          accordion.className = 'accordion';
          accordion.id = `accordion-${sectionName}-${index}`;
          container.appendChild(accordion); // Append accordion to container
         
          openAllButton.addEventListener('click', function() {
            let collapsibleElements = document.querySelectorAll(`#accordion-${sectionName}-${index} .collapse`);
            let allOpen = Array.from(collapsibleElements).every(element => element.classList.contains('show'));
          
            if (allOpen) {
                // If all menus are open, close all menus
                collapsibleElements.forEach(function(element) {
                    let bsCollapse = bootstrap.Collapse.getInstance(element);
                    if (bsCollapse === null) {
                        bsCollapse = new bootstrap.Collapse(element, { toggle: false });
                    }
                    bsCollapse.hide();
                });
                openAllButton.textContent = 'Open All';
            } else {
                // If not all menus are open, open all menus
                collapsibleElements.forEach(function(element) {
                    let bsCollapse = bootstrap.Collapse.getInstance(element);
                    if (bsCollapse === null) {
                        bsCollapse = new bootstrap.Collapse(element, { toggle: false });
                    }
                    bsCollapse.hide();
                });
                openAllButton.textContent = 'Close All';

                setTimeout(function() {
                  collapsibleElements.forEach(function(element) {
                      let bsCollapse = bootstrap.Collapse.getInstance(element);
                      if (bsCollapse === null) {
                         bsCollapse = new bootstrap.Collapse(element, { toggle: false });
                      }
                      bsCollapse.show();
                  });
                  openAllButton.textContent = 'Close All';
                }, 375); // 1000 milliseconds = 1 second
            }
         });
           
         
          cardBody.appendChild(container); // Append container to cardBody

          let slideIndex = 0;
          item.description.forEach((desc) => {
          let idTitle = desc.title.replace(/ /g, "-").replace(/'/g, "");
          let arrayItem = document.createElement('div');
          arrayItem.className = 'item-card-array-title btn card-array-btn d-flex flex-column';
          arrayItem.setAttribute('data-bs-toggle', 'collapse');
          arrayItem.dataset.slideIndex = slideIndex;
          
          let arrayItemContent = document.createElement('div');
          arrayItemContent.className = 'content item-card-array-content collapse';
          arrayItemContent.innerHTML = desc.content;
          arrayItemContent.setAttribute('data-bs-parent', `#accordion-${sectionName}-${index}`);
          
          arrayItem.addEventListener('click', function() {
            let slideIndex = this.dataset.slideIndex; 
            carouselInstance.to(slideIndex);
          });
          
          arrayItemContent.id = `item-card-array-${idTitle}`;
          arrayItem.innerHTML = '<span>' + desc.title + '&nbsp;<i id="icon-' + idTitle + '" class="las la-caret-down"></i></span>';
          arrayItem.setAttribute('href', `#${arrayItemContent.id}`);
          
          accordion.appendChild(arrayItem);
          accordion.appendChild(arrayItemContent);
          
          let iconElement = arrayItem.querySelector('i')
          let parent = iconElement.parentElement;
          let grandparent = parent.parentElement;
          
          let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (grandparent.classList.contains('collapsed')) {
                  iconElement.style.transform = 'rotate(0deg)';
                } else {
                  iconElement.style.transform = 'rotate(180deg)';
                }
              }
            });
          });
          
          observer.observe(grandparent, { attributes: true });
          
          slideIndex++;
          });

         } else {
          // If it's not an array, handle it as a simple string
          let cardText = document.createElement('p');
          cardText.className = 'card-text DtgA-Standard-Text';
          cardText.innerHTML = item.description;
          cardBody.appendChild(cardText);
         }
        
        let cardLocation = document.createElement('p');
        cardLocation.className = 'card-text';
        cardLocation.innerHTML = `<small class="text-body-secondary"><details><summary>Open to Reveal Location</summary> ${item.location}</details></small>`;
        
        cardBody.appendChild(cardLocation);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });
      
      if (placeholderRow) {
        placeholderRow.remove();
      }

      itemsContainer.appendChild(row);
    })
    .catch(error => console.error('Error:', error));
}