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
    playlist:[] as any,
    currentSongIndex:0,
    playing:false
  }),
  // 类似computed: 修饰一些值
  getters: {

  },
  // 类似methods：可以同步  异步  提交到state
  actions: {
    // 不要写箭头函数，否则this的指向会错
    setSong(songsItem:any,index:number) {
      this.playlist = songsItem
      this.currentSongIndex = index-1
      this.defaultSong.id = songsItem[index-1].id
      this.defaultSong.name = songsItem[index-1].name
      this.defaultSong.picUrl = songsItem[index-1].al.picUrl
      songsItem[index-1].ar.forEach((ele)=>{
        this.defaultSong.singerName = ele.name
      })
    },
    setAllSongs(list:any){
      this.playlist = list
    },
    // 按顺序播放全部歌曲
    // 点击时应该从头开始播放？？
    play(){
      this.defaultSong.id  = this.playlist[this.currentSongIndex].id
      this.defaultSong.name = this.playlist[this.currentSongIndex].name
      this.defaultSong.picUrl = this.playlist[this.currentSongIndex].al.picUrl
      this.playlist[this.currentSongIndex].ar.forEach((ele)=>{
        this.defaultSong.singerName = ele.name
      })
    },
    
    // 播放下一曲
    playNext(){
      if(this.currentSongIndex>=this.playlist.length-1){ 
        this.currentSongIndex = 0
      }else{
        this.currentSongIndex++
      }
      this.play()
    },
    
  }

})