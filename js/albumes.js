let todosLosAlbumes = [];

fetch("../xml/albumes.xml")
.then(response => response.text())
.then(data => {

    let parser = new DOMParser();

    let xml =
        parser.parseFromString(
            data,
            "text/xml"
        );

    let albumes =
        xml.getElementsByTagName(
            "album"
        );

    for(let album of albumes)
    {
        todosLosAlbumes.push({

            titulo:
                album
                .getElementsByTagName("titulo")[0]
                .textContent,

            artista:
                album
                .getElementsByTagName("artista")[0]
                .textContent,

            anio:
                album
                .getElementsByTagName("anio")[0]
                .textContent,

            calificacion:
                album
                .getElementsByTagName("calificacion")[0]
                .textContent,

            imagen:
                album
                .getElementsByTagName("imagen")[0]
                .textContent,

            descripcion:
                album
                .getElementsByTagName("descripcion")[0]
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

    lista.forEach(album => {

        let fila =
            document.createElement(
                "tr"
            );

        fila.innerHTML = `
            <td>${album.titulo}</td>
            <td>${album.artista}</td>
            <td>${album.anio}</td>
            <td>⭐ ${album.calificacion}</td>
        `;

        fila.addEventListener(
            "click",
            function()
            {
                mostrarInfoAlbum(
                    album
                );
            }
        );

        tabla.appendChild(
            fila
        );

    });
}

function mostrarInfoAlbum(album)
{
    let info =
        document.getElementById(
            "infoAlbum"
        );

    info.innerHTML = `

        <img
            src="../img/${album.imagen}"
            alt="${album.titulo}"
            class="foto-artista">

        <h3>
            💿 ${album.titulo}
        </h3>

        <p>
            <strong>Artista:</strong>
            ${album.artista}
        </p>

        <p>
            <strong>Año:</strong>
            ${album.anio}
        </p>

        <p>
            <strong>Calificación:</strong>
            ⭐ ${album.calificacion}
        </p>

        <p>
            ${album.descripcion}
        </p>

    `;
}