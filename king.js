$(document).ready(function() { $(window).scroll(function() { $('.animated-text, .animate').each(function() { var position = $(this).offset().top; var windowHeight = $(window).height(); var windowTop = $(window).scrollTop(); 
    if (position < windowTop + windowHeight) { $(this).addClass('show-animate'); } }); }); });


$(document).ready(function() { $(window).scroll(function() { $('.animated-text2, .animate2').each(function() { var position = $(this).offset().top; var windowHeight = $(window).height(); var windowTop = $(window).scrollTop(); 
    if (position < windowTop + windowHeight) { $(this).addClass('show-animate'); } }); }); });
function isInViewport(element) { var bounding = element.getBoundingClientRect(); return ( bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) ); } function handleAnimation() { var elementsToAnimate = document.querySelectorAll('.content'); elementsToAnimate.forEach(function(element) { 
if (isInViewport(element)) { element.classList.add('active'); } });} 
window.addEventListener('scroll',handleAnimation); 
window.addEventListener('load', handleAnimation);