/* ==========================================================================
   Ghousia Traders - Product Detail Page (PDP) Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Image Gallery Thumbnails & Arrows Logic
    const galleryData = [
        { src: 'assets/mercedes_amg_front.png', alt: 'Mercedes B/O Car (AMG) Front View' },
        { src: 'assets/mercedes_amg_side.png', alt: 'Mercedes B/O Car (AMG) Side View' },
        { src: 'assets/mercedes_amg_dashboard.png', alt: 'Mercedes B/O Car (AMG) Interior Dashboard' },
        { src: 'assets/mercedes_amg_wheel.png', alt: 'Mercedes B/O Car (AMG) Alloy Wheel Detail' }
    ];

    let currentImgIndex = 0;

    const mainImg = document.getElementById('pdpMainImage');
    const thumbButtons = document.querySelectorAll('.pdp-thumb-item');
    const prevArrow = document.getElementById('galleryPrevBtn');
    const nextArrow = document.getElementById('galleryNextBtn');

    function updateMainImage(index) {
        if (index < 0) index = galleryData.length - 1;
        if (index >= galleryData.length) index = 0;
        currentImgIndex = index;

        if (mainImg) {
            mainImg.style.opacity = '0.4';
            setTimeout(() => {
                mainImg.src = galleryData[currentImgIndex].src;
                mainImg.alt = galleryData[currentImgIndex].alt;
                mainImg.style.opacity = '1';
            }, 150);
        }

        thumbButtons.forEach((btn, idx) => {
            if (idx === currentImgIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    thumbButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => updateMainImage(idx));
    });

    if (prevArrow) {
        prevArrow.addEventListener('click', () => updateMainImage(currentImgIndex - 1));
    }
    if (nextArrow) {
        nextArrow.addEventListener('click', () => updateMainImage(currentImgIndex + 1));
    }

    // 2. Image Lightbox Zoom Modal
    const zoomBtn = document.getElementById('pdpZoomBtn');
    const lightboxModal = document.getElementById('pdpLightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxCloseBtn');

    function openLightbox() {
        if (lightboxModal && lightboxImg) {
            lightboxImg.src = galleryData[currentImgIndex].src;
            if (lightboxCaption) {
                lightboxCaption.textContent = galleryData[currentImgIndex].alt;
            }
            lightboxModal.classList.add('active');
        }
    }

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
        }
    }

    if (zoomBtn) zoomBtn.addEventListener('click', openLightbox);
    if (mainImg) {
        mainImg.style.cursor = 'zoom-in';
        mainImg.addEventListener('click', openLightbox);
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // 3. Variations Toggle (Color, Age, Battery)
    const varButtons = document.querySelectorAll('.var-btn');
    varButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.getAttribute('data-group');
            const value = btn.getAttribute('data-val');

            const groupBtns = document.querySelectorAll(`.var-btn[data-group="${group}"]`);
            groupBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const labelSpan = document.getElementById(`${group}SelectedVal`);
            if (labelSpan) labelSpan.textContent = value;
        });
    });

    // 4. Quantity Controls (+ / -)
    const qtyMinusBtn = document.getElementById('qtyMinusBtn');
    const qtyPlusBtn = document.getElementById('qtyPlusBtn');
    const qtyInput = document.getElementById('qtyInput');

    if (qtyMinusBtn && qtyPlusBtn && qtyInput) {
        qtyMinusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });

        qtyPlusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val < 10) qtyInput.value = val + 1;
        });
    }

    // 5. Toast Notification Helper
    const toast = document.getElementById('pdpToast');
    const toastMsg = document.getElementById('toastMessage');
    let toastTimeout = null;

    function showToast(message) {
        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.add('show');

            if (toastTimeout) clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }
    }

    // 6. Add to Cart Action
    const addToCartBtn = document.getElementById('pdpAddToCartBtn');
    const cartCountBadge = document.getElementById('cartCount');

    if (addToCartBtn && cartCountBadge) {
        addToCartBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
            let currentCartVal = parseInt(cartCountBadge.textContent) || 0;
            cartCountBadge.textContent = currentCartVal + qty;

            const cartHeaderBtn = document.getElementById('cartBtn');
            if (cartHeaderBtn) {
                cartHeaderBtn.style.transform = 'scale(1.25)';
                setTimeout(() => cartHeaderBtn.style.transform = 'scale(1)', 300);
            }

            showToast(`🛒 Added ${qty} x Mercedes B/O Car (AMG) to your shopping cart!`);
        });
    }

    // 7. Buy Now Action
    const buyNowBtn = document.getElementById('pdpBuyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
            if (cartCountBadge) {
                let currentCartVal = parseInt(cartCountBadge.textContent) || 0;
                cartCountBadge.textContent = currentCartVal + qty;
            }
            showToast(`⚡ Proceeding to checkout...`);
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 800);
        });
    }

    // 8. Wishlist Toggle Action
    const wishlistToggleBtn = document.getElementById('pdpWishlistToggle');
    const wishlistCountBadge = document.getElementById('wishlistCount');

    if (wishlistToggleBtn && wishlistCountBadge) {
        wishlistToggleBtn.addEventListener('click', () => {
            let currentWishVal = parseInt(wishlistCountBadge.textContent) || 0;
            const isAdd = !wishlistToggleBtn.classList.contains('active');

            if (isAdd) {
                wishlistToggleBtn.classList.add('active');
                const textSpan = wishlistToggleBtn.querySelector('.wishlist-text');
                if (textSpan) textSpan.textContent = 'In Wishlist';
                wishlistCountBadge.textContent = currentWishVal + 1;
                showToast(`❤️ Added Mercedes B/O Car (AMG) to your wishlist!`);
            } else {
                wishlistToggleBtn.classList.remove('active');
                const textSpan = wishlistToggleBtn.querySelector('.wishlist-text');
                if (textSpan) textSpan.textContent = 'Add to Wishlist';
                wishlistCountBadge.textContent = Math.max(0, currentWishVal - 1);
                showToast(`Removed item from your wishlist.`);
            }

            const headerWishlistBtn = document.getElementById('wishlistBtn');
            if (headerWishlistBtn) {
                headerWishlistBtn.style.transform = 'scale(1.25)';
                setTimeout(() => headerWishlistBtn.style.transform = 'scale(1)', 300);
            }
        });
    }

    // 9. Tabs Navigation & Smooth Scroll
    const tabBtns = document.querySelectorAll('.pdp-tab-btn');
    const tabPanels = document.querySelectorAll('.pdp-tab-panel');

    function activateTab(tabId) {
        tabBtns.forEach(btn => {
            const controls = btn.getAttribute('aria-controls');
            if (controls === tabId) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        tabPanels.forEach(panel => {
            if (panel.id === tabId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('aria-controls');
            activateTab(targetTab);
        });
    });

    const scrollToReviewsLink = document.getElementById('scrollToReviewsLink');
    const viewAllReviewsBtn = document.getElementById('viewAllReviewsBtn');

    function jumpToReviews(e) {
        e.preventDefault();
        activateTab('tab-reviews');
        const tabsSection = document.getElementById('pdpTabsSection');
        if (tabsSection) {
            tabsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (scrollToReviewsLink) scrollToReviewsLink.addEventListener('click', jumpToReviews);
    if (viewAllReviewsBtn) viewAllReviewsBtn.addEventListener('click', jumpToReviews);

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }
});
