import React from 'react'

function Cards(props) {
    return (
        <div>
            <h2>Shotened Url : </h2>
            <a href={props.shrinkedUrl}>{props.shrinkedUrl}</a>
        </div>
    )
}

export default React.memo(Cards)
