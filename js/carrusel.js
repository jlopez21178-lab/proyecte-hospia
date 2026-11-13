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

initCarrusel();

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

carruselFunctions(placesCarrusel);
carruselFunctions(spainCarrusel);

function carruselFunctions(carrusel) {
  let presionado = false;
  let inicioX;
  let scrollIzquierda;

  let velocidad = 0;
  let ultimoX = 0;
  let animacionId;

  // raton clica en el carrusel
  carrusel.addEventListener("mousedown", (e) => {
    presionado = true;
    carrusel.classList.add("seleccionado");

    // guardar la posicion inicial del click respecto al contenedor
    inicioX = e.pageX - carrusel.offsetLeft;
    // guardamos cuando scroll tenia ya el carrusel
    scrollIzquierda = carrusel.scrollLeft;
    ultimoX = e.pageX;

    // detener el deslizamiento previo por inercia
    cancelAnimationFrame(animacionId);
    velocidad = 0;
  });

  const soltarRaton = () => {
    if (!presionado) return;
    presionado = false;
    carrusel.classList.remove("seleccionado");
    aplicarInercia();
  };

  // funcion de desaceleracion
  function aplicarInercia() {
    // si la velocidad es casi 0 se detiene la animacion
    if (Math.abs(velocidad) < 0.5) return;

    // movemos el scroll segun la velocidad
    carrusel.scrollLeft -= velocidad;

    // aplicamos la friccion (reduce en un 5% la velocidad en cada fotograma);
    velocidad *= 0.95;

    // repetimos hasta que se detiene
    animacionId = requestAnimationFrame(aplicarInercia);
  }

  // raton deja de clicar en el carrusel
  carrusel.addEventListener("mouseup", soltarRaton);
  // raton abandona el carrusel
  carrusel.addEventListener("mouseleave", soltarRaton);

  // raton arrastra  el carrusel
  carrusel.addEventListener("mousemove", (e) => {
    if (!presionado) return;

    e.preventDefault();

    const x = e.pageX;
    const desplazamiento = (x - inicioX) * 1.2;

    // calcular que tan rapido se mueve el raton
    velocidad = e.pageX - ultimoX;
    ultimoX = e.pageX;

    // mover el carrusel en direccion opuesta al arrastre
    carrusel.scrollLeft = scrollIzquierda - desplazamiento;
  });
}
