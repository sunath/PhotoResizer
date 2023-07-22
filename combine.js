function getLayerWidthHeightProperies(layer){
    const layerStyles = layer.computedStyleMap()
    let [maxWidth,maxHeight,width,height] = [layerStyles.get('max-width').value,
    layerStyles.get('max-height').value,
    layerStyles.get('width').
    value,layerStyles.get('height').value]

    width = width == "auto" ? maxWidth : width
    height = height == "auto" ? maxHeight : height

    return {maxWidth,maxHeight,width,height}
}

function combinePictures(selector){
    const querySelector = (s) => {
        return selector.querySelector(s)
    }
    // const canvas = document.querySelector("canvas");
    // const context = canvas.getContext("2d")

    // canvas.width = 1000
    // canvas.height = 700
    // context.fillStyle = "#FFF";
    // context.fillRect(0,0,1000,700)
    
    // const firstImage = new Image(1000,700)
    // firstImage.src = "./resizer-default.jpeg"

    // firstImage.onload = () => {
    //     context.drawImage(firstImage,0,0,1000,700)
    // }

    // const secondImage = new Image(200,200)
    // secondImage.src = "./5.jpg"

    // secondImage.onload = () => {
    //     context.drawImage(secondImage,500,350,200,200)

    const newImageInput = querySelector(".combine-tab-new-image-input")
    const newImageButton = querySelector(".new-image-add-button")
    const imagesList = querySelector(".combine-images")
    const currentImagesList = querySelector(".current-images-list")
    const combineImageWidth = querySelector('.combine-image-width')
    const combineImageHeight = querySelector('.combine-image-height')
    const editor = querySelector('.editor')

    let currentZIndex = 0;
    let layers = 0 ;
    let maxWidth = 500;
    let maxHeight = 500;
    // combineImageWidth.addEventListener('change',(e) => {
    //      editor.style.width =  e.target.value + 'px'
    // })

    combineImageWidth.addEventListener('keyup',(e) => {
         editor.style.width =  e.target.value + 'px'
         maxWidth = e.target.value;
    })

    combineImageHeight.addEventListener('keyup',(e) => {
        editor.style.height = e.target.value+"px"
        maxHeight = e.target.value
    })


    const changeSelectedLayerWidthHeight = (layer) => {

        return (e) => {

            e.preventDefault()
            const newVal = e.target.value 
            const layerStyles = layer.computedStyleMap()
            const {height,maxHeight,maxWidth,width}  = getLayerWidthHeightProperies(layer)
            let currentLeft = layerStyles.get('left').value
        
            if(e.target.name == "width"){
                layer.style.width = newVal+"px"
                layer.style.left =  currentLeft - newVal
            }else{
                layer.style.height = newVal+"px"
            }
            changeSelectedLayerPosition(layer)(e)
        }
        
    }

    const changeSelectedLayerPosition = (layer) => {
        return (e) => {
            e.preventDefault()
            const val = e.target.value
            const layerStyles = layer.computedStyleMap()
            const {height,maxHeight,maxWidth,width}  = getLayerWidthHeightProperies(layer)

            document.querySelector(".combine-img-position-x-input").max = maxWidth - width
            document.querySelector(".combine-img-position-y-input").max = maxHeight - height


            if(e.target.name == "position-y" && maxHeight - height != 0){
                layer.style.top = val+"px"
            }else if(e.target.name == "position-x" && maxWidth - width != 0){
                layer.style.left = val+"px"
            }
        }
    }


    const setSelectedLayer = (id) => {
        console.log(id)
        return (e) => {
            e.preventDefault()
            console.log(id)
            let className;
            if(id != 0 && id == undefined){
             className= e.target.className.split(" ")
             className = e.target.parentElement.querySelector("span").textContent.split("")[1]
            // className = className[className.length - 1]
            // className = className.split("-")[3]
            }else{
                className = id
            }
            

            console.log('.combine-image-layer-'+className)
            const imageLayer = document.querySelector('.combine-image-layer-'+className)
    
            let layer = querySelector('.combine-selected-layer')
            if(!layer){
                layer = document.createElement("div")
                layer.className = "combine-selected-layer"
            }
            const {width,height} = imageLayer
    
           
            layer.innerHTML = `
                <h2>Selected layer : ${className}</h2>

                <label>
                Width
                <input type="range"  class="combine-img-width-input" min="1" max="${maxWidth}"  value="${width}" name="width"/>
                </label>

                <label>
                Height
                <input type="range" class="combine-img-height-input"  min="1" max="${maxHeight}" default="${height}" name="height"/>
                </label>


                <label>
                Position x
                <input type="range"  class="combine-img-position-x-input" min="0" max="${maxWidth}"  value="${width}" name="position-x"/>
                </label>

                <label>
                Position y
                <input type="range" class="combine-img-position-y-input"  min="0" max="${maxHeight}" default="${height}" name="position-y"/>
                </label>
            `

            // const element = findClassName ? document.querySelector('.combine-image-layer-'+className.split()[1]) : e.target
            console.log('.combine-image-layer-'+className)
            layer.querySelector('.combine-img-width-input').addEventListener('change',changeSelectedLayerWidthHeight(imageLayer))
            layer.querySelector('.combine-img-height-input').addEventListener('change',changeSelectedLayerWidthHeight(imageLayer))
            layer.querySelector('.combine-img-position-x-input').addEventListener('change',changeSelectedLayerPosition(imageLayer))
            layer.querySelector('.combine-img-position-y-input').addEventListener('change',changeSelectedLayerPosition(imageLayer))

        }
      
    }

    newImageInput.addEventListener('change',e => {
        if(e.target.files){
            const newFile = e.target.files[0]
            const newElement = document.createElement("img")
            newElement.src = URL.createObjectURL(newFile)
            newElement.className = "combine-image combine-image-layer-"+layers
            newElement.style.maxHeight = maxHeight + "px"
            newElement.style.maxWidth = maxWidth + "px"
            imagesList.appendChild(newElement)

            newElement.addEventListener('click',setSelectedLayer(layers))

            const newImageListElement = document.createElement("div")
            newImageListElement.innerHTML = `
                <img  src=${newElement.src} width="50px" height="40px" />
                <span>Layer ${layers}</span>
                <button class="btn">Visibility</button>
                <button class="btn">up</button>
                <button class="btn">down</button>
            `

        
            currentImagesList.appendChild(newImageListElement)
            // console.log(layers)
            newImageListElement.querySelector('img').addEventListener('click',setSelectedLayer(layers))

            layers += 1
        }
    })

    newImageButton.addEventListener('click',(e) => {
        newImageInput.click()
    })
    // }
}

combinePictures(document.querySelector(".tab-view"))