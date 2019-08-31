<template>
  <div class="result-wrapper">
    <div class="song" v-for="item in songList" :key="item.id">
      <div class="name">
        <span class="iconfont icon-play" @click="toPlayer(item.id)"></span>
        {{item.name}}
        <span class="iconfont icon-editmedia"></span>
      </div>
      <div class="singer">{{item.artists|formatSinger}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration|formatTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songList: []
    };
  },
  created() {
    this.queryMusic();
  },
  watch: {
    "$route.params.keywords"() {
      this.queryMusic();
    }
  },
  filters: {
    formatTime(ms) {
      //总的秒数
      let secCount = ms / 1000;
      //分
      let min = Math.floor(secCount / 60);
      //剩余的秒数
      let sec = Math.floor(secCount % 60);

      let minStr = min < 10 ? "0" + min : min;
      let secStr = sec < 10 ? "0" + sec : sec;
      return `${minStr}:${secStr}`;
    },
    formatSinger(singer) {
      let arr = [];
      for (let i = 0; i < singer.length; i++) {
        arr.push(singer[i].name);
      }
      return arr.join("/");
    }
  },
  methods: {
    queryMusic() {
      this.$axios
        .get(`/search?keywords=${this.$route.params.keywords}`)
        .then(res => {
          console.log(res);
          this.songList = res.data.result.songs;
        })
        .catch(() => {});
    },
    toPlayer(id) {
      this.$router.push(`/player/${id}`);
    }
  }
};
</script>

<style>
@import url("../assets/css/results.css");
</style>