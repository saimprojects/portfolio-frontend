import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">1. Introduction</h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to www.meetsaim.online. We are committed to safeguarding your privacy and ensuring that your personal information is protected. This Privacy Policy explains how we collect, use, disclose, and secure your data when you visit our website or engage with our services, including transactions processed through our secure payment gateway. By using our website, you agree to the terms outlined in this policy.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">2. Information We Collect</h2>
        <p className="text-gray-600 leading-relaxed">
          We collect information to provide and improve our services. The types of information include:
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, billing details, and other information you provide when requesting services or making payments.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, pages visited, and time spent, collected via cookies and analytics tools.</li>
            <li><strong>Payment Information:</strong> Transaction details processed through our payment gateway, handled securely by third-party providers.</li>
          </ul>
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">3. How We Use Your Information</h2>
        <p className="text-gray-600 leading-relaxed">
          Your information is used for the following purposes:
          <ul className="list-disc pl-5 mt-2">
            <li>To process and fulfill service requests or transactions via our payment gateway.</li>
            <li>To communicate with you regarding project updates, inquiries, or support.</li>
            <li>To enhance website functionality and user experience through analytics.</li>
            <li>To comply with legal obligations and prevent fraud or unauthorized access.</li>
          </ul>
          We do not sell or share your personal information with third parties except as necessary for payment processing, service delivery, or legal compliance.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">4. Data Security</h2>
        <p className="text-gray-600 leading-relaxed">
          We employ robust security measures, including encryption and Secure Socket Layer (SSL) technology, to protect your data during transmission and storage. While we strive to ensure the highest level of security, no online transmission method is entirely risk-free.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">5. Cookies and Tracking</h2>
        <p className="text-gray-600 leading-relaxed">
          Our website uses cookies to enhance user experience and analyze site performance. You can manage cookie preferences through your browser settings. By continuing to use our website, you consent to our use of cookies as described.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">6. Your Privacy Rights</h2>
        <p className="text-gray-600 leading-relaxed">
          You have the right to:
          <ul className="list-disc pl-5 mt-2">
            <li>Access or request a copy of your personal data.</li>
            <li>Correct inaccurate or incomplete information.</li>
            <li>Request deletion of your data, subject to legal retention requirements.</li>
            <li>Opt out of non-essential communications, such as marketing emails.</li>
          </ul>
          To exercise these rights, please contact us at support@meetsaim.online.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">7. Third-Party Services</h2>
        <p className="text-gray-600 leading-relaxed">
          Our payment gateway and analytics providers may collect data as part of their services. These third parties have their own privacy policies, and we encourage you to review them. We ensure that any third-party partners adhere to strict data protection standards.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">8. Updates to This Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          We may revise this Privacy Policy to reflect changes in our practices or legal requirements. Updates will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">9. Contact Us</h2>
        <p className="text-gray-600 leading-relaxed">
          If you have any questions or concerns about this Privacy Policy, please reach out to us:
          <br />
          <strong>Website:</strong> <a href="https://www.meetsaim.online" className="text-blue-600 hover:underline">www.meetsaim.online</a>
          <br />
          <strong>Email:</strong> <a href="mailto:support@meetsaim.online" className="text-blue-600 hover:underline">support@meetsaim.online</a>
          <br />
          <strong>Phone:</strong> +923131471263
          <br />
          <strong>Address:</strong> Punjab Kasur Sethi Colony Street No 1, Pakistan
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;