import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Paper,
  styled,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

// Styled components matching the Figma design
const AnalyticsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: '100vh',
  fontFamily: 'Roboto',
}));

const TimeSelector = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#E5E5E5',
    borderRadius: '25px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    padding: '8px 16px',
    minWidth: '200px',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& .MuiSelect-select': {
    padding: '8px 16px',
  },
}));

const DateRange = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666666',
  fontWeight: 500,
  marginTop: theme.spacing(1),
  textAlign: 'center',
}));

const MainMetricContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
}));

const MainNumber = styled(Typography)(({ theme }) => ({
  fontSize: '120px',
  fontWeight: 300,
  color: '#1A1A1A',
  lineHeight: 1,
  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
}));

const MainLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#666666',
  fontWeight: 500,
  marginTop: theme.spacing(1),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1A1A1A',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const ArtworkCard = styled(Paper)(({ theme }) => ({
  overflow: 'hidden',
  backgroundColor: 'transparent',
  border: 'none',
  boxShadow: 'none',
  cursor: 'default',



}));

const ArtworkImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  display: 'block',
});

interface ProfileAnalyticsProps {
  username: string;
  t: (key: string) => string;
}

interface ArtworkData {
  Id: string;
  Title: string;
  PrimaryFile?: {
    Name: string;
  };
}

interface ArtworkStats {
  artworkId: string;
  artworkTitle: string;
  totalViews: number;
  imageUrl: string;
}

const ProfileAnalytics: React.FC<ProfileAnalyticsProps> = ({ username, t }) => {
  const [timePeriod, setTimePeriod] = useState('30');
  const [totalViews, setTotalViews] = useState(0);
  const [dateRange, setDateRange] = useState('');
  const [popularArtworks, setPopularArtworks] = useState<ArtworkStats[]>([]);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const handleTimePeriodChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setTimePeriod(event.target.value);
  };

  // Calculate date range based on selected period
  const calculateDateRange = (days: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('sv-SE', { 
        day: 'numeric', 
        month: 'short' 
      });
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  useEffect(() => {
    setDateRange(calculateDateRange(parseInt(timePeriod)));
  }, [timePeriod]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!apiBaseUrl || !username) return;

      try {
        setLoading(true);

        // Fetch profile analytics
        const profileResponse = await fetch(`${apiBaseUrl}/api/ProfileViews/${username}/stats`);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          
          // For now, use the available data. In a real implementation, 
          // you'd filter by the selected time period
          setTotalViews(profileData.TotalViews || 0);
        }

        // Fetch artworks and their stats
        const artworksResponse = await fetch(`${apiBaseUrl}/api/artworks?owner=${username}`);
        if (artworksResponse.ok) {
          const artworks: ArtworkData[] = await artworksResponse.json();
          
          // Fetch stats for each artwork
          const artworkStatsPromises = artworks.slice(0, 6).map(async (artwork) => {
            try {
              const statsResponse = await fetch(`${apiBaseUrl}/api/ArtworkViews/${artwork.Id}/stats`);
              if (statsResponse.ok) {
                const stats = await statsResponse.json();
                return {
                  artworkId: artwork.Id,
                  artworkTitle: artwork.Title,
                  totalViews: stats.TotalViews || 0,
                  imageUrl: artwork.PrimaryFile?.Name ? `${bucketUrl}${artwork.PrimaryFile.Name}` : '',
                };
              }
              return null;
            } catch (error) {
              console.error(`Error fetching stats for artwork ${artwork.Id}:`, error);
              return null;
            }
          });

          const statsResults = await Promise.all(artworkStatsPromises);
          const validStats = statsResults.filter((stat): stat is ArtworkStats => stat !== null);
          
          // Sort by total views and take top artworks
          validStats.sort((a, b) => b.totalViews - a.totalViews);
          setPopularArtworks(validStats.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [username, apiBaseUrl, bucketUrl, timePeriod]);

  if (loading) {
    return (
      <AnalyticsContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <Typography>Loading...</Typography>
        </Box>
      </AnalyticsContainer>
    );
  }

  return (
    <AnalyticsContainer>
      {/* Time Period Selector */}
      <Box display="flex" justifyContent="center" mb={2}>
        <TimeSelector>
          <Select
            value={timePeriod}
            onChange={handleTimePeriodChange}
            displayEmpty
            MenuProps={{
              disableScrollLock: true,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
            }}
          >
            <MenuItem value="7">{t('profile:timePeriodLast7Days')}</MenuItem>
            <MenuItem value="30">{t('profile:timePeriodLast30Days')}</MenuItem>
            <MenuItem value="90">{t('profile:timePeriodLast90Days')}</MenuItem>
            <MenuItem value="365">{t('profile:timePeriodLastYear')}</MenuItem>
          </Select>
        </TimeSelector>
      </Box>

      {/* Date Range */}
      <DateRange>{dateRange}</DateRange>

      {/* Main Metric */}
      <MainMetricContainer>
        <MainNumber>{totalViews}</MainNumber>
        <MainLabel>{t('profile:views')}</MainLabel>
      </MainMetricContainer>

      {/* Popular Artworks Section */}
      <Box>
        <SectionTitle>{t('profile:popularArtworks')}</SectionTitle>
        <Grid container spacing={3} justifyContent="center">
          {popularArtworks.map((artwork) => (
            <Grid item xs={12} sm={6} md={4} key={artwork.artworkId}>
              <ArtworkCard >
                {artwork.imageUrl && (
                  <ArtworkImage
                    src={artwork.imageUrl}
                    alt={artwork.artworkTitle}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
                <div style={{textAlign: 'center', fontSize: '12px', fontWeight: 500, color: '#666666', marginTop: '10px'}}>{artwork?.artworkTitle}</div>
              </ArtworkCard>
            </Grid>
          ))}
        </Grid>
        
        {popularArtworks.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography color="textSecondary">
              Inga konstverksvisningar än
            </Typography>
          </Box>
        )}
      </Box>
    </AnalyticsContainer>
  );
};

export default ProfileAnalytics; 