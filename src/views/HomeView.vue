<template>
  <div>
    <div class="nav-bar">
      <h1>Catálogo de Videojuegos</h1>    
      <router-link to="/carrito" class="btn-nav">🛒 Ir al Carrito ({{ carrito.length }})</router-link>
    </div>

    <div class="catalogo">
      <GameCard 
        v-for="(juego, index) in juegos" 
        :key="index"
        :titulo="juego.titulo"
        :descripcion="juego.descripcion"
        :genero="juego.genero"
        :imagen="juego.imagen"
        :es-favorito="favoritos.some(fav => fav.titulo === juego.titulo)"
        @mostrar-detalle="mostrarDetalle(juego)"
        @agregar-carrito="AgregarAlCarrito(juego)"
        @agregar-favorito="agregarFavorito(juego)"
      />
    </div>

    <GameDetail 
      v-if="juegoSeleccionado"
      :titulo="juegoSeleccionado.titulo"
      :genero="juegoSeleccionado.genero"
      :descripcion="juegoSeleccionado.descripcion"
      @cerrar="cerrarDetalle"
    />
  </div>
</template>

<script>
import GameCard from '../components/GameCard.vue'
import GameDetail from '../components/GameDetail.vue'

export default {
  name: 'HomeView',
  components: {
    GameCard,
    GameDetail
  },
  data() {
    return {
      juegos: [   
        { titulo: 'Battlefield 6', descripcion: 'Shooter en primera persona', genero: 'Accion, disparos', imagen: 'imagenes/battlefield6.jpg' },   
        { titulo: 'Fifa 26', descripcion: 'Football', genero: 'Deporte', imagen: 'imagenes/fifa26.jpg' },   
        { titulo: 'God of war', descripcion: 'Mundo abierto', genero: 'Accion, Aventura', imagen: 'imagenes/god of war.jpg' },   
        { titulo: 'Ghost of tsushima', descripcion: 'Mundo abierto', genero: 'Accion, aventura', imagen: 'imagenes/got.jpg' },   
        { titulo: 'MW 2', descripcion: 'Shooter en primera persona', genero: 'Accion, disparos', imagen: 'imagenes/m2w.jpg' },   
        { titulo: 'the last of us', descripcion: 'Mundo abierto', genero: 'Aventura, accion, suspenso', imagen: 'imagenes/the last of us.jpg' }     
      ],   
      carrito: [],   
      favoritos: [],  
      juegoSeleccionado: null 
    }
  },
  mounted() {  
    this.cargarLocalStorage();
  },
  methods: {  
    cargarLocalStorage() {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) this.carrito = JSON.parse(carritoGuardado);  
      
      const favoritosGuardados = localStorage.getItem('favoritos');
      if (favoritosGuardados) this.favoritos = JSON.parse(favoritosGuardados);  
    },
    mostrarDetalle(juego) {   
      this.juegoSeleccionado = juego;
    },  
    cerrarDetalle() {   
      this.juegoSeleccionado = null;  
    },  
    AgregarAlCarrito(juego) {   
      this.carrito.push(juego);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));   
    }, 
    agregarFavorito(juego) {   
      const index = this.favoritos.findIndex(fav => fav.titulo === juego.titulo);
      if (index === -1) {    
        this.favoritos.push(juego);
      } else {    
        this.favoritos.splice(index, 1);
      }   
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.btn-nav {
  background: black;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
}
.catalogo { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 20px;
  justify-content: center; 
}
</style>