document.addEventListener('DOMContentLoaded', function () {
    // Load palettes initially
    fetchPalettes('');

    // Add search functionality
    document.getElementById('search-btn').addEventListener('click', function () {
        const query = document.getElementById('search-input').value;
        fetchPalettes(query);
    });
});

function fetchPalettes(query) {
    fetch(`/palettes/?search=${query}`)
        .then(response => response.json())
        .then(data => {
            const palettesDiv = document.querySelector('.palettes');
            palettesDiv.innerHTML = '';  // Clear previous palettes

            data.forEach(palette => {
                const paletteDiv = document.createElement('div');
                paletteDiv.classList.add('palette');

                // Add palette name
                paletteDiv.innerHTML = `<h3>${palette.name}</h3>`;
                const colorsDiv = document.createElement('div');
                colorsDiv.classList.add('colors');

                // Display dominant colors
                palette.dominant_colors.forEach(color => {
                    const colorBox = document.createElement('div');
                    colorBox.classList.add('color-box');
                    colorBox.style.backgroundColor = color.hex;
                    colorsDiv.appendChild(colorBox);
                });

                paletteDiv.appendChild(colorsDiv);
                palettesDiv.appendChild(paletteDiv);
            });
        });
}
