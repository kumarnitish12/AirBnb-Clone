// Booking related JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize flatpickr for date inputs
  const checkInPicker = flatpickr("#check-in", {
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr) {
      // Set the minimum date of checkout to be the selected checkin date
      checkOutPicker.set("minDate", dateStr);
      
      // If checkout date is before new checkin date, update it
      if (checkOutPicker.selectedDates[0] < selectedDates[0]) {
        // Set checkout to day after checkin
        const nextDay = new Date(selectedDates[0]);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutPicker.setDate(nextDay);
      }
      
      updateBookingTotals();
    }
  });
  
  const checkOutPicker = flatpickr("#check-out", {
    minDate: new Date().fp_incr(1), // tomorrow
    dateFormat: "Y-m-d",
    onChange: function() {
      updateBookingTotals();
    }
  });
  
  // Update booking total when guests count changes
  const guestsInput = document.getElementById('guests');
  if (guestsInput) {
    guestsInput.addEventListener('change', updateBookingTotals);
  }
  
  // Calculate and update booking totals
  function updateBookingTotals() {
    const pricePerNightEl = document.getElementById('price-per-night');
    const checkIn = document.getElementById('check-in');
    const checkOut = document.getElementById('check-out');
    const nightsEl = document.getElementById('nights-count');
    const subtotalEl = document.getElementById('subtotal');
    const cleaningFeeEl = document.getElementById('cleaning-fee');
    const serviceFeeEl = document.getElementById('service-fee');
    const totalEl = document.getElementById('total-price');
    const hiddenTotalEl = document.getElementById('total-price-hidden');
    
    if (!pricePerNightEl || !checkIn || !checkOut) return;
    
    // Get price per night
    const pricePerNight = parseFloat(pricePerNightEl.getAttribute('data-price'));
    
    // Calculate number of nights
    const checkInDate = new Date(checkIn.value);
    const checkOutDate = new Date(checkOut.value);
    
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) return;
    
    const timeDiff = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) return;
    
    // Update nights display
    if (nightsEl) {
      nightsEl.textContent = nights;
    }
    
    // Calculate subtotal (price per night * nights)
    const subtotal = pricePerNight * nights;
    if (subtotalEl) {
      subtotalEl.textContent = `$${subtotal}`;
    }
    
    // Set default fees
    const cleaningFee = 50;
    if (cleaningFeeEl) {
      cleaningFeeEl.textContent = `$${cleaningFee}`;
    }
    
    const serviceFee = Math.round(subtotal * 0.12); // 12% service fee
    if (serviceFeeEl) {
      serviceFeeEl.textContent = `$${serviceFee}`;
    }
    
    // Calculate total
    const total = subtotal + cleaningFee + serviceFee;
    
    // Update total price display
    if (totalEl) {
      totalEl.textContent = `$${total}`;
    }
    
    // Update hidden input for form submission
    if (hiddenTotalEl) {
      hiddenTotalEl.value = total;
    }
  }
  
  // Initial calculation
  updateBookingTotals();
  
  // Handle form submission
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      const checkIn = document.getElementById('check-in').value;
      const checkOut = document.getElementById('check-out').value;
      const guests = document.getElementById('guests').value;
      
      if (!checkIn || !checkOut || !guests) {
        e.preventDefault();
        alert('Please fill in all required fields.');
        return false;
      }
      
      // Form validation passed, continue with submission
    });
  }
  
  // Initialize date range picker for search form
  const searchCheckIn = flatpickr("#search-check-in", {
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr) {
      searchCheckOut.set("minDate", dateStr);
    }
  });
  
  const searchCheckOut = flatpickr("#search-check-out", {
    minDate: new Date().fp_incr(1),
    dateFormat: "Y-m-d"
  });
});
