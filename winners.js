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
        
        
        
        
        
        
        

        async function getMeaning(query) { try { const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=${encodeURIComponent(query)}&origin=*`);
         const data = await response.json(); const page = Object.values(data.query.pages)[0]; if (page && page.extract) { return page.extract; } 
        else { return "Sorry, I couldn't find a definition for that term."; } } catch (error) { return "There was an error fetching the definition."; } }
        
          function getDateTimeResponse(query) {
            const now = new Date();
            let response;

            if (query.includes('time')) {
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                response = `The current time is ${hours}:${minutes}:${seconds}`;
            } else if (query.includes('date')) {
                const day = now.getDate().toString().padStart(2, '0');
                const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
                const year = now.getFullYear();
                response = `Today's date is ${month}/${day}/${year}`;
            } else if (query.includes('year')) {
                const year = now.getFullYear();
                response = `The current year is ${year}`;
            } else {
                response = "Sorry, I didn't understand your request.";
            }

            return response;
        }


        async function takeCommand(message) {
            let handled = false; // Flag to track if a command was handled

            if (message.includes('define ') || message.includes('what is ')||message.includes('who is ')) {
                const query = message.split('define ')[1] || message.split('what is ')[1] || message.split('who is ')[1];
                if (query) {
                    const definition = await getMeaning(query.trim());
                    speak(definition);
                    content.textContent = definition;
                } else {
                    speak("I didn't catch the term to define.");
                    content.textContent = "I didn't catch the term to define.";
                }
handled = true;
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
            }
             
             
           if (message.includes('bible verse')) {
 
  const bibleRegex = /bible verse (\d?(?:1|2|3|[1-3]?)?\s?\w+) (\d+):(\d+)/i;
  const match = message.match(bibleRegex);

  if (match) {
    const [book, chapter, verse] = match.slice(1);
    const bibleVerse = await fetchBibleVerse(book.trim(), chapter, verse);

    speak(bibleVerse);
    content.textContent = bibleVerse;
  } 
  else {
    speak("");
    content.textContent = "";
  }

  handled = true;
}

if (!handled) {
  const response = "";
  speak(response);
  content.textContent = response;
}
    
             
             
             
             
            else if (message.includes('can I know the time') || message.includes('time')) {
                const response = getDateTimeResponse('time');
                speak(response);
                content.textContent = response;
                handled = true;
            } else if (message.includes("date") || message.includes('date')) {
                const response = getDateTimeResponse('date');
                speak(response);
                content.textContent = response;
                handled = true;
            } else if (message.includes('year') || message.includes('year')) {
                const response = getDateTimeResponse('year');
                speak(response);
                content.textContent = response;
                handled = true;} 
                else if (message.includes('winner') || message.includes('chioma')) {
                const response = getDateTimeResponse('sisters');
                speak('They are my boss sisters,the baazzer queens ');
                
} else if (message.includes('hey') || message.includes('hello')) {
                const response = "Hi, how may I help you today?";
                speak(response);
                content.textContent = response;
                handled = true;
            } else if (message.includes('what is the time')) {
                const now = new Date();
                const time = now.getHours() + ":" + now.getMinutes();
                speak(`The current time is ${time}`);
                content.textContent = `The current time is ${time}`;
                handled = true;
            } else if (message.includes('which food am i going to eat')) {
                const response = "I don't know,but my master love garri and egusi soup!!!,i would like if you give it a try";
                speak(response);
                content.textContent = response;
                handled = true;
            }
            else if (message.includes('which food am i going to eat||Am i going to eat today')) {
                const response = "I don't know,but my master love garri and egusi soup!!!,i would like if you give it a try";
                speak(response);
                content.textContent = response;
                handled = true;
            }
            
           else if (message.includes('who are you')) {
                
                const responds= 'I am Kingsley, a web based Artificial Intelligence';
            speak(responds);
                content.textContent = responds;
                handled = true;   
            }
            
           
            
             else if (message.includes('what are you made for')) {
                speak('I was made to help lazy users search for things on the web');
                content.textContent = 'I was made to help lazy users search for things on the web';
                handled = true;
            }
            if (!handled) {
                const response = "";
                speak(response);
                content.textContent = response;
            }
        }   