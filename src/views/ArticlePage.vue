<template>
  <div class="article-page">
    <navbar>
      <span class="home-page__title">
        <div class="article-page__arrow-wrapper" @click="backToHome">
          <img src="@/assets/images/left-arrow.svg" height="40" width="40"/>
        </div>
      </span>
    </navbar>
    <div class="article-page__wrapper">
      <div class="article-page__content">

          <div class="article-page__img_wrapper">
            <img :src="getImage('objects', modelPost.image)"/>
          </div>
          <p class="article-page__title">
            {{ modelPost.title }}
          </p>
          <span class="article-page__date">
            {{ modelPost.date }}
          </span>
          <div class="article-page__reactions">
            <div class="article-page__reactions">
              <div v-for="(postReaction, index) in modelPost.reactions"
                :key="index" class="article-page__post-reactions-wrapper">
                <img :src="getImage('reactions', postReaction.reactionPath)">
                <span>{{postReaction.reactionCount}}</span>
              </div>
            </div>
            <div class="article-page__reactions">
              <div class="article-page__reactions-choosing"
                @mouseover="showReactions=true"
                @mouseleave="showReactions=false">
                <img v-for="(reaction, index) in countSmiles"
                :key="index"
                @click="addReaction(reaction)"
                :src="getImage('reactions', reaction.src)">
              </div>
            </div>
          </div>
          <span class="article-page__description">
            {{ modelPost.description }}
          </span>
        </div>
      </div>
    </div>

    
    
  
</template>

<script>
import reactions from '@/assets/reactions.json'
import { list } from 'postcss';
import Navbar from '../components/Navbar/Navbar.vue'

export default {
  name: 'ArticlePage',
  components: {
    Navbar
  },
  data() {
    return {
      modelPost: {},
      reactions: reactions,
      showReactions: false,
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const dataPost = this.$store.getters.getActualPost
      if (dataPost.id) {
        this.modelPost = dataPost;
      } else if(localStorage.getItem('post')) {
        this.modelPost = JSON.parse(localStorage.getItem('post'));
      } else {
        this.$router.push('/')
      }
    },
    addReaction(reaction) {
      let isFound = false
      this.modelPost.reactions.filter(elem => {
        if (elem.reactionName === reaction.name) {
          elem.reactionCount++
          isFound = true
          return
        }
      })
      if (!isFound) {
        this.modelPost.reactions.push({
          'reactionName': reaction.name,
          'reactionCount': 1,
          'reactionPath': reaction.src,
        })
      }
      this.savePost()
    },
    savePost() {
      localStorage.setItem('post', JSON.stringify(this.modelPost))
    },
    getImage(path, image) {
      const imgUrl = new URL(`../assets/images/${path}/${image}`, import.meta.url)
      return imgUrl
    },
    backToHome() {
      let listItems = JSON.parse(localStorage.getItem('posts'))
      for (let elem of listItems) {
        if (elem.id === this.modelPost.id) {
          Object.assign(elem, this.modelPost)
        }
      }
      localStorage.setItem('posts', JSON.stringify(listItems))
      this.$router.push('/')
    }
  },
  computed: {
    countSmiles() {
        return this.showReactions ? this.reactions : this.reactions.slice(0, 1)
    }
  },
}
</script>

<style scoped lang="scss">
.article-page {
  &__wrapper {
    max-width: 900px;
    margin: 0 auto;
  }
  &__arrow-wrapper {
    background-color: rgba(25, 79, 130, 1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    cursor: pointer
  }
  &__content {
    display: inline-grid;
    margin: 10px;
  }
  &__title {
    font-weight: bold;
    font-size: 28px;
    text-align: left;
  }
  &__date {
    text-align: left;
    color: gray;
  }
  &__reactions {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    align-items: baseline;    
    & img {
      width: 20px;
      margin: 2px;
    }

    & span {
        margin: 0 5px;
      }
    &-choosing {
      display: flex;
      background-color: gray;
      flex-flow: column nowrap;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: flex-start;
      z-index: 3001;
      padding: 5px 5px;
      border-radius: 10px;
      position: absolute;
      bottom: 0;
      right: 0;
      & img {
        cursor: pointer
      }
    }
  }
  &__post-reactions {
        display: flex;
        width: 80%;
        &-wrapper {
          display: flex;
          align-items: center;
        }
      }
  &__description {
    text-align: justify;
  }
}
</style>