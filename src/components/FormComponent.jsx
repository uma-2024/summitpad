import React, { useState } from "react";
import "./FormComponent.css"; // Create and link a CSS file for styling
const FormComponent = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    participants: "",
    groupName: "",
    email: "",
    socialLinks: "",
    members: Array(5).fill(""),
    countryCity: "",
    date: "",
    bannerPhoto: null,
    confirmation: false,
  });
  const handleChange = (e, index = null) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (index !== null) {
      const updatedMembers = [...formData.members];
      updatedMembers[index] = value;
      setFormData((prev) => ({ ...prev, members: updatedMembers }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };
  return (
    <div className="form-container-main">
    <div className="form-container">
      <h2>How IT WORKS</h2>
      <p>
        The sole project with a thriving live ecosystem. It has maintained a
        market presence since 2022, making it an influential and enduring
        player in the crypto space.
      </p>
      <form onSubmit={handleSubmit}>
        {/* Team Name and No of Participants */}
        <div className="form-row">
            <div className="form-row-inner21">
            <label>Team Name</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            className="input123"
          />
            </div>
            <div className="form-row-inner21">
                <label>No of Participants</label>
            <input
            type="number"
            name="participants"
            placeholder=""
            value={formData.participants}
            onChange={handleChange}
            required
            className="input123"
          />
                </div>
        </div>
        {/* Group Full Name and Email */}
        <div className="form-row">
        <div className="form-row-inner">
        <label>Group Full Name</label>
          <input
            type="text"
            name="groupName"
            placeholder=""
            value={formData.groupName}
            onChange={handleChange}
            required
            className="input123"
          />
          </div>
          <div className="form-row-inner">
        <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder=""
            value={formData.email}
            onChange={handleChange}
            required
            className="input123"
          />
          </div>
        </div>
        {/* Social Media Post Links */}
        <div className="form-row">
        <div className="form-row-inner">
        <label>Social Media Post Links</label>
          <input
            type="text"
            name="socialLinks"
            placeholder=""
            value={formData.socialLinks}
            onChange={handleChange}
            required
            className="input123"
          />
          </div>
        </div>
        {/* Member Details */}
        <p style={{textAlign:'left',marginBottom:'10px'}}>Member Details (Min 5 members)</p>
        <div className="form-members">
          {formData.members.map((member, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Member ${index + 1}`}
              value={member}
              onChange={(e) => handleChange(e, index)}
              required
              className="input123"
            />
          ))}
        </div>
        {/* Country and City, Date of Activity */}
        <div className="form-row">
        <div className="form-row-inner">
        <label>Country and City</label>
          <input
            type="text"
            name="countryCity"
            placeholder=""
            value={formData.countryCity}
            onChange={handleChange}
            required
            className="input123"
          />
          </div>
          <div className="form-row-inner">
          <label>Date of Activity</label>
          <input
            type="date"
            name="date"
            placeholder=""
            value={formData.date}
            onChange={handleChange}
            required
            className="input123"
          />
          </div>
        </div>
        {/* Upload Banner Photo */}
        <div >
          <label htmlFor="bannerPhoto" className="upload-label">
            Upload Your Banner Photo
          </label>
          <input
            type="file"
            name="bannerPhoto"
            id="bannerPhoto"
            onChange={handleChange}
            required
            className="input123"
          />
        </div>
        {/* Confirmation */}
        <div className="form-confirmation">
          <input
            type="checkbox"
            name="confirmation"
            checked={formData.confirmation}
            onChange={handleChange}
            required
          />
          <label>
            I confirm that all the provided information is accurate and that I
            have the consent of all participants to share their details for this
            campaign.
          </label>
        </div>
        {/* Submit Button */}
        <button type="submit" className="submit-button1234">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};
export default FormComponent;