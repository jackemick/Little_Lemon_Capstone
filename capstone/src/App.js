import './App.css';
import CustomSelect from './CustomSelect';
import React from 'react';
import bread from './images/bread.jpg'
import bruschetta from './images/bruschetta.jpg'
import salad from './images/salad.jpg'
import fish from './images/fish.jpg'
import pasta from './images/red_pasta.jpg'

const specials = [
  {
    name: 'Greek Salad',
    description: 'Fresh romaine, cucumbers, tomatoes, olives, feta, red onion, and lemon-oregano dressing.',
    price: '$12.50',
    image: salad,
  },
  {
    name: 'Bruschetta',
    description: 'Toasted housemade sourdough topped with ripe tomatoes, basil, garlic, and balsamic glaze.',
    price: '$7.90',
    image: bruschetta,
  },
  {
    name: 'Grilled Fish',
    description: 'Citrus-marinated fish fillet served with herbs, roasted vegetables, and lemon butter.',
    price: '$16.40',
    image: fish,
  },
  {
    name: 'Penne Ragu',
    description: 'A rich and hearty pasta dish with a savory tomato-based sauce and chunks of spicy sausage.',
    price: '$12.90',
    image: pasta,
  },
];

const testimonials = [
  { name: 'Sarah', rating: '★★★★★', quote: 'Amazing atmosphere and the pasta was fresh and flavorful.' },
  { name: 'Daniel', rating: '★★★★★', quote: 'The staff was warm and the grilled salmon was perfectly cooked.' },
  { name: 'Maya', rating: '★★★★★', quote: 'A family favorite for dinner; the lemon cake is unforgettable.' },
  { name: 'Chris', rating: '★★★★★', quote: 'The menu is varied and every dish feels made with care.' },
];

const footerColumns = [
  { title: 'Doormat Navigation', links: ['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login'] },
  { title: 'Contact', links: ['Address', 'Phone number', 'Email'] },
  { title: 'Social Media Links', links: ['Instagram', 'Facebook', 'Twitter'] },
];

const occasions = ['Birthday', 'Anniversary', 'Graduation', 'Wedding', 'Other'];

function App() {
  const [selectedOccasion, setSelectedOccasion] = React.useState("Select an option");

  return (
    <div className="page-shell">
      <main className="home-screen" aria-label="Little Lemon homepage">
        <header className="topbar">
          <nav className="nav-links" aria-label="Main navigation">
            <span>Home</span>
            <span>About</span>
            <span>Menu</span>
            <span>Reservations</span>
            <span>Order Online</span>
            <span>Login</span>
          </nav>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
            <button type="button">Reserve a table</button>
            {/* <CustomSelect items={occasions} selectedItem={selectedOccasion} onItemChange={setSelectedOccasion} itemType=" an Occasion" icon="📅" /> */}
          </div>
          <div className="hero-image" aria-label="Main hero food dish" />
        </section>

        <section className="specials">
          <div className="section-heading">
            <h3>Specials</h3>
            <button type="button">Online Menu</button>
          </div>

          <div className="specials-grid">
            {specials.map((special) => (
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
            ))}
          </div>
        </section>

        <section className="testimonials">
          <h3>Testimonials</h3>
          <div className="testimonial-grid">
            {testimonials.map((review) => (
              <article className="testimonial-card" key={review.name}>
                <div className="rating">{review.rating}</div>
                <div className="profile-pill">
                  <span className="avatar">{review.name.slice(0, 1)}</span>
                  <span>{review.name}</span>
                </div>
                <p>{review.quote}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about">
          <div className="about-copy">
            <h3>Little Lemon</h3>
            <h4>Chicago</h4>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
          <div className="about-gallery" aria-label="Restaurant owners photo collage">
            <div className="about-image primary" />
            <div className="about-image secondary" />
          </div>
        </section>

        <footer className="site-footer">
          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h5>{column.title}</h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </footer>
      </main>
    </div>
  );
}

export default App;
