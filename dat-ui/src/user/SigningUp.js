import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    margin: '60px'
}
const SigningUp = () => (
    <div style={styles}>
        <CircularProgress size={20} /> Signing up, one moment please...
    </div>
)

export default SigningUp