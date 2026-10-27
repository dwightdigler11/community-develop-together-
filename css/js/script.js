/* =========================================================
   EOTO PROPERTIES - REAL ESTATE CONNECTIVITY PLATFORM
   COMPLETE JAVASCRIPT ENGINE
   ========================================================= */

// Global helper for toast notifications
function showToast(message) {
    const toast = document.getElementById("toastMessage");
    const toastText = document.getElementById("toastText");
    if (!toast) return;

    if (toastText) {
        toastText.textContent = message;
    }
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

// 1-Click Instant Demo Role Login
function loginAsDemoRole(role) {
    sessionStorage.setItem("eotoAuthenticated", "true");
    sessionStorage.setItem("eotoActiveRole", role);
    window.location.href = `dashboard.html?role=${encodeURIComponent(role)}`;
}

// Global modal helpers
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("open");
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("open");
    }
}

// Connectivity Proposal Modal
function openConnectModal(pillarType, partnerTitle) {
    const modal = document.getElementById("connectModal");
    if (!modal) {
        window.location.href = `connectivity.html#matchmaker`;
        return;
    }

    const titleEl = document.getElementById("modalPartnerTitle");
    const displayField = document.getElementById("partnerDisplayField");
    const partnerName = document.getElementById("modalPartnerName");
    const partnerType = document.getElementById("modalPartnerType");
    const relSelect = document.getElementById("relationshipTypeSelect");

    if (titleEl) titleEl.textContent = `Link Request: ${partnerTitle}`;
    if (displayField) displayField.value = partnerTitle;
    if (partnerName) partnerName.value = partnerTitle;
    if (partnerType) partnerType.value = pillarType;

    if (relSelect) {
        if (pillarType === "build") relSelect.value = "build_contract";
        else if (pillarType === "sell") relSelect.value = "brokerage_mandate";
        else if (pillarType === "rent") relSelect.value = "residential_lease";
        else if (pillarType === "maintain") relSelect.value = "property_maintenance";
    }

    modal.classList.add("open");
}

function closeConnectModal() {
    closeModal("connectModal");
}

function initiateDirectLink(partnerName, partnerType, relationshipGoal) {
    openConnectModal(partnerType.toLowerCase(), `${partnerName} (${partnerType})`);
    const scopeField = document.getElementById("proposalScope");
    if (scopeField) {
        scopeField.value = `Initiating direct relationship for: ${relationshipGoal}. Requesting mutual consultation and draft agreement review.`;
    }
}

function submitLinkProposal() {
    const partner = document.getElementById("partnerDisplayField") ? document.getElementById("partnerDisplayField").value : "Partner";
    const budget = document.getElementById("proposedBudget") ? document.getElementById("proposedBudget").value : "Standard";

    closeConnectModal();
    showToast(`✓ Link Proposal sent to ${partner}! Draft Agreement prepared.`);

    // Persist to local connection history
    const existing = JSON.parse(localStorage.getItem("eotoConnections") || "[]");
    existing.push({
        partner: partner,
        budget: budget,
        timestamp: new Date().toLocaleDateString()
    });
    localStorage.setItem("eotoConnections", JSON.stringify(existing));
}

// Agreement Studio Engine
const agreementTemplates = {
    construction: {
        title: "STANDARD REAL ESTATE BUILDING & CONSTRUCTION CONTRACT",
        subtitle: "Governing structural planning, milestone execution, and phase payments for villa construction.",
        partyALabel: "FIRST PARTY (CLIENT):",
        partyBLabel: "SECOND PARTY (CONTRACTOR):",
        partyA: "Dr. Ronald Kiggundu (Client)",
        partyB: "Apex Prime Engineering Ltd (Contractor)",
        property: "Plot 84, Block 214, Kololo Hill Luxury Villa Development",
        financial: "UGX 450,000,000 (Four Hundred Fifty Million UGX)",
        commence: "1st November 2026 (Duration: 9 Months)",
        purposeText: "This binding agreement is made to connect and govern the building and construction project at Plot 84, Block 214, Kololo Hill. The Contractor covenants to construct the 4-bedroom villa strictly according to approved blueprints.",
        paymentText: "Total agreed contract sum: UGX 450,000,000 payable across 4 inspection milestones (Foundation 25%, Superstructure 35%, Finishing 30%, Retention 10%)."
    },
    brokerage: {
        title: "EXCLUSIVE REAL ESTATE BROKERAGE & MARKETING AGREEMENT",
        subtitle: "Mandate authorizing licensed broker to market, stage, and negotiate property sale.",
        partyALabel: "FIRST PARTY (LANDLORD / OWNER):",
        partyBLabel: "SECOND PARTY (LICENSED BROKER):",
        partyA: "Hajji Ssemwanga Estates (Property Owner)",
        partyB: "Victoria Premier Realty & Associates (Broker)",
        property: "Modern Kampala Luxury Villa, Makindye Hill",
        financial: "UGX 450,000,000 (Asking Price) • 5% Broker Commission",
        commence: "15th October 2026 (90 Days Exclusive Mandate)",
        purposeText: "The Landlord hereby grants the Broker exclusive rights to advertise, host buyer viewings, and market the designated property to verified buyers across all digital and in-person channels.",
        paymentText: "Upon execution of a binding sale deed and deposit into escrow, the Landlord shall pay the Broker a professional success fee equal to 5% of the gross sale consideration."
    },
    lease: {
        title: "STANDARD RESIDENTIAL TENANCY & LEASE AGREEMENT",
        subtitle: "Governing terms, deposit security, quiet enjoyment, and rent payment for residential tenancy.",
        partyALabel: "FIRST PARTY (LANDLORD):",
        partyBLabel: "SECOND PARTY (TENANT):",
        partyA: "Hajji Ssemwanga Estates (Landlord)",
        partyB: "Michael Ochieng (Tenant)",
        property: "Lake View Family Estate, Penthouse Apt 2B, Entebbe",
        financial: "UGX 4,500,000 / Month • Security Deposit: UGX 9,000,000",
        commence: "1st November 2026 (Term: 12 Calendar Months)",
        purposeText: "The Landlord demises unto the Tenant the residential apartment for peaceful dwelling. The Tenant covenants to keep the interior in good repair and abide by residential community rules.",
        paymentText: "Rent of UGX 4,500,000 is payable in advance on or before the 1st day of each month into the Landlord's designated bank account. Security deposit of 2 months held in escrow."
    },
    maintenance: {
        title: "PROPERTY MANAGEMENT & FACILITY MAINTENANCE SLA",
        subtitle: "Governing 24/7 preventative upkeep, emergency repairs, and property maintenance.",
        partyALabel: "FIRST PARTY (PROPERTY OWNER):",
        partyBLabel: "SECOND PARTY (FACILITY MANAGER):",
        partyA: "Dr. Ronald Kiggundu (Landlord / Owner)",
        partyB: "Eoto Pro-Care Facility Managers & Consortium",
        property: "Kampala Residential Villa Portfolio (12 Units)",
        financial: "UGX 800,000 / Month Service Fee • Max Discretion UGX 1.5M/Repair",
        commence: "1st November 2026 (Annual Renewable SLA)",
        purposeText: "The Contractor agrees to furnish comprehensive property maintenance including plumbing, electrical inspections, roof waterproofing, and tenant dispatch services with a 4-hour emergency SLA.",
        paymentText: "Routine monthly retainer: UGX 800,000. Emergency repairs exceeding UGX 1,500,000 require prior digital authorization via the EOTO Dashboard."
    }
};

let currentAgreementType = "construction";

function switchAgreementType(type) {
    if (!agreementTemplates[type]) return;
    currentAgreementType = type;

    // Update active button state
    document.querySelectorAll(".type-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`btnType${type.charAt(0).toUpperCase() + type.slice(1)}`);
    if (activeBtn) activeBtn.classList.add("active");

    const t = agreementTemplates[type];

    // Populate Form Inputs
    const inputA = document.getElementById("inputPartyA");
    const inputB = document.getElementById("inputPartyB");
    const inputProp = document.getElementById("inputSubjectProperty");
    const inputFin = document.getElementById("inputFinancialTerms");
    const inputComm = document.getElementById("inputCommencementDate");

    if (inputA) inputA.value = t.partyA;
    if (inputB) inputB.value = t.partyB;
    if (inputProp) inputProp.value = t.property;
    if (inputFin) inputFin.value = t.financial;
    if (inputComm) inputComm.value = t.commence;

    // Update Document View
    updateAgreementPreview();
}

function updateAgreementPreview() {
    const t = agreementTemplates[currentAgreementType];
    if (!t) return;

    const partyA = document.getElementById("inputPartyA") ? document.getElementById("inputPartyA").value : t.partyA;
    const partyB = document.getElementById("inputPartyB") ? document.getElementById("inputPartyB").value : t.partyB;
    const prop = document.getElementById("inputSubjectProperty") ? document.getElementById("inputSubjectProperty").value : t.property;
    const fin = document.getElementById("inputFinancialTerms") ? document.getElementById("inputFinancialTerms").value : t.financial;

    const titleEl = document.getElementById("docDisplayTitle");
    const subTitleEl = document.getElementById("docDisplaySubtitle");
    const docPartyALabel = document.getElementById("docPartyALabel");
    const docPartyBLabel = document.getElementById("docPartyBLabel");
    const docPartyAName = document.getElementById("docPartyAName");
    const docPartyBName = document.getElementById("docPartyBName");
    const docPropMention = document.getElementById("docPropertyMention");
    const docFinMention = document.getElementById("docFinancialMention");
    const docClausePurpose = document.getElementById("docClausePurpose");
    const docClausePayment = document.getElementById("docClausePayment");

    if (titleEl) titleEl.textContent = t.title;
    if (subTitleEl) subTitleEl.textContent = t.subtitle;
    if (docPartyALabel) docPartyALabel.textContent = t.partyALabel;
    if (docPartyBLabel) docPartyBLabel.textContent = t.partyBLabel;
    if (docPartyAName) docPartyAName.textContent = partyA;
    if (docPartyBName) docPartyBName.textContent = partyB;
    if (docPropMention) docPropMention.textContent = prop;
    if (docFinMention) docFinMention.textContent = fin;
    if (docClausePurpose) docClausePurpose.innerHTML = `This binding agreement connects and governs the real estate undertaking described as: <strong>${prop}</strong>. Both parties covenant to execute all terms with professional fiduciary diligence.`;
    if (docClausePayment) docClausePayment.innerHTML = `Agreed financial consideration: <strong>${fin}</strong>. ${t.paymentText}`;

    const sigPartyA = document.getElementById("partyASigPreview");
    if (sigPartyA) {
        sigPartyA.innerHTML = `<span>${partyA.split("(")[0].trim()}</span>`;
    }
}

// Digital Signature Canvas
let isDrawing = false;
let sigCanvas, sigCtx;

function initSignatureCanvas() {
    sigCanvas = document.getElementById("sigCanvas");
    if (!sigCanvas) return;
    sigCtx = sigCanvas.getContext("2d");
    sigCtx.lineWidth = 2.5;
    sigCtx.lineCap = "round";
    sigCtx.strokeStyle = "#0369a1";

    const getPos = (e) => {
        const rect = sigCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDraw = (e) => {
        isDrawing = true;
        const pos = getPos(e);
        sigCtx.beginPath();
        sigCtx.moveTo(pos.x, pos.y);
        const placeholder = document.getElementById("sigPlaceholder");
        if (placeholder) placeholder.style.display = "none";
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getPos(e);
        sigCtx.lineTo(pos.x, pos.y);
        sigCtx.stroke();
    };

    const stopDraw = () => {
        isDrawing = false;
    };

    sigCanvas.addEventListener("mousedown", startDraw);
    sigCanvas.addEventListener("mousemove", draw);
    sigCanvas.addEventListener("mouseup", stopDraw);
    sigCanvas.addEventListener("mouseleave", stopDraw);

    sigCanvas.addEventListener("touchstart", startDraw, { passive: false });
    sigCanvas.addEventListener("touchmove", draw, { passive: false });
    sigCanvas.addEventListener("touchend", stopDraw);
}

function clearSignatureCanvas() {
    if (!sigCanvas || !sigCtx) return;
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    const placeholder = document.getElementById("sigPlaceholder");
    if (placeholder) placeholder.style.display = "block";
}

function applySignatureToDocument() {
    if (!sigCanvas) return;
    const dataUrl = sigCanvas.toDataURL();
    const sigPreviewB = document.getElementById("partyBSigPreview");
    const sigStatusTag = document.getElementById("partyBSigStatusTag");
    const sigDate = document.getElementById("partyBSigDate");
    const docBadge = document.getElementById("docStatusBadge");

    if (sigPreviewB) {
        sigPreviewB.innerHTML = `<img src="${dataUrl}" alt="Counterparty Digital Signature" style="max-height: 55px;">`;
    }
    if (sigStatusTag) {
        sigStatusTag.textContent = "✓ Digitally Signed";
        sigStatusTag.style.color = "#16a34a";
    }
    if (sigDate) {
        sigDate.textContent = `Signed: ${new Date().toLocaleDateString()}`;
    }
    if (docBadge) {
        docBadge.textContent = "COUNTERSIGNED & ACTIVE";
        docBadge.style.color = "#16a34a";
    }

    showToast("✓ Counterparty Signature applied successfully! Agreement is now legally active.");
}

function shareAgreementLink() {
    openModal("shareAgreementModal");
}

function closeShareModal() {
    closeModal("shareAgreementModal");
}

function copyShareableLink() {
    const input = document.getElementById("shareableLinkInput");
    if (input) {
        input.select();
        document.execCommand("copy");
        showToast("✓ Agreement Share Link copied to clipboard!");
    }
}

function markAgreementCompleted() {
    showToast("✓ Agreement sealed and permanently archived in Eoto Vault!");
}

// Multi-role dashboard switcher
const roleData = {
    landlord: {
        stat1: "8", desc1: "Brokers & Maintenance Teams",
        stat2: "14", desc2: "Active Tenant Leases",
        stat3: "UGX 1.8B", desc3: "Portfolio Asset Value",
        stat4: "2", desc4: "Pending Work Orders"
    },
    construction: {
        stat1: "5", desc1: "Active Building Sites",
        stat2: "9", desc2: "Approved Milestone Claims",
        stat3: "UGX 1.2B", desc3: "Construction Order Book",
        stat4: "3", desc4: "Pending Client Quotes"
    },
    broker: {
        stat1: "12", desc1: "Landlord Seller Mandates",
        stat2: "6", desc2: "Escrow Deposits In Review",
        stat3: "UGX 45M", desc3: "Projected Sales Commission",
        stat4: "4", desc4: "Upcoming Buyer Tours"
    },
    tenant: {
        stat1: "1", desc1: "Active Tenancy Lease",
        stat2: "12 Mos", desc2: "Remaining Lease Duration",
        stat3: "UGX 4.5M", desc3: "Monthly Rental Payment",
        stat4: "0", desc4: "Maintenance Defect Issues"
    },
    builder: {
        stat1: "1", desc1: "Linked Construction Firm",
        stat2: "4 / 5", desc2: "Completed Milestone Stages",
        stat3: "UGX 450M", desc3: "Total House Build Budget",
        stat4: "1", desc4: "Upcoming Roof Inspection"
    }
};

function switchDashboardPerspective(role) {
    // Update pills
    document.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
    const activePill = document.getElementById(`pillRole${role.charAt(0).toUpperCase() + role.slice(1)}`);
    if (activePill) activePill.classList.add("active");

    // Update stats
    const data = roleData[role] || roleData.landlord;
    const s1 = document.getElementById("stat1Value");
    const d1 = document.getElementById("stat1Desc");
    const s2 = document.getElementById("stat2Value");
    const d2 = document.getElementById("stat2Desc");
    const s3 = document.getElementById("stat3Value");
    const d3 = document.getElementById("stat3Desc");
    const s4 = document.getElementById("stat4Value");
    const d4 = document.getElementById("stat4Desc");

    if (s1) s1.textContent = data.stat1;
    if (d1) d1.textContent = data.desc1;
    if (s2) s2.textContent = data.stat2;
    if (d2) d2.textContent = data.desc2;
    if (s3) s3.textContent = data.stat3;
    if (d3) d3.textContent = data.desc3;
    if (s4) s4.textContent = data.stat4;
    if (d4) d4.textContent = data.desc4;

    // Show corresponding role view
    document.querySelectorAll(".role-view-block").forEach(view => {
        view.style.display = "none";
    });

    const targetView = document.getElementById(`view${role.charAt(0).toUpperCase() + role.slice(1)}`);
    if (targetView) {
        targetView.style.display = "block";
    }

    sessionStorage.setItem("eotoActiveRole", role);
}

function submitWorkOrder() {
    closeModal("workOrderModal");
    showToast("🛠️ Maintenance Work Order dispatched to Eoto Pro-Care team!");
}

function sendQuickMessage() {
    const input = document.getElementById("quickMsgInput");
    if (input && input.value.trim()) {
        showToast(`✉️ Message transmitted to linked counterpart!`);
        input.value = "";
    }
}

// ==========================================
// SIGNOUT & SESSION TERMINATION ENGINE
// ==========================================
let signoutCountdownTimer = null;
let signoutSecondsRemaining = 8;
let signoutTimerPaused = false;

const userRoleProfiles = {
    landlord: { name: "Hajji Ssemwanga Estates", title: "Landlord / Owner", avatar: "👑" },
    construction: { name: "Apex Prime Engineering Ltd", title: "Construction Firm", avatar: "🔨" },
    broker: { name: "Victoria Premier Realty & Associates", title: "Real Estate Broker", avatar: "💼" },
    tenant: { name: "Michael Ochieng", title: "Residential Tenant", avatar: "🏠" },
    builder: { name: "Dr. Ronald Kiggundu", title: "Home Builder / Client", avatar: "🏗️" }
};

function initSignoutPage() {
    const confirmSection = document.getElementById("signoutConfirmSection");
    const successSection = document.getElementById("signoutSuccessSection");
    if (!confirmSection || !successSection) return;

    const urlParams = new URLSearchParams(window.location.search);
    const isInstant = urlParams.get("action") === "instant" || urlParams.get("confirmed") === "true";

    // Populate active session details
    const activeRole = sessionStorage.getItem("eotoActiveRole") || "landlord";
    const profile = userRoleProfiles[activeRole] || { name: "Connected Platform Member", title: "Verified Account", avatar: "👤" };

    const avatarEl = document.getElementById("activeAvatar");
    const nameEl = document.getElementById("activeUserName");
    const badgeEl = document.getElementById("activeRoleBadge");
    const sessionEl = document.getElementById("activeSessionId");

    if (avatarEl) avatarEl.textContent = profile.avatar;
    if (nameEl) nameEl.textContent = profile.name;
    if (badgeEl) badgeEl.textContent = profile.title;
    if (sessionEl) {
        const storedId = sessionStorage.getItem("eotoSessionId") || `EOTO-${Math.floor(1000 + Math.random() * 9000)}`;
        sessionStorage.setItem("eotoSessionId", storedId);
        sessionEl.textContent = storedId;
    }

    // Set dynamic cancel return URL
    const cancelBtn = document.getElementById("btnCancelSignout");
    if (cancelBtn && document.referrer && document.referrer.includes(".html") && !document.referrer.includes("signout") && !document.referrer.includes("logout")) {
        cancelBtn.href = document.referrer;
    }

    if (isInstant) {
        executeSignout(true);
    }
}

function executeSignout(silent = false) {
    // 1. Purge session credentials
    sessionStorage.removeItem("eotoAuthenticated");
    sessionStorage.removeItem("eotoActiveRole");
    sessionStorage.removeItem("eotoSessionId");

    // 2. Transition View
    const confirmSection = document.getElementById("signoutConfirmSection");
    const successSection = document.getElementById("signoutSuccessSection");
    if (confirmSection && successSection) {
        confirmSection.style.display = "none";
        successSection.style.display = "block";
    }

    if (!silent) {
        showToast("🔒 Session securely ended. Credentials purged.");
    }

    // 3. Start auto-redirect countdown
    startSignoutCountdown();
}

function startSignoutCountdown() {
    if (signoutCountdownTimer) clearInterval(signoutCountdownTimer);
    signoutSecondsRemaining = 8;
    signoutTimerPaused = false;

    const countdownNum = document.getElementById("countdownNum");
    const timerBar = document.getElementById("timerBar");
    if (countdownNum) countdownNum.textContent = signoutSecondsRemaining;
    if (timerBar) timerBar.style.width = "0%";

    signoutCountdownTimer = setInterval(function () {
        if (signoutTimerPaused) return;

        signoutSecondsRemaining--;
        if (countdownNum) countdownNum.textContent = Math.max(0, signoutSecondsRemaining);

        const percentage = ((8 - signoutSecondsRemaining) / 8) * 100;
        if (timerBar) timerBar.style.width = `${percentage}%`;

        if (signoutSecondsRemaining <= 0) {
            clearInterval(signoutCountdownTimer);
            window.location.href = "index.html";
        }
    }, 1000);
}

function togglePauseTimer() {
    signoutTimerPaused = !signoutTimerPaused;
    const btn = document.getElementById("btnPauseCountdown");
    if (btn) {
        btn.textContent = signoutTimerPaused ? "Resume" : "Pause";
    }
    if (!signoutTimerPaused && signoutSecondsRemaining <= 0) {
        window.location.href = "index.html";
    }
}

function toggleRoleSwitchDrawer() {
    const drawer = document.getElementById("roleSwitchDrawer");
    if (drawer) {
        drawer.classList.toggle("show");
    }
}

function quickSwitchRole(role) {
    sessionStorage.setItem("eotoAuthenticated", "true");
    sessionStorage.setItem("eotoActiveRole", role);
    showToast(`✓ Switched perspective to ${role.toUpperCase()}! Entering Dashboard...`);
    setTimeout(() => {
        window.location.href = `dashboard.html?role=${encodeURIComponent(role)}`;
    }, 700);
}

// Global active session header & footer updater across all pages
function updateGlobalSessionElements() {
    const authPage = document.body.classList.contains("auth-page");
    const isSignoutOrLogout = document.body.classList.contains("signout-page") || document.body.classList.contains("logout-page");
    if (authPage || isSignoutOrLogout) return;

    const activeRole = sessionStorage.getItem("eotoActiveRole") || "landlord";
    const profile = userRoleProfiles[activeRole] || { name: "Connected Member", title: "Landlord / Owner", avatar: "👑" };

    // 1. Upgrade Navigation Bar
    const navigation = document.getElementById("navigation");
    if (navigation) {
        const signoutLink = navigation.querySelector('a[href*="signout.html"], a[href*="logout.html"]');
        if (signoutLink) {
            const sessionContainer = document.createElement("div");
            sessionContainer.className = "nav-session-container";
            sessionContainer.style.display = "inline-flex";
            sessionContainer.style.alignItems = "center";
            sessionContainer.style.gap = "8px";
            sessionContainer.style.marginLeft = "8px";
            sessionContainer.innerHTML = `
                <a href="dashboard.html" class="nav-session-pill" title="Role: ${profile.title} (${profile.name})">
                    <span class="nav-session-dot"></span>
                    <span>${profile.avatar} ${profile.title.split('/')[0].trim()}</span>
                </a>
                <a href="signout.html" class="nav-signout-btn" title="Sign Out of Platform">
                    <span>🚪</span>
                    <span>Sign Out</span>
                </a>
            `;
            signoutLink.replaceWith(sessionContainer);
        }
    }

    // 2. Upgrade Footer with Active Session Status Bar
    const footerTarget = document.querySelector(".footer-bottom, .copyright, footer");
    if (footerTarget && !document.querySelector(".footer-session-bar")) {
        const bar = document.createElement("div");
        bar.className = "footer-session-bar";
        bar.innerHTML = `
            <span>🛡️ <strong>Active Session:</strong> ${profile.avatar} ${profile.name} &bull; <span style="text-transform: uppercase; font-size: 0.78rem; font-weight:700; color: var(--green);">${profile.title}</span></span>
            <a href="signout.html" class="footer-session-link">🚪 Switch Perspective or Sign Out &rarr;</a>
        `;
        footerTarget.parentNode.insertBefore(bar, footerTarget);
    }

    // 3. Upgrade Dashboard Sidebar
    const sidebar = document.getElementById("sidebar") || document.querySelector(".sidebar");
    if (sidebar) {
        const sidebarSignout = sidebar.querySelector('a[href*="signout.html"], a[href*="logout.html"]');
        if (sidebarSignout && !sidebar.querySelector(".sidebar-session-card")) {
            const card = document.createElement("div");
            card.className = "sidebar-session-card";
            card.innerHTML = `
                <div class="sidebar-session-meta">
                    <span class="nav-session-dot"></span>
                    <span>${profile.avatar} ${profile.title.split('/')[0].trim()}</span>
                </div>
                <a href="signout.html" class="sidebar-signout-btn">🚪 Safely Sign Out</a>
            `;
            sidebarSignout.replaceWith(card);
        }
    }
}

// MAIN DOM LOAD INITIALIZATION
document.addEventListener("DOMContentLoaded", function () {
    // 1. Ensure visitor is not kicked out; allow seamless guest viewing
    const authPage = document.body.classList.contains("auth-page");
    const isSignoutOrLogout = document.body.classList.contains("signout-page") || document.body.classList.contains("logout-page");

    if (isSignoutOrLogout) {
        initSignoutPage();
    } else if (!authPage) {
        // Auto-allow guests to explore all connected features
        sessionStorage.setItem("eotoAuthenticated", "true");
        updateGlobalSessionElements();
    }

    // 2. Mobile Menu
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");
    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("open");
        });
    }

    // 3. Dashboard Sidebar
    const dashboardMenu = document.getElementById("dashboardMenu");
    const sidebar = document.getElementById("sidebar");
    if (dashboardMenu && sidebar) {
        dashboardMenu.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });
    }

    // 4. Counter Animation
    const counters = document.querySelectorAll("[data-number]");
    counters.forEach(function (counter) {
        const target = Number(counter.dataset.number) || 0;
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(function () {
            current += step;
            if (current >= target) {
                counter.textContent = target + "+";
                clearInterval(timer);
            } else {
                counter.textContent = current + "+";
            }
        }, 30);
    });

    // 5. Card Entrance Observer
    const cards = document.querySelectorAll(".animation");
    const observer = ("IntersectionObserver" in window)
        ? new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.1 })
        : null;

    cards.forEach(card => {
        if (observer) observer.observe(card);
        else card.classList.add("show");
    });

    // 6. Property Search & Category Filter
    const propertySearch = document.getElementById("propertySearch");
    const propertyType = document.getElementById("propertyType");
    const propertyContainer = document.getElementById("propertyContainer");
    const resultsCount = document.getElementById("propertyResultsCount");

    function filterProperties() {
        if (!propertyContainer) return;
        const query = propertySearch ? propertySearch.value.toLowerCase().trim() : "";
        const selectedType = propertyType ? propertyType.value : "all";
        const cardsList = propertyContainer.querySelectorAll(".property-card");

        let visibleCount = 0;
        cardsList.forEach(card => {
            const cardType = card.dataset.type || "";
            const cardName = card.dataset.name ? card.dataset.name.toLowerCase() : "";
            const cardText = card.textContent.toLowerCase();

            const matchesType = (selectedType === "all") || (cardType === selectedType);
            const matchesQuery = !query || cardName.includes(query) || cardText.includes(query);

            if (matchesType && matchesQuery) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (resultsCount) {
            resultsCount.textContent = `Showing ${visibleCount} verified opportunities`;
        }
    }

    if (propertySearch) propertySearch.addEventListener("input", filterProperties);
    if (propertyType) propertyType.addEventListener("change", filterProperties);

    // Read URL params for property filtering
    const urlParams = new URLSearchParams(window.location.search);
    const paramType = urlParams.get("type");
    if (paramType && propertyType) {
        propertyType.value = paramType;
        filterProperties();
    }

    // 7. Matchmaker Form
    const matchmakerForm = document.getElementById("matchmakerForm");
    if (matchmakerForm) {
        matchmakerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const role = document.getElementById("userRole") ? document.getElementById("userRole").value : "builder";
            const cards = document.querySelectorAll(".match-result-card");
            let count = 0;

            cards.forEach(card => {
                const cat = card.dataset.category;
                let show = true;
                if (role === "builder" && cat !== "build") show = false;
                else if (role === "landlord_sell" && cat !== "sell") show = false;
                else if (role === "tenant" && cat !== "rent") show = false;
                else if (role === "landlord_maintain" && cat !== "maintain") show = false;

                if (show) {
                    card.style.display = "";
                    count++;
                } else {
                    card.style.display = "none";
                }
            });

            const countEl = document.getElementById("matchResultsCount");
            if (countEl) countEl.textContent = count;
            showToast(`Found ${count} verified partners matching your requirement!`);
        });
    }

    // 8. Initialize Signature Canvas & Agreements
    initSignatureCanvas();
    const paramAgType = urlParams.get("type");
    if (paramAgType && agreementTemplates[paramAgType]) {
        switchAgreementType(paramAgType);
    }
    const paramPartner = urlParams.get("partner");
    if (paramPartner) {
        const inputB = document.getElementById("inputPartyB");
        if (inputB) {
            inputB.value = `${decodeURIComponent(paramPartner)}`;
            updateAgreementPreview();
        }
    }

    // 9. Initialize Dashboard Role
    const activeStoredRole = sessionStorage.getItem("eotoActiveRole") || urlParams.get("role") || "landlord";
    if (document.getElementById("roleContentWrapper")) {
        switchDashboardPerspective(activeStoredRole);
    }

    // 10. Login form submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            sessionStorage.setItem("eotoAuthenticated", "true");
            window.location.href = "home.html";
        });
    }

    // 11. Signup form submission
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const fullName = document.getElementById("fullName") ? document.getElementById("fullName").value : "New Member";
            sessionStorage.setItem("eotoAuthenticated", "true");
            sessionStorage.setItem("eotoActiveRole", "builder");
            showToast(`✓ Welcome to Eoto, ${fullName}! Account created.`);
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 800);
        });
    }

    // Password visibility toggles
    const togglePass = document.getElementById("togglePassword");
    const passInput = document.getElementById("password");
    if (togglePass && passInput) {
        togglePass.addEventListener("click", function () {
            const isPassword = passInput.type === "password";
            passInput.type = isPassword ? "text" : "password";
            togglePass.textContent = isPassword ? "🙈" : "👁️";
        });
    }

    const toggleSignupPass = document.getElementById("toggleSignupPassword");
    const signupPass = document.getElementById("signupPassword");
    if (toggleSignupPass && signupPass) {
        toggleSignupPass.addEventListener("click", function () {
            const isPassword = signupPass.type === "password";
            signupPass.type = isPassword ? "text" : "password";
            toggleSignupPass.textContent = isPassword ? "🙈" : "👁️";
        });
    }

    const toggleConfirmPass = document.getElementById("toggleConfirmPassword");
    const confirmPass = document.getElementById("confirmPassword");
    if (toggleConfirmPass && confirmPass) {
        toggleConfirmPass.addEventListener("click", function () {
            const isPassword = confirmPass.type === "password";
            confirmPass.type = isPassword ? "text" : "password";
            toggleConfirmPass.textContent = isPassword ? "🙈" : "👁️";
        });
    }

    // 12. Current Year
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});