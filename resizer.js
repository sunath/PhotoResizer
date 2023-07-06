


const createAResizerImage = (selector) => {

    const imageInputFile = selector.querySelector(".resize-img-action-file")
    const imageFileSelector = selector.querySelector(".resize-new-image")
    const imageFilePreviwer = selector.querySelector(".resize-image-preview")

    let imagePreviewWidth,imagePreviewHeight = 0;



    const resizeToThePreview = () => {
        const maxWidth = (window.innerWidth / 100 * 65)
        const maxHight = (window.innerHeight / 100 * 80)



        const {naturalWidth,naturalHeight} = imageFilePreviwer


        
        const scaler = () => {
            const scale = naturalWidth / maxWidth    
            const newWidth = naturalWidth / scale
            const newHeight = naturalHeight / scale

            return {newWidth,newHeight}
        }

        if(naturalWidth > maxWidth || naturalHeight > maxHight){
            const {newHeight,newWidth} = scaler()
            imageFilePreviwer.style.width = newWidth+"px"
            imageFilePreviwer.style.height = newHeight+"px"
        }else{
            imageFilePreviwer.style.width = naturalWidth+'px'
            imageFilePreviwer.style.height = naturalHeight +'px'
        }
    }

    imageFileSelector.addEventListener('click',(e) => {
        imageInputFile.click()
    })

    imageInputFile.addEventListener('change',(e) => {
        if(e.target.files){
            imageFilePreviwer.src = URL.createObjectURL(e.target.files[0])

            
            imageFilePreviwer.onload = resizeToThePreview

        }
    })

}



// Tester

const resizeTab = document.querySelector(".tab-row")

createAResizerImage(resizeTab)