import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easily Add Tracking',
    logo: '/img/phone.gif',
    description: (
      <>
        Add sophisticated tracking and playback to your apps.
      </>
    ),
  },
  {
    title: 'Subscribe to Updates',
    logo: '/img/line-interaction.gif',
    description: (
      <>
        Listen for changes to the startline and events like OCS in real time.
      </>
    ),
  },
  {
    title: 'Open Data Ecosystem',
    logo: '/img/routing.gif',
    description: (
      <>
        The largest dataset of sailing races in history.
      </>
    ),
  },
  
];

function Feature({logo, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img  src={logo} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
