<template>
  <div class="app">
    <section class="nav">
      <router-link to="/" class="nav-link">
        <i class="fas fa-home"></i> Home
      </router-link>
      <router-link to="/about" class="nav-link">
        <i class="fas fa-info-circle"></i> About
      </router-link>
    </section>
    <router-view :text="text" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      text: 'This is the home page of our application.'
    }
  }, 
  mounted() {
    console.log('route', this.$route)
    console.log('router', this.$router)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.app {
  font-family: 'Roboto', sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background: linear-gradient(135deg, #4a90e2, #9b59b6); /* 渐变背景 */
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  margin: 0 15px;
  transition: color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
}

.nav-link:hover {
  color: #ffcc00;
  background-color: rgba(255, 204, 0, 0.2);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.router-link-exact-active {
  color: #ffcc00;
  background-color: rgba(255, 204, 0, 0.2);
  border-bottom: 2px solid #ffcc00;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.router-view {
  flex: 1;
  padding: 20px;
  max-width: 1000px; /* 增加最大宽度 */
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
</style>