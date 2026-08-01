/**
 * TELISTRA DYNAMIC CLIENT APPLICATION LOGIC
 * Secure DOM manipulation adhering to SecureCoder mandatory-secure-web-skills
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initPlanSelector();
  initFAQAccordion();
  initAILaunchTriggers();
  initMobileMenu();
  initWidgetCollapseHandler();
});

/**
 * Adds smooth glassmorphism shadow on navbar when scrolled
 */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Interactive Plan Selector - Switches between Mobile SIM, NBN Internet, and Prepaid
 * Strictly uses safe DOM manipulation (textContent, setAttribute, createElement)
 */
function initPlanSelector() {
  const tabButtons = document.querySelectorAll('.plan-tab-btn');
  const planGrid = document.getElementById('plan-grid-container');
  if (!planGrid || tabButtons.length === 0) return;

  const PLANS_DATA = {
    mobile: [
      {
        name: 'Basic SIM Plan',
        data: '50 GB',
        price: '49',
        period: '/mth',
        features: ['5G Advanced Network Access', 'Unlimited standard calls & SMS', 'No lock-in contract', '24/7 TeliStar AI Assistant Support'],
        featured: false
      },
      {
        name: 'Essential SIM Plan',
        data: '150 GB',
        price: '69',
        period: '/mth',
        features: ['Full-speed 5G Advanced Network', 'Unlimited standard calls & SMS', '30 min international calls', 'Free Telstra Plus Rewards tier', '24/7 TeliStar AI Assistant Support'],
        featured: true
      },
      {
        name: 'Ultimate Premium SIM',
        data: 'Unlimited',
        price: '89',
        period: '/mth',
        features: ['Uncapped 5G Advanced Speeds', 'Unlimited standard calls & SMS', 'Unlimited international texting', 'Complimentary Cyber Security Shield', 'VIP Priority Support & TeliStar AI'],
        featured: false
      }
    ],
    nbn: [
      {
        name: 'Standard Home NBN 50',
        data: 'Unlimited Data',
        price: '85',
        period: '/mth',
        features: ['50 Mbps typical evening download', 'Smart Wi-Fi 6 Modem included', '$0 standard connection fee', '24/7 TeliStar AI Assistant Support'],
        featured: false
      },
      {
        name: 'Fast Home NBN 100',
        data: 'Unlimited Data',
        price: '105',
        period: '/mth',
        features: ['100 Mbps typical evening download', '4K streaming for multiple devices', 'Smart Wi-Fi 6 Modem included', '4G Backup Network Connectivity'],
        featured: true
      },
      {
        name: 'Ultrafast NBN 1000',
        data: 'Unlimited Data',
        price: '145',
        period: '/mth',
        features: ['Up to 850 Mbps typical evening speed', 'Ultimate gaming & cloud performance', 'Free Telstra TV Streaming Bundle', 'Dedicated 24/7 VIP AI Concierge'],
        featured: false
      }
    ],
    prepaid: [
      {
        name: 'Prepaid SIM Starter',
        data: '35 GB',
        price: '30',
        period: '/28 days',
        features: ['4G & 5G Network access', 'Data rollover up to 200GB', 'Unlimited standard calls & text', 'Instant eSIM Activation'],
        featured: false
      },
      {
        name: 'Prepaid Plus',
        data: '80 GB',
        price: '45',
        period: '/28 days',
        features: ['4G & 5G Network access', 'Data rollover up to 200GB', 'Unlimited standard calls & text', '300 mins international calls to 20 zones'],
        featured: true
      }
    ]
  };

  function renderPlans(category) {
    const plans = PLANS_DATA[category] || PLANS_DATA.mobile;
    
    // Secure DOM clearing (compliant with vanilla JS secure coding rules)
    planGrid.replaceChildren();

    plans.forEach(plan => {
      const card = document.createElement('div');
      card.className = 'plan-card' + (plan.featured ? ' featured' : '');
      
      const headerDiv = document.createElement('div');
      headerDiv.className = 'plan-card-header';
      
      const titleEl = document.createElement('h3');
      titleEl.textContent = plan.name;
      
      const dataEl = document.createElement('div');
      dataEl.className = 'plan-data-badge';
      dataEl.textContent = plan.data;

      const priceEl = document.createElement('div');
      priceEl.className = 'plan-price';
      priceEl.textContent = '$' + plan.price;
      
      const periodEl = document.createElement('span');
      periodEl.textContent = ' ' + plan.period;
      priceEl.appendChild(periodEl);

      headerDiv.appendChild(titleEl);
      headerDiv.appendChild(dataEl);
      headerDiv.appendChild(priceEl);

      const listEl = document.createElement('ul');
      listEl.className = 'plan-features';
      
      plan.features.forEach(feat => {
        const li = document.createElement('li');
        
        // Checkmark SVG element built cleanly
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2.5');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M20 6L9 17l-5-5');
        svg.appendChild(path);

        const spanText = document.createElement('span');
        spanText.textContent = feat;

        li.appendChild(svg);
        li.appendChild(spanText);
        listEl.appendChild(li);
      });

      const btnEl = document.createElement('button');
      btnEl.className = 'btn-select-plan';
      btnEl.setAttribute('type', 'button');
      btnEl.textContent = 'Select ' + plan.name;
      btnEl.addEventListener('click', () => {
        // Smooth feedback interaction
        btnEl.textContent = 'Selected! Proceeding...';
        btnEl.style.backgroundColor = '#10B981';
        btnEl.style.borderColor = '#10B981';
        btnEl.style.color = '#FFFFFF';
        setTimeout(() => {
          btnEl.textContent = 'Select ' + plan.name;
          btnEl.removeAttribute('style');
        }, 1800);
      });

      card.appendChild(headerDiv);
      card.appendChild(listEl);
      card.appendChild(btnEl);

      planGrid.appendChild(card);
    });
  }

  // Bind tab click events
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const targetCategory = e.currentTarget.getAttribute('data-category');
      renderPlans(targetCategory);
    });
  });

  // Initial render
  renderPlans('mobile');
}

/**
 * Interactive FAQ Accordions
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/**
 * Connects AI banner and hero CTA buttons to focus/open the Gemini Enterprise CES Chat Messenger widget
 */
function initAILaunchTriggers() {
  const aiButtons = document.querySelectorAll('.btn-ai-launch, .trigger-ai-chat');
  
  aiButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const chatWidget = document.querySelector('chat-messenger');
      if (chatWidget) {
        // Add subtle pulse emphasis to the bottom right widget
        chatWidget.style.transform = 'scale(1.05)';
        chatWidget.style.boxShadow = '0 0 35px rgba(0, 191, 165, 0.75)';
        setTimeout(() => {
          chatWidget.style.transform = '';
          chatWidget.style.boxShadow = '';
        }, 800);

        // Try to trigger expand dialog button inside widget if available
        const toggleBtn = chatWidget.querySelector('chat-toggle-dialog-button');
        if (toggleBtn && typeof toggleBtn.click === 'function') {
          toggleBtn.click();
        }
      } else {
        console.warn('[Telistra] chat-messenger element not found in DOM.');
      }
    });
  });
}

/**
 * Simple secure mobile menu drawer toggle
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    
    if (!isExpanded) {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = '#FFFFFF';
      navMenu.style.padding = '24px';
      navMenu.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
    } else {
      navMenu.removeAttribute('style');
    }
  });
}

/**
 * Manages chat-messenger and floating AI Launcher Bubble state machine
 */
function initWidgetCollapseHandler() {
  const chatMessenger = document.querySelector('chat-messenger');
  const bubble = document.getElementById('ai-launcher-bubble');
  if (!chatMessenger) return;

  function openWidget() {
    chatMessenger.classList.add('widget-expanded');
    chatMessenger.classList.remove('widget-collapsed');
    if (bubble) bubble.classList.add('bubble-hidden');
  }

  function closeWidget() {
    chatMessenger.classList.remove('widget-expanded');
    chatMessenger.classList.add('widget-collapsed');
    if (bubble) bubble.classList.remove('bubble-hidden');
  }

  // Start with widget open on page load, bubble hidden
  openWidget();

  // 1. Listen for clicks on the floating AI Launcher Bubble to emerge widget
  if (bubble) {
    bubble.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openWidget();
    });
  }

  // 2. Attach direct click listener to the X close button (<chat-messenger-close-button>)
  const closeBtn = chatMessenger.querySelector('chat-messenger-close-button');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeWidget();
    });
  }

  // 3. Listen for SDK dialog closed events as fallback
  chatMessenger.addEventListener('chat-messenger-dialog-closed', () => {
    closeWidget();
  });
  chatMessenger.addEventListener('chat-messenger-close', () => {
    closeWidget();
  });

  // 4. Catch click events delegated on close button without touching toggle/fullscreen button
  chatMessenger.addEventListener('click', (e) => {
    const target = e.target;
    if (!target) return;
    if (target.tagName === 'CHAT-MESSENGER-CLOSE-BUTTON' || target.closest('chat-messenger-close-button')) {
      e.preventDefault();
      e.stopPropagation();
      closeWidget();
    }
  });

  // 5. Connect homepage "Launch AI Assistant" buttons to openWidget
  const triggerButtons = document.querySelectorAll('.btn-ai-launch, .trigger-ai-chat');
  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openWidget();
    });
  });
}
