function fetchData() {
    const departamento = document.getElementById('departamento').value;
    const url = `https://censopoblacion.azurewebsites.net/API/indicadores/2/${departamento}`;
    
    fetch(url)
    .then(response => response.json())  // Cambiado a .json() para obtener los datos como JSON directamente
    .then(datajson => {
        var data = JSON.parse(datajson);  // Convertir los datos JSON a un objeto de JavaScript
        console.log("Datos convertidos a JSON:", data);
        displayResults(data);  // Muestra los datos JSON en la interfaz
    })
    .catch(error => console.error('Error fetching data: ', error));
}

function displayResults(data) {
    const resultsDiv = document.getElementById('resultados');
    resultsDiv.innerHTML = `
        <div class="card mb-3">
            <div class="card-header bg-dark text-white">
                Datos del Departamento: ${data.nombre}
            </div>
            <div class="card-body">
                <h5 class="card-title">Información General</h5>
                <p class="card-text"><strong>Capital:</strong> ${data.capital}</p>
                <p class="card-text"><strong>Extensión Territorial:</strong> ${data.ext_territorial} km²</p>
                <p class="card-text"><strong>Población Total:</strong> ${data.pob_total}</p>
            </div>
        </div>

        ${createDataSection('Índices y Promedios', [
            { label: 'Índice de Masculinidad', value: data.indice_masculinidad },
            { label: 'Promedio de Hijos por Mujer', value: data.prom_hijos_mujer },
            { label: 'Edad Promedio', value: data.edad_promedio }
        ])}
        ${createDataSection('Población por Sexo', [
            { label: 'Hombres', value: formatPercentage(data.total_sexo_hombre, data.pob_total) },
            { label: 'Mujeres', value: formatPercentage(data.total_sexo_mujeres, data.pob_total) }
        ])}
        ${createDataSection('Población por Grupos de Edad', [
            { label: '0-14 años', value: formatPercentage(data.pob_edad_014, data.pob_total) },
            { label: '15-64 años', value: formatPercentage(data.pob_edad_1564, data.pob_total) },
            { label: '65+ años', value: formatPercentage(data.pob_edad_65, data.pob_total) }
        ])}
        ${createDataSection('Población por Área', [
            { label: 'Urbana', value: formatPercentage(data.total_sector_urbano, data.pob_total) },
            { label: 'Rural', value: formatPercentage(data.total_sector_rural, data.pob_total) }
        ])}
        ${createDataSection('Población por Pueblos', [
            { label: 'Maya', value: formatPercentage(data.pob_pueblo_maya, data.pob_total) },
            { label: 'Garífuna', value: formatPercentage(data.pob_pueblo_garifuna, data.pob_total) },
            { label: 'Xinca', value: formatPercentage(data.pob_pueblo_xinca, data.pob_total) },
            { label: 'Afrodescendiente/Otros', value: formatPercentage(data.pob_pueblo_afrodescendiente, data.pob_total) },
            { label: 'Ladino', value: formatPercentage(data.pob_pueblo_ladino, data.pob_total) },
            { label: 'Extranjero', value: formatPercentage(data.pob_pueblo_extranjero, data.pob_total) }
        ])}
    `;
}

function createDataSection(title, dataItems) {
    return `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                ${dataItems.map(item => `<p class="card-text"><strong>${item.label}:</strong> ${item.value}</p>`).join('')}
            </div>
        </div>
    `;
}

function formatPercentage(value, total) {
    return `${(value / total * 100).toFixed(2)}%`;
}

