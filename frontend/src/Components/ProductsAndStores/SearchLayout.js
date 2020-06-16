import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, Chip, InputAdornment, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const SearchLayout = ({ name, subName, filter, setFilter }) => {

  const [ searchDataToSend, setSearchDataToSend ] = useState('');
  const query = new URLSearchParams(window.location.search);
  const search = query.get('search');
  const { push } = useHistory();

  const deleteSearchFilter = () => {
    if(search) {
      query.delete('search');
      push(window.location.pathname);
    }
    setFilter({...filter, search: '' });
  }

  const handlerSearchStores = (e) => {
    e.preventDefault();
    const data = searchDataToSend.value;
    if (data) {
      setFilter({...filter, search: data });
      searchDataToSend.value = '';
    }
  }

  const handleSearchDataToSend = (e) => {
    setSearchDataToSend(e.target);
  }

  return (
    <div className="search-container">
      <h1 style={{ textTransform: 'capitalize' }}>
        { name }
        <span style={{ textTransform:'uppercase', fontSize:'15px' }}>
          { subName }
        </span>
      </h1>
      <form>
        <TextField
          variant="outlined"
          size="small"
          required
          className="search-button"
          onChange={handleSearchDataToSend}
          placeholder="Busca cualquier producto"
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            endAdornment: <Button type="submit"onClick={handlerSearchStores}>BUSCAR</Button>
          }}
        />
      </form>
      { filter.search &&
        <Chip
          label={`Busqueda: ${filter.search}`}
          onDelete={deleteSearchFilter}
          style={{margin:'10px 0 0 0'}}
        />
      }
    </div>
  );
}

export default SearchLayout;