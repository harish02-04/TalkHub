import React from 'react';
import firebase from 'firebase/app';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import { auth, database } from '../misc/firebase';
const SignIn = () => {
  const signinwithprovider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      console.log(additionalUserInfo);
      if (additionalUserInfo.isNewUser) {
        database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success('Successfully signed in');
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const facebooksignin = () => {
    signinwithprovider(new firebase.auth.FacebookAuthProvider());
  };
  const googlesignin = () => {
    signinwithprovider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>𝑻𝒂𝒍𝒌𝑯𝒖𝒃😉</h2>
                <p>A public chatting platform</p>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={facebooksignin}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>

                <Button block color="green" onClick={googlesignin}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};
export default SignIn;
