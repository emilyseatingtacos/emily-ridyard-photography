const metrics = {
  views: {
    label: "Attention",
    title: "Views grew steadily.",
    growth: "+19.5%",
    prior: "9,372",
    current: "11,200",
    priorWidth: "83.7%",
    insight: "Reach improved, but attention by itself does not prove that the audience is becoming an owned community or a source of qualified leads."
  },
  interactions: {
    label: "Engagement",
    title: "Interactions accelerated.",
    growth: "+50.3%",
    prior: "290",
    current: "436",
    priorWidth: "66.5%",
    insight: "Interactions grew more than twice as fast as views. The audience was not merely larger—it was becoming more responsive to the work."
  },
  viewers: {
    label: "Audience",
    title: "Unique reach expanded.",
    growth: "+45.2%",
    prior: "3,440",
    current: "4,995",
    priorWidth: "68.9%",
    insight: "Nearly five thousand unique viewers widened the top of the funnel. The next question is whether the profile gave high-intent visitors a clear reason to stay connected."
  },
  followers: {
    label: "Ownership",
    title: "Follower growth surged.",
    growth: "+135.7%",
    prior: "100 index",
    current: "235.7 index",
    priorWidth: "42.4%",
    insight: "Follower growth was a strong ownership signal. The opportunity was to support that momentum with consistent positioning and a next step beyond the social platform."
  }
};

const metricButtons = [...document.querySelectorAll("[data-metric]")];
metricButtons.forEach((button) => button.addEventListener("click", () => {
  const metric = metrics[button.dataset.metric];
  metricButtons.forEach((item) => item.setAttribute("aria-selected", String(item === button)));
  document.querySelector("#chart-label").textContent = metric.label;
  document.querySelector("#chart-title").textContent = metric.title;
  document.querySelector("#chart-growth").textContent = metric.growth;
  document.querySelector("#prior-value").textContent = metric.prior;
  document.querySelector("#current-value").textContent = metric.current;
  document.querySelector("#prior-bar").style.width = metric.priorWidth;
  document.querySelector("#current-bar").style.width = "100%";
  document.querySelector("#chart-insight").textContent = metric.insight;
}));

const diagnoses = {
  volume: {
    status: "NOT YET PROVEN",
    title: "More content is not automatically the answer.",
    copy: "The data shows stronger reach and interaction, but it does not show that frequency caused the growth. Increasing output before clarifying the journey could create more activity without fixing conversion.",
    confidence: "Weak fit: assumes a cause the evidence does not establish",
    correct: false
  },
  conversion: {
    status: "BEST-SUPPORTED READING",
    title: "Attention is outpacing the path to durable value.",
    copy: "Reach, unique viewers, interactions, and follower growth all rose. The strategic gap is not discovery alone—it is turning this momentum into a clear relationship through sharper positioning, purposeful content, and owned lead capture.",
    confidence: "Strong fit: connects every positive signal to the next business question",
    correct: true
  },
  reach: {
    status: "CONTRADICTED BY THE DATA",
    title: "Reach is rising, not declining.",
    copy: "Views increased 19.5% and unique viewers increased 45.2%. Treating reach as the primary problem would direct effort away from the stronger opportunity: what qualified visitors do after discovering the brand.",
    confidence: "Poor fit: conflicts with two reported metrics",
    correct: false
  }
};

const diagnosisButtons = [...document.querySelectorAll("[data-diagnosis]")];
diagnosisButtons.forEach((button) => button.addEventListener("click", () => {
  const result = diagnoses[button.dataset.diagnosis];
  diagnosisButtons.forEach((item) => {
    item.classList.toggle("selected", item === button);
    item.classList.toggle("correct", item === button && result.correct);
  });
  const panel = document.querySelector("#diagnosis-result");
  panel.querySelector("span").textContent = result.status;
  panel.querySelector("h3").textContent = result.title;
  panel.querySelector("p").textContent = result.copy;
  panel.querySelector(".confidence small").textContent = result.confidence;
  panel.querySelector(".confidence i").style.background = result.correct ? "var(--lime)" : "var(--coral)";
}));

const strategies = {
  positioning: {
    kicker: "MAKE THE PROMISE LEGIBLE",
    title: "Position TheVetCSR as a practical system for veterinary front desks.",
    copy: "Replace broad creator language with a crisp audience, problem, and outcome. A qualified visitor should understand within seconds who the work serves and why it is useful.",
    actions: ["Lead with the veterinary CSR audience.", "Name the operational problem being solved.", "Connect each channel to the same core promise."],
    signal: "More qualified profile actions—not just more impressions."
  },
  content: {
    kicker: "DESIGN FOR INTENT, NOT VOLUME",
    title: "Build a repeatable content ladder from discovery to trust.",
    copy: "Organize ideas by what the audience needs next: fast recognition, practical education, proof of expertise, and a deeper resource. Each piece should advance a relationship instead of competing as an isolated post.",
    actions: ["Map topics to discovery, trust, and action.", "Repeat high-value themes in multiple useful formats.", "Measure saves, replies, clicks, and return behavior."],
    signal: "A larger share of engagement moves toward high-intent actions."
  },
  capture: {
    kicker: "GIVE MOMENTUM SOMEWHERE TO GO",
    title: "Create one valuable, low-friction path into an owned relationship.",
    copy: "Offer a focused resource that matches the strongest audience need, then connect social content and profile positioning to the same destination. The goal is usefulness first and measurable follow-through second.",
    actions: ["Choose one audience-specific lead resource.", "Use one consistent call to action across channels.", "Track visits, opt-ins, and downstream engagement."],
    signal: "Social attention begins producing measurable owned-audience growth."
  }
};

const strategyButtons = [...document.querySelectorAll("[data-strategy]")];
strategyButtons.forEach((button) => button.addEventListener("click", () => {
  const strategy = strategies[button.dataset.strategy];
  strategyButtons.forEach((item) => item.setAttribute("aria-selected", String(item === button)));
  document.querySelector("#strategy-kicker").textContent = strategy.kicker;
  document.querySelector("#strategy-title").textContent = strategy.title;
  document.querySelector("#strategy-copy").textContent = strategy.copy;
  document.querySelector("#strategy-actions").innerHTML = strategy.actions.map((action, index) => `<li><b>0${index + 1}</b><span>${action}</span></li>`).join("");
  document.querySelector("#strategy-signal").textContent = strategy.signal;
}));
