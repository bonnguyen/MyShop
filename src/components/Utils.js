import { isEmpty } from 'lodash';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function isEmail(str) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(str.trim()).toLowerCase());
}

function isPassword(str) {
  var empty = isEmpty(str.trim());
  var length = str ? str.trim().length : 0;
  return !empty && (length > 5);
}

function isName(str) {
  return !isEmpty(str.trim());
}

function isPhoneNumber(str) {
  return /^\d+$/.test(str.trim());
}

export {
  toTitleCase,
  isName,
  isEmail,
  isPassword,
  isPhoneNumber
};
