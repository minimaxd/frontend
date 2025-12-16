const openkey = document.querySelector('.videokey')
const pp=document.querySelector('#pp')
const video = document.querySelector('video')
const progress=document.querySelector('.progress')
const buttons=document.querySelectorAll('.play_button')
const ranges=document.querySelectorAll('input[type="range"]')

console.log(pp)
let isdraging=false
let x=0
function playvideo() {
    const method=video.paused?'play':'pause'
    video[method]()
}
function changeicon()
{
    if(video.paused)
    { 
    openkey.textContent = '►'
    }
    else{
      openkey.textContent = '❚ ❚' 
    }
}
function changeSoundorPlaybackRate()
{
  video[this.name]=Number(this.value)
}
function readProgress(){
  let precentage=(video.currentTime/video.duration)*100
  progress.style.width=`${precentage}%`
  progress.style.backgroundColor='yellow'
}
function getcurrenttime()
{
  let time=video.currentTime
}
function getprogress(e)
{
  video.currentTime= video.duration*(e.offsetX/pp.offsetWidth)
}
openkey.addEventListener('click', playvideo)
video.addEventListener('play',changeicon)
video.addEventListener('pause',changeicon)
video.addEventListener('timeupdate', readProgress)
// 视频前进和后退
buttons.forEach(button=>{
  button.addEventListener('click',function(){
    let time=video.currentTime
    let newtime=button.dataset.skip
    video.currentTime=time+Number(newtime)
  })
})
// 视频的倍数和音量
ranges.forEach(range=>{
  range.addEventListener('input',changeSoundorPlaybackRate)
})
// 实现视频进度条拖拽等
pp.addEventListener('mousedown',()=>isdraging=true)
pp.addEventListener('mousemove',(e)=>isdraging&&getprogress(e))
pp.addEventListener('mouseup',()=>isdraging=false)
pp.addEventListener('click',(e)=>getprogress(e))