function Services() {
  const services = [
    {
      name: "Washing Only",
      price: "₹40/kg",
      icon: "🧺",
    },
    {
      name: "Washing + Drying",
      price: "₹60/kg",
      icon: "🌬️",
    },
    {
      name: "Washing + Drying + Ironing",
      price: "₹80/kg",
      icon: "👔",
    },
    {
      name: "Washing + Starch + Drying + Ironing",
      price: "₹100/kg",
      icon: "✨",
    },
    {
      name: "Ironing Only",
      price: "₹20/kg",
      icon: "👕",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">

        <p className="section-tag">OUR SERVICES</p>

        <h2>Choose Your Laundry Service</h2>

        <p className="services-subtitle">
          Simple laundry services at affordable prices.
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.name}>

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.name}</h3>

              <p className="service-price">
                {service.price}
              </p>

              <button>Choose Service</button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;