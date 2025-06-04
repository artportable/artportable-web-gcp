import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Chip,
  Paper,
  styled,
  useTheme,
  Divider,
} from '@mui/material';
import {
  VisibilityOutlined,
  TrendingUpOutlined,
  PeopleOutlined,
  BarChartOutlined,
  CalendarTodayOutlined,
} from '@mui/icons-material';

// Scandinavian Bold Contemporary Design System
const AnalyticsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#FAFAFA',
  minHeight: '100vh',
  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '3rem',
  color: '#1A1A1A',
  marginBottom: theme.spacing(6),
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '180px',
  backgroundColor: '#FFFFFF',
  border: 'none',
  borderRadius: '2px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: 'currentColor',
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2.5rem',
  lineHeight: 1,
  marginBottom: theme.spacing(1),
  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#6B6B6B',
  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
}));

const StatsCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#1A1A1A',
  color: '#FFFFFF',
  borderRadius: '2px',
  padding: theme.spacing(4),
  height: '100%',
}));

const AccentBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#F5F5F5',
  padding: theme.spacing(3),
  borderRadius: '2px',
  border: '1px solid #E0E0E0',
}));

const BoldChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#F5F5F5',
  color: '#1A1A1A',
  fontWeight: 600,
  borderRadius: '2px',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  letterSpacing: '0.05em',
  border: '1px solid #E0E0E0',
}));

interface BestDayInfo {
  Date: string;
  Views: number;
}

interface DailyActivity {
  Date: string;
  Views: number;
}

interface ProfileAnalyticsResponse {
  Username: string;
  TotalViews: number;
  UniqueViewsToday: number;
  UniqueViewsThisWeek: number;
  UniqueViewsThisMonth: number;
  BestDay: BestDayInfo | null;
  RecentActivity: DailyActivity[];
}

interface ProfileAnalyticsProps {
  username: string;
  t: (key: string) => string;
}

const ProfileAnalytics: React.FC<ProfileAnalyticsProps> = ({ username, t }) => {
  const [analytics, setAnalytics] = useState<ProfileAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!apiBaseUrl || !username) return;

      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/api/ProfileViews/${username}/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        } else {
          setError(t('profile:analyticsLoadError'));
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(t('profile:analyticsLoadError'));
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [username, apiBaseUrl, t]);

  useEffect(() => {
    console.log('Analytics data:', analytics);
  }, [analytics]);

  if (loading) {
    return (
      <AnalyticsContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <CircularProgress size={40} sx={{ color: '#1A1A1A' }} />
        </Box>
      </AnalyticsContainer>
    );
  }

  if (error) {
    return (
      <AnalyticsContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <Typography variant="h6" sx={{ color: '#1A1A1A', fontWeight: 600 }}>
            {error}
          </Typography>
        </Box>
      </AnalyticsContainer>
    );
  }

  if (!analytics) {
    return (
      <AnalyticsContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <Typography variant="h6" sx={{ color: '#6B6B6B', fontWeight: 500 }}>
            {t('profile:analyticsNoData')}
          </Typography>
        </Box>
      </AnalyticsContainer>
    );
  }

  return (
    <AnalyticsContainer>
      <SectionTitle>
        {t('profile:analytics')}
      </SectionTitle>

      {/* Key Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard sx={{ color: '#1A1A1A' }}>
            <Box>
              <MetricValue>{analytics.TotalViews.toLocaleString()}</MetricValue>
              <MetricLabel>{t('profile:analyticsTotalViews')}</MetricLabel>
            </Box>
            <VisibilityOutlined sx={{ fontSize: 32, opacity: 0.6 }} />
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard sx={{ color: '#1A1A1A' }}>
            <Box>
              <MetricValue>{analytics.UniqueViewsThisMonth.toLocaleString()}</MetricValue>
              <MetricLabel>{t('profile:analyticsThisMonth')}</MetricLabel>
            </Box>
            <TrendingUpOutlined sx={{ fontSize: 32, opacity: 0.6 }} />
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard sx={{ color: '#1A1A1A' }}>
            <Box>
              <MetricValue>{analytics.UniqueViewsThisWeek.toLocaleString()}</MetricValue>
              <MetricLabel>{t('profile:analyticsThisWeek')}</MetricLabel>
            </Box>
            <BarChartOutlined sx={{ fontSize: 32, opacity: 0.6 }} />
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard sx={{ color: '#1A1A1A' }}>
            <Box>
              <MetricValue>{analytics.UniqueViewsToday.toLocaleString()}</MetricValue>
              <MetricLabel>{t('profile:analyticsToday')}</MetricLabel>
            </Box>
            <CalendarTodayOutlined sx={{ fontSize: 32, opacity: 0.6 }} />
          </MetricCard>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Performance Summary */}
        <Grid item xs={12}>
          <StatsCard>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 4,
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
              }}
            >
              {t('profile:analyticsPerformance')}
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                {analytics.BestDay ? (
                  <Box>
                    <Typography variant="body2" sx={{ 
                      opacity: 0.8, 
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}>
                      {t('profile:analyticsBestDay')}
                    </Typography>
                    <Typography variant="h2" sx={{ 
                      fontWeight: 800, 
                      mb: 1,
                      lineHeight: 1,
                      fontFamily: "Roboto"
                    }}>
                      {analytics.BestDay.Views}
                    </Typography>
                    <BoldChip 
                      label={new Date(analytics.BestDay.Date).toLocaleDateString('sv-SE', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    />
                  </Box>
                ) : (
                  <AccentBox sx={{ textAlign: 'center', py: 4, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {t('profile:analyticsNoPerformanceData')}
                    </Typography>
                  </AccentBox>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Divider sx={{ my: 3, backgroundColor: 'rgba(255,255,255,0.2)', display: { xs: 'block', md: 'none' } }} />
                
                <Box>
                  <Typography variant="body2" sx={{ 
                    opacity: 0.8, 
                    mb: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.8rem',
                    fontWeight: 500
                  }}>
                    {t('profile:analyticsSummary')}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{t('profile:analyticsTotal')}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{analytics.TotalViews}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{t('profile:analyticsMonth')}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{analytics.UniqueViewsThisMonth}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{t('profile:analyticsWeek')}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{analytics.UniqueViewsThisWeek}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Footer Note */}
      <AccentBox sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ 
          color: '#6B6B6B',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.8rem'
        }}>
          {t('profile:analyticsFooterNote')}
        </Typography>
      </AccentBox>
    </AnalyticsContainer>
  );
};

export default ProfileAnalytics; 