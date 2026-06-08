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

    let tabla =
        document.getElementById(
            "tablaCanciones"
        );

    for(let cancion of canciones)
    {
        tabla.innerHTML += `

        <tr>

            <td>
                ${cancion.getElementsByTagName("titulo")[0].textContent}
            </td>

            <td>
                ${cancion.getElementsByTagName("artista")[0].textContent}
            </td>

            <td>
                ${cancion.getElementsByTagName("duracion")[0].textContent}
            </td>

        </tr>

        `;
    }

});