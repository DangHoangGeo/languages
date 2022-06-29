import * as React from 'react';
import Pagination from '@mui/material/Pagination';

type Props = {
    count: number
}

const PaginationOutlined = ({count}:Props) => {
    const [slected, setSelected] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSelected(value);
    };

    return(
        <div className="">   
            <Pagination count={count} variant="outlined" onChange={handleChange} color="secondary" />
        </div>
    )
}

export default PaginationOutlined;