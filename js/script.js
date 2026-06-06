let todosLosArtistas = [];

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
        todosLosArtistas.push({

            nombre:
                artista
                .getElementsByTagName("nombre")[0]
                .textContent,

            pais:
                artista
                .getElementsByTagName("pais")[0]
                .textContent,

            genero:
                artista
                .getElementsByTagName("genero")[0]
                .textContent

        });
    }

    mostrarArtistas(
        todosLosArtistas
    );

});

function mostrarArtistas(lista)
{
    let tabla =
        document.getElementById(
            "tablaArtistas"
        );

    tabla.innerHTML = "";

    for(let artista of lista)
    {
        tabla.innerHTML += `
            <tr>
                <td>${artista.nombre}</td>
                <td>${artista.pais}</td>
                <td>${artista.genero}</td>
            </tr>
        `;
    }
}

document
.getElementById("busqueda")
.addEventListener("keyup", function()
{
    let texto =
        this.value.toLowerCase();

    let filtrados =
        todosLosArtistas.filter(
            artista =>
                artista.nombre
                .toLowerCase()
                .includes(texto)
        );

    mostrarArtistas(
        filtrados
    );
});