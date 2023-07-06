/**
 * This file is responsible for handling tabs
 * 
 * 
 */


const setActiveTab = (tabNumber) => {
    let i = 0; 
    for(const tab of document.querySelectorAll(".tab-view")){
        if(i == tabNumber){
            tab.style.display = 'flex'

        }else{
            tab.style.display = 'none'
        }

        i+=1
    }
}


// Tab Close Button HTML
const tabCloseButtomHTML =   '<button class="btn btn-tab-close"><span class="material-symbols-outlined">close</span></button>'
const cropperTabContent = (id) =>  `
<div class="image-resizer" style='width:var(--width-${id});height:var(--height-${id});'>
<img class="og-image" src="5.jpg" alt="" style='width:var(--width-${id});height:var(--height-${id});'>

<div class="controller" draggable="true">
    <img class="new-image" src="5.jpg" alt="" style='width:var(--width-${id});height:var(--height-${id});'>   
    <!-- <button class="top-dragger" draggable="true"></button> -->
</div>



<div class="top-dragger"></div>
<div class="bottom-dragger"></div>
<div class="left-dragger"></div>
<div class="right-dragger"></div>

</div>


<div class="cropper-actions">

<input type="file" class="image-file" accept="image/jpeg, image/jpg">
<button class="btn upload-button">Upload a image</button>


<div class="canvas">
    
</div>

<button class="btn download-button">Download Croped Image</button>


</div>

`

// Cropper Tabs
const cropperTabAdder = document.querySelector("#btn-crop")
let cropperTabNumber = 1;


const getCropperId = (e) => {
    const classnames = e.target.className.split(" ")
    // console.log("clicked")
    const className = classnames[classnames.length -1]
   const classId = className.split("-")[2]
   return classId
}

let removedOne = false;

// Crop tab listener
const cropTabClickListener = (e) => {

    if(removedOne){
        removedOne = false;
        return;
    }
    console.log("called")
    e.preventDefault()
   const classId = getCropperId(e)
    const tabViewContent = document.querySelector(".tab-content")
    for(const view of tabViewContent.querySelectorAll(".tab-view")){
        // console.log(view,classId)
        if(view.className.indexOf("tab-cropper-content-"+classId) >= 0){
            console.log("Found")
            view.style.display = 'flex'
        }else{
            console.log("Not found")
            view.style.display = 'none'
        }
    }
}

const cropTabRemoveListener = (e) => {

    removedOne = true;

    e.preventDefault()
    
    const p = {'target':e.target.parentElement.parentElement}

    const id = getCropperId(p)
 
    document.querySelector(".tab-cropper-content-"+id).remove()
    document.querySelector('.crop-tab-'+id).remove()

    setActiveTab(0)
}

cropperTabAdder.addEventListener('click',e => {
    e.preventDefault()

    const tabContent = document.querySelector(".tabs")
    const childTab = document.createElement("div")
    const tabViewContent = document.querySelector(".tab-content")

    for(const view of tabViewContent.querySelectorAll(".tab-view")){
        view.style.display = 'none'
    }

    childTab.className = 'tab crop-tab tab-active crop-tab-' +cropperTabNumber

    childTab.innerHTML = `Cropper ${cropperTabNumber} ${tabCloseButtomHTML}`
    tabContent.appendChild(childTab)


    const childViewTab = document.createElement("div")
    childViewTab.className = `tab-view tab-cropper-content tab-cropper-content-`+cropperTabNumber
    childViewTab.innerHTML = cropperTabContent(cropperTabNumber)

    tabViewContent.appendChild(childViewTab)
    createCropperActions(document.querySelector(`.tab-cropper-content-`+cropperTabNumber),cropperTabNumber)

    childTab.addEventListener('click',cropTabClickListener)

    childTab.querySelector("button").addEventListener('click',cropTabRemoveListener)

    cropperTabNumber += 1;
    // document.querySelector('.crop-tab-' +cropperTabNumber).addEventListener('click',cropTabClickListener)
})



