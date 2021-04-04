export default function typeWriter(currChar, finalText, speedMS, elementID) {
  if (currChar < finalText.length) {
    document.getElementById(elementID).innerHTML += finalText.charAt(currChar);
    currChar++
    setTimeout(() => typeWriter(currChar,finalText, speedMS, elementID), speedMS);
  }
}