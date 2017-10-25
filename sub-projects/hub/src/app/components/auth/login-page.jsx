import React from 'react';
import { Button, Form, Input, Header, TextArea, Image, Icon, Container, Grid, Segment, GridColumn } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import binaryEye from './Binary-Eye-2.png';
import axios from 'axios'

export default class LoginPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectToHome: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange({ target }) {
            this.setState({
              [target.name]: target.value
            });
          }

    handleSubmit() {
        axios.post('http://127.0.0.1:3000/api/auth', {
            email: this.state.email, 
            password: this.state.password 
          })
          .then(function (response) {
            console.log(response);
            //this.setState({ redirectToHome: true })
          })
          .catch(function (error) {
            console.log(error);
          });

        //STILL WORKING ON THIS
    }
    render() {
        if (this.state.redirectToHome) {
            return (
              <Redirect to={{ pathname: '/' }}/>
              //CHANGE TO HOME PATHNAME
            )
        }
        
        return (
            <div className='login-form'>
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                      height: 100%;
                    }
                `}</style>

                {/* <Image src={binaryEye}/> */}

                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header
                            as='h2'
                            color='blue'
                            textAlign='center'
                        >
                            Welcome to Telescreen!
                        </Header>
                            <Segment>
                                <Form className="ui large form">
                                    <Form.Field>
                                        <Input
                                            icon='user'
                                            iconPosition='left'
                                            required
                                            name='email'
                                            type='email'
                                            placeholder='E-mail Address'
                                            onChange={this.handleChange}
                                            value={ this.props.email }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input
                                            icon='lock'
                                            iconPosition='left'
                                            required
                                            name='password'
                                            type='password'
                                            placeholder='Password'
                                            onChange={this.handleChange}
                                            value={ this.props.password }
                                        />
                                    </Form.Field>

                                    <Button
                                        type='submit'
                                        fluid
                                        primary
                                        size='large'
                                        onClick={this.handleSubmit}>Login
                                    </Button>
                                </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}