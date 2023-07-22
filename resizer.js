const createAResizerImage = (selector) => {
  const imageInputFile = selector.querySelector(".resize-img-action-file");
  const imageFileSelector = selector.querySelector(".resize-new-image");
  const imageFilePreviwer = selector.querySelector(".resize-image-preview");
  const imageOgSize =     selector.querySelector(".resize-img-actions-og-size")
  const newImageSizeInput = selector.querySelector(".resize-img-resize-range-input")
  const newImagePercent = selector.querySelector(".resize-img-new-image-percent")
  const newImageSize = selector.querySelector(".resize-img-new-img-size")
  const imageCanvas = document.querySelector('canvas')
  const imageDownloadButton = selector.querySelector('.resize-new-img-download-btn')
  const imageDownloadImage = selector.querySelector('.resize-img-download-img')
  const resizeDownloadLink = selector.querySelector('.resize-download-link')
  let imageNaturalSize;
  let reducePercent = 10;
  let imageFile;
  let changedScale = 1;

  imageDownloadButton.addEventListener('click',(e) => {
    const height = imageFilePreviwer.naturalHeight
    const width = imageFilePreviwer.naturalWidth

    const newHeight = (height/100) * reducePercent
    const newWidth = (width/100) * reducePercent

    const canvas = imageCanvas.getContext("2d")
    
      // canvas.clearRect(0,0,newWidth,newHeight)
    // canvas.canvas.width = newWidth+"px"
    // canvas.canvas.height = newHeight+"px"
    // imageCanvas.style.width = (newWidth*changedScale)+"px"
    // imageCanvas.style.height = (newHeight*changedScale)+"px"
    
    canvas.canvas.width = newWidth
    canvas.canvas.height = newHeight
    canvas.canvas.style.display = "none"

    const downloadbaleImage = new Image()
    downloadbaleImage.src = imageFilePreviwer.src
    downloadbaleImage.onload = () => {

      
        // console.log(downloadbaleImage.naturalHeight,downloadbaleImage.naturalWidth,newWidth,newHeight)
        // canvas.drawImage(downloadbaleImage,0,0,downloadbaleImage.naturalWidth,downloadbaleImage.naturalHeight,0,0,Math.floor(newWidth),Math.floor(newHeight))
        canvas.drawImage(downloadbaleImage,0,0,newWidth,newHeight);
      resizeDownloadLink.href = canvas.canvas.toDataURL("image/jpeg")
      resizeDownloadLink.download = "image.jpeg"

      resizeDownloadLink.click()

    }
    

    
  })

  newImageSizeInput.addEventListener('change',(e) => {
    const val = e.target.value
    reducePercent = val;
    newImagePercent.textContent = `Reduce your image quality to ${val}%`
    newImageSize.textContent = `New Image Size ${ ((imageNaturalSize / 100) * val).toFixed(3) } mb`

  })

    const caculateImgSize = (imageFile) => {
        return imageFile.size / (1024 * 1024)
    }


  const resizeToThePreview = () => {
    const maxWidth = (window.innerWidth / 100) * 65;
    const maxHight = (window.innerHeight / 100) * 80;

    const { naturalWidth, naturalHeight } = imageFilePreviwer;

    const widthScaler = () => {
      const scale = naturalWidth / maxWidth;
      let newWidth = naturalWidth / scale;
      let newHeight = naturalHeight / scale;
      changedScale = scale;
    if(newHeight > maxHight){
        newWidth = naturalWidth /  (scale*2)
        newHeight = naturalHeight / (scale*2)
        changedScale = scale * 2;
    }

      return { newWidth, newHeight };
    };

    if (naturalWidth > maxWidth || naturalHeight > maxHight) {
      const { newHeight, newWidth } = widthScaler();
      imageFilePreviwer.style.width = newWidth + "px";
      imageFilePreviwer.style.height = newHeight + "px";
    }
    else {
      imageFilePreviwer.style.width = naturalWidth + "px";
      imageFilePreviwer.style.height = naturalHeight + "px";
    }
  };

  imageFileSelector.addEventListener("click", (e) => {
    imageInputFile.click();
  });

  imageInputFile.addEventListener("change", (e) => {
    if (e.target.files) {
    const f = e.target.files[0]
      imageFilePreviwer.src = URL.createObjectURL(f);
      imageFilePreviwer.onload = resizeToThePreview;
      imageFile = f
      const megabytes = caculateImgSize(f)
      imageOgSize.textContent = `Original Image Size: ${megabytes.toFixed(3)}mb`
      imageNaturalSize = megabytes
    }
  });
};

// Tester

// const resizeTab = document.querySelector(".tab-row");

// createAResizerImage(resizeTab);
