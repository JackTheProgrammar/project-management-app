import React from "react";
import styles from "./OrgTopBar.less";

function OrgTopBar() {
  return (
    <>
      <div className="jd-org-top-bar">
        <div className="jd-org-top-bar-left-panel">
          <div className="jd-org-top-bar-logo-container">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV35b4ZNkR_HlmZ4du3yKzh4GboHbXOZ4bO0tH_KW_a9UQjuT_LFTHXxP_&s=10"
              alt="logo"
            />
          </div>
        </div>
        <div className="jd-org-top-bar-right-panel">
          <div>
          </div>
          <div className="jd-org-top-bar-user-profile">
            <span>User Profile</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrgTopBar;
