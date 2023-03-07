import { 
  faArrowLeft,
  faCalendarDay,
  faRadio,
  faList,
  faRankingStar,
  faBookBookmark,
  faAngleRight,
  faEllipsisVertical
 } from '@fortawesome/free-solid-svg-icons'

 let plugins = [
  faArrowLeft,
  faCalendarDay,
  faRadio,
  faList,
  faRankingStar,
  faBookBookmark,
  faAngleRight,
  faEllipsisVertical
 ]

 export default function getFontIcon(tool){
  plugins.forEach(item=>{
    return tool.add(item)
  })
 }