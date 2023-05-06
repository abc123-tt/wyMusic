// 定义仓库
import { defineStore } from 'pinia'
import { StoreData } from './store-name'


export const useStore = defineStore(StoreData.STORE, {
  state: () => ({
    defaultSong: {
      id: 441491828,
      name: "水星记",
      picUrl: "http://p3.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg",
      singerName: "郭顶"
    },
    playlist: [] as any,
    // 记录当前的播放的歌曲 索引值
    currentSongIndex: 0,
    // 搜索结果
    searchList: [],
    // 搜索关键字
    searchKeyWord: '',
    // 控制音乐播放器显示的位置
    playPosition: true,
    // 控制底部播放器是否显示
    isPlayCom: true,
    // 存放用户头像
    userPicUrl: '',
    // 存放用户名
    userName: '',
    // 存放用户的歌单
    userPlaylist: [],
    // 存放用户详细信息
    accountDetail: [],
    // 是否展开歌词详情页
    isShowLyric: false,
    // 控制音乐播放与暂停
    isPlay: false,
    // 保存当前歌曲的播放时间
    currentTime: 0,
    // 歌曲总时长
    duration:0,
    exam:0
    
  }),
  // 类似computed: 修饰一些值
  getters: {

  },
  // 类似methods：可以同步  异步  提交到state
  actions: {
    // 不要写箭头函数，否则this的指向会错
    // 按顺序播放全部歌曲
    play(songsItem: any, index: number) {
      // 先存一份
      this.playlist = songsItem
      // 将currentSongIndex覆盖掉
      this.currentSongIndex = index
      if (songsItem[index].ar) {
        // 拿到对应的歌曲的信息
        this.defaultSong.id = this.playlist[this.currentSongIndex].id
        this.defaultSong.name = this.playlist[this.currentSongIndex].name
        this.defaultSong.picUrl = this.playlist[this.currentSongIndex].al.picUrl
        this.playlist[this.currentSongIndex].ar.forEach((ele) => {
          this.defaultSong.singerName = ele.name
        })
        return
      }
      if (songsItem[index].song.artists) {
        let arr = []
        this.defaultSong.id = this.playlist[this.currentSongIndex].id
        this.defaultSong.name = this.playlist[this.currentSongIndex].name
        this.defaultSong.picUrl = this.playlist[this.currentSongIndex].picUrl
        this.playlist[this.currentSongIndex].song.artists.forEach((ele) => {
          this.defaultSong.singerName = ele.name
        })

        
      }
    },
    // 自动播放下一曲
    playNext() {
      if (this.currentSongIndex >= this.playlist.length - 1) {
        this.currentSongIndex = 0
      } else {
        this.currentSongIndex++
      }
      this.play(this.playlist, this.currentSongIndex)
    },
    // 手动播放上一首和下一首
    // changeSong(item,index){
    //   this.defaultSong = item
    // },
    // 存储搜索结果
    storageList(list, str) {
      this.searchList = list
      console.log(list);

      this.searchKeyWord = str
    }
  }

})