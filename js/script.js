let db = new Localbase('pruebas');

db.collection('usuarios');

function agregar() {
    var id = $('#id').val().trim();
    var nombre = $('#nombre').val().trim();
    var apellidos = $('#apellidos').val().trim();
    var usuario = $('#usuario').val().startsWith('@') ? $('#usuario').val().trim() : '@' + $('#usuario').val().trim();
    var nuevo = {
        id: Date.now().toString()
        , nombre
        , apellidos
        , usuario
    };
    if (id !== '') {
        nuevo.id = id;
        db.collection('usuarios').doc({ id }).set(nuevo).then(() => {
            $('#boton').text('Crear Usuario');
            $('#id').val('');
            $('#frmUsuario').trigger('reset');
            renderizar();
        });
    }
    else {
        db.collection('usuarios').add(nuevo).then(() => {
            $('#frmUsuario').trigger('reset');
            renderizar();
        });
    }

}

function editar(id, nombre, apellidos, usuario) {
    $('#id').val(id);
    $('#nombre').val(nombre);
    $('#apellidos').val(apellidos);
    $('#usuario').val(usuario);
    $('#boton').text('Editar Usuario');
}

function eliminar(id) {
    db.collection('usuarios').doc({ id }).delete().then(() => renderizar());
}

function renderizar() {
    $('#tabla').empty();
    db.collection('usuarios').get().then(usuarios => {
        if (usuarios.length <= 0)
            return;
        usuarios.forEach(usuario => {
            var html = `<tr>
                <th scope="row">${usuario.id}</th>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellidos}</td>
                <td>${usuario.usuario}</td>
                <td>
                    <span class="oi oi-pencil mx-2" onclick="editar('${usuario.id}','${usuario.nombre}','${usuario.apellidos}','${usuario.usuario}')" aria-hidden="true"></span>
                    <span class="oi oi-trash mx-2" onclick="eliminar('${usuario.id}')" aria-hidden="true"></span>
                </td>
            </tr>`;
            $('#tabla').append(html);
        });
    });
}

renderizar();