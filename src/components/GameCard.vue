<template>
  <div class="card">
    <img :src="imagen" :alt="titulo">
    <h3>{{ titulo }}</h3>
    <p><strong>Género:</strong> {{ genero }}</p>
    <button class="btn-detalle" @click="$emit('mostrar-detalle')">Ver detalles</button>
    <button :class="['btn-favorito', { 'es-fav': esFavorito }]" @click="$emit('agregar-favorito')">
      {{ esFavorito ? ' ¡En favoritos!' : 'Favoritos' }}
    </button>
    <button class="btn-carrito" @click="$emit('agregar-carrito')">Agregar al carrito</button>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: ['titulo', 'descripcion', 'genero', 'imagen', 'esFavorito']
}
</script>
<style scoped>
.card { 
  background: white; 
  border-radius: 7px; 
  padding: 15px; 
  width: 280px; 
  text-align: center; 
  font-size: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card img { 
  width: 100%; 
  height: 180px; 
  object-fit: cover; 
  border-radius: 7px;
}

/* Tus botones de colores que se habían vuelto grises */
.btn-detalle { 
  background-color: skyblue; 
  border-radius: 5px;
  border: 1px solid #777;
  padding: 5px 10px;
  cursor: pointer;
  margin: 5px;
}

.btn-carrito { 
  background-color: green; 
  color: white; 
  border-radius: 5px; 
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin: 5px;
}

.btn-favorito { 
  background-color: yellow;
  border-radius: 5px;
  border: 1px solid #777;
  padding: 5px 10px;
  cursor: pointer;
  margin: 5px;
}

.btn-favorito.es-fav {
  background-color: #ff4d4d;
  color: white;
}
</style>