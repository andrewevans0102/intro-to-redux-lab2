import React from 'react';
// import quotes from '../config/quotes';

const quotes = ['first quote', 'second quote'];

function QuotesPage(props) {
    return (
        <section className="quotes">
            <h1>Quotes</h1>
            <ul>
                {quotes !== null &&
                    quotes.map((quotesItem) => (
                        <li key={quotesItem}>
                            <q>{quotesItem}</q>
                        </li>
                    ))}
            </ul>
            <div className="quotes__source">
                <p>
                    original content copied from
                    <a href="https://www.magicalquote.com/best-mandalorian-quotes/">
                        here
                    </a>
                </p>
            </div>
        </section>
    );
}

export default QuotesPage;
