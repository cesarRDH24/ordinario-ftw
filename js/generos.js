let todosLosGeneros = [];

fetch("../xml/generos.xml")
.then(response => response.text())
.then(data => {

    let parser = new DOMParser();

    let xml = parser.parseFromString(
        data,
        "text/xml"
    );

    let generos =
        xml.getElementsByTagName(
            "genero"
        );

    for(let genero of generos)
    {
        todosLosGeneros.push({

            nombre:
                genero
                .getElementsByTagName("nombre")[0]
                .textContent,

            origen:
                genero
                .getElementsByTagName("origen")[0]
                .textContent,

            anio:
                genero
                .getElementsByTagName("anio_aprox")[0]
                .textContent,

            representantes:
                genero
                .getElementsByTagName("representantes")[0]
                .textContent,

            instrumento:
                genero
                .getElementsByTagName("instrumento_principal")[0]
                .textContent,

            descripcion:
                genero
                .getElementsByTagName("descripcion")[0]
                .textContent,

            imagen:
                genero
                .getElementsByTagName("imagen")[0]
                .textContent

        });
    }

    mostrarGeneros(
        todosLosGeneros
    );

});

function mostrarGeneros(lista)
{
    let tabla =
        document.getElementById(
            "tablaGeneros"
        );

    tabla.innerHTML = "";

    lista.forEach(genero => {

        let fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>${genero.nombre}</td>
        `;

        fila.addEventListener(
            "click",
            function()
            {
                mostrarInfoGenero(
                    genero
                );
            }
        );

        tabla.appendChild(
            fila
        );

    });
}

function mostrarInfoGenero(genero)
{
    let info =
        document.getElementById(
            "infoGenero"
        );

    info.innerHTML = `

        <img
            src="../img/${genero.imagen}"
            alt="${genero.nombre}"
            class="foto-artista">

        <h3>
            🎵 ${genero.nombre}
        </h3>

        <p>
            <strong>Origen:</strong>
            ${genero.origen}
        </p>

        <p>
            <strong>Año aproximado:</strong>
            ${genero.anio}
        </p>

        <p>
            <strong>Representantes:</strong>
            ${genero.representantes}
        </p>

        <p>
            <strong>Instrumento principal:</strong>
            ${genero.instrumento}
        </p>

        <p>
            ${genero.descripcion}
        </p>

    `;
}

document
.getElementById("busquedaGenero")
.addEventListener(
    "keyup",
    function()
    {
        let texto =
            this.value.toLowerCase();

        let filtrados =
            todosLosGeneros.filter(
                genero =>
                    genero.nombre
                    .toLowerCase()
                    .includes(texto)
            );

        mostrarGeneros(
            filtrados
        );
    }
);