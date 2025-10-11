import React from "react";
import "./Upgrade.css";
import { Link } from "react-router-dom";

const Upgrade = () => {
  return (
    <div className="upgrade-container">
      <div className="upgrade-wrapper">
        <div className="upgrade-grid">
          {/* Hobby Plan */}
          <div className="card">
            <div className="card-header">
              <h3 className="plan-title" id="tier-hobby">
                Hobby
              </h3>
              <div className="price">
                $0 <span className="price-unit">/mo</span>
              </div>
              <p className="plan-desc">All basic features included.</p>
            </div>
            <div className="card-body">
              <div className="card-content">
                <ul className="feature-list" role="list">
                  <li className="feature-item">
                    <div className="icon-check">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        ></path>
                      </svg>
                    </div>
                    <p>Bookmark Favorites</p>
                  </li>

                  <li className="feature-item">
                    <div className="icon-check">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        ></path>
                      </svg>
                    </div>
                    <p>Import Bookmarks from Twitter</p>
                  </li>

                  <li className="feature-item">
                    <div className="icon-cross">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </div>
                    <p>Full-text Search</p>
                  </li>

                  <li className="feature-item">
                    <div className="icon-cross">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </div>
                    <p>Private Bookmarks (via DMs) 🚧</p>
                  </li>
                </ul>
                <div className="cta-wrapper">
                  <Link to="/" className="cta-button">
                    Your current plan
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="card">
            <div className="card-header">
              <h3 className="plan-title" id="tier-team">
                Pro
              </h3>
              <div className="price">
                $6 <span className="price-unit">/mo</span>
              </div>
              <p className="plan-desc">For those who expect more.</p>
            </div>
            <div className="card-body">
              <div className="card-content">
                <ul className="feature-list" role="list">
                  {[
                    "Bookmark Favorites",
                    "Manage and Filter Tags",
                    "Filter by Authors",
                    "Import Bookmarks from Twitter",
                  ].map((feature, idx) => (
                    <li className="feature-item" key={idx}>
                      <div className="icon-check">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                      </div>
                      <p>{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="cta-wrapper">
                  <a href="/billing" className="cta-button">
                    Get started today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
