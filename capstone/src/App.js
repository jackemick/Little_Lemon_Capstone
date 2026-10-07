import "./App.css";
import React from "react";
import BookingForm from "./BookingForm";
import BookingConfirmation from "./BookingConfirmation";
import bruschetta from "./images/bruschetta.jpg";
import fish from "./images/fish.jpg";
import pasta from "./images/red_pasta.jpg";
import salad from "./images/salad.jpg";
import { fetchAPI, submitAPI } from "./api";

const specials = [
  {
    name: "Greek Salad",
    description:
      "Fresh romaine, cucumbers, tomatoes, olives, feta, red onion, and lemon-oregano dressing.",
    price: "$12.50",
    image: salad,
  },
  {
    name: "Bruschetta",
    description:
      "Toasted housemade sourdough topped with ripe tomatoes, basil, garlic, and balsamic glaze.",
    price: "$7.90",
    image: bruschetta,
  },
  {
    name: "Grilled Fish",
    description:
      "Citrus-marinated fish fillet served with herbs, roasted vegetables, and lemon butter.",
    price: "$16.40",
    image: fish,
  },
  {
    name: "Penne Ragu",
    description:
      "A rich and hearty pasta dish with a savory tomato-based sauce and chunks of spicy sausage.",
    price: "$12.90",
    image: pasta,
  },
];

const testimonials = [
  {
    name: "Sarah",
    rating: "★★★★★",
    quote: "Amazing atmosphere and the pasta was fresh and flavorful.",
  },
  {
    name: "Daniel",
    rating: "★★★★★",
    quote: "The staff was warm and the grilled salmon was perfectly cooked.",
  },
  {
    name: "Maya",
    rating: "★★★★★",
    quote: "A family favorite for dinner; the lemon cake is unforgettable.",
  },
  {
    name: "Chris",
    rating: "★★★★★",
    quote: "The menu is varied and every dish feels made with care.",
  },
];

const footerColumns = [
  {
    title: "Doormat Navigation",
    links: ["Home", "About", "Menu", "Reservations", "Order Online", "Login"],
  },
  { title: "Contact", links: ["Address", "Phone number", "Email"] },
  { title: "Social Media Links", links: ["Instagram", "Facebook", "Twitter"] },
];

function Nav() {
  return (
    <header className="topbar">
      <nav className="nav-links" aria-label="Main navigation">
        <span>Home</span>
        <span>About</span>
        <span>Menu</span>
        <span>Order Online</span>
      </nav>
    </header>
  );
}

function HeroSection({ openDialog }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <button type="button" onClick={openDialog}>
          Reserve a table
        </button>
      </div>
      <div className="hero-image" aria-label="Main hero food dish" />
    </section>
  );
}

function SpecialCard({ special }) {
  return (
    <article className="menu-card" key={special.name}>
      <div
        className="card-image"
        style={{ backgroundImage: `url(${special.image})` }}
        aria-label={special.name}
      />
      <div className="card-content">
        <div className="card-row">
          <h4>{special.name}</h4>
          <span>{special.price}</span>
        </div>
        <p>{special.description}</p>
        <button type="button">Order delivery</button>
      </div>
    </article>
  );
}

function SpecialsSection() {
  return (
    <section className="specials">
      <div className="section-heading">
        <h3>Specials</h3>
        <button type="button">View Menu</button>
      </div>

      <div className="specials-grid">
        {specials.map((special) => (
          <SpecialCard key={special.name} special={special} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ review }) {
  return (
    <article className="testimonial-card" key={review.name}>
      <div className="rating">{review.rating}</div>
      <div className="profile-pill">
        <span className="avatar">{review.name.slice(0, 1)}</span>
        <span>{review.name}</span>
      </div>
      <p>{review.quote}</p>
    </article>
  );
}

function TestimonialsSection() {
  return (
    <section className="testimonials">
      <h3>Testimonials</h3>
      <div className="testimonial-grid">
        {testimonials.map((review) => (
          <TestimonialCard key={review.name} review={review} />
        ))}
      </div>
    </section>
  );
}

function LittleLemonChicago() {
  return (
    <section className="about">
      <div className="about-copy">
        <h3>Little Lemon</h3>
        <h4>Chicago</h4>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
      </div>
      <div
        className="about-gallery"
        aria-label="Restaurant owners photo collage"
      >
        <div className="about-image primary" />
        <div className="about-image secondary" />
      </div>
    </section>
  );
}

function FooterColumn({ column }) {
  return (
    <div className="footer-column" key={column.title}>
      <h5>{column.title}</h5>
      <ul>
        {column.links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      {footerColumns.map((column) => (
        <FooterColumn key={column.title} column={column} />
      ))}
    </footer>
  );
}

function App() {
  function availableTimesReducer(state, action) {
    switch (action.type) {
      case "SET_AVAILABLE_TIMES":
        return action.payload;
      default:
        return state;
    }
  }

  const getDefaultTimes = () => [
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];

  const normalizeDateString = (date) => {
    if (!date) {
      return new Date().toISOString().split("T")[0];
    }

    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }

    return String(date).slice(0, 10);
  };

  const formatTimeForDisplay = (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const [hoursString, minutesString = "00"] = value.split(":");
    const hours = Number(hoursString);
    const minutes = Number(minutesString);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return value;
    }

    const suffix = hours >= 12 ? "PM" : "AM";
    const normalizedHours = hours % 12 === 0 ? 12 : hours % 12;
    const normalizedMinutes = minutes === 0 ? "00" : String(minutes).padStart(2, "0");

    return `${normalizedHours}:${normalizedMinutes} ${suffix}`;
  };

  const getAvailableTimesForDate = (date) => {
    const normalizedDate = normalizeDateString(date);
    const apiDate = new Date(`${normalizedDate}T12:00:00`);
    const apiTimes = fetchAPI(apiDate);

    if (Array.isArray(apiTimes) && apiTimes.length > 0) {
      return apiTimes.map((time) => formatTimeForDisplay(time));
    }

    return getDefaultTimes();
  };

  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [bookingData, setBookingData] = React.useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(null);
  const [availableTimes, dispatchAvailableTimes] = React.useReducer(
    availableTimesReducer,
    getDefaultTimes()
  );

  React.useEffect(() => {
    let active = true;

    function loadInitialTimes() {
      const nextTimes = getAvailableTimesForDate(new Date());
      if (active) {
        dispatchAvailableTimes({ type: "SET_AVAILABLE_TIMES", payload: nextTimes });
      }
    }

    loadInitialTimes();

    return () => {
      active = false;
    };
  }, []);

  function updateAvailableTimes(date) {
    const newTimes = getAvailableTimesForDate(date);
    dispatchAvailableTimes({ type: "SET_AVAILABLE_TIMES", payload: newTimes });
  }

  function CustomAlert({ message, duration = 3000 }) {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
        setAlert(null);
      }, duration);

      return () => clearTimeout(timer);
    }, [duration]);

    return (
      <div className={`custom-alert ${visible ? "show" : "hide"}`}>
        {message}
      </div>
    );
  }

  function handleFormSubmit(formData) {
    const submitted = submitAPI(formData);

    if (submitted) {
      setBookingData(formData);
      setIsBookingOpen(false);
      setIsConfirmationOpen(true);
      setAlert("Your reservation has been submitted!");
    } else {
      setAlert("There was an error submitting your reservation. Please try again.");
    }
  }
  return (
    <div className="page-shell">
      <main className="home-screen" aria-label="Little Lemon homepage">
        <Nav />
        <HeroSection openDialog={() => setIsBookingOpen(true)} />
        <SpecialsSection />
        <TestimonialsSection />
        <LittleLemonChicago />
        <SiteFooter />
      </main>
      <dialog
        open={isBookingOpen}
        className="booking-dialog"
        aria-label="Booking form dialog"
      >
        <button
          type="button"
          className="close-dialog"
          onClick={() => setIsBookingOpen(false)}
          aria-label="Close booking form dialog"
        >
          ×
        </button>
        <BookingForm
          availableTimes={availableTimes}
          onSubmit={handleFormSubmit}
          onDateChange={updateAvailableTimes}
        />
      </dialog>
      <dialog
        open={isConfirmationOpen}
        className="confirmation-dialog"
        aria-label="Booking confirmation dialog"
      >
        <button
          type="button"
          className="close-dialog"
          onClick={() => setIsConfirmationOpen(false)}
          aria-label="Close confirmation dialog"
        >
          ×
        </button>
        <BookingConfirmation data={bookingData} />
      </dialog>
      {alert && (
        <CustomAlert
          message={alert}
          duration={3000}
        />
      )}
    </div>
  );
}

export default App;
