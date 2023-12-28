function generateCards(jsonFileName, containerId, sectionName) {
  // Get the placeholder row element
  let placeholderRow = document.getElementById('PlaceholderRow');
  // Fetch the JSON data
  fetch(jsonFileName)
    .then(response => response.json())
    .then(data => {
      // Get the items container element
      let itemsContainer = document.getElementById(containerId);
      // Create a new row element
      let row = document.createElement('div');
      row.className = 'row justify-content-center row-cols-1 row-cols-lg-4 row-cols-md-2 g-4';

      // Iterate over each item in the data
      data.forEach((item, index) => {
        // Create a new column element
        let col = document.createElement('div');
        col.className = 'col';

        // Create a new card element
        let card = document.createElement('div');
        card.className = 'card item-card h-100 DtgA-Title-Text';

        // Create a new row element for the card item
        let cardItemRow = document.createElement('div');
        cardItemRow.className = 'row';
        card.appendChild(cardItemRow);

        // Create a new column element for the card item
        let cardItem = document.createElement('div');
        cardItem.className = 'col';
        cardItemRow.appendChild(cardItem);

        // Create a new carousel element for the card item
        let carousel = document.createElement('div');
        carousel.className = 'carousel slide item-card-image-container';
        carousel.id = `carousel-${sectionName}-${index}`;
        cardItem.appendChild(carousel);

        // Create a new carousel inner element
        let carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';

        let slideIndex = 0;
        // Iterate over each image source in the item
        item.imageSrc.forEach((image, imageIndex) => {
          // Create a new carousel item element
          let carouselItem = document.createElement('div');
          carouselItem.className = imageIndex === 0 ? 'carousel-item active' : 'carousel-item';
          carouselItem.dataset.slideIndex = slideIndex;

          // Create a new image element
          let img = document.createElement('img');
          img.loading = 'lazy';
          img.src = image;
          img.className = 'd-block w-100 mx-auto item-card-image';
          img.ariaLabel = 'Item Image';

          // Add a load event listener to the image
          img.addEventListener('load', function () {
            // Check if the image's natural width is greater than 250
            if (this.naturalWidth > 250) {
              // Replace the image class and container class with full-size versions
              this.classList.replace('item-card-image', 'fullsize-card-image');
              this.classList.remove('w-100');
              carousel.classList.replace('item-card-image-container', 'fullsize-image-container');
            }
          });

          // Append the image to the carousel item
          carouselItem.appendChild(img);
          // Append the carousel item to the carousel inner
          carouselInner.appendChild(carouselItem);

          slideIndex++;
        });

        // Append carouselInner to carousel
        carousel.appendChild(carouselInner);

        // Initialize carousel instance
        let carouselInstance = new bootstrap.Carousel(carousel);

        // Check if there is more than one image source
        if (item.imageSrc.length > 1) {
          // Create previous control button
          let prevControl = document.createElement('button');
          prevControl.className = 'carousel-control-prev carousel-btn-left';
          prevControl.type = 'button';
          prevControl.setAttribute('data-bs-target', `#carousel-${sectionName}-${index}`);
          prevControl.setAttribute('data-bs-slide', 'prev');
          prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

          // Create next control button
          let nextControl = document.createElement('button');
          nextControl.className = 'carousel-control-next carousel-btn-right';
          nextControl.type = 'button';
          nextControl.setAttribute('data-bs-target', `#carousel-${sectionName}-${index}`);
          nextControl.setAttribute('data-bs-slide', 'next');
          nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

          // Append previous and next control buttons to carousel
          carousel.appendChild(prevControl);
          carousel.appendChild(nextControl);
        }

        // Append carousel to cardItem
        cardItem.appendChild(carousel);

        // Create card body
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create row for card body
        let cardBodyRow1 = document.createElement('div');
        cardBodyRow1.className = 'row';
        cardBody.appendChild(cardBodyRow1);

        // Create column for card body
        let cardBodyCol1 = document.createElement('div');
        cardBodyCol1.className = 'col';
        cardBodyRow1.appendChild(cardBodyCol1);

        // Create card title
        let cardTitle = document.createElement('h3');
        cardTitle.className = 'card-title item-card-title ';
        cardTitle.textContent = item.title;
        cardBodyCol1.appendChild(cardTitle);

        // Create row for card body
        let cardBodyRow2 = document.createElement('div');
        cardBodyRow2.className = 'row';
        cardBody.appendChild(cardBodyRow2);

        // Create column for card body
        let cardBodyCol2 = document.createElement('div');
        cardBodyCol2.className = 'col';
        cardBodyRow2.appendChild(cardBodyCol2);

        if (Array.isArray(item.description)) {
          // Create a new div element for the general description
          let genDesc = document.createElement('div');
          genDesc.className = 'item-card-description';
          genDesc.innerHTML = item.genDesc;
          cardBodyCol2.appendChild(genDesc);

          // Create a new container div for the item card array
          let container = document.createElement('div');
          container.className = 'container item-card-array-container';
          container.id = `container-${sectionName}-${index}`;

          // Create an "Open All" button
          let openAllButton = document.createElement('button');
          openAllButton.textContent = 'Open All';
          openAllButton.className = 'btn open-all-btn';
          openAllButton.id = `open-all-${sectionName}-${index}`;
          openAllButton.setAttribute('type', 'button');
          container.appendChild(openAllButton);

          // Create a new accordion div
          let accordion = document.createElement('div');
          accordion.className = 'accordion';
          accordion.id = `accordion-${sectionName}-${index}`;
          container.appendChild(accordion); // Append accordion to container

          // Add event listener to the "Open All" button
          openAllButton.addEventListener('click', function () {
            let collapsibleElements = document.querySelectorAll(`#accordion-${sectionName}-${index} .collapse`);
            let allOpen = Array.from(collapsibleElements).every(element => element.classList.contains('show'));

            if (allOpen) {
              // If all menus are open, close all menus
              collapsibleElements.forEach(function (element) {
                let bsCollapse = bootstrap.Collapse.getInstance(element);
                if (bsCollapse === null) {
                  bsCollapse = new bootstrap.Collapse(element, { toggle: false });
                }
                bsCollapse.hide();
              });
              openAllButton.textContent = 'Open All';
            } else {
              // If not all menus are open, open all menus
              collapsibleElements.forEach(function (element) {
                let bsCollapse = bootstrap.Collapse.getInstance(element);
                if (bsCollapse === null) {
                  bsCollapse = new bootstrap.Collapse(element, { toggle: false });
                }
                bsCollapse.hide();
              });
              openAllButton.textContent = 'Close All';

              setTimeout(function () {
                collapsibleElements.forEach(function (element) {
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

          cardBodyCol2.appendChild(container);

          // Initialize the slide index
          let slideIndex = 0;

          // Iterate over each item description
          item.description.forEach((desc) => {
            // Generate a unique ID for the title
            let idTitle = desc.title.replace(/ /g, "-").replace(/'/g, "");

            // Create the array item element
            let arrayItem = document.createElement('div');
            arrayItem.className = 'item-card-array-title btn card-array-btn d-flex flex-column';
            arrayItem.setAttribute('data-bs-toggle', 'collapse');
            arrayItem.dataset.slideIndex = slideIndex;

            // Create the array item content element
            let arrayItemContent = document.createElement('div');
            arrayItemContent.className = 'content item-card-array-content collapse';
            arrayItemContent.innerHTML = desc.content;
            arrayItemContent.setAttribute('data-bs-parent', `#accordion-${sectionName}-${index}`);

            // Add click event listener to array item
            arrayItem.addEventListener('click', function () {
              let slideIndex = this.dataset.slideIndex;
              carouselInstance.to(slideIndex);
            });

            // Set the ID and inner HTML of the array item
            arrayItemContent.id = `item-card-array-${idTitle}`;
            arrayItem.innerHTML = '<span>' + desc.title + '&nbsp;<i id="icon-' + idTitle + '" class="las la-caret-down"></i></span>';
            arrayItem.setAttribute('href', `#${arrayItemContent.id}`);

            // Append the array item and array item content to the accordion
            accordion.appendChild(arrayItem);
            accordion.appendChild(arrayItemContent);

            // Get the icon element
            let iconElement = arrayItem.querySelector('i');
            let parent = iconElement.parentElement;
            let grandparent = parent.parentElement;

            // Create a mutation observer to detect changes in class attribute
            let observer = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                  // Rotate the icon based on the collapsed state
                  if (grandparent.classList.contains('collapsed')) {
                    iconElement.style.transform = 'rotateX(0deg)';
                  } else {
                    iconElement.style.transform = 'rotateX(180deg)';
                  }
                }
              });
            });

            // Observe changes in the grandparent's class attribute
            observer.observe(grandparent, { attributes: true });

            // Increment the slide index
            slideIndex++;
          });

        } else {
          // Create the card text element
          let cardText = document.createElement('p');
          cardText.className = 'card-text DtgA-Standard-Text';
          cardText.innerHTML = item.description;
          cardBodyCol2.appendChild(cardText);
        }

        // Create a new element for the card location
        let cardLocation = document.createElement('div');
        cardLocation.className = 'row mt-auto';
        cardBodyCol2.appendChild(cardLocation);

        // Create a new element for the card location dropdown
        let cardLocationDropdown = document.createElement('div');
        let cardTitleID = item.title.replace(/ /g, "-").replace(/'/g, "").replace(/\(|\)/g, "");
        cardLocationDropdown.className = 'location-dropdown';
        cardLocationDropdown.setAttribute('data-bs-toggle', 'collapse');
        cardLocationDropdown.setAttribute('data-bs-target', `#card-location-${cardTitleID}`);
        cardLocationDropdown.innerHTML = '<span>Click To Reveal location<i id="Location-' + cardTitleID + '" class="las la-caret-down"></i></span>'

        // Add the card location dropdown to the card location
        cardLocation.appendChild(cardLocationDropdown);

        // Get the icon element from the card location dropdown
        let iconElement = cardLocationDropdown.querySelector('i');
        let parent = iconElement.parentElement;
        let grandparent = parent.parentElement;

        // Create a mutation observer to watch for changes in the class attribute of the grandparent element
        let observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              // Rotate the icon element based on the state of the grandparent element
              if (grandparent.classList.contains('collapsed')) {
                iconElement.style.transform = 'rotateX(0deg)';
              } else {
                iconElement.style.transform = 'rotateX(180deg)';
              }
            }
          });
        });

        // Start observing the grandparent element for changes in the class attribute
        observer.observe(grandparent, { attributes: true, attributeFilter: ['class'] });

        // Create a new element for the card location dropdown content
        let cardLocationDropdownContent = document.createElement('div');
        cardLocationDropdownContent.className = 'location-dropdown-content collapse';
        cardLocationDropdownContent.setAttribute('id', `card-location-${cardTitleID}`);
        cardLocationDropdownContent.innerHTML = item.location;

        // Add the card location dropdown content to the card location
        cardLocation.appendChild(cardLocationDropdownContent)

        // Add the card body to the card
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });

      // Remove the placeholder row if it exists
      if (placeholderRow) {
        placeholderRow.remove();
      }

      // Add the row to the items container
      itemsContainer.appendChild(row);
    })
    .catch(error => console.error('Error:', error));
}
