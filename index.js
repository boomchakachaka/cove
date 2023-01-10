
import React from 'react';


function Card({ title, text, target, linkTitle, href, rel, onClick, linkClassName }) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a 
        className={`default-link card__link ${linkClassName}`} 
        target={target} 
        rel={rel} 
        href={href} 
        onClick={onClick}>
        { linkTitle }
      </a>
    </div>
  );
}


function App () {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => async () => {
    const data = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
    const json = await data.json();

    let newData = [];

    json.forEach((item) => {
      const noBody = ({body, ...rest}) => rest;
      const text = item.body?.en ? item.body.en.substr(0, 50) + '...' : '';

      newData.push({ ...noBody(item), text: text, })
    });

    setCards(newData);
  }, []);

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div>
      {cards.map((item) => {
        return (
          <Card
            key={item.link}
            title={item.title.en} 
            linkTitle={item.link_title} 
            href={item.link} 
            text={item.text} 
            linkClassName={item.id === 1 ? 'card__link--red' : ''} 
            target={item.id === 1 ? '_blank' : ''}
            onClick={() => analyticsTrackClick(item.link)} 
          />
        );
      })}
    </div>
  );
}

export default App;
