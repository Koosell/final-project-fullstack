
import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./css/Contact.css";
import "./css/ContactAnimations.css";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Header Section */}
      <header className="contact-header">
        <h1>Hubungi Kami</h1>
        <p>Kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi tim support kami.</p>
      </header>

      <div className="contact-container">
        {/* Contact Information */}
        <section className="contact-info">
          {[
            { icon: <FaMapMarkerAlt />, title: "Alamat", content: "Jl. Top-Up No. 123<br />Yogyakarta, Indonesia" },
            { icon: <FaPhone />, title: "Telepon", content: "+62 8953-9291-7289<br />+62 821-0987-6543" },
            { icon: <FaEnvelope />, title: "Email", content: "support@abctopup.com<br />cs@abctopup.com" },
            { icon: <FaClock />, title: "Jam Operasional", content: "Senin - Minggu<br />24 Jam Non-Stop" }
          ].map((info, index) => (
            <div className="info-card" key={index} style={{ '--index': index }}>
              <div className="info-icon">{info.icon}</div>
              <h3>{info.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: info.content }} />
            </div>
          ))}
        </section>

        {/* Contact Form */}
        <section className="contact-form">
          <h2>Kirim Pesan</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input type="text" id="name" placeholder="Masukkan nama Anda" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Masukkan email Anda" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subjek</label>
              <input type="text" id="subject" placeholder="Masukkan subjek pesan" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Pesan</label>
              <textarea id="message" rows="5" placeholder="Tulis pesan Anda disini..." required></textarea>
            </div>

            <button type="submit" className="submit-btn">Kirim Pesan</button>
          </form>
        </section>

        {/* Social Media */}
        <section className="social-media">
          <h2>Follow Kami</h2>
          <div className="social-icons">
            {[
              { href: "https://facebook.com", icon: <FaFacebook /> },
              { href: "https://instagram.com", icon: <FaInstagram /> },
              { href: "https://twitter.com", icon: <FaTwitter /> }
            ].map((social, index) => (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                style={{ '--index': index }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </section>

        {/* Map */}
        <section className="map-container">
          <h2>Lokasi Kami</h2>
          <div className="map-embed">
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8191613506394!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x9cb5e5ef99d34c5d!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1621234567890!5m2!1sen!2sid"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
