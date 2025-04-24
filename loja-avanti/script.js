const menuIndex = 5;
const menuList = ['Departamento', 'Departamento', 'Departamento', 'Departamento', 'Departamento', 'Departamento', 'Departamento', 'Departamento'];
const menuContainer = document.getElementById('menuList');

// Renderização dos menus
if (menuList.length > menuIndex) {
  const dropdown = document.createElement('li');
  dropdown.className = 'nav-item dropdown';
  dropdown.innerHTML =
    // <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mais</a>
    ` 
    <ul class="dropdown-menu">
        ${menuList.slice(menuIndex).map(item =>
      `<li><a class="dropdown-item d-none d-md-block" href="#">${item}</a></li>`).join('')}
    </ul>
    `;
  menuContainer.appendChild(dropdown);
}

// Adicionando itens principais
menuList.slice(0, menuIndex).forEach(item => {
  const menuItem = document.createElement('li');
  menuItem.className = 'nav-item';
  menuItem.innerHTML = `<a class="nav-link active d-none d-md-block" href="#">${item}</a>`;
  menuContainer.appendChild(menuItem);
});

// Gimmicks
function promoBtn(msg) {
  alert(msg)
}

// Renderização dos produtos no Carrosel
axios.get('./produtos.json')
  .then(response => {
    const cards = response.data;
    const carouselContent = document.getElementById("carouselContent");
    const groupSize = window.innerWidth <= 767 ? 2 : 5;

    for (let i = 0; i < cards.length; i += groupSize) {
      const group = cards.slice(i, i + groupSize);
      const item = document.createElement("div");
      item.className = "carousel-item" + (i === 0 ? " active" : "");
      item.innerHTML = `
        <div class="d-flex flex-wrap justify-content-center gap-5">
          ${group.map(card => `
            <div class="card card-custom shadow-sm rounded-3 p-2">
              <div class="position-absolute top-0 start-0 m-2">
                <span class="badge bg-primary position-relative" style="z-index: 2;">NOVO</span>
              </div>
              <img src="${card.img}" class="card-img-top" alt="${card.title}">
              <div class="card-body text-center p-2">
                <h6 class="card-title" style="font-size: 0.9rem;">${card.title}</h6>
                <p class="mb-1 text-muted text-decoration-line-through" style="font-size: 0.75rem;">${card.oldPrice}</p>
                <h6 class="fw-bold" style="font-size: 0.85rem;">${card.price} <span class="badge bg-success">10% OFF</span></h6>
                <p class="text-muted mb-2" style="font-size: 0.7rem;">${card.parcel}</p>
                <button class="btn btn-primary btn-sm w-100">Comprar</button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      carouselContent.appendChild(item);
    }
  })
  .catch(error => {
    console.error("Erro ao carregar os produtos:", error);
  });
