/**
 * Converts Break-Sheet Character data to QuestlineVTT .characters format.
 */

import { Character } from 'src/components/models';

// ===== Deterministic ID Generation =====
// Generates a 20-char alphanumeric ID derived from a hash of the character name + suffix.
// Same name + suffix always produces the same ID across exports.
function deterministicId(name: string, suffix: string): string {
  const input = `${name}::${suffix}`;
  // Simple but effective string hash (FNV-1a inspired, 64-bit range via two 32-bit halves)
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 ^= c;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= c + i;
    h2 = Math.imul(h2, 0x811c9dc5);
  }
  // Convert to unsigned and build a base-62 string
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const combined = BigInt(h1 >>> 0) * BigInt(0x100000000) + BigInt(h2 >>> 0);
  let num = combined;
  let id = '';
  for (let i = 0; i < 20; i++) {
    id += chars[Number(num % 62n)];
    num = num / 62n + BigInt(i + 1);
  }
  return id;
}

/** Creates an ID factory scoped to a character name. Each call to the returned function produces a unique deterministic ID. */
function createIdGenerator(characterName: string) {
  let counter = 0;
  return (context: string) => deterministicId(characterName, `${context}-${counter++}`);
}

// ===== Speed Rating Conversion =====
function convertSpeedRating(speed: string): string {
  const speedMap: Record<string, string> = {
    Slow: '0',
    Average: '1',
    Fast: '2',
    'Very Fast': '3',
  };
  return speedMap[speed] || '1';
}

// ===== Aptitudes Conversion =====
interface QuestlineAptitude {
  value: string;
  visible: boolean;
  bonusValue?: string;
  bonusText?: string;
}

function convertAptitudes(aptitudesArray: Character['aptitudes']): Record<string, QuestlineAptitude> {
  const aptitudes: Record<string, QuestlineAptitude> = {
    might: { value: '7', visible: true },
    deftness: { value: '7', visible: true },
    grit: { value: '7', visible: true },
    insight: { value: '7', visible: true },
    aura: { value: '7', visible: true },
  };

  if (!aptitudesArray || !Array.isArray(aptitudesArray)) {
    return aptitudes;
  }

  aptitudesArray.forEach((apt) => {
    let total = typeof apt.base === 'number' ? apt.base : parseInt(String(apt.base)) || 7;
    if (apt.mods && Array.isArray(apt.mods)) {
      apt.mods.forEach((mod) => {
        total += parseInt(String(mod.value)) || 0;
      });
    }

    let bonusValue: string | null = null;
    let bonusText: string | null = null;
    if (apt.mods && Array.isArray(apt.mods) && apt.mods.length > 0) {
      if (apt.mods.length === 1) {
        const val = parseInt(String(apt.mods[0].value)) || 0;
        bonusValue = String(val);
      } else {
        const parts = apt.mods.map((mod) => {
          const val = parseInt(String(mod.value)) || 0;
          return val >= 0 ? `+${val}` : String(val);
        });
        bonusValue = parts.join('/');
      }

      const nonTraitMods = apt.mods.filter((mod) => mod.name && mod.name.toLowerCase().trim() !== 'trait');
      if (nonTraitMods.length > 0) {
        bonusText = nonTraitMods.map((mod) => mod.name.trim()).join(', ');
      }
    }

    const key = apt.name.toLowerCase();
    if (aptitudes[key] !== undefined) {
      const aptData: QuestlineAptitude = {
        value: String(total),
        visible: true,
      };
      if (bonusValue !== null) {
        aptData.bonusValue = bonusValue;
      }
      if (bonusText !== null) {
        aptData.bonusText = bonusText;
      }
      aptitudes[key] = aptData;
    }
  });

  return aptitudes;
}

// ===== Name Cleaning Utilities =====
function cleanName(name: string): string {
  if (!name) return '';
  return name
    .trim()
    .replace(/[,.\s]+$/, '')
    .trim();
}

function toTitleCase(str: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/(?:^|\s|-)\w/g, (match) => match.toUpperCase());
}

function normalizeAbilityName(name: string): string {
  if (!name) return 'Ability';
  let cleaned = cleanName(name);
  if (cleaned === cleaned.toUpperCase() && cleaned.length > 2) {
    cleaned = toTitleCase(cleaned);
  }
  return cleaned;
}

// ===== Page Reference Formatting =====
function formatPageRef(text: string): string {
  if (!text) return '';
  return text.replace(/\(´\s*p\.?(\d+)\)/g, '(p.$1)');
}

// ===== Item Name Parsing =====
function parseItemName(fullText: string): { name: string; description: string } {
  if (!fullText) return { name: 'Item', description: '' };

  const text = fullText.trim();
  let name = '';
  const description = text;

  const firstLine = text.split('\n')[0];
  const commaParts = firstLine.split(',');
  if (commaParts.length >= 2) {
    name = commaParts.slice(0, 2).join(',').trim();
    name = name.replace(/\s*\(´\s*p\.?\d+\)\.?\s*$/, '').trim();
  } else {
    name = firstLine.replace(/\s*\(´\s*p\.?\d+\)\.?\s*$/, '').trim();
  }

  name = cleanName(name);

  return { name, description };
}

// ===== Text Formatting =====
function formatAbilityText(text: string): string {
  if (!text) return '';

  let formatted = formatPageRef(text);
  formatted = formatted
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const hasBullets = formatted.includes('\u001a') || formatted.includes('\u001b') || formatted.includes('◆');

  const lines = formatted.split('\n');
  const result: string[] = [];
  let inDescription = true;
  let descriptionLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      if (inDescription && descriptionLines.length > 0) {
        result.push('*' + descriptionLines.join(' ') + '*');
        result.push('');
        descriptionLines = [];
        inDescription = false;
      } else if (!inDescription) {
        result.push('');
      }
      continue;
    }

    if (line.includes('\u001a') || line.startsWith('•')) {
      if (inDescription && descriptionLines.length > 0) {
        result.push('*' + descriptionLines.join(' ') + '*');
        result.push('');
        descriptionLines = [];
        inDescription = false;
      }
      const cleaned = line.replace(/\u001a/g, '').trim();
      result.push('• ' + cleaned);
    } else if (line.includes('\u001b') || line.includes('◆')) {
      if (inDescription && descriptionLines.length > 0) {
        result.push('*' + descriptionLines.join(' ') + '*');
        result.push('');
        descriptionLines = [];
        inDescription = false;
      }
      const cleaned = line
        .replace(/\u001b/g, '')
        .replace(/◆/g, '')
        .trim();
      result.push('  - ' + cleaned);
    } else if (
      line.startsWith('Advantages') ||
      line.startsWith('Disadvantages') ||
      line.startsWith('Success:') ||
      line.startsWith('Failure:') ||
      line.startsWith('Requires')
    ) {
      if (inDescription && descriptionLines.length > 0) {
        result.push('*' + descriptionLines.join(' ') + '*');
        result.push('');
        descriptionLines = [];
        inDescription = false;
      }
      result.push('');
      result.push('**' + line + '**');
    } else if (line.startsWith('"') || line.startsWith('#') || line.startsWith('?')) {
      if (inDescription && descriptionLines.length > 0) {
        result.push('*' + descriptionLines.join(' ') + '*');
        result.push('');
        descriptionLines = [];
        inDescription = false;
      }
      const cleanedLine = line.replace(/^["#?]\s*/, '').trim();
      result.push('• ' + cleanedLine);
    } else if (inDescription && hasBullets) {
      descriptionLines.push(line);
    } else if (inDescription && !hasBullets) {
      descriptionLines.push(line);
    } else {
      result.push(line);
    }
  }

  if (descriptionLines.length > 0) {
    const joinedDesc = descriptionLines.join(' ');
    if (hasBullets) {
      result.push('*' + joinedDesc + '*');
    } else {
      result.push(joinedDesc);
    }
  }

  return result
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ===== Parse Gifts Text =====
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseGifts(giftsText: string, bonds: string, genId: (ctx: string) => string): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gifts: any[] = [];

  if (bonds && bonds.trim()) {
    gifts.push({
      id: genId('bond'),
      originId: null,
      type: 'Social Bond',
      name: 'Bond',
      description: bonds.trim(),
      subtext: '',
      value: 0,
      valuePrefix: null,
      valueSuffix: null,
      bonus: 0,
      linkedValue: null,
      starValue: null,
      counters: {},
      counterOverrides: {},
      modifiers: [],
      modifiersPostCalculationFunc: null,
      rollDetails: [],
    });
  }

  if (giftsText && giftsText.trim()) {
    const giftParts = giftsText.split(/,\s*/);
    if (giftParts.length >= 2) {
      const name = giftParts[0].trim();
      const description = giftParts.slice(1).join(', ').trim();
      gifts.push({
        id: genId('allegiance-gift'),
        originId: null,
        type: 'Allegiance Gift',
        name: name,
        description: formatAbilityText(description),
        subtext: '',
        value: 0,
        valuePrefix: null,
        valueSuffix: null,
        bonus: 0,
        linkedValue: null,
        starValue: null,
        counters: {},
        counterOverrides: {},
        modifiers: [],
        modifiersPostCalculationFunc: null,
        rollDetails: [],
      });
    } else {
      gifts.push({
        id: genId('allegiance-gift'),
        originId: null,
        type: 'Allegiance Gift',
        name: 'Gift',
        description: formatAbilityText(giftsText),
        subtext: '',
        value: 0,
        valuePrefix: null,
        valueSuffix: null,
        bonus: 0,
        linkedValue: null,
        starValue: null,
        counters: {},
        counterOverrides: {},
        modifiers: [],
        modifiersPostCalculationFunc: null,
        rollDetails: [],
      });
    }
  }

  return gifts;
}

// ===== Create Weapon Action =====
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createWeaponAction(weapon: any, baseAttackBonus: number, genId: (ctx: string) => string): any {
  const weaponBonus = parseInt(weapon.bonuses) || 0;
  const weaponName = cleanName(weapon.name) || 'Weapon Attack';

  let description = '';
  const rangeNum = parseInt(weapon.range) || 0;
  if (rangeNum === 0) {
    description += '**Range:** Melee\n';
  } else if (rangeNum === 1) {
    description += '**Range:** 1 Area\n';
  } else {
    description += `**Range:** ${rangeNum} Areas\n`;
  }
  if (weapon.extra) {
    description += `**Extra Damage Threshold:** ${weapon.extra}+\n`;
  }
  const totalBonus = (parseInt(String(baseAttackBonus)) || 0) + weaponBonus;
  description += `**Attack Bonus:** +${totalBonus}`;

  if (weapon.description) {
    description += '\n\n' + formatAbilityText(weapon.description);
  }

  return {
    id: genId(`weapon-${weaponName}`),
    displayName: weaponName,
    effects: [
      {
        type: 'roll',
        name: weaponName,
        selectedDie: 'd20',
        quantity: 1,
        bonus: weaponBonus,
        baseRoll: '1d20',
        advantageType: 'none',
        hide: false,
        encounterRoll: false,
        baseValue: 0,
        damageType: 'none',
        targetNumber: null,
        useLowest: false,
        successTarget: false,
        bonusSymbols: [],
        difficulty: 0,
        exploding: false,
        secondaryDice: false,
        delayedBonus: false,
        delayedBonusAmount: 0,
        challengeDice: false,
        challengeRoll: null,
        rollDirection: 'high',
        successMultiplier: 1,
        options: [],
        modifiers: [
          {
            linkedValue: 'attack-bonus.attributes.attack-bonus.value.value',
            operator: 'add',
          },
        ],
        bonusRoll: '',
      },
    ],
    details: [
      {
        type: 'image',
        value: {
          image: {
            tokenCrop: {
              unit: '%',
              width: 100,
              height: 100,
              aspect: 1,
              x: 0,
              y: 0,
            },
            url: null,
          },
        },
        visibility: 'full',
      },
      {
        type: 'description',
        value: {
          description: description,
        },
        visibility: 'full',
      },
    ],
    ready: false,
    privacy: {
      level: 'private',
      users: [],
    },
    version: 2,
    type: '',
    subtype: '',
  };
}

// ===== Convert Single Character =====
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertCharacter(source: Character): any {
  const id = source.identity || {};
  const charName = id.name || 'Unknown';
  const genId = createIdGenerator(charName);
  const characterId = genId('character');

  // QuestlineVTT BREAK!! Player sheet template ID
  const sheetId = 'JhUsxZOelsROtFyksRAP';

  const callingName = id.calling ? toTitleCase(cleanName(id.calling)) : '';
  const purviewsFormatted = id.purviews ? formatAbilityText(id.purviews) : '';

  const backgroundParts: string[] = [];
  if (id.size) backgroundParts.push(`**Size:** ${id.size}`);
  if (id.description) backgroundParts.push(id.description);
  const background = backgroundParts.join('\n\n');

  let defenseTotal = parseInt(String(source.defense?.base)) || 10;
  if (source.defense?.mods && Array.isArray(source.defense.mods)) {
    source.defense.mods.forEach((mod) => {
      defenseTotal += parseInt(String(mod.value)) || 0;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quirksAndAbilities: any[] = [];

  if (source.quirk && source.quirk.trim()) {
    const quirkLines = source.quirk.trim().split('\n');
    let quirkName = 'Quirk';
    let quirkDescription = source.quirk;

    if (quirkLines.length > 0) {
      const firstLine = quirkLines[0].trim();
      if (firstLine.length < 50 && !firstLine.includes('\u001a') && !firstLine.includes('•')) {
        quirkName = cleanName(firstLine);
        quirkDescription = quirkLines.slice(1).join('\n');
      }
    }

    quirksAndAbilities.push({
      id: genId('quirk'),
      name: normalizeAbilityName(quirkName),
      description: formatAbilityText(quirkDescription),
      value: 0,
      counters: {},
      modifiers: [],
      modifiersPostCalculationFunc: null,
      rollDetails: [],
      type: 'Quirk',
      subtext: '',
    });
  }

  if (source.abl && Array.isArray(source.abl)) {
    source.abl.forEach((ability) => {
      quirksAndAbilities.push({
        id: genId(`ability-${ability.name}`),
        name: normalizeAbilityName(ability.name),
        description: formatAbilityText(ability.text || ''),
        value: 0,
        counters: {},
        modifiers: [],
        modifiersPostCalculationFunc: null,
        rollDetails: [],
        type: ability.type || 'Basic Ability',
        subtext: ability.allegiance && ability.allegiance !== 'None' ? ability.allegiance : '',
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inventoryItems: any[] = [];

  if (source.inventory?.worn && source.inventory.worn.trim()) {
    inventoryItems.push({
      id: genId('worn-id'),
      itemId: genId('worn-itemId'),
      name: 'Worn Outfit',
      description: source.inventory.worn.trim(),
      type: 'none',
      privacy: { level: 'public', users: [] },
      creator: '',
      data: { encumbrance: 0 },
      version: 0,
      owners: [],
      quantity: 1,
      equipped: false,
      isCustom: true,
      actions: [],
    });
  }

  if (source.inventory?.slots && Array.isArray(source.inventory.slots)) {
    source.inventory.slots.forEach((slot) => {
      if (slot.name && slot.name.trim()) {
        const parsed = parseItemName(slot.name);
        inventoryItems.push({
          id: genId(`inv-id-${parsed.name}`),
          itemId: genId(`inv-itemId-${parsed.name}`),
          name: parsed.name,
          description: formatAbilityText(parsed.description),
          type: 'none',
          privacy: { level: 'public', users: [] },
          creator: '',
          data: { encumbrance: parseInt(String(slot.slots)) || 1 },
          version: 0,
          owners: [],
          quantity: 1,
          equipped: true,
          isCustom: true,
          actions: [],
        });
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actions: any[] = [];
  if (source.attacks?.weapons && Array.isArray(source.attacks.weapons)) {
    source.attacks.weapons.forEach((weapon) => {
      if (weapon.name && weapon.name.trim()) {
        actions.push(createWeaponAction(weapon, source.attacks.base as number, genId));
      }
    });
  }

  const gifts = parseGifts(source.allegiance?.gifts, source.bonds, genId);
  const heartsValue = parseInt(String(source.hearts?.base)) || 2;
  const aptitudes = convertAptitudes(source.aptitudes);

  return {
    activeSheet: sheetId,
    version: 9,
    sheetData: {
      'quirk-and-abilities': quirksAndAbilities,
      aptitudes: {
        attributes: {
          aptitudes: aptitudes,
        },
      },
      'attack-bonus': {
        attributes: {
          'attack-bonus': {
            value: {
              visible: true,
              value: String(source.attacks?.base || 0),
            },
          },
        },
      },
      'rank-and-xp': {
        attributes: {
          'rank-and-xp': {
            'next-xp': {
              visible: true,
              value: parseInt(String(source.xp?.toNext)) || 0,
            },
            'current-xp': {
              value: parseInt(String(source.xp?.current)) || 0,
              visible: true,
            },
            rank: {
              value: String(source.identity?.rank || 1),
              visible: true,
            },
          },
        },
      },
      bio: {
        appearance: id.description || '',
        characteristics: {
          skin: '',
          hair: '',
          eyes: '',
          age: '',
          gender: '',
          height: '',
          weight: '',
        },
        tokenCrop: '',
        profileImage: null,
        name: id.name || 'Unknown',
        subname: callingName,
        species: id.species || '',
        homeland: id.homeland || '',
        languages: cleanName(id.languages) || '',
        purviews: purviewsFormatted,
        details: id.history || '',
        background: background,
      },
      allegiance: {
        attributes: {
          allegiance: {
            'dark-points': {
              visible: true,
              value: String(source.allegiance?.dark || 0),
            },
            'bright-points': {
              value: String(source.allegiance?.bright || 0),
              visible: true,
            },
          },
        },
      },
      actions: actions,
      'allegiance-area': {
        attributes: {
          alignment: {
            bright: {
              visible: true,
              value: 0,
            },
            twilight: {
              value: 0,
              visible: true,
            },
            none: {
              value: 1,
              visible: true,
            },
            dark: {
              value: 0,
              visible: true,
            },
          },
        },
      },
      inventory: {
        currency: {
          stones: parseInt(String(source.wealth?.stones)) || 0,
          coins: parseInt(String(source.wealth?.coins)) || 0,
          gems: parseInt(String(source.wealth?.gems)) || 0,
        },
        items: inventoryItems,
        maxEncumbrance: parseInt(String(source.inventory?.base)) || 10,
      },
      'speed-rating': {
        attributes: {
          'speed-rating': {
            value: {
              visible: true,
              value: convertSpeedRating(source.speed?.selected || (source.speed?.base as string) || 'Average'),
            },
          },
        },
      },
      hearts: {
        max: heartsValue,
        temp: 0,
        current: heartsValue,
        showTokenMeter: true,
        tempMax: 0,
      },
      gifts: gifts,
      'defense-rating': {
        attributes: {
          'defense-rating': {
            value: {
              value: String(defenseTotal),
              visible: true,
            },
          },
        },
      },
    },
    groups: [],
    image: {
      tokenCrop: {
        y: 25,
        aspect: 1,
        x: 25,
        unit: '%',
        height: 50,
        width: 50,
      },
      url: null,
    },
    privacy: {
      level: 'public',
      users: [],
    },
    name: id.name || 'Unknown',
    isActive: true,
    baseScale: 1,
    id: characterId,
  };
}

// ===== Public Export: Convert All Characters =====
/**
 * Converts an array of Break-Sheet Characters to QuestlineVTT format.
 * Returns the JSON string ready for download as a .characters file.
 */
export function convertToQuestline(characters: Character[]): string {
  const converted = characters.map((char) => convertCharacter(char));
  return JSON.stringify(converted, null, 2);
}
