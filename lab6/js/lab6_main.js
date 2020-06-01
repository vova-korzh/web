class Gallery extends HTMLElement  {

    constructor() {
        super() 

    let my_d = this.attachShadow({ mode: "open" }); 
    const div = this.createDiv("gallery", "imgs");
    const style = this.getStyle();

    my_d.appendChild(div);
    my_d.appendChild(style); 

    }  
    
    addImages(imgs, div_to_add){
        for(let img of imgs){
            let div_for_each_img = document.createElement("div");
            var image_to_create = document.createElement("img"); 

            div_for_each_img.setAttribute("onclick", "img_to_full_screen(this)") ;
            image_to_create.setAttribute("src", img) ;
            image_to_create.setAttribute('onload',"setImgSize(this)") ; 

            div_for_each_img.appendChild(image_to_create);
            div_to_add.appendChild(div_for_each_img);
        }
        return div_to_add;
    }  

    createDiv(val,galery_atr) { 
        let div_to_fill = document.createElement("div");
        div_to_fill.setAttribute("class", val);

    if (this.hasAttribute(galery_atr)) {
      let images = this.getAttribute(galery_atr).split(",");
      div_to_fill = this.addImages(images, div_to_fill);
    }

    return div_to_fill; 
    }

    set_whole_style() {
        return `
        .gallery {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .gallery div {
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: center;
          margin: 5px;
          width: 350px;
          height: 350px;
        }
        div .fullscreen {
          position: fixed;
          width: 100%;
          height: 100%;
          transition: all 1s ease-in
        }`;
      } 

    getStyle() {
        const style = document.createElement("style");
        style.innerHTML = this.set_whole_style();
        return style;
      }

    } 


function resize(img, height, width) {
      img.style.height = height;
      img.style.width = width;
  } 

function img_to_full_screen(img) { 
      if(img.getAttribute('class') !== 'fullscreen'){
          img.setAttribute('class', 'fullscreen');
      }
      else {
          img.setAttribute('class', '');
      } 
  } 
function setImgSize(img) {
      if (img.clientWidth < img.clientHeight) {
          resize(img, "auto", "90%");
        }
        else {
          resize(img, "90%", "auto");
        }
  }


    
customElements.define("n-gallery", Gallery);



