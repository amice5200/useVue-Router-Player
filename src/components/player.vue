<template>
  <div class="player">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover" :src="coverUrl?coverUrl:'../assets/img/cover.png'" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{songs.name}}</span>
      </div>
      <div class="singer">
        歌手:
        <!-- 获取数据前songs.ar是未定义的, 甚至songs都是未定义的, 加上判断就不会报错length未定义 -->
        <span v-if="songs.ar">{{songs.ar|singer}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>《{{albumName}}》</span>
      </div>
      <audio class="audio" controls :src="musicUrl?musicUrl:''"></audio>
      <ul class="lyric-container">
        <li class="lyric">难以忘记</li>
        <li class="lyric">初次见你</li>
        <li class="lyric">那双迷人的小眼睛</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: "", //歌曲信息
      albumId: "", //专辑id
      musicUrl: "",
      coverUrl: "", //封面
      albumUrl: "", //专辑
      albumName: "" //专辑名字
    };
  },
  created() {
    this.$axios.get(`/song/detail?ids=${this.$route.params.id}`).then(res => {
      // console.log(res);
      this.albumId = res.data.songs[0].al.id;
      this.coverUrl = res.data.songs[0].al.picUrl;
      this.songs = res.data.songs[0];
      this.$axios.get(`/album?id=${this.albumId}`).then(res => {
        // console.log(res);
        this.albumName = res.data.album.name;
      });
    });
    this.$axios.get(`/song/url?id=${this.$route.params.id}`).then(res => {
      this.musicUrl = res.data.data[0].url;
    });
  },
  filters: {
    singer(ser) {
      let arr = [];
      for (let i = 0; i < ser.length; i++) {
        arr += ser[i].name + "/";
      }
      let res = arr.length - 1;
      return arr.substring(0, res);
    }
  }
};
</script>

<style>
@import url("../assets/css/player.css");
</style>