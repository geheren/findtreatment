import React from 'react';
import { shallow } from 'enzyme';

import { Details } from './Details';
import Error from './Error';
import NoMatch from './NoMatch';
import Loading from './Loading';

const testProps = {
  data: {
    city: 'Tucson',
    frid: '2037b07b2bfb78e1bdaf2b46dd94ceb41c2da1493e7c0c22796d82762c4cbb53',
    miles: 5.57,
    name1: 'My Treatment Facility',
    name2: 'Tucson Northwest',
    phone: '520-123-4376',
    services: {
      TC: { name: 'Type of Care', values: ['Substance use treatment'] }
    },
    state: 'AZ',
    street1: '3295 West Desert Road',
    street2: 'Suite 150',
    website: 'http://www.mytreatmentfacility.com',
    zip: '85741'
  },
  error: false,
  loading: false,
  isReported: false,
  reportFacility: () => {},
  handleReceiveFacility: () => {},
  destroyFacility: () => {},
  location: {},
  match: {},
  history: {},
  frid: '12628952a59ffa4ab1ceed0db7c391715eabda9ab1b16745651dffc917af7602'
};

describe('Details component', () => {
  it('shows an error message if error prop is true', () => {
    const props = {
      ...testProps,
      error: true
    };
    const component = shallow(<Details {...props} />, {
      disableLifecycleMethods: true
    });
    expect(component.find(Error).length).toBe(1);
  });

  it('shows a loading message if loading prop is true', () => {
    const props = {
      ...testProps,
      loading: true
    };
    const component = shallow(<Details {...props} />, {
      disableLifecycleMethods: true
    });
    expect(component.find(Loading).length).toBe(1);
  });

  it('shows a a not found message when there are no results', () => {
    const props = {
      ...testProps,
      data: {}
    };
    const component = shallow(<Details {...props} />, {
      disableLifecycleMethods: true
    });
    expect(component.find(NoMatch).length).toBe(1);
  });

  it('calls reportFacility() when report facility button is clicked', () => {
    const reportFn = jest.fn();
    const props = {
      ...testProps,
      reportFacility: reportFn
    };
    const component = shallow(<Details {...props} />, {
      disableLifecycleMethods: true
    });
    const reporttBtn = component.find('.report-facility');

    reporttBtn.simulate('click');

    expect(reportFn.mock.calls.length).toBe(1);
  });

  it('hides report facility button if facility has already been reported', () => {
    const props = {
      ...testProps,
      isReported: true
    };
    const component = shallow(<Details {...props} />, {
      disableLifecycleMethods: true
    });

    expect(component.find('.report-facility').length).toBe(0);
  });
});
