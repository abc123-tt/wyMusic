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
    currentSongIndex: 0,
    searchList: [],
    searchKeyWord: '',
    playPosition: true,
    isPlayCom: true,
    userPicUrl: '',
    userName: '',
    userPlaylist: [],  
    accountDetail: [],
    isShowLyric: false,
    isShowComment:false,
    isPlay: false,
    currentTime: 0,
    durationTime:0,
    isLogin:false,
    isShowArtists:false,

  }),
  getters: {

  },
  actions: {
    play(songsItem: any, index: number) {
      this.playlist = songsItem
      this.currentSongIndex = index
      if (songsItem[index].ar) {
        this.defaultSong.id = this.playlist[this.currentSongIndex].id
        this.defaultSong.name = this.playlist[this.currentSongIndex].name
        this.defaultSong.picUrl = this.playlist[this.currentSongIndex].al.picUrl
        let str  = ''
        this.playlist[this.currentSongIndex].ar.forEach((ele) => {
          str+=ele.name+' '
        })
        this.defaultSong.singerName = str
        return
      }
      if (songsItem[index].song.artists) {
        this.defaultSong.id = this.playlist[this.currentSongIndex].id
        this.defaultSong.name = this.playlist[this.currentSongIndex].name
        this.defaultSong.picUrl = this.playlist[this.currentSongIndex].picUrl
        let str  = ''
        this.playlist[this.currentSongIndex].song.artists.forEach((ele) => {
          str+=ele.name+' '
        })
        this.defaultSong.singerName = str
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
    // 存储搜索结果
    storageList(list, str) {
      this.searchList = list
      this.searchKeyWord = str
    }
  }
})