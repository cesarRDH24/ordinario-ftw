fetch("../xml/albumes.xml")
.then(response => response.text())
.then(data => {

    let parser =
        new DOMParser();

    let xml =
        parser.parseFromString(
            data,
            "text/xml"
        );

    let albumes =
        Array.from(
            xml.getElementsByTagName(
                "album"
            )
        );

    albumes.sort((a,b)=>{

        return parseFloat(
            b.getElementsByTagName(
                "calificacion"
            )[0].textContent
        )

        -

        parseFloat(
            a.getElementsByTagName(
                "calificacion"
            )[0].textContent
        );

    });

    let tabla =
        document.getElementById(
            "tablaTop"
        );

    albumes.forEach(
        (album,index)=>{

        tabla.innerHTML += `

        <tr>

            <td>
                ${index+1}
            </td>

            <td>
                ${album.getElementsByTagName("titulo")[0].textContent}
            </td>

            <td>
                ⭐ ${album.getElementsByTagName("calificacion")[0].textContent}
            </td>

        </tr>

        `;

    });

});