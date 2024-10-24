"use client"; // This makes the component a Client Component

import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';

// Jumping animation for the microphone icon
const jump = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// Beaming animation (pulsating effect)
const beam = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 40px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

// Voice wave animation (zigzag)
const voiceWave = keyframes`
  0% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
  100% { transform: scaleY(1); }
`;

// Adding custom types for styled components
interface VoiceWaveProps {
  visible: boolean;
}

interface WaveBarProps {
  delay: number;
}

// Styled component for the voice wave animation
const VoiceWaveContainer = styled.div<VoiceWaveProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 20px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const WaveBar = styled.div<WaveBarProps>`
  width: 5px;
  height: 20px;
  background-color: #ff7f7f;
  margin: 0 3px;
  animation: ${voiceWave} 0.5s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;
`;

// Shared hover effect class
const hoverEffect = `
  background-color: #ffe0e0;
`;

// Declaring RoundedButton first to avoid reference issues
const RoundedButton = styled.button`
  margin-top: 20px;
  background-color: white;
  color: #ff7f7f;
  border: none;
  border-radius: 50px;
  padding: 12px 35px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    ${hoverEffect} /* Apply hoverEffect on hover */
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 25px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  animation: ${beam} 2s infinite;
  transition: background-color 0.3s ease;

  &:hover {
    ${hoverEffect}
  }

  ${RoundedButton}:hover & {
    ${hoverEffect} /* Apply hoverEffect when either is hovered */
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const MicrophoneIcon = styled(FaMicrophone)`
  font-size: 48px;
  color: #ff7f7f;
  animation: ${jump} 1s infinite;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(15px);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: inline-block;  /* Makes the background fit the text */
  max-width: 100%;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #ff7f7f;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;  /* Ensures text stays on one line */

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: #ff7f7f;
  font-weight: 400;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MicrophoneButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  position: relative;
  z-index: 1;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// The Microphone Button Component
const MicrophoneButton = () => {
  const [isListening, setIsListening] = useState(false);
  const [buttonText, setButtonText] = useState("Tap to test");
  const [micGranted, setMicGranted] = useState(false);

  const handleClick = () => {
    setIsListening(!isListening);
    setButtonText("Connecting...");

    // Request for microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        console.log('Microphone access granted');
        setMicGranted(true); // Show voice wave animation
        
        // Simulate an HTTP request to the endpoint after mic access
        setTimeout(() => {
          fetch('https://your-endpoint-url.com', {
            method: 'POST',
            body: JSON.stringify({ message: 'Microphone access granted' }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(() => {
            setButtonText("Stop call");
          }).catch((error) => {
            console.log('HTTP request failed', error);
            setButtonText("Tap to test");  // Reset text on failure
          });
        }, 1000); // Simulate delay for the HTTP request
      })
      .catch((error) => {
        console.log('Microphone access denied', error);
        setButtonText("Tap to test");  // Reset text on failure
      });
  };

  return (
    <MicrophoneButtonContainer>
      <VideoBackground>
        <video autoPlay loop muted playsInline>
          <source src="/molecule.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoBackground>
      <TitleContainer>
        <Title>AI Assistants for Medical Practices</Title>
        <SubTitle>Streamline Your Practice with PureCare's AI Solutions</SubTitle>
      </TitleContainer>
      <ButtonWrapper onClick={handleClick}>
        <MicrophoneIcon />
      </ButtonWrapper>
      <RoundedButton onClick={handleClick}>{buttonText}</RoundedButton>

      {/* Voice Wave Animation */}
      <VoiceWaveContainer visible={micGranted}>
        <WaveBar delay={0.1} />
        <WaveBar delay={0.2} />
        <WaveBar delay={0.3} />
        <WaveBar delay={0.4} />
        <WaveBar delay={0.5} />
      </VoiceWaveContainer>
    </MicrophoneButtonContainer>
  );
};

export default MicrophoneButton;
