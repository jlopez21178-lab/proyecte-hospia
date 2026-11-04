// function para cargar json
async function loadJson(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(response.status);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// containers de los carruseles
const placesCarrusel = document.getElementById("carrusel-places");
const spainCarrusel = document.getElementById("carrusel-spain");

async function initCarrusel() {
  const placesJson = await Promise.all([loadJson("/places.json")]);
  const spainJson = await Promise.all([loadJson("/spain.json")]);

  // devuelve un array con un array con los objetos, por lo que solo cojemos la posicion 0 que es el que contiene los lugares
  placesJson[0].forEach((place) => {
    const div = document.createElement("div");
    div.style.background = `url(${place.img})`;
    div.innerHTML = `<p>${place.city}</p>`;
    placesCarrusel.append(div);
  });

  spainJson[0].forEach((place) => {
    const div = document.createElement("div");
    div.classList = "container";

    div.innerHTML = `
        <img src=${place.img}></img>
        <div>
          <h2>${place.ciudad}</h2>
          <h3>${place.provincia}</h3>
        </div>
        <div class="interes">
          <h3>QUÉ HAY DE INTERÉS</h3>
          <p>${place.interes}</p>
        </div>
        <div class="historico">
          <h3>DATOS HISTORICOS</h3>
          <p>${place.historico}</p>
        </div>
    `;
    spainCarrusel.append(div);
  });
}

initCarrusel();
