fetch('NewMechanics.json')
    .then(response => response.json())
    .then(data => generateNewMechs(data))
    .catch(error => console.error('Error:', error));

function generateNewMechs(data) {
    const container = document.querySelector('.NewMech-List-Container');
    let row = document.createElement('div');
    row.className = 'row justify-content-center row-cols-sm-1 row-cols-lg-3 row-cols-md-2';

    data.forEach(item => {

        const col = document.createElement('div');
        col.className = 'col-sm-4 NewMech-Cols';

        const listGroup = document.createElement('div');
        listGroup.className = 'list-group NewMech-list-group h-100 overflow-hidden';

        const listGroupItem = document.createElement('div');
        listGroupItem.className = 'list-group-item NewMech-list-group-container h-100 d-flex flex-column justify-content-between';

        const rowContainer = document.createElement('div');
        rowContainer.className = 'row container-flex';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'col NewMech-List-Item-Title-Container';

        const title = document.createElement('h4');
        title.className = 'NewMech-List-Item-Title';
        title.textContent = item.title;

        const bodyContainer = document.createElement('div');
        bodyContainer.className = 'row NewMech-Description-Container flex-grow-1';

        const body = document.createElement('div');
        body.className = 'col';

        const list = document.createElement('ul');
        list.className = 'DtgA-Standard-Text NewMech-List-Item-Body';

        item['description items'].forEach(description => {
            const listItem = document.createElement('li');
            listItem.innerHTML = description;
            list.appendChild(listItem);
        });

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

