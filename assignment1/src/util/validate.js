

export default function validate(formData,setErrors){
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.lastName) newErrors.lastName = 'Required';
    if (!formData.username) newErrors.username = 'Required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (!formData.phoneCode) newErrors.phoneCode = 'Required';
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = '10-digit number';
    if (!formData.country) newErrors.country = 'Required';
    if (!formData.city) newErrors.city = 'Required';
    if (!formData.pan || !/[A-Z]{5}[0-9]{4}[A-Z]/.test(formData.pan)) newErrors.pan = 'Invalid PAN(e.g ABCDE1234F)';
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = '12-digit number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
