import React from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';

const Track = (props) => {
    const { track } = props;
    return (
        <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5>{track.track_name}</h5>
                    <div className="card-text">
                        <strong><i className="fas fa-microphone-alt"></i> Artist</strong>
                        <LinesEllipsis
                            text = {track.artist_name}
                            maxLine = '1'
                            ellipsis = '...'
                            trimRight
                            basedOn = 'letters'
                        />
                        <strong><i className="fas fa-compact-disc"></i> Album</strong>
                        <LinesEllipsis
                            text = {track.album_name}
                            maxLine = '1'
                            ellipsis = '...'
                            trimRight
                            basedOn = 'letters'
                        />
                    </div>
                    <Link to={`lyrics/track/${track.track_id}`} className="btn btn-dark btn-block mt-3">
                        View Lyrics <i className="fas fa-chevron-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Track;