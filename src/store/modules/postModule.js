import json from '@/assets/items.json'

const postModule = {

  state: () => {
    posts: [];
    actualPostId: null;
    actualPostTitle: null;
    actualPostDate: null;
    actualPostImg: null;
    actualPostDesc: null;
    actualPostReaction: null;
  },
  getters: {
    allPosts(state) {
      return state.posts
    },
    getActualPost(state) {
      return {
        id: state.actualPostId,
        title: state.actualPostTitle,
        date: state.actualPostDate,
        description: state.actualPostDesc,
        image: state.actualPostImg,
        reactions: state.actualPostReaction,
      }
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setActualPost(state, postInfo) {
      state.actualPostId = postInfo.id;
      state.actualPostTitle = postInfo.title;
      state.actualPostDate = postInfo.date;
      state.actualPostImg = postInfo.image;
      state.actualPostDesc = postInfo.description;
      state.actualPostReaction = postInfo.reactions;
    }
  },
  actions: {
    setFirstData(ctx) {
      const localPosts = JSON.parse(localStorage.getItem('posts'))
        if (localPosts && localStorage.length) {
          ctx.commit('setPosts', localPosts)
        } else {
          ctx.commit('setPosts', json)
        }
    },
    setPost(ctx, item) {
      ctx.commit('setActualPost', item)
    },
  }
}

export default postModule;