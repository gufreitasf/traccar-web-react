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

const columns = [
  { id: 'category', label: 'Categoria', minWidth: 40 },
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'uniqueId', label: 'Identificador', minWidth: 50 },
  { id: 'model', label: 'Modelo', minWidth: 40 },
  { id: 'phone', label: 'Telefone', minWidth: 50 },
  {
    id: 'lastUpdate',
    label: 'Última Atualização',
    minWidth: 100,
    format: (value) =>  {
      let ms = Date.parse(value);
      let date = new Date( ms );
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    
  }
];

function createData(category, name, uniqueId, model, phone, lastUpdate) {
  return { category, name, uniqueId, model, phone, lastUpdate };
}

const rows = [
  createData('car','India', 1324171354, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car2','India', 1324171355, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13241714356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 23241713356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 123241713516, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13224171356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 132241716356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13242171356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13241721356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 132417123156, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13241713526, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13241713356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13241713456, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13241714356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13241713356, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
  createData('car3','India', 13241713256, 'TK103', '(31) 99376-3531',"2020-04-03T19:55:12.473+0000"),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.uniqueId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format? column.format(value) : value}
                      </TableCell>
                    );
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
