"use client";

import React from "react";

const BackgroundAnimation: React.FC = () => (
  <video
    autoPlay
    muted
    loop
    className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
  >
    <source src="/dna.mp4" type="video/mp4" />
  </video>
);

export default BackgroundAnimation;
