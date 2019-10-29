import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Table.css';

import dateFormatter, {parseZeroPadding} from '../util/dateFormatter';

const tableStyles = {
  height: '43vh',
  overflow: 'scroll'
};

export default class SimpleTable extends Component {
  constructor(props,context) {
    super(props,context)
    this.state = {
      rows : props.rows,
    }
  }

  dataTableFormatter(data) {
    const formatData = dateFormatter(data)
    return `${formatData.year}/${parseZeroPadding(formatData.month)}/${
      parseZeroPadding(formatData.day)
    } ${parseZeroPadding(formatData.hours)}:${parseZeroPadding(formatData.minutes)}`;
  }

  render() {
    return (
      <Paper style={tableStyles}>
        <Table ria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>headline</TableCell>
              <TableCell align="left">title</TableCell>
              <TableCell align="left">date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell scope="row">{row.headline}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{this.dataTableFormatter(row.datetime)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
