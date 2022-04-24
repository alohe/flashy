/* main */
let mainWidth = document.querySelector("#mainWidth");
let mainHeight = document.querySelector("#mainHeight");
let overRideDelay = document.querySelector("#overRideDelay");
let overRideFontSize = document.querySelector("#overRideFontSize");

/* User Added images */
let images = [];
/* images preview container */
let mainImagesContainer = document.querySelector("#mainImagesContainer");
/* preview thumbnail container */
let imagesContainer = document.querySelector("#images");

/* reset and play/stop buttons */
let clearBtn = document.querySelector("#clearBtn");
let ppBtn = document.querySelectorAll(".play-btn");

/* main view window */
let mainImgContainer = document.querySelector("#mainImgContainer");
let animeImg = document.querySelector("#animeImg");
let animeText = document.querySelector("#animeText");

/* current image */
let currentId = "";
let currentEditImage = document.querySelector("#currentEditImage");
let currentText = document.querySelector("#currentText");
let currentColor = document.querySelector("#currentColor");
let currentFontSize = document.querySelector("#currentFontSize");
let currentFontWeight = document.querySelector("#currentFontWeight");
let currentShadowValue = document.querySelector("#currentShadowValue");
let currentShadowColor = document.querySelector("#currentShadowColor");
let currentDelay = document.querySelector("#currentDelay");
let currentRotation = document.querySelector("#currentRotation");
let currentRotationInput = document.querySelector("#currentRotationInput");

let currentTop = 136;
let currentLeft = 21;
let currentAlignment = "center";

let editorBackground = document.querySelector("#editorBackground");
let editor = document.querySelector(".editor");

/* remove current image beig edited */
let removeCurrentImage = document.querySelector("#removeCurrentImage");

let width = 400;
let height = 400;


$(".url-input-container").hide();

function addUrlImageBtn() {
  if ($(".url-input-container").is(":visible")) {
    $(".url-input-container").fadeOut(500);
    $("#linkBtn").removeClass("btn-secondary");
    $("#linkBtn").html('<i class="fa fa-link"></i>');
  } else {
    $(".url-input-container").fadeIn(500);
    $("#linkBtn").addClass("btn-secondary");
    $("#linkBtn").html('<i class="fa fa-times"></i>');
  }
}

function toggleControls() {
  if ($("#controls").hasClass("show")) {
    $("#controls").removeClass("show");
    $("#controls").addClass("hide");
    $(".showControls").addClass("show");
    $("#hideBtn").hide();
    $("#showBtn").show();
    $(".main-container").removeClass("edit");
    $(".main-container").addClass("full");
  } else {
    $(".showControls").removeClass("show");
    $("#controls").addClass("show");
    $("#controls").removeClass("hide");
    $("#hideBtn").fadeIn();
    $("#showBtn").hide();
    $(".main-container").addClass("edit");
    $(".main-container").removeClass("full");
  }
}

/* image upload */
function handleImage(files) {
  mainImagesContainer.hidden = false;
  clearBtn.hidden = false;
  mainImgContainer.hidden = false;

  if (files.length > 0) {
    [...files].forEach((each) => {
      let newImg = URL.createObjectURL(each);
      images.push({
        id: images.length,
        img: newImg,
        text: "",
        color: "#ffffff",
        fontsize: "120",
        fontweight: "700",
        shadow: "100",
        shadowcolor: "#000000",
        delay: 500,
        top: '50%',
        left: '50%',
        align: "center",
        rotation: 0,
      });

      imagesContainer.innerHTML += `
              <div class="img-component col-lg-3" onclick="editImage(${
                images.length - 1
              })">
                <div class="img" style="background-image: url('${newImg}');"></div>
              </div>
          `;
    });
  }

  ppBtn.forEach((each) => {
    if (images.length > 0) {
      each.hidden = false;
    }
  });
}

function urlImageUpload() {
  let urlInput = document.querySelector("#urlInput");
  if (urlInput.value.length > 3) {
    imagesContainer.hidden = false;
    clearBtn.hidden = false;

    let newImg = urlInput.value;
    let id = images.length;
    images.push({
      id: id,
      img: newImg,
      text: "",
      color: "#ffffff",
      fontsize: "120",
      fontweight: "700",
      shadow: "100",
      shadowcolor: "#000000",
      delay: 500,
      top: 136,
      left: 21,
      align: "center",
      rotation: 0,
    });

    imagesContainer.innerHTML += `
            <div class="img-component col-lg-3" onclick="editImage(${id})">
              <div class="img" style="background-image: url('${newImg}');"></div>
            </div>
        `;

    ppBtn.forEach((each) => {
      if (images.length > 0) {
        each.hidden = false;
      }
    });

    mainImagesContainer.hidden = false;
    clearBtn.hidden = false;
    mainImgContainer.hidden = false;
  }
  urlInput.value = "";
}

function clearImages() {
  if (confirm("Are you sure all data will be lost if you continue!") == true) {
    location.reload();
  }
}

function editTextClick() {
  editImage(currentId);
}

function editImage(id) {
  console.log(id);
  currentId = id;
  currentEditImage.style.cssText = `background-image: url('${images[id].img}')`;

  currentText.value = images[id].text;
  currentColor.value = images[id].color;
  currentFontSize.value = images[id].fontsize;
  currentFontWeight = images[id].fontweight;
  currentShadowValue.value = images[id].shadow;
  currentShadowColor.value = images[id].shadowcolor;
  currentDelay.value = images[id].delay;
  currentTop = images[id].top;
  currentLeft = images[id].left;
  currentAlignment = images[id].align;
  currentRotation.style.transform = images[id].rotation;

  animeImg.style.cssText = `background-image: url('${images[id].img}')`;
  animeText.innerHTML = images[id].text;
  animeText.style.cssText = `color: ${images[id].color}; text-shadow: 0 0 ${images[id].shadow}px ${images[id].shadowcolor}; font-weight: ${images[id].fontweight}; font-size: ${images[id].fontsize}px;`;

  animeText.style.top = images[id].top + "px";
  animeText.style.left = images[id].left + "px";

  animeText.style.textAlign = images[id].align;

  animeText.style.transform = `rotate(${images[id].rotation}deg)`;
  currentRotationInput.value = images[id].rotation;

  editor.hidden = false;
  editorBackground.hidden = false;

  currentText.focus();
}

function textAlignment(el) {
  currentAlignment = el.value;
  animeText.style.textAlign = el.value;
  images[currentId].align = el.value;
  document.querySelectorAll(".text-alignment-btn").forEach((each) => {
    if (each.value == el.value) {
      each.classList.add("active");
    } else {
      each.classList.remove("active");
    }
  });
}

dragElement(animeText);

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

    images[currentId].top = elmnt.offsetTop - pos2;
    images[currentId].left = elmnt.offsetLeft - pos1;

    console.log(elmnt.offsetTop - pos2);
    console.log(elmnt.offsetLeft - pos1);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

currentText.addEventListener("keyup", (el) => {
  let val = el.target.value;
  images[currentId].text = val;
  animeText.innerHTML = val;
});

currentColor.addEventListener("change", (el) => {
  let val = el.target.value;
  images[currentId].color = val;
  animeText.style.color = val;
});

/* current image edit font update */
currentFontSize.addEventListener("change", (el) => {
  let val = el.target.value;
  images[currentId].fontsize = val;
  animeText.style.fontSize = `${val}px`;
});

currentFontSize.addEventListener("keyup", (el) => {
  let val = el.target.value;
  images[currentId].fontsize = val;
  animeText.style.fontSize = `${val}px`;
});

/* current image edit Font Weight */
currentFontWeight.addEventListener("change", (el) => {
  let val = el.target.value;
  images[currentId].fontweight = val;
  animeText.style.fontWeight = val;
});

/* current image edit shadow  */
currentShadowValue.addEventListener("change", (el) => {
  let val = el.target.value;
  images[currentId].shadow = val;
  animeText.style.textShadow = ` 0 0 ${val}px ${images[currentId].shadowcolor}`;
});

/* current image edit shadow color  */
currentShadowColor.addEventListener("change", (el) => {
  let val = el.target.value;
  images[currentId].shadowcolor = val;
  animeText.style.textShadow = ` 0 0 ${images[currentId].shadow}px ${val}`;
});

/* current image edit image delay  */
currentDelay.addEventListener("change", (el) => {
  let val = el.target.value;
  images[currentId].delay = val;
});

currentRotation.addEventListener("mousemove", (el) => {
  let val = el.target.value;
  images[currentId].rotation = val;
  animeText.style.textShadow = `0 0 10px 0 red;`;
  animeText.style.transform = `rotate(${val}deg)`;
  currentRotationInput.value = val;
});

currentRotationInput.addEventListener("keyup", (el) => {
  if (el.target.value.length >= 0) {
    let val = el.target.value;
    images[currentId].rotation = val;
    animeText.style.textShadow = `0 0 10px 0 red;`;
    animeText.style.transform = `rotate(${val}deg)`;
    currentRotation.value = val;
  } else {
    images[currentId].rotation = 0;
    animeText.style.textShadow = `0 0 10px 0 red;`;
    animeText.style.transform = `rotate(${0}deg)`;
    currentRotation.value = 0;
  }
});

removeCurrentImage.addEventListener("click", (el) => {
  let arr = [...images];
  console.log(arr)
  arr = images.filter((each) => {
    return each.id !== currentId;
  });
  images = arr;
  console.log(images)
  console.log(arr);
  console.log(images);
  editor.hidden = true;

  imagesContainer.innerHTML = "";
  images.forEach((image, id) => {
    image.id = id;
    imagesContainer.innerHTML += `
            <div class="img-component col-lg-3" onclick="editImage(${id})">
              <div class="img" style="background-image: url('${image.img}');"></div>
            </div>
        `;
  });
});


/* main width and height */
mainWidth.addEventListener("keyup", (el) => {
  let val = el.target.value;
  width = val;
  mainImgContainer.style.cssText = `width: ${val}px; height: ${height}px;`;
});

mainHeight.addEventListener("keyup", (el) => {
  let val = el.target.value;
  height = val;
  mainImgContainer.style.cssText = `width: ${width}px; height: ${val}px;`;
});

/* closeeditor */
function hideEditor() {
  editorBackground.hidden = true;
  editor.hidden = true;
}

let animeCounter = 0;
let animeDelay = 1;
let animating = false;
let intervalID;
let initial = true;

overRideDelay.addEventListener("change", (el) => {
  let val = el.target.value;
  images.forEach((each) => {
    each.delay = val;
  });
  animeCounter = 0;
  clearInterval(intervalID);
  animeDelay = 0;
  initial = true;
  if (animating) {
    animating = false;
    start();
  }
});

overRideFontSize.addEventListener("change", (el) => {
  let val = el.target.value;
  images.forEach((each) => {
    each.fontsize = val;
  });
  animeCounter = 0;
});

function start() {
  if (animating == false) {
    animating = true;
    ppBtn.forEach((each) => {
      each.disabled = false;
      each.innerHTML = `<i class="fa fa-stop"></i>`;
    });

    let looper = () => {
      /* to avoid default delay value run through before applying custom delay for each image */
      intervalID = setTimeout(() => {
        currentId = animeCounter;
        currentEditImage.style.cssText = `background-image: url('${images[animeCounter].img}')`;

        currentText.value = images[animeCounter].text;
        currentColor.value = images[animeCounter].color;
        currentFontSize.value = images[animeCounter].fontsize;
        currentFontWeight = images[animeCounter].fontweight;
        currentShadowValue.value = images[animeCounter].shadow;
        currentShadowColor.value = images[animeCounter].shadowcolor;
        currentDelay.value = images[animeCounter].delay;

        animeDelay = images[animeCounter].delay;

        animeImg.style.cssText = `background-image: url('${images[animeCounter].img}')`;
        animeText.innerHTML = images[animeCounter].text;
        animeText.style.cssText = `color: ${images[animeCounter].color}; text-shadow: 0 0 ${images[animeCounter].shadow}px ${images[animeCounter].shadowcolor}; font-weight: ${images[animeCounter].fontweight}; font-size: ${images[animeCounter].fontsize}px;`;

        animeText.style.top = images[animeCounter].top + "px";
        animeText.style.left = images[animeCounter].left + "px";

        animeText.style.textAlign = images[animeCounter].align;

        animeText.style.transform = `rotate(${images[animeCounter].rotation}deg)`;
        currentRotationInput.value = images[animeCounter].rotation;

        editor.hidden = true;
        editorBackground.hidden = true;
        console.log(animeDelay);

        if (animeCounter < images.length - 1) {
          animeCounter += 1;
          if (animating) {
            looper();
          }
        } else {
          animeCounter = 0;
          initial = false;
          if (animating) {
            looper();
          }
        }
      }, animeDelay);
    };

    looper();
  } else {
    animating = false;
    animeCounter = 0;
    initial = false;
    animating = false;
    clearInterval(intervalID);
    ppBtn.forEach((each) => {
      each.disabled = false;
      each.innerHTML = `<i class="fa fa-play"></i>`;
    });
  }
}
