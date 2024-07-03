import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import ExpandableList from './Expandable';

interface Post {
    id: number;
    title: string;
    body: string;
}

const SecondPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 150, editable: true },
        { field: 'body', headerName: 'Body', width: 150, editable: true },
    ];

    return (
        <Box sx={{ height: '80vh', width: '100%', p: 2, display: 'flex', alignItems: 'center', border: '2px solid black', borderRadius: '4px', padding: '20px' }}>
            <Box sx={{ height: 400, mb: 2, width: '100%', background: 'white' }}>
                <DataGrid rows={posts} columns={columns} checkboxSelection />
            </Box>
            <ExpandableList />
        </Box>

    );
};

export default SecondPage;
