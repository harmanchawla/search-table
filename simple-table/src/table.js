import React, { useState, useEffect } from 'react';
import { Table } from 'react-infinite-table';
import firebase from './firebase-config';
import css from './style.css';

function InfiniteTable () {

    const [limit, setLimit] = useState();
    const [rows, setRows] = useState([]);
    const [lastVisible, setLastVisible] = useState();
    const [dataRef, setDataRef] = useState();

    const initialLoad = () => {
        const db = firebase.firestore();
        const dataRef = db.collection('dummyPeople');

        let newRows = [];
        const firstQuery = dataRef.limit(100);
        firstQuery.get().then((documentSnapshots) => {
            documentSnapshots.forEach((doc) => {
                newRows.push(doc.data());
            });
            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            setRows(newRows);
            setLastVisible(lastVisible);
        });
    }

    useEffect(() => {
        initialLoad();
        setLimit(100);
        const db = firebase.firestore();
        const dataRef =  db.collection('dummyPeople');
        setDataRef(dataRef);  
    }, []);

    function loadMoreRows() {
        console.log("In news load");
        const query = dataRef.startAfter(lastVisible).limit(limit);
        let newRows = rows;
        query.get().then((documentSnapshots) => {
            documentSnapshots.forEach((doc) => {
                newRows.push(doc.data());
            });
            const lastVisibleElem = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            setLastVisible(lastVisibleElem);
            console.log("Load more ran", lastVisible, newRows)
            setRows(newRows);
        });
    }

    const columns = [
        {
            cellRenderer: ({ columnIndex, column, rowData, rowIndex, className }) => {
                return (
                    <> 
                        <td className={className}>
                            {rowData.first_name}
                        </td>
                        <td className={className}>
                            {rowData.last_name}
                        </td>
                        <td className={className}>
                            {rowData.gender}
                        </td>
                        <td className={className}>
                            {rowData.email}
                        </td>
                    </>
                )
            },
            headerRenderer: ({ columnIndex, column, className }) => {
                return (
                    <>
                        <th className={css.th}>
                            First Name
                        </th>
                        <th className={className}>
                            Last Name
                        </th>
                        <th className={className}>
                                Gender
                        </th>
                        <th className={className}>
                            Email Address
                        </th>
                    </>
                )
            },
            width: 175,
            name: 'Sample People Data'
        },
    ]

    return (
        <>

            <br /> <br />
            <Table
                className='table'
                tableClassName='table table-bordered table-striped'
                height={150}
                rowHeight={25}
                rows={rows}
                columns={columns}
                headerCount={1}
                fillTableWidth={true}
                noRowsRenderer={() => 'No rows'}
                fixedColumnsCount={1}
                infiniteLoadBeginEdgeOffset={25}
                isInfiniteLoading={true}
                onInfiniteLoad={() => { loadMoreRows() }}
                getLoadingSpinner={() => <div>Loading...</div>}    
            />
        </>
    )
}

export default InfiniteTable;