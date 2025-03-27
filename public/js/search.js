// Search functionality for the Airbnb clone

document.addEventListener('DOMContentLoaded', function() {
  // Filter toggle functionality
  const filterToggles = document.querySelectorAll('.filter-toggle');
  
  filterToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        if (targetElement.classList.contains('show')) {
          targetElement.classList.remove('show');
          this.setAttribute('aria-expanded', 'false');
        } else {
          // Close all other open filters first
          document.querySelectorAll('.filter-content.show').forEach(el => {
            el.classList.remove('show');
          });
          
          document.querySelectorAll('.filter-toggle').forEach(el => {
            el.setAttribute('aria-expanded', 'false');
          });
          
          targetElement.classList.add('show');
          this.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });
  
  // Close dropdown filters when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.filter-dropdown') && !event.target.classList.contains('filter-toggle')) {
      document.querySelectorAll('.filter-content.show').forEach(el => {
        el.classList.remove('show');
      });
      
      document.querySelectorAll('.filter-toggle').forEach(el => {
        el.setAttribute('aria-expanded', 'false');
      });
    }
  });
  
  // Apply filters button
  const applyFiltersButtons = document.querySelectorAll('.apply-filters');
  
  applyFiltersButtons.forEach(button => {
    button.addEventListener('click', function() {
      const dropdown = this.closest('.filter-dropdown');
      if (dropdown) {
        const filterContent = dropdown.querySelector('.filter-content');
        if (filterContent) {
          filterContent.classList.remove('show');
        }
        
        const toggle = dropdown.querySelector('.filter-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
      
      // Apply the filters and update results
      applyFilters();
    });
  });
  
  // Apply all active filters and update search results
  function applyFilters() {
    const activeFilters = getActiveFilters();
    updateFilterBadges(activeFilters);
    filterProperties(activeFilters);
  }
  
  // Get all currently active filters
  function getActiveFilters() {
    const filters = {
      priceRange: {
        min: parseInt(document.getElementById('min-price')?.value || 0),
        max: parseInt(document.getElementById('max-price')?.value || 1000)
      },
      propertyType: document.querySelector('.property-type-pill.active')?.getAttribute('data-type') || 'all',
      bedrooms: parseInt(document.querySelector('input[name="bedrooms"]:checked')?.value || 0),
      amenities: []
    };
    
    // Get selected amenities
    document.querySelectorAll('input[name="amenity"]:checked').forEach(checkbox => {
      filters.amenities.push(checkbox.value);
    });
    
    return filters;
  }
  
  // Update filter badges display
  function updateFilterBadges(filters) {
    const badgesContainer = document.getElementById('active-filters');
    if (!badgesContainer) return;
    
    badgesContainer.innerHTML = '';
    
    // Price range badge
    if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) {
      const badge = document.createElement('span');
      badge.className = 'badge bg-light text-dark me-2 mb-2';
      badge.innerHTML = `$${filters.priceRange.min} - $${filters.priceRange.max} <button class="btn-close ms-1" data-filter="price"></button>`;
      badgesContainer.appendChild(badge);
    }
    
    // Property type badge
    if (filters.propertyType !== 'all') {
      const badge = document.createElement('span');
      badge.className = 'badge bg-light text-dark me-2 mb-2';
      badge.innerHTML = `${capitalizeFirstLetter(filters.propertyType)} <button class="btn-close ms-1" data-filter="type"></button>`;
      badgesContainer.appendChild(badge);
    }
    
    // Bedrooms badge
    if (filters.bedrooms > 0) {
      const badge = document.createElement('span');
      badge.className = 'badge bg-light text-dark me-2 mb-2';
      badge.innerHTML = `${filters.bedrooms}+ Bedrooms <button class="btn-close ms-1" data-filter="bedrooms"></button>`;
      badgesContainer.appendChild(badge);
    }
    
    // Amenities badges
    filters.amenities.forEach(amenity => {
      const badge = document.createElement('span');
      badge.className = 'badge bg-light text-dark me-2 mb-2';
      badge.innerHTML = `${amenity} <button class="btn-close ms-1" data-filter="amenity" data-value="${amenity}"></button>`;
      badgesContainer.appendChild(badge);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.badge .btn-close').forEach(btn => {
      btn.addEventListener('click', function() {
        const filterType = this.getAttribute('data-filter');
        removeFilter(filterType, this.getAttribute('data-value'));
      });
    });
  }
  
  // Remove a specific filter
  function removeFilter(filterType, value) {
    switch(filterType) {
      case 'price':
        document.getElementById('min-price').value = 0;
        document.getElementById('max-price').value = 1000;
        break;
      case 'type':
        document.querySelectorAll('.property-type-pill').forEach(pill => {
          pill.classList.remove('active');
        });
        document.querySelector('.property-type-pill[data-type="all"]').classList.add('active');
        break;
      case 'bedrooms':
        document.querySelector('input[name="bedrooms"][value="0"]').checked = true;
        break;
      case 'amenity':
        document.querySelector(`input[name="amenity"][value="${value}"]`).checked = false;
        break;
    }
    
    applyFilters();
  }
  
  // Filter properties based on active filters
  function filterProperties(filters) {
    const propertyCards = document.querySelectorAll('.property-card-wrapper');
    
    propertyCards.forEach(card => {
      let visible = true;
      
      // Filter by property type
      if (filters.propertyType !== 'all') {
        const cardType = card.getAttribute('data-type');
        if (cardType !== filters.propertyType) {
          visible = false;
        }
      }
      
      // Filter by price
      const price = parseInt(card.getAttribute('data-price') || 0);
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        visible = false;
      }
      
      // Filter by bedrooms
      if (filters.bedrooms > 0) {
        const bedrooms = parseInt(card.getAttribute('data-bedrooms') || 0);
        if (bedrooms < filters.bedrooms) {
          visible = false;
        }
      }
      
      // Filter by amenities
      if (filters.amenities.length > 0) {
        const cardAmenities = card.getAttribute('data-amenities').split(',');
        
        for (const amenity of filters.amenities) {
          if (!cardAmenities.includes(amenity)) {
            visible = false;
            break;
          }
        }
      }
      
      // Show or hide card
      card.style.display = visible ? 'block' : 'none';
    });
    
    // Update visible count
    updateVisibleCount();
  }
  
  // Update count of visible properties after filtering
  function updateVisibleCount() {
    const visibleCards = document.querySelectorAll('.property-card-wrapper[style="display: block"]').length;
    const countElement = document.getElementById('property-count');
    
    if (countElement) {
      countElement.textContent = visibleCards;
    }
  }
  
  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Initialize filters from URL params if any
  function initializeFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('type')) {
      const type = urlParams.get('type');
      const typePill = document.querySelector(`.property-type-pill[data-type="${type}"]`);
      if (typePill) {
        document.querySelectorAll('.property-type-pill').forEach(pill => {
          pill.classList.remove('active');
        });
        typePill.classList.add('active');
      }
    }
    
    if (urlParams.has('minPrice') && urlParams.has('maxPrice')) {
      document.getElementById('min-price').value = urlParams.get('minPrice');
      document.getElementById('max-price').value = urlParams.get('maxPrice');
    }
    
    if (urlParams.has('bedrooms')) {
      const bedrooms = urlParams.get('bedrooms');
      document.querySelector(`input[name="bedrooms"][value="${bedrooms}"]`).checked = true;
    }
    
    // Apply initial filters
    applyFilters();
  }
  
  // Execute on page load
  initializeFiltersFromURL();
});
