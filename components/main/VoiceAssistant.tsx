// VoiceAssistant.tsx
'use client';

import React from 'react';
// import { FaMicrophone } from 'react-icons/fa';

const VoiceAssistant = () => {

//   const handleMicrophoneClick = () => {
//     // Make an HTTP GET request when the microphone icon is clicked
//     fetch('https://your-link-here.com/api', {
//       method: 'GET',
//     })
//       .then((response) => {
//         // Handle the response
//         console.log('Response:', response);
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error('Error:', error);
//       });
//   };

  return (
    <div className="relative h-screen w-full">
      {/* Background Video - blackhole.webm */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      {/* Microphone Icon in the Center */}
      {/* <div className="absolute inset-0 flex items-center justify-center z-10">
        <button
          onClick={handleMicrophoneClick}
          className="text-white hover:text-gray-300 focus:outline-none"
          aria-label="Activate Voice Assistant"
        >
          <FaMicrophone size={100} color="green" />
        </button>
      </div> */}
    </div>
  );
};

export default VoiceAssistant;
