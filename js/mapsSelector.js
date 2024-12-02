const thumbnails = document.querySelectorAll('.thumbnail');
const mapImage = document.querySelector('.map-image');
const mapTitle = document.querySelector('.map-info h2');
const mapDescription = document.querySelector('.map-info p');

const values = document.querySelectorAll('.map-callout .value');
const locationValue = values[0];
const coordValue = values[1];

navLinks?.addEventListener('click', (e) => {
    e.stopPropagation();
});

const mapData = {
    sunset: {
        title: 'SUNSET',
        description: 'Set around a compromised Kingdom facility, this three-lane map blends food truck aesthetics with tactical warfare. Features multiple elevation changes and strategic chokepoints that create dynamic engagement opportunities.',
    },
    abyss: {
        title: 'ABYSS',
        description: 'An underwater fortress with three distinct pathways leading to dual spike sites. The map\'s aquatic setting provides unique angles and vertical opportunities, while hidden passages offer strategic rotation options.',
    },
    lotus: {
        title: 'LOTUS',
        description: 'Ancient ruins meet modern technology in this three-lane map. Rotating doors guard two spike sites, while destructible walls and silent drops create opportunities for both aggressive pushes and tactical stealth.',
    },
    pearl: {
        title: 'PEARL',
        description: 'This underwater city features a straightforward two-site layout without special mechanics. A condensed mid section and extended flanking routes offer diverse strategic approaches, emphasizing raw gunplay and positioning.',
    },
    fracture: {
        title: 'FRACTURE',
        description: 'A research facility torn apart by a catastrophic event. The unique H-shaped layout enables attackers to pressure defenders from multiple angles, with zip lines connecting the split sections of the map.',
    },
    breeze: {
        title: 'BREEZE',
        description: 'A tropical paradise featuring expansive areas and extended sightlines. Wide choke points and numerous battle angles make this map favor long-range encounters, while mechanical doors protect key positions.',
    },
    icebox: {
        title: 'ICEBOX',
        description: 'An arctic research facility with abundant vertical gameplay elements. Multiple elevated positions and ziplines create diverse combat scenarios, while tight angles and container-based cover enable creative strategies.',
    },
    bind: {
        title: 'BIND',
        description: 'A tactical playground featuring two sites connected by one-way teleporters. The absence of a mid area forces strategic rotations, while the teleporters offer high-risk, high-reward flanking opportunities.',
    },
    haven: {
        title: 'HAVEN',
        description: 'Set in an ancient monastery, this unique three-site map creates complex rotational challenges. Long sightlines and multiple entry points to each site demand coordinated team strategies and precise utility usage.',
    },
    split: {
        title: 'SPLIT',
        description: 'A vertically-focused map with an elevated middle section dividing two sites. Rope ascenders and multiple levels create strategic depth, while confined spaces encourage close-quarter combat and utility-based control.',
    },
    ascent: {
        title: 'ASCENT',
        description: 'Centered around an open middle courtyard with two sites flanking it. Destructible doors and elevated positions provide strategic options, while numerous corners and alleys create opportunities for tactical plays.',
    }
};

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
        
        const mapId = thumbnail.getAttribute('data-map');
        const mapInfo = mapData[mapId];
        
        if (mapInfo) {
            if (mapImage) mapImage.src = thumbnail.querySelector('img')?.src;
            if (mapTitle) mapTitle.textContent = mapInfo.title;
            if (mapDescription) mapDescription.textContent = mapInfo.description;
            if (locationValue) locationValue.textContent = mapInfo.location;
            if (coordValue) coordValue.textContent = mapInfo.coordinates;
        }
    });
});