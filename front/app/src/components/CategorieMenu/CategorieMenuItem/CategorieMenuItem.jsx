import React, { Component } from 'react'

class CategorieMenuItem extends Component {
    state = {
        link: "/categorie/" + this.props.id,
    }

    render() {
        return (
            <a className="homeMenuLink" draggable="false" href={this.state.link}> {this.props.name} </a>
        )
    }
}

export default CategorieMenuItem;