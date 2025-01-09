const slider = document.getElementById("slider");
const pageviewsDisplay = document.getElementById("pageviews");
const priceDisplay = document.getElementById("price");
const billingToggle = document.getElementById("billing-toggle");

// Base price for 100K pageviews
const basePricePer100K = 0.016; // $16 for 100K pageviews

// Format pageviews to use 'K' for thousands and 'M' for millions
function formatPageviews(pageviews) {
  if (pageviews >= 1000000) {
    return `${(pageviews / 1000000).toFixed(1)}M`; // Format as '1.0M', '2.5M', etc.
  } else if (pageviews >= 1000) {
    return `${(pageviews / 1000)}K`; // Format as '10K', '100K', etc.
  }
  return pageviews; // Fallback for lower numbers (though not applicable here)
}

function updateSliderBackground() {
  const value = slider.value; // Current slider value
  const min = slider.min; // Minimum value of the slider
  const max = slider.max; // Maximum value of the slider

  // Calculate the percentage of the slider progress
  const percentage = ((value - min) / (max - min)) * 100;

  // Update the background to reflect progress
  slider.style.background = `linear-gradient(to right, var(--soft-cyan-full-slider-bar) ${percentage}%, var(--empty-slider-bar) ${percentage}%)`;
}
// Update the price and pageviews dynamically
function updatePricing() {
  const sliderValue = slider.value; // Slider value in 100K increments
  const pageviews = sliderValue * 100; // Convert to actual pageviews (e.g., 1 -> 100K)
  const basePrice = sliderValue * basePricePer100K; // Calculate the base price

  // Apply 25% discount for yearly billing
  const isYearly = billingToggle.checked;
  const finalPrice = isYearly ? basePrice * 0.75 : basePrice;

  // Update UI
  pageviewsDisplay.textContent = `${formatPageviews(pageviews)} PAGEVIEWS`;
  priceDisplay.textContent = `$${finalPrice.toFixed(2)}`;
}

slider.addEventListener("input", updatePricing);
billingToggle.addEventListener("change", updatePricing);
slider.addEventListener("input", updateSliderBackground);


// Initialize on page load
updatePricing();
updateSliderBackground();
