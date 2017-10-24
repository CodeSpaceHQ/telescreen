import React from 'react';
import { Button, Form, Input, Header, TextArea, Image, Icon, Container, Grid, Segment, GridColumn } from 'semantic-ui-react';

import binaryEye from './Binary-Eye-2.png';

export default class LoginPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            submittedName: '',
            submittedEmail: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e, stuff) {
        this.setState({ [name]: value })
        //Working on this still!!!!!!!!!!!!!
    }

    handleSubmit() {
        console.log("Clicked Login");
        // const { name, email } = this.state
        // this.setState({ submittedName: name, submittedEmail: email })
        // console.log("submitted name is: "+ submittedName);
        // request.post(
        //     'http://127.0.0.1:3000/api/auth',
        //     { json: { name: JSON.stringify(name) } },
        //     function (error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //             console.log("request successful")
        //         }
        //         else {
        //             console.log("error: " + error);
        //         }
        //     }
        // );
        //Working on this still!!!!!!!!!!!
    }
    render() {
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
                                <Form className="ui large form" onSubmit={this.handleSubmit}>
                                    <div>
                                        <Form.Field className="ui left icon input">
                                            <Icon name='user' />
                                            <Input
                                                name='email'
                                                type='text'
                                                placeholder='Email Address'
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field className="ui left icon input">
                                            <Icon name='lock' />
                                            <Input
                                                name='password'
                                                type='text'
                                                placeholder='Password'
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>

                                        <Button
                                            type='submit'
                                            primary
                                            size='large'>Login
                                        </Button>
                                    </div>
                                </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}