<template>
  <div class="about">
    <h1>About Us</h1>
    <ul class="links">
      <li><router-link to="/about/mission">Our Mission</router-link></li>
      <li><router-link to="/about/vision">Our Vision</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.about {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0); /* 渐变背景 */
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h1 {
  color: #333;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

ul.links {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 20px; /* 增加链接之间的间距 */
}

li {
  margin: 0;
  transition: transform 0.2s ease-in-out, background-color 0.3s ease;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

li:hover {
  transform: scale(1.05);
  background-color: #f9f9f9;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease, background-color 0.3s ease;
  display: block;
  padding: 10px;
  border-radius: 8px;
}

a:hover {
  color: #ffcc00;
  background-color: #f9f9f9;
}

.router-link-exact-active {
  font-weight: bold;
  color: #ffcc00;
  background-color: #f9f9f9;
  border-left: 4px solid #ffcc00;
  padding-left: 12px;
}
</style>