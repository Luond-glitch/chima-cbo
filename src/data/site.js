// Organisation-wide information. Everything here comes from the CHIMA Constitution (2026)
// unless marked PLACEHOLDER. Edit this file to update the website text.

export const site = {
  name: 'Chipukizi wa Mazingira',
  short: 'CHIMA',
  tagline: 'Youth-led climate action for Northern Kenya and the Upper Eastern Region',
  legalStatus: 'Community-Based Organisation (CBO) registered under the laws of Kenya', // Art. II 2.2
  areaOfOperation: 'Northern Kenya and Upper Eastern Region', // Art. II 2.3
  headquarters: 'Isiolo County, Kenya', // Art. II 2.4
  financialYear: '1st January to 31st December', // Art. XIX
};

export const preamble = [
  'Chipukizi wa Mazingira (CHIMA) is a youth-driven, community-based organisation established to promote environmental stewardship, climate resilience, and self-reliance among the people of Northern Kenya and Upper Eastern Region.',
  'The organisation is based on the notion that youth (“Chipukizi”) are the custodians of the present and future environment and can bridge indigenous pastoralist knowledge with contemporary climate science.',
  'Guided by the Constitution of Kenya, specifically Articles 10, 42, 69 and 174, CHIMA seeks to empower communities to actively participate in environmental governance, natural resource management, and sustainable development.',
];

export const vision =
  'A climate-resilient, eco-conscious, and self-reliant Northern Kenya and Upper Eastern Region driven by empowered youth.';

export const mission =
  'To promote positive social impact and climate action through youth-led, evidence-based, and community-driven initiatives.';

export const coreValues = [
  { icon: 'ShieldCheck', title: 'Integrity', text: 'Accountability in everything we do.' },
  { icon: 'Leaf', title: 'Environmental Sustainability', text: 'Protecting the land that sustains our communities.' },
  { icon: 'Scale', title: 'Inclusivity & Equity', text: 'Everyone has a place and a voice.' },
  { icon: 'Lightbulb', title: 'Youth Leadership', text: 'Innovation driven by young people.' },
  { icon: 'Users', title: 'Community Participation', text: 'Solutions owned by the communities they serve.' },
];

// Article VI – objectives (numbering follows the constitution; there is no 6.4 in the draft).
export const objectives = [
  { no: '6.1', text: 'Promote the right to a clean and healthful environment as guaranteed under Article 42 of the Constitution of Kenya.' },
  { no: '6.2', text: 'Foster youth leadership in environmental conservation and climate resilience.' },
  { no: '6.3', text: 'Strengthen community self-reliance in managing natural resources and responding to climate shocks.' },
  { no: '6.5', text: 'Promote tree growing, ecosystem restoration, and sustainable land use in line with national and county government priorities.' },
  { no: '6.6', text: 'Integrate indigenous pastoralist knowledge with modern climate-smart technology.' },
  { no: '6.7', text: 'Enhance environmental education, research, and awareness among youth and communities.' },
  { no: '6.8', text: 'Support sustainable livelihoods, green enterprises, and eco-innovation.' },
  { no: '6.9', text: 'Encourage public participation in environmental governance and decision-making.' },
  { no: '6.10', text: 'Build partnerships with government, civil society, and development partners to advance climate action.' },
];

// Draft margin notes in the constitution suggest two further objectives. Shown as "proposed" only.
export const proposedObjectives = [
  'Reduce intercommunity conflicts brought about by climate change impacts, such as fights over water and pasture.',
  'Engage youth to positively utilise their energy and steer away from harmful groupings.',
];

// Article VII – membership
export const membership = {
  eligibility:
    'Open to residents of Northern Kenya and Upper Eastern Region who subscribe to the vision, mission and objectives of CHIMA, with priority given to youth, women, and pastoralist communities.',
  categories: [
    { name: 'Ordinary Youth Member', fee: 'KSh 100 (registration)' },
    { name: 'Adult Community Member', fee: 'KSh 200 (registration)' },
    { name: 'Group / Pastoral Association', fee: 'KSh 1,000' },
    { name: 'Institutional / Partner Member', fee: 'KSh 5,000' },
    { name: 'Honorary Member (non-voting)', fee: 'No fee stated' },
  ],
  renewal: 'KSh 100 annual renewal fee (all categories)',
  admission: 'Complete an official application form, receive Executive Committee approval, and pay the prescribed fee.',
};

// Contact details supplied by CHIMA.
export const contact = {
  email: 'info@chima.org',
  phone: '0789 988 989',
  phoneHref: '+254789988989',
  address: 'CHIMA Headquarters, Hospital Road / DC Road, Isiolo Town, Kenya',
  postal: 'P.O. Box 36 – 60300, Isiolo, Kenya',
  hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
  // MOCK LINKS – replace each url with CHIMA's real page address when the pages exist.
  social: [
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/chimaorganisation' },
    { name: 'X (Twitter)', icon: 'Twitter', url: 'https://x.com/chima_org' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/chima_org' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/chima-org' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/@chima_org' },
  ],
};

// Gallery – add/replace entries freely. Put files in public/images/gallery/
export const gallery = [
  { id: 1, src: '/images/gallery/gallery-1', alt: 'Tree planting activity (placeholder)', caption: 'Tree growing and ecosystem restoration' },
  { id: 2, src: '/images/gallery/gallery-2', alt: 'Dryland landscape (placeholder)', caption: 'Understanding our drylands' },
  { id: 3, src: '/images/gallery/gallery-3', alt: 'Water resource point (placeholder)', caption: 'Water resource management' },
  { id: 4, src: '/images/gallery/gallery-4', alt: 'Community meeting (placeholder)', caption: 'Community engagement' },
  { id: 5, src: '/images/gallery/gallery-5', alt: 'Pastoralist community (placeholder)', caption: 'Pastoralist knowledge and climate science' },
  { id: 6, src: '/images/gallery/gallery-6', alt: 'Youth training session (placeholder)', caption: 'Youth leadership training' },
  { id: 7, src: '/images/gallery/gallery-7', alt: 'Environmental education (placeholder)', caption: 'Environmental education and awareness' },
  { id: 8, src: '/images/gallery/gallery-8', alt: 'Field visit (placeholder)', caption: 'Field activities' },
];
