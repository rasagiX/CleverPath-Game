// loading page
function showLoader() {
  document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// Usage:
// When transitioning pages/questions
showLoader();
setTimeout(function() {
  hideLoader();
  // Now show the next question/page
}, 1500);
