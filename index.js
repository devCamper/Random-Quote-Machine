const quotes = [
  { author: 'Novalis', quote: 'The artist belongs to his work, not the work to the artist.' },
  { author: 'Martin Luther King, Jr.', quote: 'We are not makers of history. We are made by history.' },
  { author: 'Martin Luther King, Jr.', quote: 'At the center of non-violence stands the principle of love.' },
  { author: 'Marilyn French', quote: 'Men stumble over pebbles, never over mountains.' },
  { author: 'Steven Wright', quote: 'I busted a mirror and got seven years bad luck, but my lawyer thinks he can get me five.' },
  { author: 'Malcolm Forbes', quote: 'Failure is success if we learn from it.' },
  { author: 'Marcel Proust', quote: 'Love is space and time measured by the heart.' },
  { author: 'Peter Max', quote: 'If I didn\'t choose art, I would have become an astronomer.' },
]

const REFRESH = 'REFRESH'

const refresh = (index) => {
  return {
    type: REFRESH,
    index
  }
};

const quoteReducer = (state = quotes[0], action) => {
  switch (action.type) {
    case REFRESH:
      return quotes[action.index]
    default:
      return state;
  }
};


const store = Redux.createStore(
   quoteReducer
);

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.clickButton = this.clickButton.bind(this);
  }
  clickButton() {
    this.props.refreshQuote(Math.floor(Math.random() * (quotes.length-1 - 0 + 1)) + 0)
  }
  render() {
    const twitterUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${this.props.randomQuote.quote} -${this.props.randomQuote.author}`
    return (
      <main id="quote-box" style={{background: '#ddd', padding: 16}}>
        <article>
          <blockquote id="text" style={{fontFamily: 'Georgia', fontSize: 24}}>{this.props.randomQuote.quote}</blockquote>
          <p id="author" style={{fontFamily: 'Helvetica', fontSize: 20, fontStyle: 'italic'}}>{this.props.randomQuote.author}</p>
        </article>
        <footer style={{display: 'flex', justifyContent: 'space-between'}}>
          <button id="new-quote" onClick={this.clickButton} className="btn btn-primary">Refresh</button>
          <a id="tweet-quote" href={twitterUrl} className="btn btn-secondary">Tweet</a>
        </footer>
      </main>
    );
  }
};

const mapStateToProps = (state) => {
  return {randomQuote: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshQuote: (index) => {
      dispatch(refresh(index))
    }
  }
};

const Container = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuoteMachine);

class App extends React.Component {
  render() {
    return (
      <ReactRedux.Provider store={store}>
        <Container/>
      </ReactRedux.Provider>
    );
  }
};

ReactDOM.render(
   <App/>,
   document.getElementById('root')
);