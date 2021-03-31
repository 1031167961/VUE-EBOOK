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
    ...mapGetters(['fileName'])
  },
  methods: {
    initEpub() {
      const url = 'http://localhost:9001/epub/' + this.fileName + '.epub'
      console.log(url)
      this.book = new Epub(url)
      console.log(this.book)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        methods: 'default'
      })
      this.rendition.display()
    }
  },
  mounted() {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';
</style>
