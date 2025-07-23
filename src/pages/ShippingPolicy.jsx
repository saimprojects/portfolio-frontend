import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Shipping & Service Delivery Policy</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Introduction</h2>
        <p className="text-gray-600 leading-relaxed">
          At www.meetsaim.online, we provide digital and service-based deliverables through our portfolio platform. This Shipping & Service Delivery Policy explains how we deliver services and any associated physical products, including timelines and processes.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Service Delivery</h2>
        <p className="text-gray-600 leading-relaxed">
          Our services, such as web development, design, or consultation, are delivered digitally via email, cloud-based platforms, or direct communication. Delivery timelines depend on the service scope:
          <ul className="list-disc pl-5 mt-2">
            <li>Standard services: Delivered within 3-5 business days after payment confirmation.</li>
            <li>Custom projects: Timelines agreed upon during the consultation phase, typically 7-14 business days.</li>
          </ul>
          You will receive updates on project milestones via email or phone.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Physical Product Shipping (If Applicable)</h2>
        <p className="text-gray-600 leading-relaxed">
          For any physical deliverables (e.g., printed portfolios or promotional materials), we offer nationwide shipping within Pakistan:
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Shipping Timeline:</strong> 3-5 business days after order confirmation.</li>
            <li><strong>Packaging:</strong> Secure packaging to ensure products arrive in excellent condition.</li>
            <li><strong>Costs:</strong> Shipping charges vary based on location and will be calculated at checkout.</li>
          </ul>
          Tracking information will be provided once the item is shipped.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Delays and Issues</h2>
        <p className="text-gray-600 leading-relaxed">
          While we strive for timely delivery, delays may occur due to unforeseen circumstances (e.g., technical issues or shipping carrier delays). We will notify you promptly and provide updated timelines. If a service or product is not delivered as promised, please contact us to resolve the issue.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Contact Us</h2>
        <p className="text-gray-600 leading-relaxed">
          For questions about service delivery or shipping, please contact:
          <br />
          <strong>Email:</strong> support@meetsaim.online
          <br />
          <strong>Phone:</strong> +923131471263
          <br />
          <strong>Address:</strong> Punjab Kasur Sethi Colony Street No 1, Pakistan
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;