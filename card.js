class CounterApp extends LitElement {
    static get properties() {
      return {
        counter: { type: Number },
        min: { type: Number },
        max: { type: Number },
      };
    }
  
    constructor() {
      super();
      this.counter = 16; 
      this.min = 10;
      this.max = 25;
    }
  
    updated(changedProperties) {
      if (changedProperties.has('counter')) {
        if (this.counter === 21) {
          this.makeItRain();
        }
      }
    }
  
    increment() {
      if (this.counter < this.max) {
        this.counter += 1;
      }
    }
  
    decrement() {
      if (this.counter > this.min) {
        this.counter -= 1;
      }
    }
  
    makeItRain() {
      import('@haxtheweb/multiple-choice/lib/confetti-container.js').then(() => {
        setTimeout(() => {
          this.shadowRoot.querySelector('#confetti').setAttribute('popped', '');
        }, 0);
      });
    }
  
    static get styles() {
      return css`
        :host {
          display: block;
          text-align: center;
          font-family: sans-serif;
          margin: 16px;
        }
        .counter-number {
          font-size: 48px;
          margin: 16px 0;
        }
        .counter-number.highlight {
          color: orange;
        }
        .counter-number.critical {
          color: red;
        }
        button {
          font-size: 24px;
          padding: 8px 16px;
          margin: 4px;
          cursor: pointer;
          border: none;
          border-radius: 4px;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background-color: #ddd;
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        confetti-container {
          display: block;
          height: 100px;
          width: 100%;
        }
      `;
    }
  
    render() {
      let counterClass = '';
      if (this.counter === 18) {
        counterClass = 'highlight';
      } else if (this.counter >= 21 || this.counter === this.min || this.counter === this.max) {
        counterClass = 'critical';
      }
  
      return html`
        <div class="counter-number ${counterClass}">${this.counter}</div>
        <div class="buttons">
          <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
          <button @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
        </div>
        <confetti-container id="confetti"></confetti-container>
      `;
    }
  }
  