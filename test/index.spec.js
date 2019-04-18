import 'jsdom-global/register';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import './component/slider.spec';
import './component/snackBar.spec';
import './component/countDown.spec';
Enzyme.configure({ adapter: new Adapter() });

describe('Save', () => {
    it('isSave', () => {
        expect('save').to.equal('save');
    });
    it('isString', () => {
        expect('123').to.be.a('string');
    });
});

/*const testContexts = require.context('./test', true, /\*spec\.js$/);

testContexts.keys().forEach(testContexts);*/
