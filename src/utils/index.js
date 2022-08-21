import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import CryptoJS from "crypto-js";
import defaultValue from '../constants/defaultValue'

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const validate = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.email) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.password) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isAlphaNumeric) {
    const pattern = /^[a-z\d\-_\s]+$/i;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const timeFormat = (time) => {
  var dt = new Date(time);
  if (dt.getDate() === new Date().getDate()) {
    return `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`
  }
  return `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')} `

}

export const dateFormat = (time, oldTime) => {
  var dt = new Date(time);
  if (oldTime === undefined) {
    return `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(2, '0').slice(-2)}`
  }
  var oldDt = new Date(oldTime);
  if ((dt.getDate() === oldDt.getDate()) && (dt.getMonth() === oldDt.getMonth()) && (dt.getFullYear() === oldDt.getFullYear())) {
    return null
  } else if (dt.getDate() === new Date().getDate()) {
    return `Today`
  } else {
    return `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(2, '0').slice(-2)}`
  }
}

export const getAccessToken = async () => {
  return JSON.parse(await AsyncStorage.getItem('token') || "{}");
}

export const openUrl = async (url) => {
  const supported = await Linking.openURL(url);
  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    Alert.alert(`Invalid Url: ${url}`);
  }
};

export const calDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (d > 1) return Math.round(d);
  else if (d <= 1) return Math.round(d);
  return d;
}

const queryStringBulder = (obj) => {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p) && p !== null && p !== '') {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export const apiEncryptionData = (data, isParam) => {
  const cipherDoc = CryptoJS.AES.encrypt(JSON.stringify(data), defaultValue.apiEncryptionSecret).toString();
  const varData = {
    data: cipherDoc,
    encritption: true
  }
  if (isParam) {
    if (defaultValue.apiEncryption) {
      return '?' + queryStringBulder(varData)
    } else {
      return '?' + queryStringBulder(data)
    }
  } else {
    if (defaultValue.apiEncryption) {
      return varData
    } else {
      return data
    }
  }
}

export const apiDecryptionData = (data) => {
  if (data.encritption && data.data) {
    const bytes = CryptoJS.AES.decrypt(data.data.toString(), defaultValue.apiEncryptionSecret);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } else {
    return data
  }
}

export { queryStringBulder };