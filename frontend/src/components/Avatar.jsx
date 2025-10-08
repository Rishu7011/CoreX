import React from "react";
const Avatar = ({ src, name, size = 36 }) => (
  <div className="avatar" style={{ width: size, height: size }} title={name}>
    {src ? <img src={src} alt={name} className="avatar-img" />
          : <span className="avatar-initials">{name ? name[0].toUpperCase() : "?"}</span>}
  </div>
);
export default Avatar;