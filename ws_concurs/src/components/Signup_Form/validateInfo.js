export default function validateInfo(values) {
  let errors = {};
  if (!values.username.trim()) {
    errors.username = "Camp obligatoriu";
  }

  if (!values.email) {
    errors.email = "Camp obligatoriu";
  } else if (!/^[A-Z0-9._%+=]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email adress is invalid";
  }

  if (!values.password) {
    errors.password = "Camp obligatoriu";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!values.password2) {
    errors.password2 = "Camp obligatoriu";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }
  return errors;
}
