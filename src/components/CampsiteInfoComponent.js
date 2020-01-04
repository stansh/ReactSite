import React, { Component } from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class Campsiteinfo extends Component {

    renderCampsite(campsite){
       return (
           <div className >
               <Card>
                    <CardImg top src={this.props.campsite.image} alt={this.props.campsite.name} />
                    <CardBody>
                        <CardTitle>{this.props.campsite.name}</CardTitle>
                        <CardText>{this.props.campsite.description}</CardText>
                    </CardBody>
                </Card>
           </div>
       )
    }
    
    renderComments(comments) {
        if (comments) {
             return (
                 <div className = "col-md-5 m-1">
                     <h4>Comments</h4>
                     {this.props.campsite.comments.map (comment yarn=> 
                        { return 
                            (<div>
                                {comment.id}
                            </div>)
                        }                                           
                    )} 
                 </div>
             )
        }
    }


    render () {
        if(this.props.campsite) {
            return (
                <div>
                    {this.renderCampsite()}
                    {this.renderComments()}
                </div>
            );
        } else {
           return (<div></div>);
        }
    }
}

export default Campsiteinfo;