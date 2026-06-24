<template>
  <div class="detalle">
    <h2>{{ titulo }}</h2>
    <p><strong>Género:</strong> {{ genero }}</p>
    <p><strong>Descripción:</strong> {{ descripcion }}</p>
    <button class="btn-cerrar" @click="$emit('cerrar')">Cerrar</button>
  </div>
</template>

<script>
export default {
  name: 'GameDetail',
  // Recibe la información del juego desde el padre mediante props
  props: {
    titulo: String,
    genero: String,
    descripcion: String
  }
}
</script>