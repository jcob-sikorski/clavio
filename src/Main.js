import React from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


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
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button">
        Book a Call
      </button>
    </div>
  );
}


function Main() {
return (

<div className="flex min-h-screen">

          <div className="bg-gray-700 w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-semibold text-white mb-4">
              Welcome to Clavio
            </h1>
            <p className="text-gray-300 text-center mb-8 text-2xl">
              Your virtual legal assistant
            </p>

            <div class="flex justify-center mt-4">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg mx-2">SignUp</button>
              <button class="bg-green-600 text-white px-4 py-2 rounded-lg mx-2">Become Partner</button>
            </div>

            <div className="text-3xl mt-6 text-white">How can Clavio Chatbot help you?</div>

            {/* Container with three boxes */}
        <div className="flex justify-center mt-6">
        <div class="bg-blue-400 w-48 h-48 mx-2 rounded-lg text-center text-white-600 font-bold relative">
    <img src="one.png" class="w-12 h-12 absolute top-0 left-1/2 transform -translate-x-1/2" alt="1"/>
    <div className="mt-12">SignUp using button on the left, and gain access to Clavio ChatBot</div>
  </div>
  <div class="bg-green-400 w-48 h-48 mx-2 rounded-lg text-center text-white-600 font-bold relative">
    <img src="two.png" class="w-12 h-12 absolute top-0 left-1/2 transform -translate-x-1/2" alt="2"/>
    <div className="mt-12">Start chatting, you can ask any legal-oriented question, and you'll receive your answer immediately! Cool, right?</div>
  </div>
  <div class="bg-red-400 w-48 h-48 mx-2 rounded-lg text-center text-white-600 font-bold relative">
    <img src="three.png" class="w-12 h-12 absolute top-0 left-1/2 transform -translate-x-1/2" alt="3"/>
    <div className="mt-12">If after basic consultation with Clavio ChatBot you have more questions, choose one of our lawyers and book a call in a couple of seconds!</div>
  </div>
        </div>



  <div className="text-3xl mt-6 text-white">Choose between our most trused lawyers</div>
         {/* Infinite sliding carousel */}
         <Carousel
          className="mt-7 w-2/3"
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          autoPlay
          infiniteLoop
          interval={3000}
          transitionTime={500}
          renderIndicator={false} // Hide slide indicators if desired
          showIndicators={false} // Hide slide indicators if desired
          swipeable={false}
        >
          {/* Slide 1 */}
          <div className="flex justify-between ">
            {generateCard('avatar.png', 'Lawyer 1', 4)}
            {generateCard('avatar.png', 'Lawyer 2', 3)}
            {generateCard('avatar.png', 'Lawyer 3', 5)}
            {generateCard('avatar.png', 'Lawyer 4', 4)}
          </div>
          
          {/* Slide 2 */}
          <div className="flex justify-between ">
            {generateCard('avatar.png', 'Lawyer 1', 4)}
            {generateCard('avatar.png', 'Lawyer 2', 3)}
            {generateCard('avatar.png', 'Lawyer 3', 5)}
            {generateCard('avatar.png', 'Lawyer 4', 4)}
          </div>
            {/* Slide 2 */}
            <div className="flex justify-between">
            {generateCard('avatar.png', 'Lawyer 1', 4)}
            {generateCard('avatar.png', 'Lawyer 2', 3)}
            {generateCard('avatar.png', 'Lawyer 3', 5)}
            {generateCard('avatar.png', 'Lawyer 4', 4)}
          </div>
            {/* Slide 2 */}
            <div className="flex justify-between">
            {generateCard('avatar.png', 'Lawyer 1', 4)}
            {generateCard('avatar.png', 'Lawyer 2', 3)}
            {generateCard('avatar.png', 'Lawyer 3', 5)}
            {generateCard('avatar.png', 'Lawyer 4', 4)}
          </div>
          
          {/* Add more slides as needed */}
        </Carousel>
      </div>
          </div>

       

       
  );
}

export default Main;
