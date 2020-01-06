import React, { Component } from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class Campsiteinfo extends Component {


/* renderCampsite method*/

    renderCampsite(campsite){
       return (
           <div className = "col-md-5 m-1">
               <Card >
                    <CardImg  top src={this.props.campsite.image} alt={this.props.campsite.name} />
                    <CardBody>
                        <CardTitle>{this.props.campsite.name}</CardTitle>
                        <CardText>{this.props.campsite.description}</CardText>
                    </CardBody>
                </Card>
           </div>
       )
    }
    


/* renderComments method*/

    renderComments(comment) {
        if(this.props.campsite.comments) {  /* if(comments) by itslef won't work */
             return (
                 <div className = "col-md-5 m-1" >
                     <h4>Comments</h4>
                     {this.props.campsite.comments.map (a =>
                       { return (
                                <div key={a.id} >  {/*  Fixing the error - Each child in a list should have a unique "key" prop. */}
                                    <p>
                                        {a.text} <br />
                                        <span>--</span>{a.author}<span>, </span>    {/*  text editing */}
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(a.date)))} {/* date formatting */}
                                    </p>
                              </div>                         
                                )}
                     )}
                                                       
                 </div>
             )
        } 
        return <div></div>
    }


/* render for the Component */

    render () {
        if(this.props.campsite) {
            return (
                <div className = "container">
                    <div className = "row">
                        {this.renderCampsite()}  {/* calling the methods */}
                        {this.renderComments()}
                    </div>
                </div>
            );
        } else {
           return (<div></div>);
        }
    }
}

export default Campsiteinfo;