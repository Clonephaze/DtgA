fetch('NewMechanics.json')
    .then(response => response.json())
    .then(data => generateNewMechs(data))
    .catch(error => console.error('Error:', error));

/**
 * Generate new mechanic cards and append them to the container element.
 * @param {Array} data - An array of mechs data.
 */
function generateNewMechs(data) {
    // Get the container element
    const container = document.querySelector('.NewMech-List-Container');

    // Create a new row element
    let row = document.createElement('div');
    row.className = 'row justify-content-center row-cols-sm-1 row-cols-lg-3 row-cols-md-2';

    // Loop through the data array
    data.forEach(item => {
        // Create a new column element
        const col = document.createElement('div');
        col.className = 'col-sm-4 NewMech-Cols';

        // Create a new list group element
        const listGroup = document.createElement('div');
        listGroup.className = 'list-group NewMech-list-group h-100 overflow-hidden';

        // Create a new list group item element
        const listGroupItem = document.createElement('div');
        listGroupItem.className = 'list-group-item NewMech-list-group-container h-100 d-flex flex-column justify-content-between';

        // Create a new row container element
        const rowContainer = document.createElement('div');
        rowContainer.className = 'row container-flex';

        // Create a new title container element
        const titleContainer = document.createElement('div');
        titleContainer.className = 'col NewMech-List-Item-Title-Container';

        // Create a new title element
        const title = document.createElement('h4');
        title.className = 'NewMech-List-Item-Title';
        title.textContent = item.title;

        // Create a new body container element
        const bodyContainer = document.createElement('div');
        bodyContainer.className = 'row NewMech-Description-Container flex-grow-1';

        // Create a new body element
        const body = document.createElement('div');
        body.className = 'col';

        // Create a new list element
        const list = document.createElement('ul');
        list.className = 'DtgA-Standard-Text NewMech-List-Item-Body';

        // Loop through the description items array
        item['description items'].forEach(description => {
            // Create a new list item element for each description item
            const listItem = document.createElement('li');
            listItem.innerHTML = description;
            list.appendChild(listItem);
        });

        // Append the elements to their parent elements
        body.appendChild(list);
        bodyContainer.appendChild(body);
        titleContainer.appendChild(title);
        rowContainer.appendChild(titleContainer);
        listGroupItem.appendChild(rowContainer);
        listGroupItem.appendChild(bodyContainer);
        listGroup.appendChild(listGroupItem);
        col.appendChild(listGroup);
        row.appendChild(col);
        container.appendChild(row);
    });
}

