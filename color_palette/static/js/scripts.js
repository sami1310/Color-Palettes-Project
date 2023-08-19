document.addEventListener('DOMContentLoaded', function () {
    // Load palettes initially
    fetchPalettes('');

    // Add search functionality
    document.getElementById('search-btn').addEventListener('click', function () {
        let query = document.getElementById('search-input').value;


        fetch(`/palettes/?search=${query}`)
            .then(response => response.json())
            .then(data => {
                // Clear existing palettes
                let palettesDiv = document.querySelector('.palettes');
                palettesDiv.innerHTML = '';


                // Populate palettes with the received data
                data.forEach(palette => {
                    let paletteDiv = document.createElement('div');
                    paletteDiv.classList.add('palette');


                    let paletteName = document.createElement('h3');
                    paletteName.textContent = palette.name;
                    paletteDiv.appendChild(paletteName);


                    let colorsDiv = document.createElement('div');
                    colorsDiv.classList.add('colors');
                    palette.dominant_colors.forEach(color => {
                        let colorBox = document.createElement('div');
                        colorBox.classList.add('color-box');
                        colorBox.style.backgroundColor = color.hex;
                        colorsDiv.appendChild(colorBox);
                    });


                    paletteDiv.appendChild(colorsDiv);
                    palettesDiv.appendChild(paletteDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching palettes:', error);
            });
    });


    document.getElementById('show-login-btn').addEventListener('click', function () {
        const loginForm = document.getElementById('login-form');
        loginForm.style.display = (loginForm.style.display === 'none' || loginForm.style.display === '') ? 'block' : 'none';
    });
    document.getElementById('login-btn').addEventListener('click', function () {
        // Extract login form data - Placeholder
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // POST request to authenticate the user
        fetch('/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem('authToken', data.token);

                    // Display a successful login message
                    alert('Login successful!');

                    // Hide the login form
                    document.getElementById('login-form').style.display = 'none';

                    // Show palette creation form
                    showPaletteCreationForm();
                } else {
                    alert('Login failed! Please check your credentials and try again.');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error.message);
            });
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function showPaletteCreationForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" id="palette-name" placeholder="Palette Name">
        <input type="text" id="dominant-colors" placeholder="Dominant Colors (comma-separated)">
        <input type="text" id="accent-colors" placeholder="Accent Colors (comma-separated)">
        <button type="submit">Create Palette</button>
    `;

    document.body.appendChild(form);
}

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
