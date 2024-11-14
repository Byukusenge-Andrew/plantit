// src/components/CallToAction.tsx
import React from "react";

export default function CallToAction() {
  return (
    <section className="bg-blue-600 text-white py-16 text-center">
      <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
      <p className="mb-8">Join us and experience seamless service access.</p>
      <a href="/auth/sign-up" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium">
        Join Now
      </a>
    </section>
  );
}
