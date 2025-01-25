const slider = document.getElementById("slider");
const pageviewsDisplay = document.getElementById("pageviews");
const priceDisplay = document.getElementById("price");
const billingToggle = document.getElementById("billing-toggle");

// Base price for 100K pageviews
const basePricePer100K = 16;

function formatPageviews(pageviews) {
  if (pageviews >= 1000000) {
    return `${(pageviews / 1000000).toFixed(1)}M`;
  } else if (pageviews >= 1000) {
    return `${(pageviews / 1000)}K`;
  }
  return pageviews;
}

function updateSliderBackground() {
  const value = slider.value;
  const min = slider.min;
  const max = slider.max;

  const percentage = ((value - min) / (max - min)) * 100;

  slider.style.background = `linear-gradient(to right, var(--soft-cyan-full-slider-bar) ${percentage}%, var(--empty-slider-bar) ${percentage}%)`;
}

function updatePricing() {
  const sliderValue = slider.value;
  const pageviews = sliderValue * 500;
  const basePrice = (sliderValue / 200) * basePricePer100K; 

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