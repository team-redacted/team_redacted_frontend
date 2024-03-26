import React from "react";

export default class Card extends React.Component {

    render() {
        return (
            <div className='card'>
                {this.props.name}
            </div>
        );
    }
};
