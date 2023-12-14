
document.addEventListener("DOMContentLoaded", () => {
    // Select all social media buttons
    const elementSM = document.querySelectorAll('.social-media-buttons a')
    // Options for social media popover
    const optionsSM = {
        trigger: 'hover focus',
        placement: 'top',
        toggle: 'popover',
        customClass: 'social-media-popover',
        offset: [5, -10],
        delay: { "show": 250, "hide": 100 }
    }
    // Initialize popover for each social media button
    elementSM.forEach(element => {
        const popover = new bootstrap.Popover(element, optionsSM)
    })
    // Initialize variables
    let items = [];
    // URLs for data files
    const urls = ['../Locations/GadgetLocations.json']; // Add more as needed
    // Fetch data from URLs and process them
    Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(dataArrays => {
        items = dataArrays.flat();
            // Select all item popovers
            const elementNM = document.querySelectorAll('.location-popover')
            // Options for item popover
            const optionsNM = {
                content: '',
                trigger: 'click',
                placement: 'auto',
                toggle: 'popover',
                customClass: 'location-popover-content',
                sanitize: false,
                html: true
            }
            // Initialize popover for each item
            elementNM.forEach(element => {
                const id = element.id;
                const item = items.find(item => item.title === id);
                if (item) {
                    const carouselId = `carousel-${item.title.replace(/ /g, "-").replace(/'/g, "").replace(/\(|\)/g, "")}`;
                    const locationId = `card-location-${item.title.replace(/ /g, "-").replace(/'/g, "").replace(/\(|\)/g, "")}`;
                    // Determine container and image classes based on item properties
                    const containerClass = item.imageType === 'fullsize' ? 'carousel slide fullsize-image-container fullsize-popover-container' : 'carousel slide item-card-image-container';
                    const imageClass = item.imageType === 'fullsize' ? 'd-block mx-auto fullsize-popover-image' : 'd-block w-100 mx-auto item-card-image';
                    // Set popover content
                    optionsNM.content = `
                        <div class="card item-card-popover h-100 DtgA-Title-Text" style="max-width: 18em; max-height: 30em;">
                            <div class="row">
                                <div class="col">
                                <div class="${containerClass}" id="${carouselId}">
                                    <div class="carousel-inner">
                                        ${item.imageSrc.map((image, index) => `
                                            <div class="carousel-item ${index === 0 ? 'active' : ''}" data-slide-index="${index}">
                                                <img src="../${item.directory}/${image}" class="${imageClass}" aria-label="Item Image">
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                <div class="col">
                                    <h3 class="card-title item-card-title">${item.title}</h3>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col">
                                    <p class="card-text DtgA-Standard-Text">${item.description}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    // Log an error message if item is not found in the JSON files
                    console.error('Item with ID "${id}" not found in json files');
                }
                const popover = new bootstrap.Popover(element, optionsNM)
            })
            // Hide popovers when click event is triggered outside of the popover
            document.addEventListener('click', function (event) {
            // Check if the click event's target is the popover
            if (!elementNM[0].contains(event.target) ) {
                // If it is, hide the popover
                elementNM.forEach(element => {
                    const popover = bootstrap.Popover.getInstance(element);
                    if (popover && popover._isShown) {
                        popover.hide();
                    }
                });
            }
            });
        });
    });