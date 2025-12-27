// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Culture tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // User gallery functionality
    const galleryGrid = document.querySelector('.gallery-grid');
    const uploadForm = document.getElementById('uploadForm');
    
    // Sample gallery data
    const sampleGallery = [
        {
            id: 1,
            user: "Ahmed Khan",
            location: "Naran, Kaghan Valley",
            story: "The beauty of Naran in spring is unparalleled. The lush green meadows and crystal clear lakes are a sight to behold.",
            image: "https://images.unsplash.com/photo-1564574662336-88c9f5a6c8d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 2,
            user: "Sara Javed",
            location: "Badshahi Mosque, Lahore",
            story: "The grandeur of Badshahi Mosque is even more impressive in person. The intricate Mughal architecture is breathtaking.",
            image: "https://images.unsplash.com/photo-1585506936724-fa0c19c7b3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 3,
            user: "Ali Raza",
            location: "Fairy Meadows, Gilgit-Baltistan",
            story: "Waking up to the view of Nanga Parbat from Fairy Meadows was a dream come true. Truly a magical place.",
            image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 4,
            user: "Fatima Noor",
            location: "Mohenjo-Daro, Sindh",
            story: "Walking through the ruins of one of the world's earliest major cities was a humbling experience. The history here is palpable.",
            image: "https://images.unsplash.com/photo-1523480717984-24cba35ae1eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
    ];
    
    // Function to render gallery items
    function renderGallery() {
        galleryGrid.innerHTML = '';
        sampleGallery.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.location}">
                <div class="gallery-overlay">
                    <h4>${item.location}</h4>
                    <p>By ${item.user}</p>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Initial gallery render
    renderGallery();
    
    // Form submission handler
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value;
        const location = document.getElementById('location').value;
        const story = document.getElementById('story').value;
        const imageUrl = document.getElementById('imageUrl').value;
        
        // Create new gallery item
        const newItem = {
            id: sampleGallery.length + 1,
            user: userName,
            location: location,
            story: story,
            image: imageUrl || "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        };
        
        // Add to gallery array
        sampleGallery.unshift(newItem);
        
        // Re-render gallery
        renderGallery();
        
        // Show success message
        alert('Thank you for sharing your travel story! Your submission has been added to the gallery.');
        
        // Reset form
        uploadForm.reset();
    });
    
    // Initialize Leaflet Map
    function initMap() {
        // Create map centered on Pakistan
        const map = L.map('pakistanMap').setView([30.3753, 69.3451], 6);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Define locations with categories
        const locations = [
            {
                name: "Lahore Fort & Badshahi Mosque",
                coords: [31.5883, 74.3189],
                category: "historical",
                description: "Mughal architectural marvels in the heart of Lahore"
            },
            {
                name: "Hunza Valley",
                coords: [36.3167, 74.6500],
                category: "natural",
                description: "Breathtaking valley with stunning mountain views"
            },
            {
                name: "Karachi",
                coords: [24.8607, 67.0011],
                category: "city",
                description: "Pakistan's largest city and economic hub"
            },
            {
                name: "Fairy Meadows",
                coords: [35.4216, 74.5958],
                category: "natural",
                description: "Grassy plateau near Nanga Parbat, the world's 9th highest mountain"
            },
            {
                name: "Islamabad",
                coords: [33.6844, 73.0479],
                category: "city",
                description: "Pakistan's modern capital city"
            },
            {
                name: "Mohenjo-Daro",
                coords: [27.3290, 68.1389],
                category: "historical",
                description: "Archaeological site of the ancient Indus Valley Civilization"
            },
            {
                name: "Swat Valley",
                coords: [35.2220, 72.4258],
                category: "natural",
                description: "Known as the 'Switzerland of the East' for its stunning scenery"
            },
            {
                name: "Taxila",
                coords: [33.7460, 72.8396],
                category: "historical",
                description: "Ancient archaeological site with Buddhist relics"
            },
            {
                name: "Makkran Coastal Highway",
                coords: [25.3829, 64.4065],
                category: "natural",
                description: "Stunning coastal route with beautiful beaches"
            },
            {
                name: "Shalimar Gardens",
                coords: [31.5869, 74.3842],
                category: "cultural",
                description: "Mughal-era gardens in Lahore, a UNESCO World Heritage Site"
            }
        ];
        
        // Category colors
        const categoryColors = {
            historical: "#e74c3c",
            natural: "#2ecc71",
            city: "#3498db",
            cultural: "#f39c12"
        };
        
        // Add markers for each location
        locations.forEach(location => {
            const marker = L.marker(location.coords).addTo(map);
            
            // Customize marker based on category
            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background-color: ${categoryColors[location.category]}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            
            marker.setIcon(icon);
            
            // Add popup with location info
            marker.bindPopup(`
                <h3>${location.name}</h3>
                <p>${location.description}</p>
                <small>Category: ${location.category.charAt(0).toUpperCase() + location.category.slice(1)}</small>
            `);
        });
        
        // Add a scale control
        L.control.scale().addTo(map);
    }
    
    // Initialize the map
    initMap();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});