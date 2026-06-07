let todosLosGeneros = [];

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

    let generosUnicos = [];

    for(let artista of artistas)
    {
        let genero =
            artista
            .getElementsByTagName("genero")[0]
            .textContent;

        if(!generosUnicos.includes(genero))
        {
            generosUnicos.push(genero);

            todosLosGeneros.push({
                genero: genero
            });
        }
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

    for(let genero of lista)
    {
        tabla.innerHTML += `
            <tr>
                <td>${genero.genero}</td>
            </tr>
        `;
    }
}

document
.getElementById("busquedaGenero")
.addEventListener("keyup", function()
{
    let texto =
        this.value.toLowerCase();

    let filtrados =
        todosLosGeneros.filter(
            genero =>
                genero.genero
                .toLowerCase()
                .includes(texto)
        );

    mostrarGeneros(
        filtrados
    );
});