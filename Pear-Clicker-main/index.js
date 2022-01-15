class Upgrade {
    static NextId = 0;

    // properties
    id;
    level;
    displayName;
    baseCost;
    effectType;
    element;

    // methods
    effectFn;
    effectTextFn;

    constructor({ displayName, baseCost, effectFn, effectTextFn, effectType }) {
        this.id = Upgrade.NextId++;
        this.level = 0;
        this.displayName = displayName;
        this.baseCost = baseCost;
        this.effectFn = effectFn;
        this.effectTextFn = effectTextFn;
        this.effectType = effectType;

        // create div element and add to #upgrade-container
        this.element = document.createElement('div');
        this.element.id = this.idText;
        this.element.className = "upgrade";
        this.element.onclick = (e) => UpgradeClickHandler(this);
        this.updateHtml();
        document.getElementById('upgrade-container').appendChild(this.element);
    }

    get idText() { return this.id; }
    get cost() { return Math.floor(this.baseCost * (1 + .15 * this.level)); }
    get effectResult() { return this.effectFn(this.level); }
    get effectText() { return this.effectTextFn(this.effectResult); }

    levelUp() {
        this.level++;
        this.updateHtml();
    }

    updateHighlight(pears) {
        this.element.className =
            (pears >= this.cost) ? 'upgradeOpacity' : 'upgrade';
    }

    updateHtml() {
        this.element.innerHTML = 
`<div class="buyable">
        <div class="buyable_amount">${this.level}</div>
        <div> 
        ${this.displayName}<div><br></div>
        <div class="buyable_effect">${this.effectText}</div>
        </div>
        <div class="buyable_price">$${this.cost}</div>
</div>`
    }
}

let upgrades = [];

let pears = 0;
let pearsPerClick = 1;
let pearsPerSecond = 0;

// Update Handlers

function UpdateUpgradeHighlights() {
    upgrades.forEach(upgrade => upgrade.updateHighlight(pears));
}

function UpdatePearCount(value) {
    pears += value || 0;
    document.getElementById('pears').innerHTML = pears;
    UpdateUpgradeHighlights();
}

function CreateParticle(value, x, y) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    particle.style.position = 'absolute';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.innerHTML = `+${value}`;
    return particle;
}

function EmitClickParticle(value, e) {
    console.log(e)
    const particle = CreateParticle(value, e.clientX, e.clientY);
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 500);
}

// Per Second Handler
setInterval(() => {
    UpdatePearCount(pearsPerSecond);
}, 1000);

function PearClickHandler(e) {
    UpdatePearCount(pearsPerClick);
    EmitClickParticle(pearsPerClick, e);
}

const effectTypes = {
    perClickIncrement: 0,
    perClickMultiplyer: 1,
    perSecondIncrement: 2,
    perSecondMultiplier: 3,
}

const PerClickIncrementEffects = [];
const PerClickMultiplyerEffects = [];
const PerSecondIncrementEffects = [];
const PerSecondMultiplyerEffects = [];

const effectSum = (sum, effect) => sum + effect.effectResult;

function UpdatePearsPerClick() {
    let increment = PerClickIncrementEffects.reduce(effectSum, 0);
    let multiplyer = PerClickMultiplyerEffects.reduce(effectSum, 1);
    pearsPerClick = (1 + increment) * (multiplyer === 0 ? 1 : multiplyer);
    document.getElementById('pearsPerClick').innerHTML = `${pearsPerClick} Pears Per Click`;
}

function UpdatePearsPerSecond() {
    let increment = PerSecondIncrementEffects.reduce(effectSum, 0);
    let multiplyer = PerSecondMultiplyerEffects.reduce(effectSum, 0);
    pearsPerSecond = increment * (multiplyer === 0 ? 1 : multiplyer);
    document.getElementById('pearsPerSecond').innerHTML = `${pearsPerSecond} Pears Per Second`;
}

function UpgradeClickHandler(upgrade) {
    if (pears >= upgrade.cost) {
        UpdatePearCount(-1 * upgrade.cost);
        upgrade.levelUp();
        UpdatePearsPerClick();
        UpdatePearsPerSecond();
    }
}

// Create Upgrade Objects

upgrades.push(new Upgrade({ // Upgrade #1
    displayName: "Pear Picker",
    baseCost: 20,
    effectFn: (level) => level,
    effectTextFn: (amount) => `+${amount} Pear${amount !== 1 ? 's' : ''} Per Second`,
    effectType: effectTypes.perSecondIncrement
}));

upgrades.push(new Upgrade({ // Upgrade #2
    displayName: "Plentiful Pears",
    baseCost: 100,
    effectFn: (level) => level,
    effectTextFn: (amount) => `+${amount} Pear${amount !== 1 ? 's' : ''} Per Click`,
    effectType: effectTypes.perClickIncrement
}));

upgrades.push(new Upgrade({ // Upgrade #3
    displayName: "Pear Plantation",
    baseCost: 500,
    effectFn: (level) => 5 * level,
    effectTextFn: (amount) => `+${amount} Pear${amount !== 1 ? 's' : ''} Per Second`,
    effectType: effectTypes.perSecondIncrement
}));

upgrades.push(new Upgrade({ // Upgrade #4
    displayName: "Pristine Pears",
    baseCost: 2500,
    effectFn: (level) => 0.5 * level,
    effectTextFn: (amount) => `+${amount}x Pears Per Click`,
    effectType: effectTypes.perClickMultiplyer
}));

upgrades.push(new Upgrade({ // Upgrade #5
    displayName: "Pear Paradise",
    baseCost: 12500,
    effectFn: (level) => 2 * level,
    effectTextFn: (amount) => `+${amount}x Pears Per Second`,
    effectType: effectTypes.perSecondMultiplyer
}));

upgrades.push(new Upgrade({ // Upgrade #6
    displayName: "Perfect Pears",
    baseCost: 12500,
    effectFn: (level) => 2 * level,
    effectTextFn: (amount) => `+${amount}x Pears Per Second`,
    effectType: effectTypes.perSecondMultiplyer
}));

upgrades.push(new Upgrade({ // Upgrade #7
    displayName: "Painless Picking",
    baseCost: 12500,
    effectFn: (level) => 2 * level,
    effectTextFn: (amount) => `+${amount}x Pears Per Second`,
    effectType: effectTypes.perSecondMultiplyer
}));

upgrades.push(new Upgrade({ // Upgrade #8
    displayName: "Pear Priority",
    baseCost: 12500,
    effectFn: (level) => 2 * level,
    effectTextFn: (amount) => `+${amount}x Pears Per Second`,
    effectType: effectTypes.perSecondMultiplyer
}));

upgrades.push(new Upgrade({ // Upgrade #9
    displayName: "Pear Pandamonium",
    baseCost: 12500,
    effectFn: (level) => 2 * level,
    effectTextFn: (amount) => `+${amount}x Pears Per Second`,
    effectType: effectTypes.perSecondMultiplyer
}));

upgrades.push(new Upgrade({ // Upgrade #10
    displayName: "Pearpocalypse",
    baseCost: 39062500,
    effectFn: (level) => 1 * level,
    effectTextFn: (amount) => `+${amount} Pear${amount !== 1 ? 's' : ''} Per Second`,
    effectType: effectTypes.perClickMultiplyer
}));


// Add effects to the effects arrays

for (let upgrade of upgrades) {
    switch (upgrade.effectType) {
        case effectTypes.perClickIncrement:
            PerClickIncrementEffects.push(upgrade);
            break;
        case effectTypes.perClickMultiplyer:
            PerClickMultiplyerEffects.push(upgrade);
            break;
        case effectTypes.perSecondIncrement:
            PerSecondIncrementEffects.push(upgrade);
            break;
        case effectTypes.perSecondMultiplyer:
            PerSecondMultiplyerEffects.push(upgrade);
            break;
    }
}

// Initialize the Page

UpdatePearCount();
UpdatePearsPerClick();
UpdatePearsPerSecond();
