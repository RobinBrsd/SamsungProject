import React, { Component } from 'react'

class UnderCategorieMenuItem extends Component {
    state = {
        link: "/categorie/" + (this.props.categId),
    }

    render() {
        return (
            <a key={this.props.name} className="menuLink" draggable="false" href={this.state.link + "/" + this.props.id}> {this.props.name} </a>
        )
    }
}

export default UnderCategorieMenuItem;