import { useEffect, useState } from 'react';
import { Box, Card, Grid, IconButton, Modal, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/SearchProducts/products_actions';
import { searchBoxStyle, searchInputStyle } from '../../Components/ProductsCard/ProductsCard.styles';
import ModalCard from '../../Components/ProductsCard/ProductsModalrss/ModalCard';
import { cardContainerStyles } from '../../Screens/FilterProductsScreen/FilterProductsScreen.styles';
import { MicNoneRounded, MicOffRounded } from '@mui/icons-material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

const appId = '278783f8-cbd5-4068-a370-8bbda3f911f1';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const SearchModal = ({ open, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sproductsReducer);

  useEffect(() => {
    dispatch(fetchProducts(searchQuery));
  }, [dispatch, searchQuery]);

  // eslint-disable-next-line no-unused-vars
  const handleSearch = () => {
    dispatch(fetchProducts(searchQuery));
  };

  const { transcript,browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [listening, setListening] = useState(false);

  let timeout;
  const handleMicClick = () => {
    if (!listening) {
      // Start listening to audio
      SpeechRecognition.startListening();
      setListening(true);
    } else {
      // Stop listening to audio
      SpeechRecognition.stopListening();
      setListening(false);
    }
    
    // Stop listening after 3 seconds without any user voice
    let timeout;
    const stopListening = () => {
      SpeechRecognition.stopListening();
      setListening(false);
    };
  
    // eslint-disable-next-line no-unused-vars
    timeout = setTimeout(stopListening, 5000);
  };
  
  // Add the following event listeners outside the component
  SpeechRecognition.onstart = () => {
    clearTimeout(timeout);
  };
  
  SpeechRecognition.onend = () => {
    timeout = setTimeout(() => {
      if (listening) {
        SpeechRecognition.stopListening();
        setListening(false);
      }
    }, 5000);
  };
  
  

  useEffect(() => {
    if (transcript !== '') {
      setSearchQuery(transcript); // Update the searchQuery state with the transcript
      console.log('Transcript:', transcript);
    }
    if (!browserSupportsSpeechRecognition) {
      console.log('Incompatible');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={searchBoxStyle}>
        <Paper
          sx={{
            p: 3,
            margin: 'auto',
            flexGrow: 1,
            backgroundColor: '#f5f0e9',
          }}
        >
          <Grid>
            <div>
              <h2>
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <IconButton
                      color="info"
                      size="medium"
                      aria-label="onoff"
                      onClick={handleMicClick}
                    >
                      {listening ? <MicOffRounded fontSize="large" /> : <MicNoneRounded fontSize="large" />}
                    </IconButton>
                  </Grid>
                  <Grid item xs={11.5}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        ...searchInputStyle,
                        textAlign: 'center',
                        border: 'none',
                      }}
                      placeholder={'Search Your Costume on Ez Rental'}
                    />
                  </Grid>
                </Grid>
              </h2>
            </div>
            {/* Render the product list only if 'products' is defined */}
            {products.products && Array.isArray(products.products) && (
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={3}
              >
                {products.products.map((product) => (
                  <Grid
                    item
                    xs={products.products.length === 1 ? 12 : 12}
                    sm={products.products.length === 1 ? 12 : 9}
                    md={products.products.length === 1 ? 12 : 6}
                    lg={products.products.length === 1 ? 12 : 4}
                    key={product.uid}
                  >
                    <Card sx={cardContainerStyles}>
                      <ModalCard products={product} />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </Modal>
  );
};

export default SearchModal;
