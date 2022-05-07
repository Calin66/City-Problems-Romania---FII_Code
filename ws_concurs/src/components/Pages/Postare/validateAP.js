export default function validateAP(values) {
  let errors = {};
  if (!values.titlu.trim()) {
    errors.titlu = "Camp obligatoriu";
  }
  if (!values.tproblema) {
    errors.tproblema = "Camp obligatoriu";
  }
  if (!values.descriere) {
    errors.descriere = "Camp obligatoriu";
  }

  return errors;
}
