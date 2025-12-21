import { useState, useEffect, useCallback } from 'react';
import { femaleOptions, maleOptions } from './data';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link
} from '@mui/material';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: '100%', overflow: 'hidden' },
        body: { height: '100%', overflow: 'hidden' },
        '#root': { height: '100%' },
      },
    },
  },
});

function App() {
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [femaleIndex, setFemaleIndex] = useState<number>(0);
  const [maleIndex, setMaleIndex] = useState<number>(0);
  const [openAbout, setOpenAbout] = useState(false);

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const currentOptions = gender === 'female' ? femaleOptions : maleOptions;
  const selectedIndex = gender === 'female' ? femaleIndex : maleIndex;
  const setSelectedIndex = gender === 'female' ? setFemaleIndex : setMaleIndex;

  const currentImage = currentOptions[selectedIndex]?.value;
  const currentLabel = currentOptions[selectedIndex]?.label;

  const handleGenderChange = (_event: React.SyntheticEvent, newValue: 'female' | 'male') => {
    setGender(newValue);
  };

  const handleAgeChange = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMobileAgeChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const index = currentOptions.findIndex(opt => opt.value === value);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  };

  const handleOpenAbout = () => {
    setOpenAbout(true);
  };

  const handleCloseAbout = () => {
    setOpenAbout(false);
  };

  // Preload images
  useEffect(() => {
    const allOptions = [...femaleOptions, ...maleOptions];
    allOptions.forEach((option) => {
      const img = new Image();
      img.src = option.value;
    });
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setGender('female');
        break;
      case 'ArrowRight':
        event.preventDefault();
        setGender('male');
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(0, prev - 1));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, currentOptions.length - 1));
        break;
      default:
        break;
    }
  }, [currentOptions.length, setSelectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <AppBar position="static" sx={{ flexShrink: 0 }}>
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bone Age Reference
            </Typography>
            <Button 
              color="inherit" 
              onClick={handleOpenAbout}
              sx={{ borderRadius: '20px', textTransform: 'none', border: '1px solid rgba(255, 255, 255, 0.5)' }}
            >
              About
            </Button>
          </Toolbar>
        </AppBar>

        <Dialog
          open={openAbout}
          onClose={handleCloseAbout}
          aria-labelledby="about-dialog-title"
          aria-describedby="about-dialog-description"
        >
          <DialogTitle id="about-dialog-title">
            About
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="about-dialog-description">
              This application serves as a reference for bone age assessment. It provides a quick and easy way to view bone age images for different ages and genders.
              <br /><br />
              Github: <Link href="https://github.com/tsaiid/web-bone-age" target="_blank" rel="noopener">https://github.com/tsaiid/web-bone-age</Link>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAbout} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Container maxWidth="xl" sx={{ flexGrow: 1, p: 2, height: 'calc(100% - 48px)', overflow: 'hidden' }}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            {/* Sidebar Section */}
            <Grid size={{ xs: 12, md: 3 }} sx={{ height: isMobile ? 'auto' : '100%' }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                <Tabs
                  value={gender}
                  onChange={handleGenderChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  sx={{ borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}
                >
                  <Tab label="Female" value="female" />
                  <Tab label="Male" value="male" />
                </Tabs>

                {isMobile ? (
                  <Box sx={{ p: 2 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="age-select-label">Age</InputLabel>
                      <Select
                        labelId="age-select-label"
                        id="age-select"
                        value={currentOptions[selectedIndex]?.value || ''}
                        label="Age"
                        onChange={handleMobileAgeChange}
                      >
                        {currentOptions.map((option) => (
                          <MenuItem key={option.label} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : (
                  <List 
                    component="nav" 
                    aria-label="age selection" 
                    sx={{ 
                      flexGrow: 1, 
                      overflowY: 'auto',
                      '& .MuiListItemButton-root': {
                        py: 0.5
                      }
                    }}
                  >
                    {currentOptions.map((option, index) => (
                      <ListItemButton
                        key={option.label}
                        selected={selectedIndex === index}
                        onClick={() => handleAgeChange(index)}
                        divider
                      >
                        <ListItemText primary={option.label} />
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </Paper>
            </Grid>

            {/* Image Section */}
            <Grid 
              size={{ xs: 12, md: 9 }} 
              sx={{ 
                height: isMobile ? 'calc(100% - 130px)' : '100%', 
                pb: isMobile ? 2 : 0 
              }}
            >
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  p: 1,
                  bgcolor: 'white'
                }}
              >
                {currentImage ? (
                  <CardMedia
                    component="img"
                    image={currentImage}
                    alt={`Bone age for ${gender} ${currentLabel}`}
                    sx={{ 
                      height: '100%', 
                      width: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <Typography variant="body1" color="white">
                    No image selected
                  </Typography>
                )}
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
