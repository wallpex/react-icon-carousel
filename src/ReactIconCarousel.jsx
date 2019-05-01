import React, { Component } from 'react';
import './style.css';

export default class ReactIconCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coinIndex: 1,
      buttons: [
        { coin: 'DASH', icon_active: 'box-left', selected: false },
        { coin: 'BTC', icon_active: 'box-mid', selected: true },
        { coin: 'BCH', icon_active: 'box-right ', selected: false },
        { coin: 'LTC', icon_active: 'none-box', selected: false },
        { coin: 'ZEC', icon_active: 'none-box', selected: false }
      ]
    };

    this.prevCoin = this.prevCoin.bind(this);
    this.setCoinIndex = this.setCoinIndex.bind(this);
    this.nextCoin = this.nextCoin.bind(this);
  }

  setCoinIndex(newIndex) {
    const { buttons, coinIndex } = this.state;

    newIndex = newIndex % buttons.length;
    if (newIndex < 0) {
      newIndex = buttons.length - 1;
    }

    let prevIndex = newIndex - 1;
    if (prevIndex < 0) prevIndex = buttons.length - 1;
    let prevPrevIndex = prevIndex - 1;
    if (prevPrevIndex < 0) prevPrevIndex = buttons.length - 1;

    buttons.forEach(function (button, index) {
      button.selected = false;

      if (index === newIndex) {
        button.selected = true;
        button.icon_active = 'box-mid';
      } else if (index === (newIndex + 1) % buttons.length) {
        button.icon_active = 'box-right';
      } else if (index === (newIndex + 2) % buttons.length) {
        button.icon_active = 'none-box-right';
      } else if (index === prevIndex) {
        button.icon_active = 'box-left';
      } else if (index === prevPrevIndex) {
        button.icon_active = 'none-box-left';
      } else {
        button.icon_active = 'none-box';
      }
    });

    this.setState({ coinIndex: newIndex, buttons, coin: buttons[newIndex].coin });
  }

  nextCoin() {
    this.setCoinIndex(this.state.coinIndex + 1);
  }

  prevCoin() {
    this.setCoinIndex(this.state.coinIndex - 1);
  }

  render() {
    const props = this.props
    const { buttons } = this.state
    return <div className='chooser cashout-chooser'>
      <img
        src='https://wallet.wallpex.com/app-assets/images/daga/LTC_big.png'
        style={{ visibility: 'hidden', width: '27%', height: 'auto' }}
        alt='hid'
      />
      <button
        onClick={this.prevCoin}
        type='button'
        className=' chooser-next-prev cashout-chooser-prev'
        style={{
          marginBottom: 0,
          marginRight: '1rem',
          background: 'none',
          position: 'absolute',
          top: 'calc(50% - 1rem)',
          fontSize: '2rem',
          left: '0',
          border: 'none',
        }}
      >
        { props.rightButton ? props.rightButton : '<' }
      </button>
      {buttons.map((button, index) => (
        <div
          id={button.coin + 'button'}
          key={button.coin + 'button'}
          className={
            '' +
            (button.icon_active || 'none-box') +
            ' chooserbox box-' +
            button.coin +
            '-' +
            (button.selected ? 'big' : 'small')
          }
        />
      ))}
      <button
        onClick={this.nextCoin}
        type='button'
        className='text-muted btn round chooser-next-prev cashout-chooser-prev'
        style={{
          marginBottom: 0,
          marginRight: '1rem',
          background: 'none',
          position: 'absolute',
          left: 'calc(100% - 2rem)',
          top: 'calc(50% - 1rem)',
          fontSize: '2rem',
          border: 'none',
        }}
      >
        { props.leftButton ? props.leftButton : '>' }
      </button>
    </div>
  }
}