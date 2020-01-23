import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import CommentForm from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';


const mapStateToProps = state => { //receives entire state tree and returns an object that contains only the data needed by the component
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text))
};


class Main extends Component {
  
    render() {
        const HomePage = () => {
            return (
                <Home
                campsite={this.props.campsites.filter(campsite => campsite.featured)[0]} // mapStateToProps 
                promotion={this.props.promotions.filter(promotion => promotion.featured)[0]} // mapStateToProps 
                partner={this.props.partners.filter(partner => partner.featured)[0]}// mapStateToProps 
            />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment} /* addComment action creator */
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} /> 
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route path='/aboutus' render = {()=> <About partners={this.props.partners} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));   // allows the Main component to take it State from the Redux store; withRouter added for react-router to still be able to work with these changes to the export