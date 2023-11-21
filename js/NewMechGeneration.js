fetch('NewMechanics.json')
    .then(response => response.json())
    .then(data => generateNewMechs(data))
    .catch(error => console.error('Error:', error));

function generateNewMechs(data) {
    const container = document.querySelector('.NewMech-List-Container');
    let row = document.createElement('div');
    row.className = 'row row-cols-1 row-cols-lg-3 row-cols-md-2';

    data.forEach(item => {

        const col = document.createElement('div');
        col.className = 'col-sm-4 NewMech-Cols';

        const listGroup = document.createElement('div');
        listGroup.className = 'list-group Custom-list-group h-100';

        const listGroupItem = document.createElement('div');
        listGroupItem.className = 'list-group-item Custom-list-group-container DtgA-Title-Text h-100';

        const rowContainer = document.createElement('div');
        rowContainer.className = 'row container';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'col NewMech-List-Item-Title-Container';

        const title = document.createElement('h4');
        title.className = 'NewMech-List-Item-Title';
        title.textContent = item.title;

        const bodyContainer = document.createElement('div');
        bodyContainer.className = 'row';

        const body = document.createElement('div');
        body.className = 'col';

        const list = document.createElement('ul');
        list.className = 'DtgA-Standard-Text NewMech-List-Item-Body';

        item['description items'].forEach(description => {
            const listItem = document.createElement('li');
            listItem.textContent = description;
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
