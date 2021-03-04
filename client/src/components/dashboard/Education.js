import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
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


const Education = ({ education, deleteEducation  }) => {

    const educations = education.map(edu => (
            <TableRow key={edu._id}>
                    <TableCell>{edu.school}</TableCell>
                    <TableCell className='hide-sm'>{edu.degree}</TableCell>
                    <TableCell>
                        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                         {
                            edu.to === null ? (' Present' ) : ( <Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
                        }
                    </TableCell>
                    <TableCell>
                        <button 
                        onClick={() => deleteEducation(edu._id)} 
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
                Education Credentials
            </h2>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>School</StyledTableCell>
                            <StyledTableCell className='hide-sm'>Degree</StyledTableCell>
                            <StyledTableCell className='hide-sm'>Years</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{educations}</TableBody>
            </Table>
            </TableContainer>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education);
