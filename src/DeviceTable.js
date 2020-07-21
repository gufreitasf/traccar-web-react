import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import DeviceImage from './DeviceImage'

const columns = [
  { id: 'category', label: 'Categoria', minWidth: 40},
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'uniqueId', label: 'Identificador', minWidth: 50 },
  { id: 'model', label: 'Modelo', minWidth: 40 },
  { id: 'phone', label: 'Telefone', minWidth: 50 },
  {
    id: 'lastUpdate',
    label: 'Última Atualização',
    minWidth: 100,
    format: (value) =>  {
      if( value !== null ) {
        let ms = Date.parse(value);
        let date = new Date( ms );
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
      }
      else
        return "---";
    },
    
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let rows = props.devices;
  if(rows == null) {
    rows = [];
  }
  let visibleColumns = props.visibleColumns;
  if(visibleColumns == null) {
    visibleColumns = ['category', 'name', 'uniqueId', 'model', 'phone', 'lastUpdate'];
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if(visibleColumns.includes(column.id)) {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  )
                }
                else {
                  return null;
                }
              }
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.uniqueId}>
                  {columns.map((column) => {
                    if(visibleColumns.includes(column.id)) {
                      const value = row[column.id];
                      const icon = () => {
                        return (
                            <td><DeviceImage category={ value } lastUpdate={row.lastUpdate}/></td>
                        )
                      } 
                      return (
                        <TableCell 
                          key={column.id}
                          align={column.align}
                          component={ column.id === 'category' ? icon : "" }
                        >
                          {column.format? column.format(value) : value}
                        </TableCell>
                      );
                    }
                    else {
                      return null;
                    }
                    
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        labelRowsPerPage="Itens por página"
        labelDisplayedRows={
            ({ from, to, count }) => {
              return '' + from + '-' + to + ' de ' + count
            }
          }
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
