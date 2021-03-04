import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#464e55',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


const Experience = ({ experience, deleteExperience }) => {

    const experiences = experience.map(exp => (
            <TableRow key={exp._id}>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell className='hide-sm'>{exp.title}</TableCell>
                    <TableCell>
                        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                         {
                            exp.to === null ? (' Present' ) : ( <Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                        }
                    </TableCell>
                    <TableCell>
                        <button
                        onClick={() => deleteExperience(exp._id)}
                        className='btn dash-danger'>
                            DELETE
                        </button>
                    </TableCell>
            </TableRow>
    ));

    const classes = useStyles();

    return (
        <Fragment>
            <h2 className='my-2'>
                Experience Credentials
            </h2>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Company</StyledTableCell>
                            <StyledTableCell className='hide-sm'>Title</StyledTableCell>
                            <StyledTableCell className='hide-sm'>Years</StyledTableCell>
                           <StyledTableCell ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{experiences}</TableBody>
            </Table>
            </TableContainer>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience  })(Experience);
