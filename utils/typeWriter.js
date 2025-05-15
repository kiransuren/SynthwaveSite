/**
 * Typewriter effect for a DOM element by ID.
 * @param {number} currChar - Current character index.
 * @param {string} finalText - The full text to type out.
 * @param {number} speedMS - Delay in ms between characters.
 * @param {string} elementID - The DOM element's ID.
 */
export default function typeWriter(currChar, finalText, speedMS, elementID) {
  const el = document.getElementById(elementID);
  if (!el) return;
  if (currChar === 0) el.innerHTML = '';
  if (currChar < finalText.length) {
    el.innerHTML += finalText.charAt(currChar);
    setTimeout(() => typeWriter(currChar + 1, finalText, speedMS, elementID), speedMS);
  }
}