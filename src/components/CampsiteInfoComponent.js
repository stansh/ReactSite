import React,{ Component }  from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,Button,Modal, ModalHeader, ModalBody, Label,Row,Col } from 'reactstrap';
import { Link, } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

// validation functions to be used CommentForm
const required = val => val && val.length;   
const maxLength = len => val => !val || (val.length <= len);  
const minLength = len => val => val && (val.length >= len);

/* RenderCampsite component*/

function RenderCampsite({campsite}){
       return (
            <div className="col-md-5 m-1">
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
    


/* RenderComments component*/

function RenderComments({comments, postComment, campsiteId}) {
        if(comments) {  /* if(comments) by itslef won't work */
             return (
                 <div className = "col-md-5 m-1" >
                    <h4>Comments</h4>
                    <Stagger in> 
                        {comments.map(comment => {
                            return (
                                <Fade in key={comment.id}> 
                                    <div>
                                        <p>{comment.text}<br />
                                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </div>
                                </Fade>
                            );
                        })}
                    </Stagger>
                     <CommentForm campsiteId={campsiteId} postComment={postComment} />
                                                    
                 </div>
             );
        } 
        return <div></div>
    }


/* CampsiteInfo component */

    function CampsiteInfo (props) {
        if (props.isLoading) {
            return (
                <div className="container"> {/* repeat Bootstrap grid set-up (container, row) of elements that are supposed to be loader; scroll down */}
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
    
        if(props.campsite) {
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment} 
                        campsiteId={props.campsite.id}
                    />
                    
                    
                </div>
            </div>
            );
        } else {
           return <div />;
        }
    }


//Comment Form completed based on the exercices
  
    class CommentForm extends Component {
        constructor (props) {
            super(props);
            this.toggleModal = this.toggleModal.bind(this); 
            this.state = {
                    isModalOpen: false,
                    rating: '1',
                    author: ' ',
                    comment:' ',
                    touched:{
                        rating: false,
                        author:false,
                        comment:false
                    }
            };
        }
    
        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen // toggles the state property
            });
        }
    
    


        render () {
            
            return (
                <div>
                <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" /> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit= {values=> this.handleSubmit(values)}>
                            <Row className ="form-group">
                                <Col md={10}>

                                   {/* Rating field */}

                                    <Label htmlFor="rating" >Rating</Label>
                                    
                                    <Control.select model=".rating" id="rating" name="rating"         
                                        className="form-control"
                                        validators={{
                                            required, 
                                            
                                        }}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched" // 
                                        component="div"
                                        messages={{
                                            required: 'Required'
                                        }} />
                                        
                                     {/* Author field */}

                                    <Label htmlFor="yourName" >Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"         
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15),
                                            
                                        }}>
                                    
                                    </Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched" 
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />

                                    {/* Comments field */}

                                    <Label htmlFor="yourName" >Comment</Label>  
                                    <Control.textarea model=".text" id="comment" name="comment"         
                                        className="form-control"
                                        rows = "6"
                                        validators={{
                                            required
                                            
                                        }} />
                                                   
                                    <Errors
                                        className="text-danger"
                                        model=".text"
                                        show="touched" 
                                        component="div"
                                        messages={{
                                            required: 'Required'
                                        
                                        }} />    
                                                
                                </Col>
                            
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button color="primary" type="submit">Submit</Button>{' '}
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            );
            }
        }


export default CampsiteInfo;