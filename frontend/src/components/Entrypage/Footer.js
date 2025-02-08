import React from 'react';
import '../../css/Entrypage/EventEase.modules.css';

function Footer() {
  const footerLinks = [
    {
      title: "Plan Events",
      links: ["Create and Set Up", "Sell Tickets", "Online RSVP", "Online Events"]
    },
    {
      title: "Eventick",
      links: ["About Us", "Press", "Contact Us", "Help Center", "How it Works", "Privacy", "Terms"]
    }
  ];

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerColumns">
          <div className="footerColumn">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/37a6dfd96199c2cc5cf640b45a790be5eb34f654e272fcd04e3f56658a2a32e1?placeholderIfAbsent=true&apiKey=59b67e67c3874076a87cf06ee3b80a6b"
              className="footerLogo"
              alt="EventEase logo"
            />
            <p className="footerDescription">
              Global platform for live experiences—create, share, and attend events that enrich lives.
            </p>
          </div>
          {footerLinks.map((column, index) => (
            <div key={index} className="footerLinks">
              <h3 className="footerLinkTitle">{column.title}</h3>
              <ul className="footerLinkList">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footerLinks">
            <h3 className="footerLinkTitle">Stay in the loop</h3>
            <p className="footerDescription">
              Subscribe for updates on events, offers, and announcements.
            </p>
          </div>
        </div>
        <div className="footerDivider" />
        <p className="copyright">© 2024 EventEase</p>
      </div>
    </footer>
  );
}

export default Footer;
