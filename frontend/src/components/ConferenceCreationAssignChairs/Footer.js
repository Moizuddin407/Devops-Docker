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
              EventEase is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives.
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
              Stay connected and never miss an update! Join our mailing list to receive the latest news about upcoming events, conferences, and exciting concerts. Be the first to know about key announcements, exclusive offers, speaker line-ups, and important dates. Stay in the loop and ensure you don't miss any opportunity to engage, network, and participate in memorable experiences!
            </p>
          </div>
        </div>
        <div className="footerDivider" />
        <p className="copyright">Copyright © 2024 EventEase</p>
      </div>
    </footer>
  );
}

export default Footer;
