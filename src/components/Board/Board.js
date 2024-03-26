import React from "react";
import { inject, observer } from 'mobx-react';

import Room from "./Room";
import Hallway from "./Hallway";


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.store = this.props.store.appStore;
    }

    render() {

        let locItems = [];
        let curr = this.store.getCurrentPlayer();
        for (const [locId, loc] of Object.entries(this.store.locations)) {
            let players = this.store.getPlayersAt(locId);
            let adjacent = this.store.isAdjacent(locId);
            let setLoc = () => this.store.setLocation(locId);
            if (loc.type === 'room') {
                locItems.push(<Room key={locId} id={locId} players={players} isAdjacent={adjacent} setLocation={setLoc} current={curr}/>)
            } else if (loc.type === 'hall') {
                locItems.push(<Hallway key={locId} id={locId} align={loc.align} players={players} isAdjacent={adjacent} setLocation={setLoc} current={curr}/>)
            } else {
                locItems.push(<div key={locId}/>)
            }
        }

        return (
            <div key="board" className="board">
                {locItems}
            </div>
        )
    }
} export default inject('store') (observer(Board));
