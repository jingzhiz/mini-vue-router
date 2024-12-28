<template>
  <div class="home">
    <h1>Welcome to Our Home Page</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    text: String
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
  background-color: #f4f4f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
}

p {
  color: #666;
  font-size: 1.2em;
}
</style>