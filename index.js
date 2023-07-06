

function createCropperActions (selector,id) {

const file = selector.querySelector(".image-file")
const upload_button = selector.querySelector(".upload-button")



const originalImage = selector.querySelector(".og-image")

const imageResizer = selector.querySelector(".image-resizer")

let height = originalImage.naturalHeight;
let width = originalImage.naturalWidth;

let imageURL = originalImage.src;

let nonScaleWidth = width
let nonScaleHeight = height

let scaler = 1








function scaleWidthHeight() {
  if(width > 1000){
    scaler = Math.round(width / 1000)
     height = height / scaler
     width = width / scaler
  }
}

originalImage.addEventListener('load',(e) => {
  height = originalImage.naturalHeight
  width = originalImage.naturalWidth
scaleWidthHeight()
  document.documentElement.style.setProperty('--height-'+id,height+'px')
document.documentElement.style.setProperty('--width-'+id,width+'px')

setControllerProperties(Math.round(width / 4)+"px",Math.round(height  / 4)+"px",0+"px",0+"px")

})

document.documentElement.style.setProperty('--height-'+id,height+'px')
document.documentElement.style.setProperty('--width-'+id,width+'px')


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



const controller = selector.querySelector(".controller")
// const button = document.querySelector("button")
const newImage = selector.querySelector(".new-image")


controller.style.maxWidth = originalImage.style.maxWidth

// Controller resizer

const topResize = selector.querySelector(".top-dragger")
const bottomResize = selector.querySelector(".bottom-dragger")
const leftResize = selector.querySelector(".left-dragger")
const rightResize = selector.querySelector(".right-dragger")

bottomResize.style.top = (controller.computedStyleMap().get('top').value + controller.computedStyleMap().get('height').value) + "px"
rightResize.style.left = (controller.computedStyleMap().get('left').value + controller.computedStyleMap().get('width').value) + "px"
rightResize.style.top = controller.style.top
leftResize.style.top = controller.style.top


function setControllerProperties(width=null,height=null,top=null,left=null){

  

    controller.style.width = width || controller.style.width
    controller.style.height = height || controller.style.height
    controller.style.left = left || controller.style.left
    controller.style.top = top || controller.style.top


    const controllerValues = controller.computedStyleMap()

    topResize.style.width = controller.style.width
    topResize.style.left = controller.style.left
    topResize.style.top = controller.style.top

    bottomResize.style.width = controller.style.width
    bottomResize.style.left = controller.style.left
    bottomResize.style.top =  (controllerValues.get('top').value + controllerValues.get('height').value) + "px"


    leftResize.style.height = controller.style.height
    leftResize.style.left = controller.style.left
    leftResize.style.top = controller.style.top

    rightResize.style.height = controller.style.height
    rightResize.style.top = controller.style.top
    rightResize.style.left = (controllerValues.get('left').value + controllerValues.get('width').value)  + "px"

    newImage.style.left = (0 - controllerValues.get('left').value) + "px"
    newImage.style.top = (0 - controllerValues.get('top').value) + "px"
}



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
      let top,left;
      

      if (controllerPosition.x - mouseXDifference <= imageResizerRect.x){
        // controller.style.left  = 0
        // positionX = 0
        left  = 0
        positionX = 0
      }else if(controllerPosition.left + controllerPosition.width - mouseYDifference >= imageResizerRect.left + imageResizerRect.width){
        // controller.style.left = (imageResizerRect.width - controllerPosition.width) + "px"
        // positionX = (imageResizerRect.width - controllerPosition.width)
        // left = 
        left = (imageResizerRect.width - controllerPosition.width)
        positionX = left
      }
      else{
        // controller.style.left = positionX + "px"
        left = positionX
      }


    //   console.log(controller.y,mouseYDifference,controller.offsetTop,imageResizerRect.y)

      if(controllerPosition.y - mouseYDifference <= imageResizerRect.y){
        // controller.style.top = 0
        // positionY = 0
        top = 0
        positionY = 0
      }else if(controllerPosition.bottom - mouseYDifference >= imageResizerRect.bottom){
        // controller.style.top = (imageResizerRect.height - controllerPosition.height)+"px"
        // positionY = (imageResizerRect.height - controllerPosition.height)
        top = (imageResizerRect.height - controllerPosition.height)
        positionY = top
      }
      else{
        // controller.style.top = positionY + "px"
        top = positionY
      }

      top = top + "px"
      left = left + "px"
      setControllerProperties(null,null,top,left)


      // topResize.style.top = controller.style.top
      // topResize.style.left = controller.style.left
      // bottomResize.style.left = controller.style.left
      // bottomResize.style.top = (controller.computedStyleMap().get('top').value + controller.computedStyleMap().get('height').value) + "px"
      
      // console.log(controllerPosition.bottom,controllerPosition.y,mouseYDifference,imageResizerRect.bottom)

    //   console.log(e.clientX , mouseX)
    //   console.log(positionX)


    // leftResize.style.left = controller.style.left
    // leftResize.style.top = controller.style.top


    // rightResize.style.top = controller.style.top
    // rightResize.style.left = (controller.computedStyleMap().get('left').value + controller.computedStyleMap().get('width').value) + "px"

      
      


    //   newImage.style.left = (0 - positionX) + "px"
    //   newImage.style.top = (0 - positionY) + "px"





  }
    
    document.addEventListener('mousemove',listener)

//   document.addEventListener('mouseup')
    document.addEventListener('mouseup',(e) => {
        document.removeEventListener('mousemove',listener)
    })

})









selector.querySelector(".download-button").addEventListener('click',(e) => {
  e.preventDefault()

  // console.log("hello")

  // const canvas = document.querySelector("canvas")

  // console.log("clicked")


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
  const outputImageWidth = controller.computedStyleMap().get('width').value
  const outputImageHeight = controller.computedStyleMap().get('height').value
  const downloadHeight = downloadableImage.naturalHeight
  const downloadWidth = downloadableImage.naturalWidth
  downloadableImage.height = width
  downloadableImage.width = height

  canvas.width = outputImageWidth
  canvas.height = outputImageHeight


  console.log(imageLeftOffset,imageTopOffset)


  console.log(downloadWidth,downloadHeight,imageLeftOffset,imageTopOffset)
  downloadableImage.onload = () => {
    // context.clearRect(0,0,1000000,1000000)
    // context.drawImage(downloadableImage,0,0,downloadWidth,downloadHeight,imageLeftOffset,imageTopOffset,400,400)
    // context.drawImage(originalImage,imageLeftOffset,imageTopOffset,400,400,height,imageLeftOffset,imageTopOffset,width,height)

    // context.drawImage(originalImage,
    //   imageLeftOffset*scaler,
    //   imageTopOffset*scaler,
    //   width*scaler +  imageLeftOffset*scaler,
    //   height*scaler +      imageTopOffset*scaler
    //   , -imageLeftOffset*scaler,- imageTopOffset*scaler,400,400)

    

    context.drawImage(
      originalImage,
      imageLeftOffset * scaler,
      imageTopOffset * scaler,
      outputImageWidth * scaler,
      outputImageHeight * scaler,
      0,
      0,
      outputImageWidth,
      outputImageHeight
    )


    
    const link = document.createElement("a")

    link.download = "image.jpeg"
  
    // console.log(canvas.)
  
    link.href = canvas.toDataURL("image/jpeg")
  
    link.textContent = "Hello Download this"
    document.body.appendChild(link)
  
    link.click()

    // console.log("clicked the link")
  
  
    link.remove()

    canvas.remove()
  }

// 
  // window.open(canvas.toDataURL("image/jpeg"),"_blank")
  
})



// topResize.addEventListener('mousedown',(e) => {

//   console.log("Top resize")
    
//     e.preventDefault()

//   let mouseY = e.clientY
//   let positionY = topResize.computedStyleMap().get("top").value



//   const listener = (e) => {
//     e.preventDefault()


//     console.log("resizing")
//     mouseYDifference = (e.clientY - mouseY)*10


//     console.log(mouseYDifference)

//     const controllerHeight = controller.computedStyleMap().get("height").value
//     const controllerTop = controller.computedStyleMap().get("top").value
//     // controller.style.top = (controllerTop + mouseYDifference) + "px"

//     const originalImageHeight = originalImage.computedStyleMap().get("height").value

//     if(controllerHeight - mouseYDifference >= originalImageHeight - controllerTop){
//       controller.style.height = (originalImageHeight - controllerTop) + "px"
//       bottomResize.style.transform = `translateY(-5px)`
//     }else{
//       controller.style.height = (controllerHeight - mouseYDifference) + "px"
//       bottomResize.style.transform = ''
//       bottomResize.style.top = ( controller.computedStyleMap().get('top').value  + (controllerHeight - mouseYDifference)) + "px"
//     }

    

//     leftResize.style.height = controller.style.height
//     rightResize.style.height = controller.style.height

    

//     // topResize.style.top = (controllerTop + mouseYDifference) + "px"

//     //  newImage.style.top = (0 - (controllerTop + mouseYDifference)) + "px"



//     mouseY = e.clientY
    
//   }

//   document.addEventListener('mousemove',listener)

//   document.addEventListener('mouseup',() => {
//     document.removeEventListener('mousemove',listener)
//   })


// })



topResize.addEventListener('mousedown',(e) => {
  e.preventDefault()

  let mouseY = e.clientY
  let height = controller.computedStyleMap().get('height').value
  let topOffset  = controller.computedStyleMap().get('top').value


  const listener = (e) => {
    const newPosition = e.clientY
    const difference = mouseY - e.clientY

    


    height += difference
    topOffset -= difference



    if(topOffset + height >= imageResizer.computedStyleMap().get('height').value){
      height -= difference
    }else if(topOffset <= 0 ){
      height -= difference
      topOffset = 0
    }

    setControllerProperties(null,height + "px",topOffset+"px",null)

    mouseY = e.clientY
  }


  document.addEventListener('mousemove',listener)
  document.addEventListener('mouseup',(e) => {

    
    document.removeEventListener('mousemove',listener)
  })



})


bottomResize.addEventListener('mousedown',(e) => {
  e.preventDefault()

  let mouseY = e.clientY
  let height = controller.computedStyleMap().get('height').value
  let topOffset  = controller.computedStyleMap().get('top').value


  const listener = (e) => {
    const newPosition = e.clientY
    const difference = mouseY - e.clientY

    


    height -= difference
    //topOffset -= difference



    if(topOffset + height >= imageResizer.computedStyleMap().get('height').value){
      height += difference
    }

    setControllerProperties(null,height + "px",null,null)

    mouseY = e.clientY
  }


  document.addEventListener('mousemove',listener)
  document.addEventListener('mouseup',(e) => {
    setControllerProperties(null,null,controller.style.top,null)
    document.removeEventListener('mousemove',listener)
  })



})



leftResize.addEventListener('mousedown',(e) => {
    
  e.preventDefault()




  let mouseX = e.clientX
  let leftOffset = controller.computedStyleMap().get('left').value
  let width = controller.computedStyleMap().get('width').value

  const listener = (event) => {
    const newX = event.clientX
    const difference = mouseX   - newX


    let newLeftOfController = leftOffset - difference
    let newWidth = width + difference




    if(newLeftOfController <= 0){
      newWidth = controller.computedStyleMap().get("width").value
      newLeftOfController = 0 

      leftResize.style.left = 0
      leftResize.style.transform = `translateX(-5px)`

    }else{

      leftResize.style.transform = ''

      controller.style.width = newWidth + "px"
      controller.style.left = newLeftOfController + "px"


      const newLeft = controller.style.left
      const newDraggersWidth = controller.style.width
  
  
      leftResize.style.left = newLeft
      topResize.style.left = newLeft
      topResize.style.width = newDraggersWidth
      bottomResize.style.left = newLeft
      bottomResize.style.width = newDraggersWidth

    }







    newImage.style.left = (0 - newLeftOfController) + "px"

  }


  document.addEventListener('mousemove',listener)
  document.addEventListener('mouseup',(e) => {

    setControllerProperties(controller.style.width,controller.style.height,controller.style.top,controller.style.left)
    document.removeEventListener('mousemove',listener)
  })

})





rightResize.addEventListener('mousedown',(e) => {
    
  e.preventDefault()




  let mouseX = e.clientX
  
  let width = controller.computedStyleMap().get('width').value

  const listener = (event) => {

    let leftOffset = controller.computedStyleMap().get('left').value
    
    let newPosition = event.clientX
    const difference = mouseX - newPosition


    width -= difference
    leftOffset -= difference

    if(width + leftOffset >= imageResizer.computedStyleMap().get('width').value){
      width += difference
      leftOffset += difference
    }else if(leftOffset <= 0 ){
      width += difference
      leftOffset = 0
    }


    setControllerProperties(width+'px',null,null,null)

    mouseX = event.clientX

  }


  document.addEventListener('mousemove',listener)
  document.addEventListener('mouseup',(e) => {

    setControllerProperties(controller.style.width,controller.style.height,controller.style.top,controller.style.left)
    document.removeEventListener('mousemove',listener)
  })

})


}