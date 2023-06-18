import React from 'react';

const Content = () => {
  return (
    <div className="content-body">
      <section className="overview">
        <header className="overview-header">
          <h2 className="overview-header-title">
            Smart Contracts<span>[number]</span>
          </h2>
          <a href="#" className="link">
            View all
          </a>
        </header>
        <div className="overview-body">
          <div className="summary">
            <h3 className="summary-date">Sept 09, 2020</h3>
            {/* <span className="summary-amount">+$87.01</span> */}
          </div>
          <div className="list">
            <div className="list-item">
              <div className="list-item-company">
                {/* <figure className="list-item-company-logo">
                  <img src="https://assets.codepen.io/285131/spotify-logo.svg" />
                </figure> */}
                <div className="list-item-company-info">
                  <h4 className="list-item-company-name">Alias1</h4>
                  <a href="#" className="list-item-company-hashtag">
                    0x0000...
                  </a>
                </div>
              </div>
              <div className="list-item-transaction">
                <div className="list-item-transaction-values">
                  <span className="list-item-transaction-value">
                    <i className="ph-arrows-clockwise-bold"></i>Syncing
                  </span>
                  <time className="list-item-transaction-time" dateTime="17:00">
                    5:00pm
                  </time>
                </div>
                <button className="list-item-transaction-action">
                  <i className="ph-caret-down-bold"></i>
                </button>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-company">
                <div className="list-item-company-info">
                  <h4 className="list-item-company-name">Alias2</h4>
                  <a href="#" className="list-item-company-hashtag">
                    0x0000...
                  </a>
                </div>
              </div>
              <div className="list-item-transaction">
                <div className="list-item-transaction-values">
                  <span className="list-item-transaction-value list-item-transaction-value--positive">
                    Complete
                  </span>
                  <time className="list-item-transaction-time" dateTime="11:30">
                    11:30am
                  </time>
                </div>
                <button className="list-item-transaction-action">
                  <i className="ph-caret-down-bold"></i>
                </button>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-company">
                <div className="list-item-company-info">
                  <h4 className="list-item-company-name">Alias3</h4>
                  <a href="#" className="list-item-company-hashtag">
                    0x0000...
                  </a>
                </div>
              </div>
              <div className="list-item-transaction">
                <div className="list-item-transaction-values">
                  <span className="list-item-transaction-value"> Pending</span>
                  <time className="list-item-transaction-time" dateTime="11:23">
                    11:23am
                  </time>
                </div>
                <button className="list-item-transaction-action">
                  <i className="ph-caret-down-bold"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="overview-footer">
          <a href="#" className="link">
            View all Smart Contracts<i className="ph-arrow-right-bold"></i>
          </a>
        </footer>
      </section>
    </div>
  );
};

export default Content;
