import React from "react";
import Avatar from "./Avatar";
import PlanBadge from "./PlanBadge";
const UserProfileCard = ({ user }) => (
  <div className="profile-card">
    <Avatar src={user?.avatar} name={user?.name} size={64} />
    <div className="profile-info">
      <h3 className="profile-name">{user?.name}</h3>
      <p className="profile-email">{user?.email}</p>
      <PlanBadge plan={user?.plan} />
    </div>
  </div>
);
export default UserProfileCard;