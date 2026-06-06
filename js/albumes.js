let todosLosAlbumes = [];

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
        todosLosAlbumes.push({

            album:
                artista
                .getElementsByTagName("album")[0]
                .textContent,

            nombre:
                artista
                .getElementsByTagName("nombre")[0]
                .textContent

        });
    }

    mostrarAlbumes(
        todosLosAlbumes
    );

});

function mostrarAlbumes(lista)
{
    let tabla =
        document.getElementById(
            "tablaAlbumes"
        );

    tabla.innerHTML = "";

    for(let album of lista)
    {
        tabla.innerHTML += `
            <tr>
                <td>${album.album}</td>
                <td>${album.nombre}</td>
            </tr>
        `;
    }
}

document
.getElementById("busquedaAlbum")
.addEventListener("keyup", function()
{
    let texto =
        this.value.toLowerCase();

    let filtrados =
        todosLosAlbumes.filter(
            album =>
                album.album
                .toLowerCase()
                .includes(texto)
        );

    mostrarAlbumes(
        filtrados
    );
});