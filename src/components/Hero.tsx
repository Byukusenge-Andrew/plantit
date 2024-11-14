// src/components/Hero.tsx
import React from "react";

export default function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center py-24 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/landing-image.jpg')" }}
    >
      <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">Discover Services at Your Fingertips</h2>
      <p className="mb-8 text-lg max-w-xl drop-shadow-md">Connect with trusted providers and access services customized for your needs.</p>
      <a href="/auth/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium">
        Join Now
      </a>
    </section>
  );
}
