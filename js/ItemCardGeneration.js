fetch('Gadgets.json')
 .then(response => response.json())
 .then(data => {
 let itemsContainer = document.getElementById('Gadget-Cards-generated');

 let row = document.createElement('div');
 row.className = 'row row-cols-1 row-cols-md-3 g-4';

 data.forEach((item, index) => {
   let col = document.createElement('div');
   col.className = 'col';

   let card = document.createElement('div');
   card.className = 'card h-100 DtgA-Text-Color';
     
     let img = document.createElement('img');
     img.src = item.imageSrc;
     img.className = 'img-fluid rounded text-center mx-auto d-block';
     img.alt = 'ItemIcon';
     img.style = 'max-width: 235px;';
     
     let cardBody = document.createElement('div');
     cardBody.className = 'card-body';
     
     let cardTitle = document.createElement('h5');
     cardTitle.className = 'card-title';
     cardTitle.textContent = item.title;
     
     let cardText = document.createElement('p');
     cardText.className = 'card-text';
     cardText.textContent = item.description;
     
     let cardLocation = document.createElement('p');
     cardLocation.className = 'card-text';
     cardLocation.innerHTML = `<small class="text-body-secondary"><details><summary>Location</summary> ${item.location}</details></small>`;
     
     cardBody.appendChild(cardTitle);
     cardBody.appendChild(cardText);
     cardBody.appendChild(cardLocation);
     card.appendChild(img);
     card.appendChild(cardBody);
     col.appendChild(card);
     row.appendChild(col);
 });

 itemsContainer.appendChild(row);
 })
 .catch(error => console.error('Error:', error));