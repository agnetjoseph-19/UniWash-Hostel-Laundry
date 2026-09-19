function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose a Service",
      description: "Select the laundry service that suits your needs.",
      icon: "🧺",
    },
    {
      number: "02",
      title: "Book a Slot",
      description: "Choose a convenient pickup slot and collection point.",
      icon: "📅",
    },
    {
      number: "03",
      title: "Give Your Clothes",
      description: "Drop off your laundry at the selected collection point.",
      icon: "👕",
    },
    {
      number: "04",
      title: "Get Them Back",
      description: "Receive your clean laundry within 48 hours.",
      icon: "✨",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-container">

        <p className="section-tag">HOW IT WORKS</p>

        <h2>Simple Steps. Fresh Clothes.</h2>

        <p className="how-subtitle">
          Getting your laundry done with UniWash is easy.
        </p>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>

              <div className="step-icon">
                {step.icon}
              </div>

              <span className="step-number">{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;