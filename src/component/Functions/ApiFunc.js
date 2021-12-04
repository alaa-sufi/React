import React from "react";
import axios from "axios";
const config = {
  headers: {
    Authorization: "Bearer" + localStorage.getItem("token"),
  },
};

export async function getApi(apiurl) {
  try {
    const response = await axios.get(apiurl);
    return response;
  } catch (error) {}
}
export async function logoutApi(apiurl) {
  try {
    const response = await axios.get(apiurl, config);
    return response;
  } catch (error) {
    return error;
  }
}
export async function deleteApi(apiurl) {
  try {
    const response = await axios.delete(apiurl);
    return response;
  } catch (error) {
    return error;
  }
}

export async function postApi(apiurl, data, auth = true) {
  try {
    if (!auth) {
      const response = await axios.post(apiurl, data);
    }
    const response = await axios.post(apiurl, data, config);
    return response;
  } catch (error) {
    return error;
  }
}

export default function ApiFunc() {
  return <></>;
}
export function arr() {
  return [
    "",
    "الاول",
    "الثاني",
    "الثالث",
    "الرابع",
    "الخامس",
    "السادس",
    "السابع",
    "الثامن",
    "التاسع",
    "العاشر",
    "الحادي عشر",
    "الثاني عشر",
    "الثالث عشر",
    "الرابع عشر",
    "الخامس عشر",
    "السادس عشر",
    "السابع عشر",
    "الثامن عشر",
    "التاسع عشر",
    "العشرون",
    "الواحد والعشرون",
    "الثاني والعشرون",
    "الثالث والعشرون",
    "الرابع والعشرون",
    "الخامس والعشرون",
    "السادس والعشرون",
    "السابع والعشرون",
    "الثامن والعشرون",
    "التاسع والعشرون",
    "الثلاثون",
    "الواحد والثلاثون",
    "الثاني والثلاثون",
    "الثالث والثلاثون",
    "الرابع والثلاثون",
    "الخامس والثلاثون",
    "السادس والثلاثون",
    "السابع والثلاثون",
    "الثامن والثلاثون",
    "التاسع والثلاثون",
    "الاربعون",
    "الواحد والاربعون",
    "الثاني والاربعون",
    "الثالث والاربعون",
    "الرابع والاربعون",
    "الخامس والاربعون",
    "السادس والاربعون",
    "السابع والاربعون",
    "الثامن والاربعون",
    "التاسع والاربعون",
  ];
}
