<template>
  <div class="carrito-page">
    <div class="nav-bar">
      <router-link to="/" class="btn-nav">⬅ Volver al Catálogo</router-link>
      <h1>Tu Carrito y Favoritos</h1>
    </div>

    <div class="seccion-listas">


    <div v-if="carrito.length > 0" class="formulario-compra">
      <h2>Finalizar Pedido</h2>
      <form @submit.prevent="procesarCompra">
        <div class="campo">
          <label>Nombre Completo:</label>
          <input type="text" v-model="form.nombre" placeholder="Juan Pérez">
        </div>
        
        <div class="campo">
          <label>Correo Electrónico:</label>
          <input type="email" v-model="form.email" placeholder="juan@email.com">
        </div>

        <div v-if="errores.length > 0" class="alert-error">
          <ul>
            <li v-for="(error, index) in errores" :key="index">{{ error }}</li>
          </ul>
        </div>

        <button type="submit" class="btn-finalizar">Confirmar Compra </button>
      </form>
    </div>


      <div class="columna">
        <h2>Productos en el Carrito ({{ carrito.length }})</h2>
        <div v-if="carrito.length === 0" class="vacio-msg">El carrito está vacío.</div>
        <ul class="lista-items">
          <li v-for="(item, index) in carrito" :key="'cart-' + index" class="item-linea">
            <span><strong>{{ item.titulo }}</strong> - {{ item.genero }}</span>
            <button @click="eliminarDelCarrito(index)" class="btn-eliminar">Eliminar</button>
          </li>
        </ul>
      </div>

      <div class="columna">
        <h2>Tus Favoritos ({{ favoritos.length }})</h2>
        <div v-if="favoritos.length === 0" class="vacio-msg">No tenés juegos favoritos guardados.</div>
        <ul class="lista-items">
          <li v-for="(item, index) in favoritos" :key="'fav-' + index" class="item-linea">
            <span><strong>{{ item.titulo }}</strong></span>
            <button @click="eliminarDeFavoritos(index)" class="btn-eliminar">Quitar</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarritoView',
  data() {
    return {
      carrito: [],
      favoritos: [],
      form:{
        nombre: '',
        email: ''
      },
      errores:[]
    }
  },
  mounted() {
    this.cargarDatos();
  },
  methods: {
    cargarDatos() {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) this.carrito = JSON.parse(carritoGuardado);

      const favoritosGuardados = localStorage.getItem('favoritos');
      if (favoritosGuardados) this.favoritos = JSON.parse(favoritosGuardados);
    },
    eliminarDelCarrito(index) {
      this.carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    },
    eliminarDeFavoritos(index) {
      this.favoritos.splice(index, 1);
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    },
    procesarCompra() {
      this.errores = []; // Limpiamos errores anteriores

      // 1. Validación: Nombre obligatorio y largo suficiente
      if (!this.form.nombre.trim()) {
        this.errores.push("El nombre es obligatorio.");
      } else if (this.form.nombre.trim().length < 3) {
        this.errores.push("El nombre debe tener al menos 3 letras.");
      }

      // 2. Validación: Email obligatorio y formato correcto con regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email.trim()) {
        this.errores.push("El correo electrónico es obligatorio.");
      } else if (!emailRegex.test(this.form.email)) {
        this.errores.push("Por favor, ingresá un correo electrónico válido.");
      }

      // Si hay errores, frenamos la ejecución
      if (this.errores.length > 0) {
        return;
      }

      // Si pasa todas las validaciones, los datos son consistentes: procesamos la compra
      alert(`¡Muchas gracias por tu compra, ${this.form.nombre}! Tu pedido fue procesado de forma consistente.`);
      
      // Limpiamos el carrito en memoria y LocalStorage
      this.carrito = [];
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      
      // Limpiamos el formulario
      this.form.nombre = '';
      this.form.email = '';
    }



  }
}
</script>

<style scoped>
.carrito-page {
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-height: 400px;
}
.nav-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}
.btn-nav {
  background: #333;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
}
.seccion-listas {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}
.columna {
  flex: 1;
  min-width: 280px;
}
.vacio-msg {
  color: #777;
  font-style: italic;
}
.lista-items {
  list-style: none;
  padding: 0;
}
.item-linea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.btn-eliminar {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.formulario-compra {
  margin-top: 40px;
  padding: 20px;
  border-top: 2px dashed #ccc;
  max-width: 500px;
}
.campo {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.campo input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.alert-error {
  background-color: #ffe6e6;
  color: #cc0000;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ffcccc;
  margin-bottom: 15px;
}
.alert-error ul {
  margin: 0;
  padding-left: 20px;
}
.btn-finalizar {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}
.btn-finalizar:hover {
  background: #0056b3;
}
</style>