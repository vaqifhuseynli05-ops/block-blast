document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const imageUpload = document.getElementById('imageUpload');
  let currentImageUrl = '';

  const GRID_SIZE = 8;
  const CELL_SIZE = 50;
  const GAP = 4;

  // 8x8 tor yaradılması
  function createBoard() {
    grid.innerHTML = '';
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;

        // Kliki yoxlamaq üçün test (xanaya vuranda aktivləşir/şəkil görünür)
        cell.addEventListener('click', () => {
          toggleCell(cell, row, col);
        });

        grid.appendChild(cell);
      }
    }
  }

  // Yüklənən şəkli xanalara uyğun bölmək
  imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        currentImageUrl = event.target.result;
        updateGridImages();
      };
      reader.readAsDataURL(file);
    }
  });

  function updateGridImages() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      
      if (currentImageUrl) {
        cell.style.backgroundImage = `url(${currentImageUrl})`;
        // Şəklin müvafiq hissəsini xanaya fiksasiya etmək
        const posX = -(col * (CELL_SIZE + GAP));
        const posY = -(row * (CELL_SIZE + GAP));
        cell.style.backgroundPosition = `${posX}px ${posY}px`;
      }
    });
  }

  function toggleCell(cell, row, col) {
    cell.classList.toggle('active');
    if (!cell.classList.contains('active')) {
      cell.style.opacity = '0.3'; // Gizlədilmiş/doldurulmamış blok
    } else {
      cell.style.opacity = '1';   // Açılmış blok
    }
  }

  createBoard();
});