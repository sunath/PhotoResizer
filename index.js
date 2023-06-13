

const file = document.querySelector(".image-file")
const upload_button = document.querySelector(".upload-button")



const originalImage = document.querySelector(".og-image")

const imageResizer = document.querySelector(".image-resizer")

let height = originalImage.naturalHeight;
let width = originalImage.naturalWidth;

let imageURL = originalImage.src;

let nonScaleWidth = width
let nonScaleHeight = height


function scaleWidthHeight() {
  if(width > 1000){
     const scaler = Math.round(width / 1000)
     height = height / scaler
     width = width / scaler
  }
}

originalImage.addEventListener('load',(e) => {
  height = originalImage.naturalHeight
  width = originalImage.naturalWidth
scaleWidthHeight()
  document.documentElement.style.setProperty('--height',height+'px')
document.documentElement.style.setProperty('--width',width+'px')

})

document.documentElement.style.setProperty('--height',height+'px')
document.documentElement.style.setProperty('--width',width+'px')


let targetWidth = '400px'
let targetHeight = '400px'



file.addEventListener('change',(e) => {
  const files = e.target.files
  if(files[0]){
    let url =   URL.createObjectURL(files[0])
    originalImage.src = url
    newImage.src = url


  }




})


upload_button.addEventListener('click',(e) => {
  file.click()
})





document.documentElement.style.setProperty('--target-height',targetHeight)
document.documentElement.style.setProperty('--target-width',targetWidth)



const controller = document.querySelector(".controller")
// const button = document.querySelector("button")
const newImage = document.querySelector(".new-image")

let mouseX,mouseY,positionX,positionY = 0

controller.addEventListener('mousedown',(e) => {

    e.preventDefault()

    mouseX = e.clientX
    mouseY = e.clientY
    positionX = controller.offsetLeft
    positionY = controller.offsetTop


    const listener = (e) => {

    e.preventDefault()
    const mouseXDifference = mouseX - e.clientX
    const mouseYDifference =  mouseY - e.clientY 




      positionX -= mouseXDifference
      positionY -= mouseYDifference




      mouseX = e.clientX
      mouseY = e.clientY


      const controllerPosition = controller.getBoundingClientRect()
      const imageResizerRect = imageResizer.getBoundingClientRect()
      

      if (controllerPosition.x - mouseXDifference <= imageResizerRect.x){
        controller.style.left  = 0
        positionX = 0
      }else if(controllerPosition.right - mouseYDifference >= imageResizerRect.right){
        controller.style.left = (imageResizerRect.width - controllerPosition.width) + "px"
        positionX = (imageResizerRect.width - controllerPosition.width)
      }
      else{
        controller.style.left = positionX + "px"
      }


    //   console.log(controller.y,mouseYDifference,controller.offsetTop,imageResizerRect.y)

      if(controllerPosition.y - mouseYDifference <= imageResizerRect.y){
        controller.style.top = 0
        positionY = 0
      }else if(controllerPosition.bottom - mouseYDifference >= imageResizerRect.bottom){
        controller.style.top = (imageResizerRect.height - controllerPosition.height)+"px"
        positionY = (imageResizerRect.height - controllerPosition.height)
      }
      else{
        controller.style.top = positionY + "px"
      }

      // console.log(controllerPosition.bottom,controllerPosition.y,mouseYDifference,imageResizerRect.bottom)

    //   console.log(e.clientX , mouseX)
    //   console.log(positionX)


      
      


      newImage.style.left = (0 - positionX) + "px"
      newImage.style.top = (0 - positionY) + "px"





  }
    
    document.addEventListener('mousemove',listener)

//   document.addEventListener('mouseup')
    document.addEventListener('mouseup',(e) => {
        document.removeEventListener('mousemove',listener)
    })

})









document.querySelector(".download-button").addEventListener('click',(e) => {
  e.preventDefault()

  // console.log("hello")

  // const canvas = document.querySelector("canvas")


  if(document.querySelector("canvas")){
    document.querySelector("canvas").remove()
  }


  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  canvas.className = "canvas"


  document.querySelector(".canvas").appendChild(canvas)


  const downloadableImage = new Image()
  downloadableImage.src = originalImage.src
  const imageLeftOffset = controller.computedStyleMap().get('left').value
  const imageTopOffset = controller.computedStyleMap().get('top').value
  const downloadHeight = downloadableImage.naturalHeight
  const downloadWidth = downloadableImage.naturalWidth

  canvas.width = 400
  canvas.height = 400


  console.log(downloadWidth,downloadHeight,imageLeftOffset,imageTopOffset)
  downloadableImage.onload = () => {
    // context.clearRect(0,0,1000000,1000000)
    // context.drawImage(downloadableImage,0,0,downloadWidth,downloadHeight,imageLeftOffset,imageTopOffset,400,400)
    context.drawImage(downloadableImage,imageLeftOffset,imageTopOffset,400,400,0,0,400,400)


    
    const link = document.createElement("a")

    link.download = "image.jpeg"
  
    // console.log(canvas.)
  
    link.href = canvas.toDataURL("image/jpeg")
  
    link.textContent = "Hello Download this"
    document.body.appendChild(link)
  
    link.click()
  
  
    link.remove()
  }

// 
  // window.open(canvas.toDataURL("image/jpeg"),"_blank")





  
})