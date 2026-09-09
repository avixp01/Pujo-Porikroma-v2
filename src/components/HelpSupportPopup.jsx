import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './HelpSupportPopup.css';

const HelpSupportPopup = ({ onClose }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      question: "What is Pujo Porikroma?",
      answer: "Pujo Porikroma is a full Pujo guide for 2026. Where u can find your favourite your favourite pandels with proper vibe."
    },
    {
      question: "What is the Significance of the page?",
      answer: "This is a all rounder for pandal hopper. Here u can find pandel with their details, and also connect with new peoples while vibing with Puja playlist."
    },
    {
      question: "How do I mark a pandal as visited?",
      answer: 'Tap the pandal location, use "Mark as visited". Your visited count shows on your profile so you can track your journey.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <div className="help-overlay" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="help-content" onClick={(e) => e.stopPropagation()}>
        <div className="help-header">
          <h2 className="help-title">Help & support</h2>
          <p className="help-subtitle">Answers to common questions — or send us a message.</p>
        </div>

        <div className="help-body">
          <div className="help-section-title">FAQS</div>
          <div className="help-faqs">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`help-faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="help-faq-header">
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className={`help-faq-icon ${isOpen ? 'rotated' : ''}`} />
                  </div>
                  <div className={`help-faq-collapse ${isOpen ? 'expanded' : ''}`}>
                    <div className="help-faq-answer-inner">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="help-section-title">CONTACT US</div>
          <p className="help-contact-subtitle">Can't find an answer? Send us a message and we'll help.</p>
          <div className="help-contact">
            <div className="help-field">
              <input type="text" placeholder="Your name (optional)" />
            </div>
            <div className="help-field">
              <input type="text" placeholder="Email or phone (so we can reply)" />
            </div>
            <div className="help-field">
              <textarea placeholder="How can we help?" rows="4"></textarea>
            </div>
          </div>
        </div>

        <div className="help-footer">
          <button className="help-send-btn" onClick={onClose}>
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPopup;
