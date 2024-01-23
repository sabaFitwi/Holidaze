// import  { useState, useEffect } from 'react';
// const [errors, setErrors] = useState({});
// const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRegistrationData({
//       ...registrationData,
//       [name]: value,
//     });
//     setErrors({
//       ...errors,
//       [name]: '',
//     });
//   };

//   const isValidURL = (url) => {
//     const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
//     return urlPattern.test(url);
//   };

//   useEffect(() => {
//     // Validation checks
//     const newErrors = {};

//     if (
//       !registrationData.name ||
//       !/^[a-zA-Z0-9_]+$/.test(registrationData.name)
//     ) {
//       newErrors.name =
//         'Name must only contain letters, numbers, and underscores';
//     }

//     if (
//       !registrationData.email ||
//       (!registrationData.email.endsWith('stud.noroff.no') &&
//         !registrationData.email.endsWith('noroff.no'))
//     ) {
//       newErrors.email =
//         'Email must be a valid stud.noroff.no or noroff.no address';
//     }

//     if (!registrationData.password || registrationData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters long';
//     }

//     if (registrationData.avatar && !isValidURL(registrationData.avatar)) {
//       newErrors.avatar = 'Avatar URL must be a valid URL';
//     }

//     if (selectedOption === 'venueManager') {
//       registrationData.venueManager = true;
//     }

//     setErrors(newErrors);
//     setSharedErrors(newErrors);

//   }, [registrationData, selectedOption]);

//   export default handleInputChange
