import React from 'react';
import ReactDOM from 'react-dom';
import AddUser, { onUsernameBlur } from './AddUser';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import identity from 'lodash/fp/identity'

configure({ adapter: new Adapter() });

describe('user/AddUser.js', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MuiThemeProvider>
        <AddUser />
      </MuiThemeProvider>, 
      div);
    ReactDOM.unmountComponentAtNode(div);
  });
  describe('onUsernameBlur when triggered', () => {
    it('should work when you input valid value', ()=> {
      const addUser = shallow(<AddUser />)
      addUser.find('[floatingLabelText="Username"]').simulate('blur', {target: {value: 'sup'}})
      expect(addUser.state('usernameErrors')).toEqual(undefined)
    })
    it('should fail when text is blank', ()=> {
      const addUser = shallow(<AddUser />)
      addUser.find('[floatingLabelText="Username"]').simulate('blur', {target: {value: ' '}})
      expect(addUser.state('usernameErrors')).toEqual('Cannot be a blank string.')
    })
  })
  describe('onUsernameBlur when called', () => {
    it('should work when you input valid value', ()=> {
      const result = onUsernameBlur({ setState: identity }, {target: {value: 'sup'}})
      expect(result.usernameErrors).toEqual(undefined)
    })
    it('should fail when text is blank', ()=> {
      const result = onUsernameBlur({ setState: identity }, {target: {value: ' '}})
      expect(result.usernameErrors).toEqual('Cannot be a blank string.')
    })
    it('should fail when text is undefined', ()=> {
      const result = onUsernameBlur({ setState: identity }, {target: {value: undefined}})
      expect(result.usernameErrors).toEqual(`Empty strings aren't allowed. Username needs to be at least 1 character. Username cannot be larger than 255 characters.`)
    })
  })
})
