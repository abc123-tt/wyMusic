// 定义仓库
import { defineStore } from 'pinia'
import { StoreData } from './store-name'


export const useStore = defineStore(StoreData.STORE, {
  state: () => ({
    defaultSong: {
      id: 436514312,
      name: "成都",
      pic: 2946691234868155,
      picUrl: "https://p2.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
      singerName:"赵雷"
    },
    playlist: {}
  }),
  // 类似computed: 修饰一些值
  getters: {

  },
  // 类似methods：可以同步  异步  提交到state
  actions: {
    // 不要写箭头函数，否则this的指向会错
    setSong(songsItem) {
      this.defaultSong = songsItem
      this.defaultSong.picUrl = songsItem.al.picUrl
      
    },
    setAllSongs(list){
      this.playlist = list
      
      
    }
  }

})