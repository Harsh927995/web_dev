function PrivacyPolicy({ onClose }) {
  return (
    <div className="legal-page-overlay" onClick={onClose}>
      <div className="legal-page-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: April 19, 2026</p>

          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Khoje Khatam ("we", "our", or "us") operates the Khoje Khatam website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our service to you:
            </p>
            <ul>
              <li><strong>Email Address:</strong> When you create an account or subscribe to our newsletter</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our platform</li>
              <li><strong>Device Information:</strong> Browser type, IP address, and operating system</li>
              <li><strong>Cookies:</strong> To enhance your user experience</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Use of Data</h2>
            <p>
              Khoje Khatam uses the collected data for various purposes:
            </p>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features of our service</li>
              <li>To provide customer care and support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Cookies</h2>
            <p>
              We use cookies to collect information about browsing activities and to remember your preferences. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
            <p>
              Types of cookies we use:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the operation of our website</li>
              <li><strong>Analytical Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing Cookies:</strong> Used to track visitors across websites</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Links to Other Sites</h2>
            <p>
              Our service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
            <p>
              We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Children's Privacy</h2>
            <p>
              Our service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us immediately.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Data Retention</h2>
            <p>
              We will retain your personal data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. User Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@khojekhatam.com<br />
              Website: www.khojekhatam.com<br />
              Address: Your Company Address Here
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
