const TermsConditions = () => {
    return (
      <>
        <div className="bg-white p-8 text-center border">
          <h1 className="text-4xl font-semibold mb-2">Terms & Conditions</h1>
          <span className="text-gray-600">Last Updated on 22/08/24</span>
        </div>
        <div className="bg-accent py-8 md:px-16 px-4">
          <div className="flex flex-col gap-6 bg-white md:px-8 px-4 py-6 border">
            <div className="flex flex-col gap-4">
              <h4><strong>Introduction</strong></h4>
              <p>Welcome to HASHTEL. By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding.</p>
            </div>
            <div className="flex flex-col gap-4">
              <h4><strong>User Accounts & Security</strong></h4>
              <ul className="list-disc list-outside pl-8">
                <li>You must be at least 18 years old to create an account.</li>
                <li>You are responsible for maintaining the confidentiality of your account details.</li>
                <li>We reserve the right to suspend or terminate accounts that violate our policies.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4><strong>Product Pricing & Availability</strong></h4>
              <ul className="list-disc list-outside pl-8">
                <li>Prices are subject to change without notice.</li>
                <li>We strive to maintain accurate stock information, but product availability is not guaranteed.</li>
                <li>We reserve the right to cancel any order if the price was incorrectly listed.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4><strong>Returns & Refunds</strong></h4>
              <ul className="list-disc list-outside pl-8">
                <li>Products can be replaced within 7 days if found defective upon delivery.</li>
                <li>Refunds are processed only if the product is unavailable for replacement.</li>
                <li>Physical damage must be reported within 24 hours of delivery.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4><strong>Cancellation Policy</strong></h4>
              <ul className="list-disc list-outside pl-8">
                <li>Orders cannot be canceled once shipped.</li>
                <li>Same-day delivery orders cannot be canceled.</li>
                <li>Special occasion offers are non-refundable.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4><strong>Shipping & Delivery</strong></h4>
              <ul className="list-disc list-outside pl-8">
                <li>We aim to deliver products within 7-10 business days.</li>
                <li>We are not responsible for incorrect addresses provided during checkout.</li>
                <li>Any delivery issues must be reported within 24 hours.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4><strong>Force Majeure</strong></h4>
              <p>We are not liable for delays or failures in performance due to circumstances beyond our control, including natural disasters, cyberattacks, or government actions.</p>
            </div>
            <div className="flex flex-col gap-4">
              <h4><strong>Dispute Resolution</strong></h4>
              <p>Any disputes will be resolved through arbitration before resorting to legal action.</p>
            </div>
            <div className="flex flex-col gap-4">
              <h4><strong>Modification of Terms</strong></h4>
              <p>We reserve the right to update these Terms & Conditions at any time. Users will be notified of significant changes.</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default TermsConditions;
  