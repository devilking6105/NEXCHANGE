import React, { Component } from 'react';
import config from 'Config';
import CopyToClipboard from 'react-copy-to-clipboard';
import OrderReferralTerms from './OrderReferralTerms/OrderReferralTerms';
import Man from './images/man.png';
import styles from '../OrderCta.scss';
import { I18n, Interpolate } from 'react-i18next';


class OrderReferrals extends Component {
  state = {
    showTermsModal: false,
    tooltipOpen: false,
    link: `${config.DOMAIN}/?ref=${this.props.order.referral_code[0].code}`,
    
   
  };

  triggerCopyTooltip = () => {
    $('#copy-to-clipboard-link').tooltip({
      trigger: 'click',
      placement: 'top',
    });

    $('#copy-to-clipboard-link')
      .tooltip('hide')
      .attr('data-original-title', 'Link Copied')
      .tooltip('show');

    setTimeout(() => {
      $('#copy-to-clipboard-link').tooltip('destroy');
    }, 1000);
  };

  renderForm() {
    return (
      <I18n ns="translations">
        {t => (
          <div>
            <div className={styles['form-group']}>
              <CopyToClipboard
                text={this.state.link}
                onCopy={() => {
                  window.ga('send', 'event', {
                    eventCategory: 'Referrals',
                    eventAction: 'Link click body',
                    eventValue: this.props.order.pair.base.name,
                  });
                  this.triggerCopyTooltip();
                }}
              >
                <input
                  className={styles['referral-input']}
                  type="text"
                  value={this.state.link}
                  title="Click to copy!"
                  onFocus={e => e.target.blur()}
                  onMouseEnter={() => {
                    window.ga('send', 'event', {
                      eventCategory: 'Referrals',
                      eventAction: 'Link hover body',
                      eventValue: this.props.order.pair.base.name,
                    });
                  }}
                  required
                />
              </CopyToClipboard>

              <CopyToClipboard
                text={this.state.link}
                onCopy={() => {
                  window.ga('send', 'event', {
                    eventCategory: 'Referrals',
                    eventAction: 'Link click button',
                    eventValue: this.props.order.pair.base.name,
                  });
                  this.triggerCopyTooltip();
                }}
              >
                <button
                  id="copy-to-clipboard-link"
                  type="button"
                  className={`btn btn-primary ${styles.btn}`}
                  onMouseEnter={() => {
                    window.ga('send', 'event', {
                      eventCategory: 'Referrals',
                      eventAction: 'Link hover link',
                      eventValue: this.props.order.pair.base.name,
                    });
                  }}
                >
                {t('Referral Link')}
                </button>
              </CopyToClipboard>

              <h4 className={styles.share}>
                Or share it on social media
                <div className={styles.links}>
                  <a
                    className={styles.link}
                    href={`https://facebook.com/sharer.php?u=${this.state.link}`}
                    target="_blank"
                    onClick={() => {
                      window.ga('send', 'event', {
                        eventCategory: 'Referrals',
                        eventAction: 'Social click',
                        eventValue: 'facebook',
                      });
                    }}
                  >
                    <i className="fab fa-facebook-f" aria-hidden="true" />
                  </a>
                  <a
                    className={styles.link}
                    href={`https://twitter.com/intent/tweet?url=${this.state.link}&text=${t('referral.twitter')}`}
                    target="_blank"
                    onClick={() => {
                      window.ga('send', 'event', {
                        eventCategory: 'Referrals',
                        eventAction: 'Social click',
                        eventValue: 'twitter',
                      });
                    }}
                  >
                    <i className="fab fa-twitter" aria-hidden="true" />
                  </a>
                   </div>
              </h4>
            </div>
          </div>
        )}
      </I18n>
    );
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className="col-xs-12">
            <div className={`box ${styles.container}`}>
              <div className="row">
                <div className="col-xs-12 visible-xs text-center">
                  <img className={styles.img} src={Man} alt={t('notify.alt')} />
                </div>

                <div className={`col-xs-12 col-sm-7 ${styles.text}`}>
                  <h2 className={styles.title}>
                    <Interpolate i18nKey="Referrals" selectedCoin={this.props.order.pair.base.name} />
                  </h2>
                  {this.renderForm()}
                </div>

                <div className="col-ms-2 col-sm-5 hidden-xs text-center">
                  <img className={styles.img} src={Man} alt={t('notify.alt')} />
                </div>
              </div>
            </div>

            <OrderReferralTerms show={this.state.showTermsModal} onClose={() => this.setState({ showTermsModal: false })} />
          </div>
        )}
      </I18n>
    ); 
  }
}

export default OrderReferrals;