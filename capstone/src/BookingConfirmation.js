export default function BookingConfirmation({ data }) {
  if (!data) {
    return null;
  }

  const { date, time, guests, occasion, name, email } = data;

  return (
    <div className="booking-confirmation">
      <h3>Reservation confirmed</h3>
      <p>Thank you, {name}.</p>
      <ul>
        <li><strong>Date:</strong> {date}</li>
        <li><strong>Time:</strong> {time}</li>
        <li><strong>Guests:</strong> {guests}</li>
        <li><strong>Occasion:</strong> {occasion || 'Not specified'}</li>
        <li><strong>Email:</strong> {email}</li>
      </ul>
    </div>
  );
}