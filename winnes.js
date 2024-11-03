const openBtn = document.querySelector(".open-btn")
const closeBtn = document.querySelector(".close-btn")
const sidebar = document.querySelector(".sidebar")

openBtn.addEventListener("click",function(){
    sidebar.classList.toggle("show-sidebar")
})
closeBtn.addEventListener("click",function(){
    sidebar.classList.remove("show-sidebar")

});

let currentSlide = 0;
const intervals = 3000;
function navigateSlide(){
    let coverSlide = document.querySelectorAll(".cover")
   coverSlide[currentSlide].classList.remove('active');
   currentSlide++;

  
   if(currentSlide === coverSlide.length){
   currentSlide = 0;
   coverSlide[currentSlide].classList.add('active')
   }
   if (currentSlide > coverSlide.length){
    currentSlide = 0;
    coverSlide[currentSlide].classList.add('active')
   }
   
  coverSlide[currentSlide].classList.add('active')
   
    }
   setInterval(()=>{
    navigateSlide();
  },
 intervals );
const btnns = document.querySelectorAll(".btn-tabs");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");1

about.addEventListener("click",function(e){
   const id = e.target.dataset.id;
   if(id){
      btnns.forEach(function (btnn) {
         btnn.classList.remove("activate");
         e.target.classList.add("activate");
      });
      articles.forEach(function (article) {
         article.classList.remove("activate");
         });
         const element = document.getElementById (id);
         element.classList.add("activate"); 
         
   }
});
document.onreadystatechange = function(){
   if(document.readyState !== "complete"){
      document.querySelector("body").style.visibility ="hidden";
      document.querySelector("#loader").style.visibility = "visible";
   }
   else{
      document.querySelector("body").style.visibility ="visible";
      document.querySelector("#loader").style.visibility = "hidden";
   }
}
const menuItems = document.querySelectorAll(".list")


menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    sidebar.classList.remove('show-sidebar');
  });
});



