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

// declarar nombre variables json

async function initCarrusel() {
  const placesJson = await Promise.all([loadJson("/destinos.json")]);

  // devuelve un array con un array con los objetos, por lo que solo cojemos la posicion 0 que es el que contiene los lugares
  placesJson[0].forEach((place) => {
    const div = document.createElement("div");
    div.style.background = `url(${place.image})`;
    div.innerHTML = `<p>${place.city}</p>`;
    placesCarrusel.append(div);
  });
}

initCarrusel();
