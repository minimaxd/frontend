const player = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d', { willReadFrequently: true })
const strip=document.querySelector('.strip')
const snap=document.querySelector('.snap')
let media = null
let id = null
async function getVideo() {
    try {
        media = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: 100,
                height: 100
            },
            audio: false
        })
        player.srcObject = media
        player.addEventListener('loadedmetadata', function () {
            paintToCanvas();
        });
    }
    catch (error) {
        console.log('出错', error.message)
    }

}
function pausePhoto() {
    if (!media) return
    media.getTracks().forEach(track => track.stop())
    media = null

    player.srcObject = null
    if (id) { clearInterval(id) }

}
// 将获取到的视频流绘制到canvas上
function paintToCanvas() {
    const width = player.videoWidth;
    const height = player.videoHeight;
    canvas.width = width;
    canvas.height = height;
    return id = setInterval(function () {
        ctx.drawImage(player, 0, 0, width, height)
        let imageData = ctx.getImageData(0, 0, width, height)
        imageData = splitImage(imageData)
        ctx.putImageData(imageData,0,0)

    }, 16)
}
function RedImage(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] = imageData.data[i + 0] + 200
        imageData.data[i + 1] = imageData.data[i + 1] - 50
        imageData.data[i + 2] = imageData.data[i + 2] * 0.5
    }
    return imageData
}
function splitImage(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i - 150] = imageData.data[i + 0]
        imageData.data[i + 500] = imageData.data[i + 1]
        imageData.data[i - 550] = imageData.data[i + 2]
    }
    return imageData
}
function takePhoto(){
snap.currentTime=0
snap.play()
const a=document.createElement('a')
const img=canvas.toDataURL('image/png')
a.href=img
a.download='handsome.png'
a.innerHTML=`<img src="${img}">`
strip.insertBefore(a,strip.firstChild)
}
getVideo()