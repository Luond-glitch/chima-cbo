// ============================================================================
//  ARTICLES DATA  –  add a new article by copying a block and giving it a new
//  id and slug. It appears automatically on the Articles page, on the Home
//  page (3 most recent) and gets its own page at /articles/<slug>.
//
//  Fields: id, title, slug (unique, lowercase-with-dashes), excerpt, image,
//          author, category, date (YYYY-MM-DD), content.
//
//  Writing `content`: separate paragraphs with a blank line.
//    "## Heading"  → section heading     "- item" → bullet point
//
//  The three articles below are SAMPLES built only from the Constitution.
//  Delete or replace them with real publications.
// ============================================================================

export const articles = [
  {
    id: 1,
    title: 'Introducing Chipukizi wa Mazingira',
    slug: 'introducing-chima',
    excerpt: 'Who we are, why youth are at the centre of our work, and the region we serve.',
    image: '/images/articles/article-1',
    author: 'CHIMA Secretariat',
    category: 'About CHIMA',
    date: '2026-10-01',
    content: `
Chipukizi wa Mazingira (CHIMA) is a youth-driven, community-based organisation established to promote environmental stewardship, climate resilience and self-reliance among the people of Northern Kenya and the Upper Eastern Region.

## Why "Chipukizi"?

"Chipukizi" means young shoots. We believe young people are the custodians of today's and tomorrow's environment, and that they can bridge indigenous pastoralist knowledge with contemporary climate science.

## Where we work

Our primary area of operation is Northern Kenya and the Upper Eastern Region, with our registered office in Isiolo County.

## What guides us

- Integrity and accountability
- Environmental sustainability
- Inclusivity and equity
- Youth leadership and innovation
- Community participation
`,
  },
  {
    id: 2,
    title: 'Where Indigenous Knowledge Meets Climate Science',
    slug: 'indigenous-knowledge-and-climate-science',
    excerpt: 'Why CHIMA works to bring pastoralist wisdom and modern climate-smart technology together.',
    image: '/images/articles/article-2',
    author: 'CHIMA Secretariat',
    category: 'Climate Resilience',
    date: '2026-10-15',
    content: `
One of CHIMA's objectives is to integrate indigenous pastoralist knowledge with modern climate-smart technology.

## Two kinds of knowledge

Pastoralist communities hold generations of understanding about land, water and seasons. Climate science adds data, forecasting and new tools. Together they can help communities prepare for and respond to climate shocks.

## Youth as the bridge

Young people are well placed to connect both worlds, and CHIMA aims to support them in doing so.

_This is a sample article. Replace it with your own content._
`,
  },
  {
    id: 3,
    title: 'Growing Trees, Restoring Ecosystems',
    slug: 'growing-trees-restoring-ecosystems',
    excerpt: 'Tree growing and ecosystem restoration as part of sustainable land use in the drylands.',
    image: '/images/articles/article-3',
    author: 'CHIMA Secretariat',
    category: 'Environment',
    date: '2026-11-01',
    content: `
CHIMA promotes tree growing, ecosystem restoration and sustainable land use in line with national and county government priorities.

## Why it matters

Healthy ecosystems support livelihoods, protect water sources and build community resilience in arid and semi-arid lands.

## Get involved

Membership is open to residents of Northern Kenya and the Upper Eastern Region, with priority for youth, women and pastoralist communities.

_This is a sample article. Replace it with your own content._
`,
  },
];

export const sortedArticles = () =>
  [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
