import PageHeader from '../components/PageHeader.jsx';
import Organogram from '../components/Organogram.jsx';
import { leadership } from '../data/leadership.js';
import { Info } from 'lucide-react';

export default function Leadership() {
  return (
    <>
      <PageHeader title="Leadership & Governance" subtitle="How CHIMA is governed, as set out in its Constitution" crumb="Leadership" />
      <section className="section">
        <div className="container">
          <p className="lead center-text narrow">
            The General Assembly is the supreme organ of CHIMA. The Executive Committee, made up of five
            office bearers, manages day-to-day affairs. Select any box to read more.
          </p>
          <Organogram data={leadership} />
        </div>
      </section>
    </>
  );
}
