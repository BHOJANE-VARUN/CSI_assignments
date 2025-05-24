import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { country } from './../util/ConstantData';
import validate from './../util/validate'

export default function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '',
    email: '', password: '', showPassword: false,
    phoneCode: '', phoneNumber: '',
    country: '', city: '', pan: '', aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors({})
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(formData,setErrors)) {
      onSubmit(formData);
      navigate('/success');
    }
  };

  const isFormValid = () => Object.keys(errors).length === 0 &&
    Object.values(formData).every(val => val !== '' && val !== false);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>

      {['firstName', 'lastName', 'username', 'email'].map(field => (
        <div key={field}>
          <input
            type="text"
            name={field}
            placeholder={field.replace(/^\w/, c => c.toUpperCase())}
            value={formData[field]}
            onChange={handleChange}
          />
          {errors[field] && <p>{errors[field]}</p>}
        </div>
      ))}

      <div>
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>
          <input type="checkbox" name="showPassword" checked={formData.showPassword} onChange={handleChange} />
          Show Password
        </label>
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <input
          type="text"
          name="phoneCode"
          placeholder="+91"
          value={formData.phoneCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneCode && <p>{errors.phoneCode}</p>}
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      </div>

      <div>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(country).map(c => <option key={c}>{c}</option>)}
        </select>
        {errors.country && <p>{errors.country}</p>}
      </div>

      <div>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          {(country[formData.country] || []).map(city => <option key={city}>{city}</option>)}
        </select>
        {errors.city && <p>{errors.city}</p>}
      </div>

      <input
        type="text"
        name="pan"
        placeholder="PAN No."
        value={formData.pan}
        onChange={handleChange}
      />
      {errors.pan && <p>{errors.pan}</p>}

      <input
        type="text"
        name="aadhar"
        placeholder="Aadhar No."
        value={formData.aadhar}
        onChange={handleChange}
      />
      {errors.aadhar && <p>{errors.aadhar}</p>}

      <button type="submit" disabled={!isFormValid()}>
        Submit
      </button>
    </form>
  );
}
