<template>
  <div class="item-list">
    <div v-for="item in listItems" :key="item.id" class="item-list__card-wrapper">
      <custom-card class="item-list__post-wrapper" @mouseover="showReaction(item.id)" @mouseleave="currentPost = null">
        <div class="item-list__into-wrapper">
          <div class="item-list__card-time">
            {{item.date}}
          </div>
          <div class="item-list__card-image">
            <img :src="getImage('objects', item.image)"/>
          </div>
            <h3 @click="openPost(item)" class="item-list__card-title">
              {{item.title}}
            </h3>
          <div class="item-list__card-desc">
            {{item.description}}
          </div>
          <div class="item-list__post-reactions">
            <div v-for="(postReaction, index) in item.reactions"
            :key="index" class="item-list__post-reactions-wrapper">
              <img :src="getImage('reactions', postReaction.reactionPath)">
              <span>{{postReaction.reactionCount}}</span>
            </div>
          </div>
          <div v-show="currentPost == item.id" class="item-list__reactions"
          @mouseover="showReactions=true"
          @mouseleave="showReactions=false">
            <img v-for="(reaction, index) in countSmiles"
            :key="index"
            @click="addReaction(item, reaction)"
            :src="getImage('reactions', reaction.src)">
          </div>
        </div>
      </custom-card>
    </div>
  </div>
</template>

<script>
import reactions from '@/assets/reactions.json'

export default {
  name: 'ItemsList',
  data() {
    return {
      listItems: [],
      currentPost: null,
      reactions: reactions,
      countreaction: 1,
      showReactions: false,
    }
  },
  mounted() {
    this.$store.dispatch('setFirstData')
    this.listItems = this.$store.getters.allPosts;
  },
  methods: {
    openPost(item) {
      this.saveData()
      console.log(item)
      this.$store.dispatch('setPost', item)
      localStorage.setItem('post', JSON.stringify(item))
      this.$router.push(`/article/${item.id}`)
      // this.$emit('openPost', item)
    },
    showReaction(itemId) {
      this.currentPost = itemId
    },
    addReaction(item, reaction) {
      for (let elem of item.reactions) {
        if (elem.reactionName == reaction.name) {
          elem.reactionCount++
          this.saveData()
          return
        }
      }
      item.reactions.push({
        'reactionName': reaction.name,
        'reactionCount': 1,
        'reactionPath': reaction.src,
      })
      this.saveData()
    },
    saveData() {
      localStorage.setItem('posts', JSON.stringify(this.listItems))
    },
    getImage(path, image) {
      const imgUrl = new URL(`../../assets/images/${path}/${image}`, import.meta.url)
      return imgUrl
    }
  },
  computed: {
    countSmiles() {
        return this.showReactions ? this.reactions : this.reactions.slice(0, 1)
    },
  },
}
</script>

<style scoped lang="scss">
  .item-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    &__card-wrapper {
      margin: 20px;
      height: 100%;
      width: 28.3%;
    }
    &__into-wrapper {
      padding: 10px;
      padding-bottom: 15%;
      white-space: nowrap;
    }
    &__post-wrapper {
      position: relative;
    }
    &__card-image {
      height: 40%;
      overflow: hidden;
      justify-content: space-around;
      & img {
        width: 100%;
        height: auto;
      }
    }
    &__card-time {
      margin: 5px 0;
      text-align: left;
    }
    &__card-title {
      margin: 10px 0;
      text-align: center;
      font-weight: bold;
      overflow: hidden;
      cursor: pointer;

    }
    &__card-desc {
      margin: 5px 0;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__reactions {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 20px;
      display: flex;
      flex-flow: column-reverse;
      background-color: gray;
      z-index: 3001;
      padding: 5px 5px;
      border-radius: 10px;
      & img {
        height: 100%;
        width: 100%;
        margin: 2px 0;
        cursor: pointer
      }
    }
    &__post-reactions {
        display: flex;
        width: 80%;
        position: absolute;
        bottom: 10px;
        left: 10px;
        flex-flow: row wrap;
        & img {
          width: 20px;
          height: 100%;
        }
        &-wrapper {
          display: flex;
          align-items: center;
          & span {
            margin: 0 5px;
          }
        }
      }
  }

  @media (max-width: 1210px) and (min-width: 800px) {
    .item-list {
      &__card-wrapper {
        margin: 20px;
        height: 100%;
        width: 45%;
      }
    }
  }
  @media (max-width: 799px) {
    .item-list {
      &__card-wrapper {
        margin: 20px;
        height: 100%;
        width: 90%;
      }
    }
  }

</style>