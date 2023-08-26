import React, {useState} from 'react';
import axios from 'axios'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function generateStars(rating) {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    const starClassName = i <= filledStars ? 'fas fa-star text-yellow-500' : 'far fa-star text-yellow-500';
    stars.push(<i key={i} className={starClassName} />);
  }

  return stars;
}

function generateCard(image, name, rating) {
  return (
    <div className="carousel-card">
      <img src={image} alt="Lawyer" style={{ width: '150px', height: 'auto' }} />
      <h2>{name}</h2>
      <div className="rating">
        <span className="rating-stars">
          {generateStars(rating)}
        </span>
        <span className="rating-value">{rating}/5</span>
      </div>
      <button className="bg-blue-500 text-black px-4 py-2 rounded-lg" type="button">
        Book a Call
      </button>
    </div>
  );
}

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const sendMessage = async () => {
    // Send user input to the Flask API
    try {
      const response = await axios.post('http://127.0.0.1:5000/get_response', { input });
      const newMessage = { text: input, sender: 'user' };
      const botMessage = { text: response.data.response, sender: 'bot' };
      setMessages([...messages, newMessage, botMessage]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Dark Gray Menu Panel */}
      <div className="flex justify-center bg-slate-800 w-[18rem] min-h-screen">
        <nav className="flex flex-col h-full p-4">
        <p className='font-bold text-white text-5xl '>Clavio</p>
        <button onClick={() => setPopupVisible(true)} className="border border-gray-200 text-white font-bold px-[4rem] py-2 rounded-lg mt-6 hover:bg-blue-500 transition-colors">What is Clavio</button>
        {popupVisible && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
              <button
                onClick={() => setPopupVisible(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                <i className="fas fa-times"></i>
              </button>
              <h2 className="text-xl font-bold mb-4">Clavio Description</h2>
              <p className="text-gray-600">
                Clavio is your personal law assistant. It helps you with legal questions and concerns.
                {/* Add more description here */}
              </p>
            </div>
          </div>
        )}
        <button className="border border-emerald-400 text-white font-bold px-4 py-2 rounded-lg mt-6 hover:bg-emerald-400 transition-colors">Support us!</button>

        <div class="flex justify-center gap-4  ">
              <p className='border bg-gray-300 p-2 rounded-lg h-[15rem] w-[10rem] mt-[20rem]'>Ad</p>
        </div>
        
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-white p-8">
        <h1 className="text-4xl mb-4 mt-2 font-bold text-black">Clavio - chat with the US Constitution</h1>
        <div className="flex flex-col flex-grow">
        <div className="flex-grow overflow-y-auto mb-4">
            {/* Scrollable message container */}
            <div className="p-4 bg-gray-100 h-[10rem] rounded-lg flex flex-col justify-start items-center">
              {/* Render messages */}
                {messages.map((message, index) => (
                  <div key={index} className={`my-2 ${message.sender === 'user' ? 'text-black' : 'text-blue-400'}`}>
                  {message.text}
                  </div>
                ))}
            </div>
          </div>

          <div>

          </div>
          <div className="p-4 rounded-lg">
            <div className="flex justify-between items-center mt-5">
                <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow border rounded-lg p-3 mr-2 py-4"
              type="text"
              placeholder="Send your message"
              onKeyDown={handleKeyDown}
            />
              <button
                onClick={sendMessage}
                className="text-black font-bold text-2xl px-10 py-4 rounded-lg bg-emerald-400 hover:bg-blue-500 transition-colors"
                type="button"
              >
                Send
              </button>
              
            </div>

                      {/* Adjusted caption */}
            <p className="py-35 pt-20 text-center text-black text-2xl font-bold">
              Examples of questions you can ask me:
            </p>
            <div class="flex justify-center gap-4 pl-30 pt-5">
              <button class="border border-gray-900 bg-slate-800 text-white p-4 rounded hover:bg-gray-800 transition-colors">What are my rights if I'm arrested?</button>
              <button class="border border-gray-900 bg-slate-800 text-white p-4 rounded hover:bg-gray-800 transition-colors">Someone's dog bit me, what can I do?</button>
              <button class="border border-gray-900 bg-slate-800 text-white p-4 rounded hover:bg-gray-800 transition-colors">What if the police ask to search my vehicle?</button>
              <button class="border border-gray-900 bg-slate-800 text-white p-4 rounded hover:bg-gray-800 transition-colors">What factors determine if charges can be dropped?</button>
            </div>
          
            <div class="flex justify-center gap-4 pl-20 pt-5 ">
              <p className='border bg-gray-300 p-2 rounded-lg h-[5rem] w-[25rem] mt-[3rem]'>Ad</p>
            </div>

            <div className='flex justify-center'>
          <button
                className="text-black text-2xl font-bold px-[15rem] py-4 rounded-lg ml-2 bg-emerald-400 hover:bg-blue-500 transition-colors mt-5"
                type="button"
              >
                Book a lawyer
              </button>
          </div>

          </div>

          
        </div>
      </div>
    </div>
    
  );
}

export default App;
