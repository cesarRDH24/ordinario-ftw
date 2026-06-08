function iniciarSesion()
{
    let usuario =
        document
        .getElementById("usuario")
        .value;

    let password =
        document
        .getElementById("password")
        .value;

    fetch("../xml/usuarios.xml")
    .then(response => response.text())
    .then(data => {

        let parser =
            new DOMParser();

        let xml =
            parser.parseFromString(
                data,
                "text/xml"
            );

        let usuarios =
            xml.getElementsByTagName(
                "usuario"
            );

        let acceso = false;

        for(let u of usuarios)
        {
            let nombre =
                u
                .getElementsByTagName("nombre")[0]
                .textContent;

            let clave =
                u
                .getElementsByTagName("password")[0]
                .textContent;

            if(
                usuario === nombre &&
                password === clave
            )
            {
                acceso = true;
            }
        }

        let mensaje =
            document.getElementById(
                "mensaje"
            );

        if(acceso)
        {
            mensaje.innerHTML =
                "Bienvenido a MusicHub";
        }
        else
        {
            mensaje.innerHTML =
                "Usuario o contraseña incorrectos";
        }

    });
}