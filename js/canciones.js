let todasLasCanciones = [];

fetch("../xml/musica.xml")
.then(response => response.text())
.then(data => {

    let parser = new DOMParser();

    let xml = parser.parseFromString(
        data,
        "text/xml"
    );

    let artistas =
        xml.getElementsByTagName("artista");

    for(let artista of artistas)
    {
        todasLasCanciones.push({

            cancion:
                artista
                .getElementsByTagName("cancion")[0]
                .textContent,

            nombre:
                artista
                .getElementsByTagName("nombre")[0]
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

    for(let cancion of lista)
    {
        tabla.innerHTML += `
            <tr>
                <td>${cancion.cancion}</td>
                <td>${cancion.nombre}</td>
            </tr>
        `;
    }
}

document
.getElementById("busquedaCancion")
.addEventListener("keyup", function()
{
    let texto =
        this.value.toLowerCase();

    let filtradas =
        todasLasCanciones.filter(
            cancion =>
                cancion.cancion
                .toLowerCase()
                .includes(texto)
        );

    mostrarCanciones(
        filtradas
    );
});