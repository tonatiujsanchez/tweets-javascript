// Variables

const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
 
let tweets = []
const storageKey = 'tweets-1649012502210'

// Event Listaners

eventListeners()
function eventListeners() {

    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse( localStorage.getItem( storageKey ) ) || []
        crearHTML()
    })

    formulario.addEventListener('submit', agregarTweet)
}

// Funciones
function agregarTweet(e){
    e.preventDefault()
    const tweet = document.querySelector('#tweet').value.trim()
    
    if( tweet === '' ){
        mostrarError('No es posible agregar tweets vacios')
        return
    }

    const nuevoTweet = {
        id: Date.now(),
        texto: tweet
    }

    tweets = [ ...tweets, nuevoTweet ]

    crearHTML()

    formulario.reset()
}

function mostrarError( msgError ){

    const mensajeError = document.createElement('p')
        mensajeError.textContent = msgError
        mensajeError.classList.add('error')
    
        const contenido = document.querySelector('#contenido')
        contenido.appendChild( mensajeError )

        setTimeout(() => {
            mensajeError.remove()
        }, 1000);
}


function crearHTML(){
    
    limpiarHTML()
    if( tweets.length === 0 ) return

    tweets.forEach( tweet =>{

        const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent = 'X'
            btnEliminar.onclick = ()=> eliminarTweet( tweet.id )

        const li = document.createElement('li')
            li.textContent = tweet.texto
            li.appendChild( btnEliminar )

            listaTweets.appendChild( li )

    })

    actualizarStorage()
}

function eliminarTweet(idTweet) {
     tweets = tweets.filter( tweet => tweet.id !== idTweet )
     crearHTML()
     actualizarStorage()   
}

function actualizarStorage(){
    localStorage.setItem(storageKey, JSON.stringify(tweets))
}

function limpiarHTML() {
    while ( listaTweets.firstChild ) {
        listaTweets.removeChild( listaTweets.firstChild )
    }
}

