import React from "react";

function renderWithLineBreaks(text) {
  return text.split("\n").map((str, index, array) => (
    <>
      {str}
      {index === array.length - 1 ? null : <br />}
    </>
  ));
}

function insertLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g; // regex for both http:// and https://
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '" target="_blank">' + url + "</a>"; // return the replaced text
  });
}

export { renderWithLineBreaks, insertLinks };
