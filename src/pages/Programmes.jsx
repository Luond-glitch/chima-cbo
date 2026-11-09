import PageHeader from '../components/PageHeader.jsx';
import ProgrammeCard from '../components/ProgrammeCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { programmes } from '../data/programmes.js';
//span className="tag tag-proposed inline">Proposed</span are suggested content that is not yet
//in the Constitution. Edit <code>src/data/programmes.js</code> to update them.
export default function Programmes() {
  return (
    <>
      <PageHeader title="Our Programmes" subtitle="Areas of intervention drawn from CHIMA's constitutional objectives" crumb="Our Programmes" />
      <section className="section">
        <div className="container">
          <p className="lead center-text narrow">
            The areas below follow the objectives in Article VI of the CHIMA Constitution. Items marked
          </p>
          <div className="grid-3 mt">
            {programmes.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 90}><ProgrammeCard programme={p} /></Reveal>)}
          </div>
        </div>
      </section>
    </>
  );
}
