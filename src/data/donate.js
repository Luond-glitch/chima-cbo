// ============================================================================
//  DONATION DETAILS – ALL VALUES BELOW ARE MOCK / SAMPLE DATA.
//  Replace every value with CHIMA's real payment details before launch.
//  The page shows a "sample details" notice while `mock` is true; set it to false
//  once the real numbers are in.
// ============================================================================
export const donate = {
  mock: true,
  currency: 'KSh',
  presetAmounts: [500, 1000, 2500, 5000, 10000],

  options: [
    {
      id: 'mpesa-paybill', icon: 'Smartphone', title: 'M-Pesa Paybill',
      note: 'Fastest way to give from any Safaricom line.',
      details: [
        { label: 'Business No. (Paybill)', value: '123456' },      // MOCK
        { label: 'Account No.', value: 'CHIMA' },                   // MOCK
      ],
      steps: [
        'Open M-Pesa on your phone and choose Lipa na M-Pesa → Pay Bill.',
        'Enter the Business Number shown here.',
        'Enter the Account Number shown here.',
        'Enter your amount, then your M-Pesa PIN, and confirm.',
      ],
    },
    {
      id: 'mpesa-till', icon: 'Store', title: 'M-Pesa Buy Goods (Till)',
      note: 'Alternative M-Pesa option.',
      details: [
        { label: 'Till No.', value: '654321' },                     // MOCK
        { label: 'Name shown', value: 'CHIPUKIZI WA MAZINGIRA' },   // MOCK
      ],
      steps: [
        'Open M-Pesa → Lipa na M-Pesa → Buy Goods and Services.',
        'Enter the Till Number, then your amount and PIN.',
      ],
    },
    {
      id: 'bank', icon: 'Landmark', title: 'Bank Transfer',
      note: 'For larger gifts and institutional partners.',
      details: [
        { label: 'Account name', value: 'Chipukizi wa Mazingira (CHIMA)' },
        { label: 'Bank', value: 'Bank name – to be added' },
        { label: 'Branch', value: 'Isiolo' },
        { label: 'Account No.', value: '0000000000' },              // MOCK
        { label: 'SWIFT / Reference', value: 'Add your name as reference' },
      ],
      steps: ['Transfer to the account above and email info@chima.org with your proof of payment so we can acknowledge your gift.'],
    },
    {
      id: 'card', icon: 'CreditCard', title: 'Card / PayPal',
      note: 'International supporters.',
      details: [{ label: 'Payment link', value: 'Coming soon' }],
      steps: ['An online card/PayPal link will be added here when CHIMA activates it.'],
    },
    {
      id: 'in-person', icon: 'Building2', title: 'Visit our office',
      note: 'Give in person or hand over in-kind support.',
      details: [{ label: 'Office hours', value: 'Mon–Fri, 8:00 AM – 5:00 PM' }],
      steps: ['Visit CHIMA Headquarters, Hospital Road / DC Road, Isiolo Town and ask for the Treasurer.'],
    },
  ],

  impact: [
    { icon: 'TreePine', title: 'Grow trees', text: 'Support tree growing and ecosystem restoration.' },
    { icon: 'GraduationCap', title: 'Educate youth', text: 'Fund environmental education and awareness.' },
    { icon: 'Droplets', title: 'Build resilience', text: 'Help communities respond to climate shocks.' },
    { icon: 'Sprout', title: 'Green livelihoods', text: 'Back green enterprises and eco-innovation.' },
  ],
};
