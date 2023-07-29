import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { setPage } from '../../redux/slice/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function PaginationControlled() {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector((state) => state.filters);
  //Получаем номер страницы
  const handleChange = (event, value) => {
    console.log(event);
    dispatch(setPage(value));
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}
