<template>
  <div class="custom-card">
    <div class="custom-card__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomCard'
}
</script>

<style scope lang="scss">
.custom-card {
  background: white;
  border: 1px solid rgba(25, 79, 130, 1);
  border-radius: 10px;
  box-shadow: 1px 1px 10px;
  transition: transform 3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    box-shadow: 2px 2px 15px;
  }
  &__wrapper {
    margin: 10px;
    height: 100%;
    overflow: hidden;
  }
}
</style>