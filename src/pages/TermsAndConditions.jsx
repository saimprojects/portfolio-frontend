import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Terms and Conditions</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Introduction</h2>
        <p className="text-gray-600 leading-relaxed">
          By accessing or using www.meetsaim.online, you agree to be bound by these Terms and Conditions. These terms govern your use of our website, services, and transactions processed through our payment gateway.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Use of Our Website</h2>
        <p className="text-gray-600 leading-relaxed">
          You agree to:
          <ul className="list-disc pl-5 mt-2">
            <li>Use our website for lawful purposes only.</li>
            <li>Not reproduce, distribute, or exploit any content without permission.</li>
            <li>Provide accurate information during service inquiries and payment processes.</li>
          </ul>
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Payment Terms</h2>
        <p className="text-gray-600 leading-relaxed">
          All payments for services are processed through our secure payment gateway. You agree to:
          <ul className="list-disc pl-5 mt-2">
            <li>Pay the agreed-upon fees as outlined in the service agreement.</li>
            <li>Ensure sufficient funds are available for transactions.</li>
            <li>Contact us immediately regarding any payment disputes.</li>
          </ul>
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Intellectual Property</h2>
        <p className="text-gray-600 leading-relaxed">
          All content on www.meetsaim.online, including designs, text, and code, is our property or licensed to us. You may not use, copy, or distribute this content without prior written consent.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Limitation of Liability</h2>
        <p className="text-gray-600 leading-relaxed">
          We are not liable for any indirect, incidental, or consequential damages arising from your use of our website or services. Our liability is limited to the amount paid for the service in question.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Contact Us</h2>
        <p className="text-gray-600 leading-relaxed">
          For questions about these Terms and Conditions, please contact:
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

export default TermsAndConditions;