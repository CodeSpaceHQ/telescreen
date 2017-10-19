import React from 'react';
import { Button, Form, Input, TextArea, Image, Icon} from 'semantic-ui-react';

import binaryEye from './Binary-Eye-2.png';

export default class LoginPage extends React.Component{ 
    

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(){
        console.log("Stuff changed");
    }

    handleSubmit() {
        console.log("Clicked Login!!");
     }
  render(){
        return(
            <div className="ui middle aligned center aligned grid">
                {/* <Image src={binaryEye}/> */}

                <Form onSubmit={this.handleSubmit}>
                <fieldset>
                    <Form.Field className="ui left icon input">
                        <Icon name='user'/>                    
                        <input
                            name='email'
                            type='text'
                            placeholder='Email Address'
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                    <Form.Field className="ui left icon input">
                        <Icon name='lock'/>  
                        <input
                            name='password'
                            type='text'
                            placeholder='Password'
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                </fieldset>

                    <Button 
                        type='submit'
                        primary
                        size='large'>Login
                    </Button>
                </Form>          
            </div>   
    );
  }
}