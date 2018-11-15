/* eslint-disable no-prototype-builtins */
import { DateInput } from 'semantic-ui-calendar-react';
import React from 'react';
import { Grid } from 'semantic-ui-react';

export default class DateTimeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateStart: '',
      dateEnd: '',
    };
  }

  handleDateChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
        <Grid columns={2}>
          <Grid.Row centered>
            <Grid.Column>
              <DateInput
                  name="dateStart"
                  placeholder="Start"
                  value={this.state.dateStart}
                  iconPosition="left"
                  onChange={this.handleDateChange}/>
            </Grid.Column>
            <Grid.Column>
              <DateInput
                  name="dateEnd"
                  placeholder="End"
                  value={this.state.dateEnd}
                  iconPosition="left"
                  onChange={this.handleDateChange}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}
