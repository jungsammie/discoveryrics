import React, { Component } from 'react'
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    };

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
            this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                //console.log(res.data);
                this.setState({lyrics: res.data.message.body.lyrics});

                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
                    this.props.match.params.id
                }&apikey=${process.env.REACT_APP_MM_KEY}`
                );
            })
            .then(res => {
                //console.log(res.data)
                this.setState({track: res.data.message.body.track});
            })
            .catch(err => console.log(err));
    }

    render() {
        const { track, lyrics } = this.state; 
        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
            return <Spinner />
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4"><i className="fas fa-chevron-left"></i> Back</Link>
                    <div className="card">
                        <div className="card-header">
                            <h3>{track.track_name}</h3> by <span className="text-secondary">{track.artist_name}</span>
                        </div>
                        <div className="card-body">
                            <pre className="card-text">
                                {lyrics.lyrics_body.replace(/(\r\n|\n|\r)/gm, "\n")}
                            </pre>
                            <a target='_blank' href={track.track_share_url} rel="noopener noreferrer" className="btn btn-dark btn-block">Full Lyrics</a>
                        </div>
                    </div>
                    <ul className="list-group mt-3 mb-5">
                        <li className="list-group-item">
                            <strong>Song Genres</strong>: {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                        </li>
                        <li className="list-group-item">
                            <strong>Explicit</strong>:
                            {track.explicit === 0 ? " NO" : " YES"}
                        </li>
                        <li className="list-group-item">
                            <strong>Updated Time</strong>: <Moment format="D MMM YYYY">{track.updated_time}</Moment>
                        </li>
                    </ul>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics;