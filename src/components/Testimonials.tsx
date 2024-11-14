// src/components/Testimonials.tsx
import React from "react";

export default function Testimonials() {
  return (
    <section className="container mx-auto py-20 text-center bg-gray-100">
      <h3 className="text-3xl font-bold mb-10">What Our Users Say</h3>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>&quot;Amazing platform! Helped me find what I needed.&quot;</p>
          <h4 className="font-bold mt-4">- User 1</h4>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>&quot;Super easy to use and trustworthy providers!&quot;</p>
          <h4 className="font-bold mt-4">- User 2</h4>
        </div>
      </div>
    </section>
  );
}
