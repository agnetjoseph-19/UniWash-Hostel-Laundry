function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>UniWash</h2>
          <p>
            Campus laundry, simplified.
          </p>
        </div>

        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#why-uniwash">Why UniWash</a>
        </div>

        <div className="footer-info">
          <p>📅 Monday, Wednesday & Friday</p>
          <p>🕒 Pickup: 7:00 AM – 9:00 AM</p>
          <p>✨ Delivery within 48 hours</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 UniWash. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;