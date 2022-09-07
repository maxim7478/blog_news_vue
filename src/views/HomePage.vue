<template>
  <div class="home-page">
    <navbar>
      <span class="home-page__title">
        Новостной блог
      </span>
    </navbar>
    <div class="home-page__wrapper">
      <div class="home-page__content">
        <item-list v-show="views.listItems"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar.vue';
import ItemList from '@/components/ItemList/ItemList.vue';
import ArticlePage from './ArticlePage.vue';

export default {
  name: 'HomePage',
  components: {
    Navbar,
    ItemList,
    ArticlePage
  },
  data() {
    return {
      views: {
        listItems: true,
        post: false,
      },
      postInfo: {}
    }
  },
}
</script>

<style scoped lang="scss">
.home-page {
  display: block;
  justify-content: center;
  &__title {
    font-size: 30px;
    color: rgba(25, 79, 130, 1);
    cursor: pointer;
  }
  &__wrapper {
    max-width: 1200px;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
  }
  &__content {
    margin: 10px;
  }
}
</style>