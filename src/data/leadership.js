// ============================================================================
//  LEADERSHIP DATA  –  edit this file to update the organogram.
// ============================================================================
//  The organogram is generated automatically from this list.
//
//  Fields
//   id          unique number
//   parentId    id of the box this one sits under (null = top of a tree).
//               Every item with parentId: null starts its own tree.
//   type        'body'   = a governing body (no photo/person), e.g. General Assembly
//               'member' = a person holding a position
//   name        full name (for 'body' this is the body's name)
//   position    official designation
//   image       path under /public, e.g. "/images/leadership/chairperson.jpg"
//   biography   short biography shown in the pop-up
//   duties      (optional) list of responsibilities, taken from the Constitution
//   email, phone, linkedin   (optional) shown in the pop-up if provided
//   placeholder true while the real person's details are not yet available
//
//  To ADD a member: copy any 'member' block, give it a new id, set parentId to the
//  box it should sit under, and save. To add another Trustee, set parentId: 20.
//
//  Structure follows the Constitution (2026): Art. XI (General Assembly is supreme;
//  Executive Committee of five office bearers) and Art. XVII (at least three
//  Trustees appointed at an AGM). The Constitution does not set further reporting
//  lines, so the five office bearers sit side by side under the Executive Committee.
// ============================================================================

const PH = '/images/leadership/placeholder.svg'; // shown until a real photo is added

export const leadership = [
  {
    id: 1, parentId: null, type: 'body',
    name: 'General Assembly',
    position: 'Supreme organ of CHIMA',
    biography:
      'The General Assembly is the supreme decision-making body of CHIMA. It meets at an Annual General Meeting each year, and special meetings can be convened when needed. Two-thirds of registered members present form a quorum.',
  },
  {
    id: 2, parentId: 1, type: 'body',
    name: 'Executive Committee',
    position: 'Manages the day-to-day affairs of CHIMA',
    biography:
      'The Executive Committee implements General Assembly resolutions, provides strategic leadership and policy direction, oversees programmes, finances and partnerships, and ensures compliance with applicable laws.',
  },

  // ---- Executive Committee office bearers (Art. XI & XIII) ----
  {
    id: 3, parentId: 2, type: 'member', placeholder: true,
    name: 'Mr.Omondi O Sylvester', position: 'Chairperson', image: "/images/leadership/chairperson.jpg",
    biography: 'Sylvester Omondi is a passionate environmental and sustainable development advocate committed to promoting climate resilience, environmental conservation and sustainable livelihoods, particularly in Arid and Semi-Arid Lands (ASALs). He provides strategic leadership and direction at CHIMA, championing community-centred initiatives that address environmental challenges and promote sustainable solutions. Through his leadership, he seeks to encourage innovation, strengthen community participation and foster partnerships that advance environmental sustainability and resilience. He is driven by the belief that empowered communities and collective action are essential to creating a more sustainable and resilient future.',
    duties: [
      'Provide overall strategic leadership and direction of CHIMA',
      'Preside over all meetings of the General Assembly and Executive Committee',
      'Serve as principal spokesperson and representative of CHIMA',
      'Ensure effective implementation of decisions and policies',
      'Promote unity, accountability and youth leadership',
      'Bank signatory',
    ],
  },
  {
    id: 4, parentId: 2, type: 'member', placeholder: true,
    name: 'Linah Munyi', position: 'Vice Chairperson', image: "/images/leadership/lynne.jpeg",
    biography: 'Linah Munyi is an emerging disaster risk management and climate resilience practitioner passionate about environmental conservation, community empowerment and sustainable development. With an academic background in Disaster Risk Management and Sustainable Development, she is particularly interested in strengthening community resilience, promoting disaster preparedness and advancing climate adaptation initiatives. Her practical experience at the National Disaster Operations Centre has enhanced her understanding of disaster risk communication, coordinated response and informed decision-making. As Vice Chairperson of Chipukizi wa Mazingira (CHIMA) and Millennium Fellowship Class of 2026 Campus Director, she is committed to supporting youth leadership, championing community-driven environmental solutions and advancing CHIMA’s mission of environmental stewardship, climate resilience and sustainable community development.',
    duties: [
      'Assist the Chairperson and act on their behalf in their absence',
      'Support coordination and supervision of committees and special assignments',
      'Promote good governance, compliance and teamwork in the Executive Committee',
    ],
  },
  {
    id: 5, parentId: 2, type: 'member', placeholder: true,
    name: 'Cynthia Akinyi Ochieng', position: 'Secretary', image: "/images/leadership/synthia.jpeg",
    biography: 'Cynthia Akinyi Ochieng,is a dedicated community development practitioner, disaster risk management strategist, and skilled administrator serving as the Secretary of the Chima. She brings a strong background in volunteer mobilization, emergency preparedness, and administrative governance. Through her extensive civic engagements, including her work with the Kenya Red Cross Society and local community mobilization projects,she is committed to driving sustainable, community-led solutions and advancing long-term resilience for the organization initiatives.',
    duties: [
      'Keep all official records and documentation',
      'Prepare notices and minutes of all meetings',
      'Maintain the register of members',
      'Handle official correspondence and statutory filings',
      'Bank signatory',
    ],
  },
  {
    id: 6, parentId: 2, type: 'member', placeholder: true,
    name: 'Mr.Clement Mutugi', position: 'Treasurer', image: "/images/leadership/clemo.png" ,
    biography: 'Clement Mutugi is a purpose-driven young leader passionate about entrepreneurship, financial accountability, mentorship and community development. His leadership journey and involvement in community initiatives have strengthened his commitment to empowering youth and creating meaningful social impact. As the Finance and Treasurer of Chipukizi wa Mazingira (CHIMA), he is dedicated to promoting transparency, prudent financial management and responsible resource utilization to support environmental conservation and sustainable community development. He believes that true leadership is measured by the positive impact one creates and remains committed to continuous learning, innovation and inspiring future generations to become agents of change.',
    duties: [
      'Custody and management of all funds and financial assets',
      'Maintain accurate books of accounts and prepare financial reports',
      'Make payments in line with approved budgets and resolutions',
      'Mandatory bank signatory',
    ],
  },
  {
    id: 7, parentId: 2, type: 'member', placeholder: true,
    name: 'Grace Wanje Kemori', position: 'Programme Coordinator', image: "/images/leadership/image.png",
    biography: 'Grace Wanja Kimori is a dedicated young leader and final-year student at The Co-operative University of Kenya, pursuing a Bachelor of Science in Disaster Risk Management and Sustainable Development. She is passionate about environmental conservation, disaster preparedness and building resilient communities. Through her involvement with Amani Gold Organisation and volunteer work at 3E’s Experience, she has gained exposure to community service, environmental education and empowerment initiatives. As Programme Coordinator at Chipukizi wa Mazingira (CHIMA), she is committed to supporting the planning, coordination and implementation of programmes that advance environmental stewardship, climate resilience, youth participation and sustainable community development. She aspires to create lasting positive change through effective leadership and service.',
    duties: [
      'Programme Planning and Development',
      'Programme Implementation and Supervision',
      'Monitoring, Evaluation and Reporting',
      'Partnerships and Stakeholder Coordination',
    ],
  },
  {
    id: 8, parentId: 2, type: 'member', placeholder: false,
    name: 'Bryan', position: 'Organizing Secretary', image: "/images/leadership/",
    biography: '',
    duties: [
      'Event organisation',
      'Member coordination',
      'Meeting arrangements',
      'Activity mobilisation',
    ],
  },
  {
    id: 9, parentId: 2, type: 'member', placeholder: false,
    name: 'Bp', position: 'Member at Large', image: "/images/leadership/",
    biography: '',
    duties: [
      'Represent members and community interests.',
      'Promote youth participation and inclusivity',
      'Support community mobilisation and engagement',
      'Communicate members’ concerns and recommendations to the Executive Committee',
    ],
  },
];
