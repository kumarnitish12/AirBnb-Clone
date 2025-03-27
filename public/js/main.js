// Main JavaScript file for the Airbnb clone

// Enable tooltips from Bootstrap
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Auto-dismiss alerts
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      const alertInstance = new bootstrap.Alert(alert);
      alertInstance.close();
    }, 5000);
  });

  // Property type pills
  const typePills = document.querySelectorAll('.property-type-pill');
  typePills.forEach(pill => {
    pill.addEventListener('click', function() {
      typePills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      
      // If on search page, filter properties
      if (window.location.pathname.includes('/search') || window.location.pathname.includes('/properties')) {
        const propertyType = this.getAttribute('data-type');
        filterPropertiesByType(propertyType);
      }
    });
  });

  // Filter properties by type on search page
  function filterPropertiesByType(type) {
    if (type === 'all') {
      document.querySelectorAll('.property-card-wrapper').forEach(card => {
        card.style.display = 'block';
      });
      return;
    }
    
    document.querySelectorAll('.property-card-wrapper').forEach(card => {
      const cardType = card.getAttribute('data-type');
      if (cardType === type) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Handle search form submission
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const location = document.getElementById('location').value;
      const checkIn = document.getElementById('check-in').value;
      const checkOut = document.getElementById('check-out').value;
      const guests = document.getElementById('guests').value;
      const type = document.querySelector('.property-type-pill.active')?.getAttribute('data-type') || 'all';
      
      const searchParams = new URLSearchParams();
      if (location) searchParams.append('location', location);
      if (checkIn) searchParams.append('checkIn', checkIn);
      if (checkOut) searchParams.append('checkOut', checkOut);
      if (guests) searchParams.append('guests', guests);
      if (type !== 'all') searchParams.append('type', type);
      
      window.location.href = `/search?${searchParams.toString()}`;
    });
  }

  // Price range slider
  const priceRangeSlider = document.getElementById('price-range');
  const minPriceDisplay = document.getElementById('min-price-display');
  const maxPriceDisplay = document.getElementById('max-price-display');
  
  if (priceRangeSlider && minPriceDisplay && maxPriceDisplay) {
    const priceRange = new noUiSlider.create(priceRangeSlider, {
      start: [50, 500],
      connect: true,
      range: {
        'min': 0,
        'max': 1000
      },
      step: 10,
      format: {
        to: function (value) {
          return Math.round(value);
        },
        from: function (value) {
          return Number(value);
        }
      }
    });
    
    priceRange.on('update', function (values) {
      minPriceDisplay.textContent = `$${values[0]}`;
      maxPriceDisplay.textContent = `$${values[1]}`;
      document.getElementById('min-price').value = values[0];
      document.getElementById('max-price').value = values[1];
    });
  }
});

// Toggle like button
function toggleLike(el) {
  el.classList.toggle('text-primary');
  
  // Here you would typically send an AJAX request to save the like status
  // For this demo, we'll just show a visual toggle
  const icon = el.querySelector('i');
  if (icon.classList.contains('bi-heart')) {
    icon.classList.remove('bi-heart');
    icon.classList.add('bi-heart-fill');
  } else {
    icon.classList.remove('bi-heart-fill');
    icon.classList.add('bi-heart');
  }
}

// Generate a user avatar placeholder
function generateAvatar(username) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 200;
  
  // Background
  context.fillStyle = getRandomColor();
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Text
  context.font = 'bold 100px Arial';
  context.fillStyle = '#FFFFFF';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  const initials = username
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
  context.fillText(initials, canvas.width / 2, canvas.height / 2);
  
  return canvas.toDataURL('image/png');
}

// Generate a random color for avatar backgrounds
function getRandomColor() {
  const colors = [
    '#FF5A5F', '#00A699', '#FC642D', '#484848', '#767676',
    '#6E7D9C', '#AF7D7D', '#7D88AF', '#7DAF85', '#AF9F7D'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
