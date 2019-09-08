import React, { Component } from 'react'
import { Redirect } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import './index.scss';

class ProductItem extends Component {

    state = {
        fake: false,
        redirect: false,
        url: "",
    }

	redirectToProduct = (id) => {
        let url = "/detailProduct/" + id;
        this.setState({redirect:true, url:url});
	}

    componentDidMount() {
        if(this.props.item.title === "fake")
            this.setState({fake:true});
    }

    render() {
        if(this.state.redirect)
            return <Redirect to={this.state.url} />;

        if(this.props.home) {
            if(this.props.item.sold === null) {
                return (
                    <div className={this.state.fake ? "fakeProductContainer" : "productContainer"} >
                        <div className="productHomeItemContainer" onClick={() => this.redirectToProduct(this.props.item.id)}>
                            <h3 className="productHomeTitle"> {this.props.item.title} </h3>
                            <img className="productHomeImg" alt="PP" src={this.props.item.picture} />
                            <div className="productHomeRight">
                                <p className="productHomeDescription"> <span className="descHomeLabel"> - Description : </span> {this.props.item.description} </p>
                            </div>
                            <div className="ratingHomeContainer">
                                <p className="productHomePrice"> {this.props.item.price} € </p>
                                <StarRatingComponent name="rate" value={this.props.item.rating} starCount={5} />
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className={this.state.fake ? "fakeProductContainer" : "productContainer"} >
                        <div className="productHomeItemContainer" onClick={() => this.redirectToProduct(this.props.item.id)}>
                            <h3 className="productHomeTitle"> {this.props.item.title} </h3>
                            <img className="productHomeImg" alt="PP" src={this.props.item.picture} />
                            <div className="productHomeRight">
                                <p className="productHomeDescription"> <span className="descHomeLabel"> - Description : </span> {this.props.item.description} </p>
                                <div className="ratingHomeContainer">
                                <p className="productHomeOldPrice"> {this.props.item.price} € </p>
                                <span className="productHomePriceReduc"> -{ this.props.item.sold }% </span>
                                <p className="productHomePrice"> { this.props.item.afterSold } €</p>
                                <StarRatingComponent name="rate" value={this.props.item.rating} starCount={5} />
                            </div>
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            if(this.props.item.sold === null) {
                return (
                    <div className={this.state.fake ? "fakeProductContainer" : "productContainer"} >
                        <div className="productItemContainer" onClick={() => this.redirectToProduct(this.props.item.id)}>
                            <h3 className="productTitle"> {this.props.item.title} </h3>
                            <img className="productImg" alt="PP" src={this.props.item.picture} />
                            <div className="productRight">
                                <p className="productDescription"> <span className="descLabel"> - Description : </span> {this.props.item.description} </p>
                            </div>
                            <div className="ratingContainer">
                                <p className="productPrice"> {this.props.item.price} € </p>
                                <StarRatingComponent name="rate" value={this.props.item.rating} starCount={5} />
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className={this.state.fake ? "fakeProductContainer" : "productContainer"} >
                        <div className="productItemContainer" onClick={() => this.redirectToProduct(this.props.item.id)}>
                            <h3 className="productTitle"> {this.props.item.title} </h3>
                            <img className="productImg" alt="PP" src={this.props.item.picture} />
                            <div className="productRight">
                                <p className="productDescription"> <span className="descLabel"> - Description : </span> {this.props.item.description} </p>
                            </div>
                            <div className="ratingContainer">
                                <p className="productOldPrice"> {this.props.item.price} € </p>
                                <span className="productPriceReduc"> -{ this.props.item.sold }% </span>
                                <p className="productPrice"> { this.props.item.afterSold } €</p>
                                <StarRatingComponent name="rate" value={this.props.item.rating} starCount={5} />
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default ProductItem;