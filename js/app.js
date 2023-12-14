document.querySelector('form').addEventListener("input", (e) => {
    e.preventDefault();
    console.log("Ivestas tekstas");

    let vaisius = document.querySelector('#searchInput').value.trim();

    if (vaisius !== '') {
        fetch(`https://www.fruityvice.com/api/fruit/${vaisius}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);

                if (Array.isArray(data) && data.length > 0) {
                    updateFruitList(data);
                } else if (typeof data === 'object') {
                    updateSingleFruit(data);
                } else {
                    displayErrorMessage("No results found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                displayErrorMessage("Error fetching data. Please try again later.");
            });
    } else {
        // Clear previous results and hide the error message if the input is empty
        clearResults();
    }
});

function updateFruitList(data) {
    let fruitsContainer = document.getElementById('fruits');
    fruitsContainer.innerHTML = "";

    data.forEach((fruit) => {
        let fruitHTML = `
        <div class="col g-3 btn-success">
            <div class="fruit-block">
                <p class="mt-3">Name: ${fruit.name}</p>
                <p>Family: ${fruit.family}</p>
                <p>Nutritions:</p>
                <ul class="d-flex">
                    <li>Protein: ${fruit.nutritions.protein} </li>
                    <li>Fat: ${fruit.nutritions.fat}</li>
                    <li>Carbohydrate: ${fruit.nutritions.carbohydrates}</li>
                </ul>
            </div>
        </div>
        `;
        fruitsContainer.innerHTML += fruitHTML;
    });

    hideErrorMessage();
}

function updateSingleFruit(fruit) {
    let fruitsContainer = document.getElementById('fruits');
    fruitsContainer.innerHTML = "";

    let fruitHTML = `
        <div class="col g-3 btn-success">
            <div class="fruit-block">
                <p class="mt-3">Name: ${fruit.name}</p>
                <p>Family: ${fruit.family}</p>
                <p>Nutritions:</p>
                <ul class="d-flex">
                    <li>Protein: ${fruit.nutritions.protein} </li>
                    <li>Fat: ${fruit.nutritions.fat}</li>
                    <li>Carbohydrate: ${fruit.nutritions.carbohydrates}</li>
                </ul>
            </div>
        </div>
    `;
    fruitsContainer.innerHTML = fruitHTML;

    hideErrorMessage();
}

function displayErrorMessage(message) {
    let errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = "block";
    errorMessage.querySelector('.erroras').textContent = message;
}

function hideErrorMessage() {
    document.querySelector('.error-message').style.display = "none";
}

function clearResults() {
    let fruitsContainer = document.getElementById('fruits');
    fruitsContainer.innerHTML = "";
    hideErrorMessage();
}



//-------------------------------------------------------------------------------------
document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("Paspaustas ieskoti mygtukas");

    fetch(`https://www.fruityvice.com/api/fruit/all`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            let fruitsContainer = document.getElementById('fruits');

            fruitsContainer.innerHTML = ""; // Isvalom

            data.forEach((fruit) => {
                // Atvaizduojam HTML'e
                let fruitHTML = `
                <div class="col g-3 btn-success">
                <div class="fruit-block">
                    <p class="mt-3">Name: ${fruit.name}</p>
                    <p>Family: ${fruit.family}</p>
                    <p>Nutritions:</p>
                    <ul class="d-flex list-unstyled">
                        <li class="me-3">Protein: ${fruit.nutritions.protein} </li>
                        <li class="me-3">Fat: ${fruit.nutritions.fat}</li>
                        <li class="me-3">Carbohydrate: ${fruit.nutritions.carbohydrates}</li>
                    </ul>
                </div>
            </div>
                `;
                // Pridedam i HTML
                fruitsContainer.innerHTML += fruitHTML;
            });
            image.style.display = 'none';
        })
});

// Klaidingai ivesto vaisiaus pranesimas
document.querySelector('.error-message').style.display = "none"

// Paslepti paveiksleli
function nopic() {
    var image = document.getElementById('mainImage');
    image.style.display = 'none';
}
