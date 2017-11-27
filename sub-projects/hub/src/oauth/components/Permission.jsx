import React from 'react';

import logger from 'utils/logger.js';
import * as server from 'server';
import * as locationUtils from 'utils/location.js';
import OAuthManager from 'server/oauth-manager.js';

import {
  Button,
  Grid,
  Container,
} from 'semantic-ui-react';

async function handleClick() {
  try {
    const res = await server.authorize(OAuthManager.getState());

    locationUtils.navigate(OAuthManager.getClientRedirect(), {
      state: OAuthManager.getState(),
      code: res.code,
    });
  } catch (err) {
    logger.error(err);
  }
}

function Permission() {
  return (
    <div className='centered'>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Container textAlign='center'>
              An application would like to connect to your account.
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button
              primary
              fluid
              size='large'
              onClick={handleClick}
            >
              Allow
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              fluid
              size='large'
              onClick={handleClick}
            >
              Deny
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Permission;
