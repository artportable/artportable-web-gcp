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

// Find the first period before maxLenght of a string, and return the part before the period.
// If no period found, return text trucated with ...
const createExcerpt = (text, maxLength = 0) => {
  if (!text) return '';
  if (text && text.length > maxLength) {
    let excerpt = text.slice(0, maxLength);

    const lastPeriodIndex = excerpt.lastIndexOf('.');
    if (lastPeriodIndex > 0) {
      return excerpt.substring(0, lastPeriodIndex + 1);
    }
    
    const lastSpaceIndex = excerpt.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
      excerpt = excerpt.substring(0, lastSpaceIndex);
    }
    
    return excerpt + '...';
  } else {
    return text;
  }
}

export { renderWithLineBreaks, insertLinks, createExcerpt };
