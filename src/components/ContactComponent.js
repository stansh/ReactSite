import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,
            contactType: 'By Phone',
            feedback: '',
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);// the last THIS is bound to handleInputChange() method; updates the state properties
        this.handleSubmit = this.handleSubmit.bind(this);// the last THIS is bound to handleSubmit() method; updates the string in console log and alert message
    }
    

    //validation method begins here

    validate(firstName, lastName, phoneNum, email) {

        const errors = { //holds error messages written under the fields in red, rendered in FormFeedback components
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };

        if (this.state.touched.firstName) { // if it's been switched to true
            if (firstName.length < 2) {
                errors.firstName = 'First name must be at least 2 characters.';
            } else if (firstName.length > 15) {
                errors.firstName = 'First name must be 15 or less characters.';
            }
        }

        if (this.state.touched.lastName) {
            if (lastName.length < 2) {
                errors.lastName = 'Last name must be at least 2 characters.';
            } else if (lastName.length > 15) {
                errors.lastName = 'Last name must be 15 or less characters.';
            }
        }

        const reg = /^\d+$/; //regular expression; matching only digits
        if (this.state.touched.phoneNum && !reg.test(phoneNum)) {  //reg.test(phoneNum) - tests the phone number to contain only numbers
            errors.phoneNum = 'The phone number should contain only numbers.';
        }

        if (this.state.touched.email && !email.includes('@')) {
            errors.email = 'Email should contain a @';
        }

        return errors;
    }

    handleBlur = (field) => () => { //fires when user enters a form field and then leaves it; using an arrow function to define a function inside function allows to not include the bind(this) in constructor
        this.setState({
            touched: {...this.state.touched, [field]: true} //the spread syntax is used; updates properties in TOUCHED to true
        });
    }

    handleInputChange(event) {
        const target = event.target; // grabbing the targeted input element; event.target points to the element the event originated from
        const value = target.type === 'checkbox' ? target.checked : target.value; // cheking if the input type is a checkbox or not (field);marks as checked or sets new value
        const name = target.name;
    
        this.setState({  //parentheses AND curly brackets
          [name]: value  //from the above variables; points to the form fields
        });
    }

    handleSubmit(event) {
        console.log('Current state is: ' + JSON.stringify(this.state)); // converting JSON to a string
        alert('Current state is: ' + JSON.stringify(this.state));
        event.preventDefault(); //preventing the page from refreshing
    }


    render() {
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email);     // new variable with the name errors; vars declared in methods/functions are localy scoped; the one from validate() is locally scoped to it.
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone"></i> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o"></i> campsites@nucamp.co</a>
                    </div>
                </div>
                <div className="row row-content">
                   <div className="col-12">
                      <h2>Send us your Feedback</h2>
                      <hr />
                   </div>
                    <div className="col-md-10">
                        <Form onSubmit={this.handleSubmit}> {/* links to the handleSubmit method above */}
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}> {/* same as className="col-md-10 */}
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}// holds the state for this input; makes the form controlled
                                        invalid={errors.firstName}  //sets the invalid attribute whether to true or false; an empty string is false
                                        onBlur={this.handleBlur("firstName")} // links to handleBlu()
                                        onChange={this.handleInputChange} /> {/* links to the created above handleInputChange method */}
                                        <FormFeedback>{errors.firstName}</FormFeedback> {/*  in red underneath the field */}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" /* same as For*/ md={2}/* same as className="col-md-2 */>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                     <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phoneNum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                    
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}> {/* same as className="col-md-4 offset-md-2" ; converted to an object*/}
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}//holds the state for this input BUT instead of value holds Checked attribute; makes the form controlled
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
           
        

export default Contact;