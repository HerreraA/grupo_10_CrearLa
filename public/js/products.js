if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}

else{
    ready()
}

async function fetchApi(url, configuracion){
    try {
        const res = await fetch(url, configuracion)
        const data = await res.json()
        return data
    }

    catch{
        return{error: "Hubo un error"}
    }
}

async function ready(){
    const categorias = await fetchApi('/api/categorias/list', {
        method: 'GET',
        headers: {
            Accept: 'aplication/json', 'Content-Type':'aplication/json'
        }
    })

displayProds(categorias.categorias)
}

function displayProds(categorias){
    console.log(categorias);
    let container = document.getElementById('containerCat')
        container.innerHTML = `` 
        for (let i=0; i<categorias.length; i++){
            container.innerHTML += `
            <div class="bodyDetalle0">
            <div class="cardProducto">
                <div class="imgDetalle">
                    <img src="/images/categorias/${categorias[i].foto }" alt="${categorias[i].nombre}"/>
                </div>
                <div class="detailsProducto">
                    <div class="titleProducto">
                    <h2>
                        ${categorias[i].nombre} 
                    <br>
                    <small>
                        ${categorias[i].descripcion} 
                    </small>
                    </h2>
                </div>
                <button class="box-servicio-button0">
                        <a href="/categories/detail/${categorias[i].id}">Ver detalles</a>
                </button>
            </div>
        </div>  
            `    
        }
}


/*<% for (let i=0 ; i < categorias.length; i++ ) { %>
    <div class="bodyDetalle0">
        <div class="cardProducto">
            <div class="imgDetalle">
                <img src="/images/categorias/<%=categorias[i].foto %>" alt="<%=categorias[i].nombre %>"/>
            </div>
            <div class="detailsProducto">
                <div class="titleProducto">
                <h2>
                    <%= categorias[i].nombre %>
                <br>
                <small>
                    <%= categorias[i].descripcion %>
                </small>
                </h2>
            </div>
            <button class="box-servicio-button0">
                    <a href="/categories/detail/<%= categorias[i].id %>">Ver detalles</a>
            </button>
        </div>
    </div>  
<% }%>*/