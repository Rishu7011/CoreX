import React from "react";
const FeaturedBanner = ({ title, description, ctaText, onCTA }) => (
  <div className="featured-banner">
    <div className="banner-content">
      <h3 className="banner-title">{title}</h3>
      <p className="banner-desc">{description}</p>
    </div>
    {ctaText && <button className="banner-cta" onClick={onCTA}>{ctaText}</button>}
  </div>
);
export default FeaturedBanner;