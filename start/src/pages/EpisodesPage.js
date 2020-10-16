import React from 'react';
import '../styles/styles.scss';
// import episodes from '../config/episodes';

const episodes = [
    { key: 'first', value: 'something here' },
    { key: 'second', value: 'something there' },
];

function EpisodesPage(props) {
    return (
        <section className="episodes">
            <h1>Episodes</h1>
            {episodes !== null &&
                episodes.map((episodesItem) => (
                    <article key={episodesItem.key}>
                        <h2>
                            <a href={episodesItem.link}>{episodesItem.key}</a>
                        </h2>
                        <p>{episodesItem.value}</p>
                    </article>
                ))}
            <div className="episodes__source">
                <p>
                    original content copied from
                    <a href="https://www.vulture.com/tv/the-mandalorian/">
                        here
                    </a>
                </p>
            </div>
        </section>
    );
}

export default EpisodesPage;
