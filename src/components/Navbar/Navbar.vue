<template>
  <div class="navbar">
    <div class="navbar__wrapper">
      <slot></slot>
      <div class="navbar__image-wrapper">
        <img src="@/assets/images/science.svg" height="50" width="50">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.navbar {
  
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 10px rgba(25, 79, 130, 1);
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1280px;
    padding: 10px;
    width: 100%;
  }
  &__image-wrapper {
    img {
      transition: transform 3s ease-in-out;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
