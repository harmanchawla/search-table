import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
    input: {
        width: '600px',
        fontSize: '18px',
        outline: 'None',
        border: '1px solid #eee',
        marginLeft: '12px',
        paddingLeft: '2px',
        marginBottom: '2px',
        boxShadow: '0 4px 12px rgba(32,33,36,.28)',
        padding: '12px',
        borderRadius: '40px',
        display: 'flex', 
    }
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);




export default function ReactVirtualizedTable() {

    const inputStyle  = {
        width: '600px',
        fontSize: '18px',
        outline: 'None',
        border: '1px solid #eee',
        marginLeft: '12px',
        paddingLeft: '2px',
        marginBottom: '2px',
        boxShadow: '0 4px 12px rgba(32,33,36,.28)',
        padding: '12px',
        borderRadius: '40px',
        display: 'flex', 
    }

    const rows = [];

    const sample = [
        ['Enriqueta', 'MacMickan', 'emacmickan0@bandcamp.com', 'Male'],
        ['Cheston', 'Sacase', 'csacase1@washington.edu', 'Female'],
        ['Herschel', 'Kembry', 'hkembry2@apache.org', 'Male'],
        ['Eva', 'Coyte', 'ecoyte3@netlog.com', 'Female'],
        ['Netty', 'McPeice', 'nmcpeice4@cmu.edu', 'Male'],
        ['Niccolo', 'McAne', 'nmcane5@answers.com', 'Female'],
        ['Justinn', 'Drakes', 'jdrakes6@amazonaws.com', 'Male'],
        ['Gasparo', 'Symson', 'gsymson7@hexun.com', 'Male'],
        ['Eleonora', 'Dunwoody', 'edunwoody8@marketwatch.com', 'Female'],
        ['Lief', 'Kindell', 'lkindell9@illinois.edu', 'Female'],
        ['Towney', 'Detoc', 'tdetoca@dell.com', 'Male'],
    ];

    function createData(id, firstName, lastName, email, gender) {
        return { id, firstName, lastName, email, gender };
    }
    
    for (let i = 0; i < 20000; i += 1) {
        const randomSelection = sample[Math.floor(Math.random() * sample.length)];
        rows.push(createData(i, ...randomSelection));
    }

    return (
        <>
        <br /> <br />
            <input
                placeholder="Search here..."
                type="text"
                style={inputStyle}
                // value={search}
                // onChange={ev => setSearch(ev.target.value)}
            />
            <br /> <br />
        <Paper style={{ height: 400, width: 700 }}>
            <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                columns={[
                    {
                        width: 140,
                        label: 'First Name',
                        dataKey: 'firstName',
                    },
                    {
                        width: 140,
                        label: 'Last Name',
                        dataKey: 'lastName',
                        numeric: true,
                    },
                    {
                        width: 280,
                        label: 'Email Address',
                        dataKey: 'email',
                        numeric: true,
                    },
                    {
                        width: 140,
                        label: 'Gender', 
                        dataKey: 'gender',
                        numeric: true,
                    }
                ]}
            />
        </Paper>
        </>
    );
}