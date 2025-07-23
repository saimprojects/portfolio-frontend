import React from "react";

const ReturnRefundPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Return & Refund Policy</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Introduction</h2>
        <p className="text-gray-600 leading-relaxed">
          At www.meetsaim.online, we strive to ensure satisfaction with our services. This Return & Refund Policy outlines the conditions under which you may request a refund for services purchased through our payment gateway.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Eligibility for Refunds</h2>
        <p className="text-gray-600 leading-relaxed">
          You may request a refund under the following conditions:
          <ul className="list-disc pl-5 mt-2">
            <li>The service was not delivered as described in the service agreement.</li>
            <li>A technical issue on our end prevented service delivery.</li>
            <li>The request is made within 7 days of the service purchase date.</li>
          </ul>
          Refunds are not applicable for dissatisfaction due to unmet expectations unless the service significantly deviates from the agreed scope.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Refund Process</h2>
        <p className="text-gray-600 leading-relaxed">
          To request a refund:
          <ol className="list-decimal pl-5 mt-2">
            <li>Contact us at support@meetsaim.online with your order details and reason for the refund request.</li>
            <li>Our team will review the request within 3 business days.</li>
            <li>Upon approval, refunds will be processed within 5-7 business days via the original payment method used through our payment gateway.</li>
          </ol>
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Non-Refundable Services</h2>
        <p className="text-gray-600 leading-relaxed">
          The following are non-refundable:
          <ul className="list-disc pl-5 mt-2">
            <li>Services already completed or partially delivered as per the agreement.</li>
            <li>Customized services tailored specifically to your requirements.</li>
            <li>Services where the client fails to provide necessary information or feedback within the agreed timeframe.</li>
          </ul>
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Contact Us</h2>
        <p className="text-gray-600 leading-relaxed">
          For refund-related inquiries, please reach out to:
          <br />
          <strong>Email:</strong> saimpkf@gmail.com
          <br />
          <strong>Phone:</strong> +923131471263
          <br />
          <strong>Address:</strong> Punjab Kasur Sethi Colony Street No 1, Pakistan
        </p>
      </section>
    </div>
  );
};

export default ReturnRefundPolicy;