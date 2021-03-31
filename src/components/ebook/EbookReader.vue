<template>
 <div>
   <!-- {{$route.params.fileName}} -->
   <div id="read"></div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.epub = Epub
export default {
  computed: {
    // 通过vuex获取路径解析文件名
    ...mapGetters(['fileName'])
  },
  methods: {
    initEpub() {
      // 拼接nginx服务器路径，获取电子书文件
      const url = 'http://localhost:9001/epub/' + this.fileName + '.epub'
      console.log(url)
      // 实例化电子书
      this.book = new Epub(url)
      console.log(this.book)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        // 适配微信
        methods: 'default'
      })
      this.rendition.display()
    }
  },
  mounted() {
    // 获取url中的文件路径
    const fileName = this.$route.params.fileName.split('|').join('/')
    // 修改vuex中的fileName
    this.$store.dispatch('setFileName', fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';
</style>
