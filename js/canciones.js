let todasLasCanciones = [];

fetch("../xml/canciones.xml")
.then(response => response.text())
.then(data => {

    let parser =
        new DOMParser();

    let xml =
        parser.parseFromString(
            data,
            "text/xml"
        );

    let canciones =
        xml.getElementsByTagName(
            "cancion"
        );

    for(let cancion of canciones)
    {
        todasLasCanciones.push({

            titulo:
                cancion
                .getElementsByTagName("titulo")[0]
                .textContent,

            artista:
                cancion
                .getElementsByTagName("artista")[0]
                .textContent,

            duracion:
                cancion
                .getElementsByTagName("duracion")[0]
                .textContent

        });
    }

    mostrarCanciones(
        todasLasCanciones
    );

});

function mostrarCanciones(lista)
{
    let tabla =
        document.getElementById(
            "tablaCanciones"
        );

    tabla.innerHTML = "";

    lista.forEach(cancion => {

        tabla.innerHTML += `

        <tr>

            <td>${cancion.titulo}</td>

            <td>${cancion.artista}</td>

            <td>${cancion.duracion}</td>

        </tr>

        `;

    });
}

function filtrarCanciones()
{
    let texto =
        document
        .getElementById("busquedaCancion")
        .value
        .toLowerCase();

    let filtradas =
        todasLasCanciones.filter(
            cancion =>

            cancion.titulo
            .toLowerCase()
            .includes(texto)

            ||

            cancion.artista
            .toLowerCase()
            .includes(texto)
        );

    mostrarCanciones(
        filtradas
    );
}

document
.getElementById("busquedaCancion")
.addEventListener(
    "keyup",
    filtrarCanciones
);