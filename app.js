// Global state
let currentUser = null;
let currentPage = 'home';
let userProfiles = {}; // Store all user profiles with images

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('App initialized successfully!');

  // Load all data from localStorage
  loadFromLocalStorage();

  // Check if user is logged in
  checkAuth();

  // Setup password toggles
  setupPasswordToggles();

  // Setup file upload handlers
  setupFileUploads();

  // Setup click outside to close dropdowns
  setupClickOutsideHandlers();

  // Setup dashboard if on dashboard page
  if (currentUser) {
    initializeDashboard();
  }
});

// Load all data from localStorage
function loadFromLocalStorage() {
  const storedProfiles = localStorage.getItem('userProfiles');
  if (storedProfiles) {
    userProfiles = JSON.parse(storedProfiles);
  }
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
  if (currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}

// Page Navigation
function showPage(pageName) {
  console.log(`Navigating to: ${pageName}`);

  // Hide all pages
  const pages = document.querySelectorAll('.page-content');
  pages.forEach(page => page.classList.add('hidden'));

  // Show selected page
  const selectedPage = document.getElementById(`page-${pageName}`);
  if (selectedPage) {
    selectedPage.classList.remove('hidden');
    currentPage = pageName;

    // Populate account page fields if switching to account page
    if (pageName === 'account') {
      populateAccountFields();
    }
  }

  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }

  // Close user dropdown if open
  closeUserDropdown();

  // Scroll to top
  window.scrollTo(0, 0);
}

// Populate Account Fields with current user data
function populateAccountFields() {
  if (!currentUser) return;

  const fields = {
    'profile-firstname': currentUser.firstName,
    'profile-lastname': currentUser.lastName,
    'profile-email-input': currentUser.email,
    'profile-phone': currentUser.phone,
    'profile-dob': currentUser.dob,
    'profile-gender': currentUser.gender,
    'profile-employment': currentUser.employment,
    'profile-pan': currentUser.pan,
    'profile-name': `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim(),
    'profile-email': currentUser.email
  };

  for (const [id, value] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
        el.value = value || '';
      } else {
        el.textContent = value || '';
      }
    }
  }

  // Update avatar text and image
  const avatarText = document.getElementById('profile-avatar-text');
  if (avatarText) {
    avatarText.textContent = currentUser.firstName ? currentUser.firstName.charAt(0).toUpperCase() : 'U';
  }

  const avatarContainer = document.querySelector('#page-account .w-24.h-24');
  if (avatarContainer) {
    if (currentUser.profileImage) {
      avatarContainer.style.backgroundImage = `url(${currentUser.profileImage})`;
      avatarContainer.style.backgroundSize = 'cover';
      avatarContainer.style.backgroundPosition = 'center';
      if (avatarText) avatarText.style.display = 'none';
    } else {
      avatarContainer.style.backgroundImage = 'none';
      if (avatarText) avatarText.style.display = 'block';
    }
  }

  // Calculate and update age
  if (currentUser.dob) {
    const age = calculateAge(currentUser.dob);
    const ageEl = document.getElementById('profile-age');
    if (ageEl) ageEl.textContent = age;
  }
}

function calculateAge(dobString) {
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Handle Profile Update
async function handleProfileUpdate(event) {
  event.preventDefault();
  if (!currentUser) return;

  const updatedData = {
    firstName: document.getElementById('profile-firstname').value,
    lastName: document.getElementById('profile-lastname').value,
    email: document.getElementById('profile-email-input').value,
    phone: document.getElementById('profile-phone').value,
    dob: document.getElementById('profile-dob').value,
    gender: document.getElementById('profile-gender').value,
    employment: document.getElementById('profile-employment').value,
    pan: document.getElementById('profile-pan').value,
  };

  // Merge with existing data
  currentUser = { ...currentUser, ...updatedData };

  // Save to user profiles and local storage
  userProfiles[currentUser.email] = currentUser;
  saveToLocalStorage();

  updateUIForLoggedInUser();
  populateAccountFields();

  alert('✅ Profile updated successfully!');
}

// Handle Profile Photo Upload (from account page)
function handleProfilePhotoUpload(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageData = e.target.result;

      if (currentUser) {
        currentUser.profileImage = imageData;
        userProfiles[currentUser.email] = currentUser;
        saveToLocalStorage();

        updateUIForLoggedInUser();
        populateAccountFields();

        alert('✅ Profile photo updated!');
      }
    };

    reader.readAsDataURL(file);
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// User Dropdown Toggle
function toggleUserDropdown() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}

// Close dropdown
function closeUserDropdown() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.classList.add('hidden');
  }
}

// Setup click outside handlers
function setupClickOutsideHandlers() {
  document.addEventListener('click', function (event) {
    const userDropdown = document.getElementById('user-dropdown');
    const userAvatar = document.querySelector('[onclick="toggleUserDropdown()"]');

    // Close dropdown if clicking outside
    if (userDropdown && !userDropdown.classList.contains('hidden')) {
      if (!userDropdown.contains(event.target) && userAvatar && !userAvatar.contains(event.target)) {
        userDropdown.classList.add('hidden');
      }
    }
  });
}

// Authentication Check
function checkAuth() {
  // Check localStorage for user session
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    updateUIForLoggedInUser();
  }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
  // Hide login/register buttons
  const navLogin = document.getElementById('nav-login');
  const navRegister = document.getElementById('nav-register');
  const mobileLogin = document.getElementById('mobile-login');
  const mobileRegister = document.getElementById('mobile-register');

  if (navLogin) navLogin.style.display = 'none';
  if (navRegister) navRegister.style.display = 'none';
  if (mobileLogin) mobileLogin.style.display = 'none';
  if (mobileRegister) mobileRegister.style.display = 'none';

  // Show user menu and all navigation links
  const userMenu = document.getElementById('user-menu');
  const navDashboard = document.getElementById('nav-dashboard');
  const navAnalysis = document.getElementById('nav-analysis');
  const navHistory = document.getElementById('nav-history');
  const navAccount = document.getElementById('nav-account');
  const mobileDashboard = document.getElementById('mobile-dashboard');
  const mobileAnalysis = document.getElementById('mobile-analysis');
  const mobileHistory = document.getElementById('mobile-history');
  const mobileAccount = document.getElementById('mobile-account');

  if (userMenu) userMenu.style.display = 'flex';
  if (navDashboard) navDashboard.style.display = 'block';
  if (navAnalysis) navAnalysis.style.display = 'block';
  if (navHistory) navHistory.style.display = 'block';
  if (navAccount) navAccount.style.display = 'block';
  if (mobileDashboard) mobileDashboard.style.display = 'block';
  if (mobileAnalysis) mobileAnalysis.style.display = 'block';
  if (mobileHistory) mobileHistory.style.display = 'block';
  if (mobileAccount) mobileAccount.style.display = 'block';

  // Update user avatar and name
  if (currentUser) {
    const avatarText = document.getElementById('user-avatar-text');
    const dropdownName = document.getElementById('dropdown-name');
    const dropdownEmail = document.getElementById('dropdown-email');
    const greetingName = document.getElementById('dashboard-greeting-name');

    if (avatarText) {
      avatarText.textContent = currentUser.firstName ? currentUser.firstName.charAt(0).toUpperCase() : 'U';
    }
    if (dropdownName) {
      dropdownName.textContent = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || 'User';
    }
    if (dropdownEmail) {
      dropdownEmail.textContent = currentUser.email || 'user@email.com';
    }
    if (greetingName) {
      greetingName.textContent = currentUser.firstName || 'User';
    }

    // Load profile image if exists
    if (currentUser.profileImage) {
      const avatarDiv = document.querySelector('[onclick="toggleUserDropdown()"]');
      if (avatarDiv) {
        avatarDiv.style.backgroundImage = `url(${currentUser.profileImage})`;
        avatarDiv.style.backgroundSize = 'cover';
        avatarDiv.style.backgroundPosition = 'center';
        if (avatarText) avatarText.style.display = 'none';
      }
    } else {
      const avatarDiv = document.querySelector('[onclick="toggleUserDropdown()"]');
      if (avatarDiv) {
        avatarDiv.style.backgroundImage = 'none';
        if (avatarText) avatarText.style.display = 'block';
      }
    }
  }
}

// Handle Login
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Check if user exists in stored profiles
  const existingUser = userProfiles[email];

  // Simulate login
  setTimeout(() => {
    if (existingUser) {
      currentUser = existingUser;
    } else {
      currentUser = {
        email: email,
        firstName: 'Demo',
        lastName: 'User'
      };
    }

    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert('✅ Login successful! Welcome back!');
    updateUIForLoggedInUser();
    showPage('dashboard');
    initializeDashboard();
  }, 1000);
}

// Handle Registration
async function handleRegister(event) {
  event.preventDefault();

  const firstName = document.getElementById('reg-firstname').value;
  const lastName = document.getElementById('reg-lastname').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const dob = document.getElementById('reg-dob').value;
  const gender = document.getElementById('reg-gender').value;
  const employment = document.getElementById('reg-employment').value;
  const pan = document.getElementById('reg-pan').value;

  // Simulate registration
  setTimeout(() => {
    currentUser = {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      employment,
      pan,
      registeredAt: new Date().toISOString()
    };

    // Save to user profiles
    userProfiles[email] = currentUser;
    saveToLocalStorage();

    alert('✅ Registration successful! Account created!');
    updateUIForLoggedInUser();
    showPage('dashboard');
    initializeDashboard();
  }, 1000);
}

// Logout
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    alert('👋 Logging out... See you soon!');
    currentUser = null;
    localStorage.removeItem('currentUser');

    // Reset UI
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const mobileLogin = document.getElementById('mobile-login');
    const mobileRegister = document.getElementById('mobile-register');
    const userMenu = document.getElementById('user-menu');
    const navDashboard = document.getElementById('nav-dashboard');
    const navAnalysis = document.getElementById('nav-analysis');
    const navHistory = document.getElementById('nav-history');
    const navAccount = document.getElementById('nav-account');
    const mobileDashboard = document.getElementById('mobile-dashboard');
    const mobileAnalysis = document.getElementById('mobile-analysis');
    const mobileHistory = document.getElementById('mobile-history');
    const mobileAccount = document.getElementById('mobile-account');

    if (navLogin) navLogin.style.display = 'block';
    if (navRegister) navRegister.style.display = 'block';
    if (mobileLogin) mobileLogin.style.display = 'block';
    if (mobileRegister) mobileRegister.style.display = 'block';
    if (userMenu) userMenu.style.display = 'none';
    if (navDashboard) navDashboard.style.display = 'none';
    if (navAnalysis) navAnalysis.style.display = 'none';
    if (navHistory) navHistory.style.display = 'none';
    if (navAccount) navAccount.style.display = 'none';
    if (mobileDashboard) mobileDashboard.style.display = 'none';
    if (mobileAnalysis) mobileAnalysis.style.display = 'none';
    if (mobileHistory) mobileHistory.style.display = 'none';
    if (mobileAccount) mobileAccount.style.display = 'none';

    showPage('home');
  }
}

// Dashboard Section Navigation
function showDashboardSection(sectionName) {
  console.log(`Dashboard section: ${sectionName}`);

  // Hide all dashboard sections
  const sections = document.querySelectorAll('.dashboard-section');
  sections.forEach(section => section.classList.add('hidden'));

  // Show selected section
  const selectedSection = document.getElementById(`dashboard-${sectionName}`);
  if (selectedSection) {
    selectedSection.classList.remove('hidden');
  }

  // Update active nav item
  const navItems = document.querySelectorAll('.dashboard-nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const activeNav = document.querySelector(`[onclick="showDashboardSection('${sectionName}')"]`);
  if (activeNav) {
    activeNav.classList.add('active');
  }
}

// Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Export Report
function exportReport(format) {
  if (!currentUser) {
    alert("Please login to export report.");
    return;
  }

  alert(`Generating ${format.toUpperCase()} report... Please wait.`);

  // Create report content
  const reportDate = new Date().toLocaleDateString();
  const userName = `${currentUser.firstName} ${currentUser.lastName}`;

  // We create a temporary element to hold the report content
  const reportElement = document.createElement('div');
  reportElement.style.padding = '40px';
  reportElement.style.backgroundColor = '#0f172a';
  reportElement.style.color = 'white';
  reportElement.style.fontFamily = 'Inter, sans-serif';

  reportElement.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #3b82f6; font-size: 32px; margin-bottom: 10px;">Cred-Ax Financial Report</h1>
            <p style="color: #9ca3af; font-size: 14px;">Date: ${reportDate}</p>
        </div>
        
        <div style="margin-bottom: 30px; border-bottom: 1px solid #374151; padding-bottom: 20px;">
            <h2 style="font-size: 20px; color: #60a5fa; margin-bottom: 15px;">User Information</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <p><strong>Name:</strong> ${userName}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Phone:</strong> ${currentUser.phone}</p>
                <p><strong>Employment:</strong> ${currentUser.employment}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 30px;">
            <h2 style="font-size: 20px; color: #60a5fa; margin-bottom: 15px;">Financial Overview</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; text-align: center;">
                    <p style="color: #9ca3af; font-size: 14px; margin-bottom: 5px;">Trust Score</p>
                    <p style="font-size: 28px; font-weight: bold; color: #3b82f6;">${document.getElementById('trust-score')?.innerText || '850'}</p>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; text-align: center;">
                    <p style="color: #9ca3af; font-size: 14px; margin-bottom: 5px;">Repayment Prob.</p>
                    <p style="font-size: 28px; font-weight: bold; color: #8b5cf6;">${document.getElementById('repayment-prob')?.innerText || '92%'}</p>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 30px;">
            <h2 style="font-size: 20px; color: #60a5fa; margin-bottom: 15px;">Transaction History Summary</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 1px solid #374151;">
                        <th style="text-align: left; padding: 10px; color: #9ca3af;">ID</th>
                        <th style="text-align: left; padding: 10px; color: #9ca3af;">Type</th>
                        <th style="text-align: left; padding: 10px; color: #9ca3af;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding: 10px;">#TXN001</td><td style="padding: 10px;">Loan Disbursement</td><td style="padding: 10px;">₹25,000</td></tr>
                    <tr><td style="padding: 10px;">#TXN002</td><td style="padding: 10px;">Repayment</td><td style="padding: 10px;">₹5,000</td></tr>
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #4b5563;">
            <p>© 2026 Cred-Ax - Fast Loans for Gig Workers</p>
        </div>
    `;

  if (format === 'pdf') {
    const opt = {
      margin: 1,
      filename: `CredAx_Report_${userName.replace(' ', '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf
    html2pdf().from(reportElement).set(opt).save().then(() => {
      alert("✅ PDF Downloaded Successfully!");
    });
  } else if (format === 'docx') {
    // Simple DOCX simulation - export as HTML which Word can open
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + reportElement.innerHTML + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `CredAx_Report_${userName.replace(' ', '_')}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);

    alert("✅ DOCX Downloaded Successfully!");
  }
}

// Setup File Uploads
function setupFileUploads() {
  const fileInputs = document.querySelectorAll('input[type="file"]');

  fileInputs.forEach(input => {
    // We handle specific inputs separately if needed, or generalize
    if (input.id === 'profile-photo-upload') return; // handled by handleProfilePhotoUpload

    input.addEventListener('change', function (event) {
      const type = input.id.split('-')[0]; // aadhaar, pan, selfie
      const file = event.target.files[0];
      if (file) {
        alert(`✅ ${type.toUpperCase()} uploaded successfully!`);
        const statusEl = document.getElementById(`${type}-status`);
        if (statusEl) {
          statusEl.innerText = 'Uploaded';
          statusEl.className = 'badge badge-success';
        }
      }
    });
  });
}

// Password Toggle
function setupPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-password');

  toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      const showIcon = this.querySelector('.show-pass');
      const hideIcon = this.querySelector('.hide-pass');

      if (input.type === 'password') {
        input.type = 'text';
        showIcon.classList.add('hidden');
        hideIcon.classList.remove('hidden');
      } else {
        input.type = 'password';
        showIcon.classList.remove('hidden');
        hideIcon.classList.add('hidden');
      }
    });
  });
}

// Initialize Dashboard with Mock Data
function initializeDashboard() {
  console.log('Initializing dashboard...');

  // Animate counters
  animateCounter('trust-score', 785, 850);
  animateCounter('repayment-prob', 87, 92);
  animateCounter('monthly-income', 25000, 35000);
  animateCounter('debt-ratio', 18, 25);

  // Update progress bars
  setTimeout(() => {
    const trustScoreProgress = document.getElementById('trust-score-progress');
    const repaymentProbProgress = document.getElementById('repayment-prob-progress');

    if (trustScoreProgress) trustScoreProgress.style.width = '85%';
    if (repaymentProbProgress) repaymentProbProgress.style.width = '92%';
  }, 500);

  // Initialize charts if Chart.js is available
  if (typeof Chart !== 'undefined') {
    initializeCharts();
  }
}

// Animate Counter
function animateCounter(elementId, start, end) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const duration = 1500;
  const startTime = Date.now();

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + (end - start) * progress);
    if (elementId === 'repayment-prob') {
      element.textContent = current + '%';
    } else {
      element.textContent = current;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();
}

// Initialize Charts
function initializeCharts() {
  console.log('Initializing charts...');

  // Expense Chart
  const expenseCanvas = document.getElementById('expense-chart');
  if (expenseCanvas) {
    const expenseCtx = expenseCanvas.getContext('2d');
    new Chart(expenseCtx, {
      type: 'doughnut',
      data: {
        labels: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Others'],
        datasets: [{
          data: [30, 25, 20, 15, 10],
          backgroundColor: [
            '#3b82f6',
            '#8b5cf6',
            '#ec4899',
            '#10b981',
            '#f59e0b'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          }
        }
      }
    });
  }

  // Cash Flow Chart
  const cashflowCanvas = document.getElementById('cashflow-chart');
  if (cashflowCanvas) {
    const cashflowCtx = cashflowCanvas.getContext('2d');
    new Chart(cashflowCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Income',
          data: [30000, 32000, 31000, 35000, 34000, 35000],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }, {
          label: 'Expenses',
          data: [22000, 23000, 21000, 25000, 24000, 23000],
          borderColor: '#ec4899',
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: '#9ca3af'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#9ca3af'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });
  }
}

// Handle KYC File Uploads
function handleFileUpload(event, type) {
  const file = event.target.files[0];
  if (file) {
    alert(`✅ ${type.toUpperCase()} uploaded successfully!`);
    const statusEl = document.getElementById(`${type}-status`);
    if (statusEl) {
      statusEl.innerText = 'Uploaded';
      statusEl.className = 'badge badge-success';
    }
  }
}

// Global functions for onclick handlers
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleUserDropdown = toggleUserDropdown;
window.closeUserDropdown = closeUserDropdown;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;
window.showDashboardSection = showDashboardSection;
window.scrollToSection = scrollToSection;
window.exportReport = exportReport;
window.handleProfilePhotoUpload = handleProfilePhotoUpload;
window.handleProfileUpdate = handleProfileUpdate;
window.handleFileUpload = handleFileUpload;

console.log('App.js loaded successfully!');
