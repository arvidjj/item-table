

const g_interface = [ //UNUSED
    document.getElementById("containerList"), //0
    document.getElementById("divLista"), //1
    document.getElementById("divAgregar"), //2
    document.getElementById("divModificar") //3
];

const g_autos = [];

function showAgregar(){
    document.getElementById("containerList").style.display = "none";
    document.getElementById("divLista").style.display = "none";
    document.getElementById("divModificar").style.display = "none";
    document.getElementById("divAgregar").style.display = "initial";
    document.getElementById("botonMenuAgregar").disabled = true;
}

function showModificar(){
    document.getElementById("containerList").style.display = "none";
    document.getElementById("divLista").style.display = "none";
    document.getElementById("divModificar").style.display = "initial";
    document.getElementById("divAgregar").style.display = "none";
    document.getElementById("botonMenuAgregar").disabled = true;
}

function showList(){
    document.getElementById("containerList").style.display = "block";
    document.getElementById("divLista").style.display = "initial";
    document.getElementById("divAgregar").style.display = "none";
    document.getElementById("divModificar").style.display = "none";
    document.getElementById("botonMenuAgregar").disabled = false;
}

function agregarAuto() {

    const marca = document.getElementById("txtMarca");
    const modelo = document.getElementById("txtModelo");
    const matricula = document.getElementById("txtMatricula");

    let newAuto = new auto(marca.value, modelo.value, matricula.value);

    if (newAuto.isEmpty()) {
        alert("Auto Vacio.");
        return;
    }

    g_autos.push(newAuto);
    console.log(g_autos);

    marca.value = ('');
    modelo.value = ('');
    matricula.value = ('');

    marca.focus();

    alert("Auto con ID: " + newAuto.id + " creado.");

    renderList();
}

function renderList() {  
    const buff = [];

    const table = `<table class="table table-striped">
     <thead >
     <tr>
        <th>ID</th>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Matricula</th>
        <th>Accion</th>
    </tr>
    </thead>   
    <tbody>`;
    buff.push(table);
    for (let i = 0; i < g_autos.length; i++) {
        const tmpAuto = g_autos[i];
        const fila = `<tr>
                    <td>${tmpAuto.id}</td>
                    <td>${tmpAuto.marca}</td>
                    <td>${tmpAuto.modelo}</td>
                    <td>${tmpAuto.matricula}</td>
                    <td>
                        <input type="button" class="btn btn-danger" value="Borrar" onclick="borrarAuto(${tmpAuto.id})" />
                        <input type="button" class="btn btn-info text-white" value="Modificar" onclick="renderModificarAuto(${tmpAuto.id})" />
                    </td>
                </tr>`;
        buff.push(fila);
    }

    buff.push(`</tbody></table>`);

    if (g_autos.length === 0) {
        buff.push('<h3>No hay autos almacenados.</h3>');
    }

    showList();

    document.getElementById('divLista').innerHTML = buff.join('\n');

}

function borrarAuto(autoId) {

    if (confirm("Estas seguro de que desea borrar este auto?")) {

        const pos = getautoIndex(autoId);

        if (pos !== -1) {
            alert("AUTO CON ID: " + autoId + " eliminado con exito!");
            g_autos.splice(pos, 1);
            renderList();
        } else {
            alert("ERROR: No se encontró un auto con el id especificado");
        }
    }
}

function renderModificarAuto(autoId) {

    const autoMod = getautoById(autoId);

    const marcaM = document.getElementById("txtMarcaM");
    const modeloM = document.getElementById("txtModeloM");
    const matriculaM = document.getElementById("txtMatriculaM");

    marcaM.value = autoMod.marca;
    modeloM.value = autoMod.modelo;
    matriculaM.value = autoMod.matricula;

    document.getElementById('divBotonGuardarMod').innerHTML = `<button onclick="modificarAuto(${autoId})" 
    class="btn btn-primary" id="botonGuardarModificacion">
    Guardar Modificacion</button>`;

    showModificar(autoId);

}

function modificarAuto(autoId) {

    const autoMod = getautoById(autoId);

    const newMarca = document.getElementById("txtMarcaM");
    const newModelo = document.getElementById("txtModeloM");
    const newMatricula = document.getElementById("txtMatriculaM");

    autoMod.marca = newMarca.value;
    autoMod.modelo = newModelo.value;
    autoMod.matricula = newMatricula.value;

    renderList();

}

function getautoIndex(id) {
    return g_autos.findIndex(auto => auto.id === id);
}

function getautoById(id) {
    return g_autos.find(auto => auto.id === id);
}
