import React from "react";

function Message() {
  return (
    <div style={{ backgroundColor: "lightgreen", padding: "20px", borderRadius: "5px", margin: "20px auto", maxWidth: "600px" }}>
      <h2>Email Verification Required</h2>
      <p>
        You must verify your email address before proceeding. Please check your email inbox and follow the instructions to verify your email.
      </p>
    </div>
  );
}

export default Message;
