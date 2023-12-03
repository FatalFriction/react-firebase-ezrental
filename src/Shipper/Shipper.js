/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormHelperText, Grid,  InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import './Shipper.css'
import { DataGrid } from '@mui/x-data-grid';
import { PriceColumns } from './datatablesource';

const BASE_URL = `${process.env.REACT_APP_CORS_URL}/${process.env.REACT_APP_SHIPPER_URL}`;
const API_KEY = process.env.REACT_APP_SHIPPER_API_KEY;
const CORS_KEY = process.env.REACT_APP_SHIPPER_CORS_KEY;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const Shipper = ({onUserPick, itemval}) => {
  const [data, setData] = useState(null);
  const [datac, setDatac] = useState(null);
  const [dataa, setDataa] = useState(null);
  const [dataaa, setDataaa] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCities, setSelectedCities] = useState('');
  const [selectedsuburbs, setSelectedsuburbs] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [price, setPrice] = useState('');
  const rate = ["instant", "regular" , "express", "trucking" , "same-day"];
  const [rate_type,setrate_type] = useState('');
  
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const requestBody = {
          origin: {
            lat: '-6.1707876',
            lng: '106.7617984',
          },
          destination: {
            lat: selectedArea.lat?.toString(),
            lng: selectedArea.lng?.toString(),
          },
          cod: false,
          for_order: false,
          item_value: itemval,
          weight: 2,
          length: 5,
          width: 2,
          height: 2,
          limit: 8,
          sort_by: ['final_price'],
        };
        
        const response = await axios.post(`${BASE_URL}/v3/pricing/domestic/${rate_type}`, requestBody, {
          headers: {
            'X-API-Key': API_KEY,
            'x-cors-api-key': CORS_KEY,
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const responseData = response.data;

          if (responseData) {
            setPrice(responseData);
          } else {
            console.error('Invalid response data format');
          }
        } else {
          console.error('API request failed with status:', response.status);
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    };

    fetchPrice();
  }, [rate_type]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${BASE_URL}/v3/location/country/228/provinces`,
          headers: { 
            'X-API-Key': API_KEY,
            'x-cors-api-key': CORS_KEY,
          },
        };
  
        const response = await axios.request(config);
  
        if (response.status >= 200 && response.status < 300) {
          const responseData = response.data;
  
          if (responseData) {
            setData(responseData);
          } else {
            console.error('Invalid response data format');
          }
        } else {
          console.error('API request failed with status:', response.status);
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    };
  
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvince) {
        try {
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/v3/location/province/${selectedProvince}/cities`,
            headers: { 
              'X-API-Key': API_KEY,
              'x-cors-api-key': CORS_KEY,
            },
          };
    
          const response = await axios.request(config);
    
          if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
    
            if (responseData) {
              // Update the data state with the fetched cities
              setDatac(responseData);
            } else {
              console.error('Invalid response data format');
            }
          } else {
            console.error('API request failed with status:', response.status);
          }
        } catch (error) {
          console.error('API request error:', error);
        }
      }
    };
  
    fetchCities();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchSuburbs = async () => {
      if (selectedCities) {
        try {
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/v3/location/city/${selectedCities}/suburbs`,
            headers: { 
              'X-API-Key': API_KEY,
              'x-cors-api-key': CORS_KEY,
            },
          };
    
          const response = await axios.request(config);
    
          if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
    
            if (responseData) {
              // Update the data state with the fetched cities
              setDataa(responseData);
            } else {
              console.error('Invalid response data format');
            }
          } else {
            console.error('API request failed with status:', response.status);
          }
        } catch (error) {
          console.error('API request error:', error);
        }
      }
    };
  
    fetchSuburbs();
  }, [selectedCities]);

  useEffect(() => {
    const fetchArea = async () => {
      if (selectedsuburbs) {
        try {
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/v3/location/suburb/${selectedsuburbs}/areas`,
            headers: { 
              'X-API-Key': API_KEY,
              'x-cors-api-key': CORS_KEY,
            },
          };
    
          const response = await axios.request(config);
    
          if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
    
            if (responseData) {
              // Update the data state with the fetched cities
              setDataaa(responseData);
            } else {
              console.error('Invalid response data format');
            }
          } else {
            console.error('API request failed with status:', response.status);
          }
        } catch (error) {
          console.error('API request error:', error);
        }
      }
    };
  
    fetchArea();
  }, [selectedsuburbs]);


  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedCities('');
    setSelectedsuburbs('');
    setSelectedArea('');
  };

  const handleCitiesChange = (event) => {
    setSelectedCities(event.target.value);
    setSelectedsuburbs('');
    setSelectedArea('');
  };

  const handleSuburbChange = (event) => {
    setSelectedsuburbs(event.target.value);
    setSelectedArea('');
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
    setrate_type('');
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRateChange = (event) => {
    setrate_type(event.target.value);
  };

  const [result, setResult] = useState('');

  useEffect(() => {
    if (price.data) {
      const dataWithIds = price.data?.pricings.map((row, index) => {
        return { ...row, id: index + 1 };
      });
  
      setResult(dataWithIds);
  
    }
  }, [price]);

  const handleSelect = (rowId) => {
    const selectedRow = result.find((row) => row.id === rowId);
    handleCloseModal();

    // Invoke the callback function with the selected data
    onUserPick(selectedRow);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           <Button variant='outlined' color='success' className="selectButton" onClick={() => handleSelect(params.row.id)}>
              Select
            </Button>
          </div>
        );
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  
  return (
<div>
  <Button onClick={handleOpenModal}>Fill Address</Button>
  <Modal
    open={modalOpen}
    onClose={handleCloseModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Complete Your Shipment Information
      </Typography>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl required fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-required-label">Province</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={selectedProvince}
              label="Province *"
              onChange={handleProvinceChange}
            >
              <MenuItem value="">
              </MenuItem>
              {data?.data.map((province) => (
                <MenuItem key={province.id} value={province.id}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl required fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-required-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={selectedCities}
              label="City *"
              onChange={handleCitiesChange}
            >
              <MenuItem value="">
              </MenuItem>
              {datac?.data.map((cities) => (
                <MenuItem key={cities.id} value={cities.id}>
                  {cities.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl required fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-required-label">Suburbs</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={selectedsuburbs}
              label="Suburbs *"
              onChange={handleSuburbChange}
            >
              <MenuItem value="">
              </MenuItem>
              {dataa?.data.map((suburbs) => (
                <MenuItem key={suburbs.id} value={suburbs.id}>
                  {suburbs.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl required fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-required-label">Area</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={selectedArea}
              label="Area *"
              onChange={handleAreaChange}
            >
              <MenuItem value="">
              </MenuItem>
              {dataaa?.data.map((area) => (
                <MenuItem key={area.id} value={area}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl required fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-required-label">Shipment</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={rate_type}
              label="Shipper *"
              onChange={handleRateChange}
            >
              <MenuItem value="">
              </MenuItem>
              {rate.map((rates, index) => (
                <MenuItem key={index} value={rates}>
                  {rates}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>

      </Grid>

      {result && ( // Add this conditional rendering check
        <DataGrid
        key={result.length} // Add a unique key based on the length of the result data
        className="datagrid"
        rows={result}
        columns={PriceColumns.concat(actionColumn)}
        density="comfortable"
        pageSize={5}
        rowsPerPageOptions={[10]}
        autoPageSize={false}
        checkboxSelection
        pagination
        onPageChange={(newPage) => setCurrentPage(newPage)}
        page={currentPage}
      />
      )}

    </Box>
  </Modal>
</div>
 
  );
};

export default Shipper;
