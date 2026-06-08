let todosLosArtistas = [];

fetch("../xml/artistas.xml")
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
                .textContent,

            calificacion:
                artista
                .getElementsByTagName("calificacion")[0]
                .textContent,

            
            

            descripcion:
                artista
                .getElementsByTagName("descripcion")[0]
                .textContent,


            imagen:
                artista
                .getElementsByTagName("imagen")[0]
                .textContent,

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

    lista.forEach(artista => {

        let fila =
            document.createElement("tr");

        fila.innerHTML = `

            <td>${artista.nombre}</td>
            <td>${artista.pais}</td>
            <td>${artista.genero}</td>
            <td>⭐ ${artista.calificacion}</td>

        `;

        fila.addEventListener(
            "click",
            function()
            {
                mostrarInfoArtista(
                    artista
                );
            }
        );

        tabla.appendChild(
            fila
        );

    });
}

function mostrarInfoArtista(artista)
{
    let info =
        document.getElementById(
            "infoArtista"
        );

    info.innerHTML = `

        <img
            src="../img/${artista.imagen}"
            alt="${artista.nombre}"
            class="foto-artista">

        <h3>
            🎤 ${artista.nombre}
        </h3>

        <p>
            <strong>País:</strong>
            ${artista.pais}
        </p>

        <p>
            <strong>Género:</strong>
            ${artista.genero}
        </p>

        <p>
            <strong>Calificación:</strong>
            ⭐ ${artista.calificacion}
        </p>

        <p>
            ${artista.descripcion}
        </p>

    `;
}

function aplicarFiltro()
{
    let nombre =
        document
        .getElementById("busqueda")
        .value
        .toLowerCase();

    let genero =
        document
        .getElementById("filtroGenero")
        .value
        .toLowerCase();

    let pais =
        document
        .getElementById("filtroPais")
        .value
        .toLowerCase();

    let filtrados =
        todosLosArtistas.filter(
            artista =>

            artista.nombre
            .toLowerCase()
            .includes(nombre)

            &&

            artista.genero
            .toLowerCase()
            .includes(genero)

            &&

            artista.pais
            .toLowerCase()
            .includes(pais)
        );

    mostrarArtistas(
        filtrados
    );
}

let busqueda =
    document.getElementById("busqueda");

let filtroGenero =
    document.getElementById("filtroGenero");

let filtroPais =
    document.getElementById("filtroPais");

if(busqueda)
{
    busqueda.addEventListener(
        "keyup",
        aplicarFiltro
    );
}

if(filtroGenero)
{
    filtroGenero.addEventListener(
        "keyup",
        aplicarFiltro
    );
}

if(filtroPais)
{
    filtroPais.addEventListener(
        "keyup",
        aplicarFiltro
    );
}