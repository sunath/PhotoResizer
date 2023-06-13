const originalImage = document.querySelector(".og-image")

const imageResizer = document.querySelector(".image-resizer")

const height = originalImage.naturalHeight;
const width = originalImage.naturalWidth;

document.documentElement.style.setProperty('--height',height+'px')
document.documentElement.style.setProperty('--width',width+'px')


let targetWidth = '400px'
let targetHeight = '400px'



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

      console.log(controllerPosition.bottom,controllerPosition.y,mouseYDifference,imageResizerRect.bottom)

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




