function TermsAndConditions({ onClose }) {
  return (
    <div className="legal-page-overlay" onClick={onClose}>
      <div className="legal-page-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="legal-content">
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Last Updated: April 19, 2026</p>

          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Khoje Khatam platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Khoje Khatam for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on Khoje Khatam</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Violate any laws or regulations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Disclaimer</h2>
            <p>
              The materials on Khoje Khatam are provided on an 'as is' basis. Khoje Khatam makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Limitations</h2>
            <p>
              In no event shall Khoje Khatam or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Khoje Khatam.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Khoje Khatam could include technical, typographical, or photographic errors. Khoje Khatam does not warrant that any of the materials on its website are accurate, complete, or current. Khoje Khatam may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Materials and Content</h2>
            <p>
              Unless otherwise stated, Khoje Khatam and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may view and print pages from the website for personal, non-commercial use, subject to restrictions set in these terms and conditions.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. User Responsibilities</h2>
            <p>
              Users are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of their account information</li>
              <li>Accepting responsibility for all activities that occur under their account</li>
              <li>Not using the platform for any illegal or unauthorized purpose</li>
              <li>Not transmitting any harmful or malicious code</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Modifications to Terms</h2>
            <p>
              Khoje Khatam may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p>
              Email: support@khojekhatam.com<br />
              Website: www.khojekhatam.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
