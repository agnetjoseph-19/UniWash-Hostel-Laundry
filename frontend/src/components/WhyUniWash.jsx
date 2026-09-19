function WhyUniWash() {
  const features = [
    {
      icon: "⚡",
      title: "48-Hour Delivery",
      description: "Get your clean clothes back within 48 hours.",
    },
    {
      icon: "📅",
      title: "Easy Slot Booking",
      description: "Book your laundry pickup in just a few simple steps.",
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description: "Simple and transparent pricing starting from ₹20/kg.",
    },
    {
      icon: "📍",
      title: "Convenient Collection",
      description: "Choose a collection point that is convenient for you.",
    },
    {
      icon: "📱",
      title: "Track Your Laundry",
      description: "Keep track of your laundry status from booking to delivery.",
    },
  ];

  return (
    <section className="why-uniwash" id="why-uniwash">
      <div className="why-container">

        <p className="section-tag">WHY UNIWASH</p>

        <h2>Why Choose UniWash?</h2>

        <p className="why-subtitle">
          Laundry made simple, convenient, and stress-free for students.
        </p>

        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyUniWash;