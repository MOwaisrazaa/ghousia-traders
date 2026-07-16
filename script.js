/* ==========================================================================
   Ghousia Traders - Interactive Scripts
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon between menu and x
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });
    }

    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            const icon = menuToggle ? menuToggle.querySelector('i') : null;
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Click listener to navigate to cart page
    const headerCartBtn = document.getElementById('cartBtn');
    if (headerCartBtn) {
        headerCartBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    // 2. Search Overlay Toggle
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');

    if (searchBtn && searchOverlay && searchClose) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => {
                document.getElementById('searchInput').focus();
            }, 100);
        });

        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        // Close search on clicking outside the container box
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });

        // Close search on pressing ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
        // Handle desktop search input enter submission
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                    window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
                }
            });
        }
    }

    // Handle mobile search input enter submission
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && mobileSearchInput.value.trim() !== '') {
                window.location.href = `shop.html?search=${encodeURIComponent(mobileSearchInput.value.trim())}`;
            }
        });
    }

    // 3. Testimonials Slider (Runs on about.html)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (testimonialCards.length === 0) return;
        testimonialCards.forEach(card => card.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        currentSlide = (index + testimonialCards.length) % testimonialCards.length;
        
        testimonialCards[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        if (testimonialCards.length === 0) return;
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, 6000); // Shift every 6 seconds
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }

    // Indicators click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            startAutoSlide();
        });
    });

    // Start auto slide on load
    if (testimonialCards.length > 0) {
        startAutoSlide();
    }

    // 4. Newsletter Form Submission Handling
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMsg = document.getElementById('newsletterMsg');

    if (newsletterForm && newsletterMsg) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const emailValue = emailInput.value.trim();

            if (emailValue) {
                // Display positive loading state
                newsletterMsg.className = 'newsletter-msg';
                newsletterMsg.textContent = 'Subscribing...';

                setTimeout(() => {
                    newsletterMsg.classList.add('success');
                    newsletterMsg.textContent = '🎉 Thank you! You have successfully subscribed to our newsletter.';
                    emailInput.value = '';

                    // Clear message after 5 seconds
                    setTimeout(() => {
                        newsletterMsg.textContent = '';
                        newsletterMsg.className = 'newsletter-msg';
                    }, 5000);
                }, 1000);
            }
        });
    }

    // 5. Interactive Badges & Add to Cart
    const cartCount = document.getElementById('cartCount');
    const wishlistCount = document.getElementById('wishlistCount');

    // Setup Category Shop Now buttons as simple page anchor scrolls
    const categoryButtons = document.querySelectorAll('.cat-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const shopSection = document.getElementById('shop');
            if (shopSection) {
                shopSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle Best Seller Cart additions
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.getAttribute('data-name');
            let currentCartVal = parseInt(cartCount.textContent) || 0;
            currentCartVal += 1;
            cartCount.textContent = currentCartVal;

            // Highlight cart icon momentarily
            const cartBtn = document.getElementById('cartBtn');
            if (cartBtn) {
                cartBtn.style.transform = 'scale(1.25)';
                setTimeout(() => {
                    cartBtn.style.transform = 'scale(1)';
                }, 300);
            }

            // Small animation on product button itself
            btn.style.transform = 'scale(1.15)';
            btn.style.backgroundColor = '#5C3E21';
            btn.style.color = '#FFFFFF';
            setTimeout(() => {
                btn.style.transform = '';
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 300);

            alert(`🛒 Added "${productName}" to your shopping cart!`);
        });
    });

    // Wishlist click demo
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn && wishlistCount) {
        wishlistBtn.addEventListener('click', () => {
            let currentWishVal = parseInt(wishlistCount.textContent) || 0;
            currentWishVal += 1;
            wishlistCount.textContent = currentWishVal;

            wishlistBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                wishlistBtn.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // 6. Coupon Code Clipboard Copy
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const promoCode = document.getElementById('promoCode');

    if (copyCodeBtn && promoCode) {
        copyCodeBtn.addEventListener('click', () => {
            const textToCopy = promoCode.textContent;
            
            // Clipboard API
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Change copy icon to checkmark
                const icon = copyCodeBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'check');
                    lucide.createIcons();
                    
                    // Reset back to copy icon after 2 seconds
                    setTimeout(() => {
                        icon.setAttribute('data-lucide', 'copy');
                        lucide.createIcons();
                    }, 2000);
                }
                alert(`📋 Promo code "${textToCopy}" copied to clipboard! Use it at checkout for 15% off.`);
            }).catch(err => {
                console.error('Could not copy code: ', err);
            });
        });
    }

    // Coupon Shop button scroll
    const shopOfferBtn = document.getElementById('shopOfferBtn');
    if (shopOfferBtn) {
        shopOfferBtn.addEventListener('click', () => {
            const shopSection = document.getElementById('shop');
            if (shopSection) {
                shopSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 7. Catalog Page: Wishlist Heart Toggles
    const wishlistHearts = document.querySelectorAll('.wishlist-heart');
    wishlistHearts.forEach(heart => {
        heart.addEventListener('click', () => {
            heart.classList.toggle('active');
            
            // Update global wishlist count
            if (wishlistCount) {
                let val = parseInt(wishlistCount.textContent) || 0;
                if (heart.classList.contains('active')) {
                    val += 1;
                } else {
                    val = Math.max(0, val - 1);
                }
                wishlistCount.textContent = val;
            }
        });
    });

    // 8. Catalog Page: Mobile Filter Sidebar Toggle
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const filterSidebar = document.getElementById('filterSidebar');
    if (mobileFilterBtn && filterSidebar) {
        mobileFilterBtn.addEventListener('click', () => {
            filterSidebar.classList.toggle('active');
            mobileFilterBtn.textContent = filterSidebar.classList.contains('active') ? '✕ Close Filters' : '☰ Filters';
        });
    }

    // 9. Catalog Page: Clear Filters
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Reset all radio buttons
            const radios = document.querySelectorAll('.filter-list input[type="radio"]');
            radios.forEach(r => { r.checked = r.value === 'all'; });

            // Uncheck all checkboxes
            const checkboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
            checkboxes.forEach(cb => { cb.checked = false; });

            // Reset price selects
            const priceMin = document.getElementById('priceMin');
            const priceMax = document.getElementById('priceMax');
            if (priceMin) priceMin.selectedIndex = 0;
            if (priceMax) priceMax.selectedIndex = priceMax.options.length - 1;
        });
    }

    // 10. Catalog Page: Pagination Active States
    const pageBtns = document.querySelectorAll('.page-btn:not(.page-next)');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 11. Shopping Cart Page: Interactive Calculations
    const cartRows = document.querySelectorAll('.cart-item-row');
    const summaryItemsCount = document.getElementById('summaryItemsCount');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTotal = document.getElementById('summaryTotal');
    const cartItemsList = document.getElementById('cartItemsList');
    const clearCartBtn = document.getElementById('clearCartBtn');

    function updateCartTotals() {
        let totalItems = 0;
        let grandSubtotal = 0;
        const activeRows = document.querySelectorAll('.cart-item-row');

        activeRows.forEach(row => {
            const price = parseInt(row.getAttribute('data-price')) || 0;
            const qtyInput = row.querySelector('.qty-input');
            const qty = qtyInput ? parseInt(qtyInput.value) : 1;
            
            totalItems += qty;
            const subtotal = price * qty;
            grandSubtotal += subtotal;

            const subtotalVal = row.querySelector('.val-subtotal');
            if (subtotalVal) {
                subtotalVal.textContent = `PKR ${subtotal.toLocaleString()}`;
            }
        });

        // Update summary elements
        if (summaryItemsCount) {
            summaryItemsCount.textContent = `Subtotal (${totalItems} item${totalItems !== 1 ? 's' : ''})`;
        }
        if (summarySubtotal) {
            summarySubtotal.textContent = `PKR ${grandSubtotal.toLocaleString()}`;
        }
        if (summaryTotal) {
            summaryTotal.textContent = `PKR ${grandSubtotal.toLocaleString()}`;
        }

        // Update header badge count
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }

        // If cart is empty, show empty state
        if (activeRows.length === 0 && cartItemsList) {
            cartItemsList.innerHTML = `
                <div class="empty-cart-state" style="text-align: center; padding: 60px 20px; background-color: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
                    <i data-lucide="shopping-bag" style="width: 60px; height: 60px; color: var(--text-muted); margin-bottom: 20px;"></i>
                    <h3 style="font-size: 1.4rem; color: var(--primary); margin-bottom: 10px; font-weight: 700;">Your Cart is Empty</h3>
                    <p style="color: var(--text-muted); margin-bottom: 30px;">Looks like you haven't added any products to your cart yet.</p>
                    <a href="shop.html" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            lucide.createIcons();
            
            // Hide clear cart button
            if (clearCartBtn) clearCartBtn.style.display = 'none';
        }
    }

    // Set up listeners for cart row buttons
    cartRows.forEach(row => {
        const minusBtn = row.querySelector('.qty-minus');
        const plusBtn = row.querySelector('.qty-plus');
        const qtyInput = row.querySelector('.qty-input');
        const removeBtn = row.querySelector('.remove-item-btn');

        if (minusBtn && qtyInput) {
            minusBtn.addEventListener('click', () => {
                let currentVal = parseInt(qtyInput.value) || 1;
                if (currentVal > 1) {
                    qtyInput.value = currentVal - 1;
                    updateCartTotals();
                }
            });
        }

        if (plusBtn && qtyInput) {
            plusBtn.addEventListener('click', () => {
                let currentVal = parseInt(qtyInput.value) || 1;
                qtyInput.value = currentVal + 1;
                updateCartTotals();
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                row.remove();
                updateCartTotals();
            });
        }
    });

    if (clearCartBtn && cartItemsList) {
        clearCartBtn.addEventListener('click', () => {
            const rows = document.querySelectorAll('.cart-item-row');
            rows.forEach(r => r.remove());
            updateCartTotals();
        });
    }

    // 12. Checkout Page: Delivery & Payment options toggle, coupon validation, notes count
    const deliveryCards = document.querySelectorAll('.delivery-option-card');
    deliveryCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', () => {
                deliveryCards.forEach(c => c.classList.remove('active'));
                if (radio.checked) {
                    card.classList.add('active');
                }
            });
        }
    });

    const paymentCards = document.querySelectorAll('.payment-radio-card');
    const cardInputs = document.querySelectorAll('#cardDetailsColumn input');
    
    paymentCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', () => {
                paymentCards.forEach(c => c.classList.remove('active'));
                if (radio.checked) {
                    card.classList.add('active');
                    
                    // Enable card details column only if card radio is chosen
                    if (radio.value === 'card') {
                        cardInputs.forEach(input => input.removeAttribute('disabled'));
                    } else {
                        cardInputs.forEach(input => {
                            input.setAttribute('disabled', 'true');
                            input.value = ''; // clear inputs
                        });
                    }
                }
            });
        }
    });

    // Character counter for order notes
    const orderNotes = document.getElementById('orderNotes');
    const notesCharCount = document.getElementById('notesCharCount');
    if (orderNotes && notesCharCount) {
        orderNotes.addEventListener('input', () => {
            const currentLen = orderNotes.value.length;
            notesCharCount.textContent = `${currentLen}/200 characters`;
        });
    }

    // Coupon verification logic
    const couponInput = document.getElementById('couponInput');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponAppliedAlert = document.getElementById('couponAppliedAlert');
    const removeCouponBtn = document.getElementById('removeCouponBtn');
    const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
    const checkoutTotalVal = document.getElementById('checkoutTotalVal');

    if (applyCouponBtn && couponInput) {
        applyCouponBtn.addEventListener('click', () => {
            const enteredCode = couponInput.value.trim().toUpperCase();
            if (enteredCode === 'WELCOME10' || enteredCode === 'JOY15') {
                const discount = enteredCode === 'WELCOME10' ? 3000 : 1500;
                
                // Show badge alert
                if (couponAppliedAlert) {
                    const alertText = couponAppliedAlert.querySelector('span');
                    if (alertText) alertText.innerHTML = `<i data-lucide="check" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i>${enteredCode} applied`;
                    couponAppliedAlert.style.display = 'flex';
                }

                // Show discount row in calculations
                if (checkoutDiscountRow) {
                    checkoutDiscountRow.querySelector('.summary-label').textContent = `Discount (${enteredCode})`;
                    checkoutDiscountRow.querySelector('.summary-val').textContent = `- PKR ${discount.toLocaleString()}`;
                    checkoutDiscountRow.style.display = 'flex';
                }

                // Recalculate total price
                if (checkoutTotalVal) {
                    const baseTotal = 62148; // Hardcoded default subtotal based on summary list
                    const finalTotal = baseTotal - discount;
                    checkoutTotalVal.textContent = `PKR ${finalTotal.toLocaleString()}`;
                }
                
                couponInput.value = '';
                lucide.createIcons();
            } else {
                alert('⚠️ Invalid promo code. Try "WELCOME10" or "JOY15"!');
            }
        });
    }

    if (removeCouponBtn) {
        removeCouponBtn.addEventListener('click', () => {
            if (couponAppliedAlert) couponAppliedAlert.style.display = 'none';
            if (checkoutDiscountRow) checkoutDiscountRow.style.display = 'none';
            if (checkoutTotalVal) checkoutTotalVal.textContent = 'PKR 62,148';
        });
    }

    // 13. Contact Us Page Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (name && email && subject && message) {
                alert(`✉️ Thank you, ${name}! Your message has been sent successfully. We will get back to you within 24 hours.`);
                contactForm.reset();
            } else {
                alert('⚠️ Please fill in all required fields.');
            }
        });
    }
});

