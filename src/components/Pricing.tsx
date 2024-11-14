// src/components/Pricing.tsx
import React from "react";

function PricingCard({ title, price, features }: { title: string; price: string; features: string[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-2xl font-bold mb-4">{price}</p>
      <ul className="mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="text-gray-600">{feature}</li>
        ))}
      </ul>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Choose Plan</button>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10">Affordable Pricing</h3>
        <p className="mb-8">Choose the plan that suits you best and start today.</p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
          <PricingCard title="Basic" price="Free" features={["Access to limited services", "Basic support"]} />
          <PricingCard title="Premium" price="$29/month" features={["Unlimited services", "Premium support", "Discounted rates"]} />
          <PricingCard title="Enterprise" price="Contact Us" features={["Custom services", "Dedicated support"]} />
        </div>
      </div>
    </section>
  );
}
