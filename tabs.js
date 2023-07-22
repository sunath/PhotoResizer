/**
 * This file is responsible for handling tabs
 * 
 * 
 */


const cropperTabAdder = document.querySelector("#btn-crop")
const resizeTabAdder = document.querySelector(".btn-resize")
let cropperTabNumber = 1;
let resizeTabNum = 1;

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


function clearActiveTabs(){
    for(const t of document.querySelectorAll(".tab-view")){
        t.style.display = 'none';
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





const getCropperId = (e) => {
    const classnames = e.target.className.split(" ")
    // console.log("clicked")
    const className = classnames[classnames.length -1]
   const classId = className.split("-")[2]
   return classId
}

const getIdOfTab = (e) => {
    const classnames = e.target.className.split(" ")
    // console.log("clicked")
    const className = classnames[classnames.length -1]
    return className
}

let removedOne = false;

// Crop tab listener
const tabClickListener = (e) => {

    if(removedOne){
        removedOne = false;
        return;
    }
    
    e.preventDefault()

    const id = getIdOfTab(e)
    const tabViewContent = document.querySelectorAll(".tab-view")
    for(const view of tabViewContent){
        if(view.className.indexOf(id) > 0){
            console.log("found")
            view.style.display = 'flex'
        }else{
            view.style.display = 'none'
        }
    }
}


// Remove tab listener = 
const removeTabListener = (e) => {
    
    const element = document.querySelectorAll('.'+getIdOfTab({'target':e.target.parentElement.parentElement}))
    // console.log()
    if(!element)return;
    for(const e of element){
        e.remove()
    }

    setActiveTab(0)
}
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

    console.log(id)
 
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





const resizerTabInnerHtml = `
<div class="resize-img-container">
                        <img src="./resizer-default.jpeg" alt="" class="resize-image-preview">
                    </div>

                    <div class="resize-img-actions">

                        <h4 class="resize-img-actions-og-size">Orginiaal Image Size</h4>

                        <input type="file" class="resize-img-action-file" style="display: none;">

                        <h4 class="resize-img-new-image-percent">Reduce your image quality to 90%</h4>
                        <h4 class="resize-img-new-img-size">New Image Size</h4>

                        <input type="range" class="resize-img-resize-range-input" max="100" min="10" value="90">
                        <div class="resize-img-buttons">
                            <button class="btn resize-action-btn resize-new-image">
                                <span class="material-symbols-outlined">upload</span>
                            </button>

                            <button class="btn resize-action-btn resize-new-img-download-btn">
                                <span class="material-symbols-outlined">download</span>
                            </button>
                        </div>


                        <canvas style="display: none;">

                        </canvas>


                        <img class="resize-img-download-img" />

                        <a href="#" class="resize-download-link" download=""></a>

`

resizeTabAdder.addEventListener('click',(e) => {
    e.preventDefault()
    clearActiveTabs()

    const tabs = document.querySelector(".tabs")
    const tab  = document.createElement("div")

    tab.innerHTML = `Resizer ${resizeTabNum} ${tabCloseButtomHTML}`
    resizeTabNum +=1
    tab.className =  `tab btn tab-active crop-tab resize-tab  resize-tab-`+resizeTabNum
    tab.style.width = "100px"
  
    tabs.appendChild(tab)


    const viewTabs = document.querySelector(".tab-content")
    const viewTab = document.createElement("div")
    viewTab.className = "tab-view resize-tab resize-tab-"+resizeTabNum
    viewTab.innerHTML = resizerTabInnerHtml
    viewTabs.appendChild(viewTab)

    createAResizerImage(viewTab)
    tab.addEventListener('click',tabClickListener)

    tab.querySelector('button').addEventListener('click',removeTabListener)
})
