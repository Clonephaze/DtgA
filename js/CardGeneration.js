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
        
        let carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';
        
        item.imageSrc.forEach((image, imageIndex) => {
          let carouselItem = document.createElement('div');
          carouselItem.className = imageIndex === 0 ? 'carousel-item active' : 'carousel-item';
          
          let img = document.createElement('img');
          img.src = image;
          img.className = 'd-block w-100 mx-auto item-card-image';
          img.ariaLabel = 'Item Image';
          img.style = 'max-width: 235px; min-height: 235px;';
          
          carouselItem.appendChild(img);
          carouselInner.appendChild(carouselItem);
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
          genDesc.innerHTML = data[0].genDesc;

          cardBody.appendChild(genDesc);

          item.description.forEach((desc) => {
           let idTitle = desc.title.replace(/ /g, "-").replace(/'/g, "");
           let arrayItem = document.createElement('div');
           arrayItem.className = 'item-card-array-title btn card-array-btn d-flex flex-column';
           arrayItem.setAttribute('data-bs-toggle', 'collapse');
                       
           let arrayItemContent = document.createElement('div');
           arrayItemContent.className = 'content item-card-array-content collapse';
           arrayItemContent.innerHTML = desc.content;
         
           arrayItemContent.id = `item-card-array-${idTitle}`;
           arrayItem.innerHTML = '<span>' + desc.title + '&nbsp;<i id="icon-' + idTitle + '" class="las la-caret-down"></i></span>';
           arrayItem.setAttribute('href', `#${arrayItemContent.id}`);
         
           cardBody.appendChild(arrayItem);
           cardBody.appendChild(arrayItemContent);

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