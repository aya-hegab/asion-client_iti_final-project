import React from 'react';

import { useState } from 'react';

import TrendItem from './TrendItem';
import { trendapi } from './api';
const Trend = () => {
  const [trend, setTrend] = useState(trendapi);

  return (
    <section className="trend spad">
      <div className="container">
        <div className="row">
          {trend.map((ter) => {
            return (
              <div className="col-lg-4 col-md-4 col-sm-6" key={ter.id}>
                <div className="trend__content">
                  <div className="section-title">
                    <h4>{ter.title}</h4>
                  </div>
                  <TrendItem trenditems={ter} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trend;