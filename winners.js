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
const articles = document.querySelectorAll(".content-su");1

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

function showDirections() {
      // Coordinates of the church (Replace with actual church location)
      const churchLatitude = 4.781662; // Example latitude
      const churchLongitude = 7.138733; // Example longitude

      // Check if geolocation is available
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            // Construct the Google Maps URL for directions
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${churchLatitude},${churchLongitude}&travelmode=driving`;

            // Open Google Maps in a new tab
            window.open(googleMapsUrl, '_blank');
          },
          (error) => {
            // Error handling for location access issues
            switch(error.code) {
              case error.PERMISSION_DENIED:
                alert("Permission to access location was denied. Please allow access to use this feature.");
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable. Try again later.");
                break;
              case error.TIMEOUT:
                alert("Request to get your location timed out. Try again.");
                break;
              default:
                alert("An unknown error occurred.");
                break;
            }
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }









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




const ai = document.querySelector('.ai');
const closeBtnns = document.querySelector('.closed');
const aiBtn = document.querySelector('.ai-general');

const btn = document.querySelector('.activator');
        const content = document.querySelector('.content');
        const mapContainer = document.querySelector('.map-container');

 
 aiBtn.addEventListener("click",function(){
   ai.classList.toggle("ai-active")
})
closeBtnns.addEventListener("click",function(){
    ai.classList.remove("ai-active")

});
 
 

        function speak(text) {
            const text_speak = new SpeechSynthesisUtterance(text);
            text_speak.rate = 1;
            text_speak.volume = 1;
            text_speak.pitch = 1;
            window.speechSynthesis.speak(text_speak);
        }
function reset() {
            content.textContent = '';
            btn.textContent = "Activate";
            speak("Refreshing...");
        }



        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = async (event) => {
            const currentIndex = event.resultIndex;
            const transcript = event.results[currentIndex][0].transcript;
            content.textContent = transcript;
            await takeCommand(transcript.toLowerCase()); // Await takeCommand to ensure it handles the command before proceeding
        }

        recognition.onerror = (event) => {
            content.textContent = `Error: ${event.error}`;
        }
btn.addEventListener('click', () => {
            if (btn.textContent === "Activate") {
                speak("Hi i am an artificial intelligence, you can ask me to quote any scripture");
                btn.textContent = "Stop Listening";
                recognition.start();
            } else {
                recognition.stop();
                window.speechSynthesis.cancel()
                btn.textContent = "Activate";
                content.textContent = ''; // Clear content when stopping
                speak("Initializing...");
                
            }
        });
        
        
        
        

async function fetchBibleVerse(book, chapter, verse) { 
try { 
const response = await fetch(`https://bible-api.com/${book}%20${chapter}:${verse}`); 
const data = await response.json(); 
if (data && data.text) { return `${data.reference}: ${data.text}`; }
 else { return "Sorry, I couldn't find that Bible verse."; } } catch (error) { return "There was an error fetching the Bible verse."; } } 
        
        
         
      
      
      async function searchWikipedia(query) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.query && data.query.search && data.query.search.length > 0) {
            // Get the first result's title and snippet
            const firstResult = data.query.search[0];
            const title = firstResult.title;
            const snippet = firstResult.snippet.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags

            return `Here's what I found about ${title}: ${snippet}`;
        } else {
            return `Sorry, I couldn't find any information on "${query}" in Wikipedia.`;
        }
    } catch (error) {
        console.error("Error fetching Wikipedia data:", error);
        return "There was an error fetching information from Wikipedia.";
    }
}
  
     
   
async function takeCommand(message) {
    let handled = false;

    if (message.toLowerCase().includes('search') || message.toLowerCase().includes('wiki')) 
    { const query = message.replace(/search|wiki/i, '').trim(); 
    if (query) 
    { const info = await searchWikipedia(query); speak(info); 
    content.textContent = info; handled = true; }
     else { speak("Please specify a search term."); 
     content.textContent = "Please specify a search term.";
      handled = true; }
    
    
    } else if (message.toLowerCase().includes('wiki')) {
        const query = message.replace('wiki', '').trim();
        if (query) {
            const info = await searchBibleWiki(query);
            speak(info);
            content.textContent = info;
            handled = true;
        } else {
            speak("Please specify a topic to search on Bible Wiki.");
            content.textContent = "Please specify a topic to search on Bible Wiki.";
            handled = true;
        }
    } else if (message.includes('open ')) {
        const website = message.split('open ')[1].trim();
        if (website) {
            speak(`Opening ${website}`);
            content.textContent = `Opening ${website}`;
            setTimeout(() => {
                window.open(`https://${website}`, '_blank');
            }, 1000);
        } else {
            speak("I didn't catch which website to open.");
            content.textContent = "I didn't catch which website to open.";
        }
        handled = true;
    } else if (message.includes('bible verse')) {
        const bibleRegex = /bible verse (\d?(?:1|2|3|[1-3]?)?\s?\w+) (\d+):(\d+)/i;
        const match = message.match(bibleRegex);

        if (match) {
            const [book, chapter, verse] = match.slice(1);
            const bibleVerse = await fetchBibleVerse(book.trim(), chapter, verse);

            speak(bibleVerse);
            content.textContent = bibleVerse;
        } else {
            speak("Please specify a book, chapter, and verse.");
            content.textContent = "Please specify a book, chapter, and verse.";
        }
        handled = true;
    }


            
             else if (message.includes('founder')) {
                speak('The founder of living Faith church is Bishop David oyedepo');
                content.textContent = 'The founder of living Faith church is Bishop David oyedepo';
                handled = true;
            }
                else if (message.includes('Children')) {
                speak('He has four children');
                content.textContent = 'He has four children';
                handled = true;
            }
    if (!handled) {
        const response = await getChatResponse(message);
        speak(response);
        content.textContent = response;
    }
}


        
          


        