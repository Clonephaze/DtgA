fetch('KnownIssues.json')   
  .then(response => response.json())
  .then(data => generateAccordion(data))
  .catch(error => console.error('Error:', error));

function generateAccordion(data) {
    const accordion = document.getElementById("known-issues-accordion");
  
    data.forEach((item, index) => {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
  
      const header = document.createElement("h2");
      header.className = "accordion-header";
  
      const button = document.createElement("button");
      button.className = "accordion-button collapsed";
      button.type = "button";
      button.dataset.bsToggle = "collapse";
      button.dataset.bsTarget = `#collapse${index + 1}`;
      button.ariaExpanded = "true";
      button.ariaControls = `collapse${index + 1}`;
      button.textContent = item.title;
  
      const collapse = document.createElement("div");
      collapse.className = "accordion-collapse collapse";
      collapse.id = `collapse${index + 1}`;
      collapse.dataset.bsParent = "#known-issues-accordion";
  
      const body = document.createElement("div");
      body.className = "accordion-body";
  
      const description = document.createElement("p");
      description.innerHTML = item.description;
  
      const ol = document.createElement("ol");
      item.steps.forEach(step => {
        const li = document.createElement("li");
        li.innerHTML = step;
        ol.appendChild(li);

        // Initialize popover on the dynamically created element
        const popoverLink = li.querySelector('[data-bs-toggle="popover"]');
        if (popoverLink) {
            new bootstrap.Popover(popoverLink, {
            trigger: 'focus',
            customClass: 'known-issues-popover',
            placement: 'auto',
            html: true
            });
        }
      });
  
      const descriptionEnd = document.createElement("p");
      descriptionEnd.textContent = item.descriptionEnd;
  
      body.appendChild(description);
      body.appendChild(ol);
      body.appendChild(descriptionEnd);
      collapse.appendChild(body);
      header.appendChild(button);
      accordionItem.appendChild(header);
      accordionItem.appendChild(collapse);
      accordion.appendChild(accordionItem);
    });
  }
  