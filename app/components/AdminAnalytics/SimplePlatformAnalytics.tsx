import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Visibility,
  People,
  TrendingUp,
  Today,
  Star,
  Assessment
} from '@material-ui/icons';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flex: 1,
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: "black",
  },
  metricLabel: {
    color: "black",
    marginBottom: theme.spacing(1),
  },
  chartContainer: {
    height: 300,
    marginTop: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  sectionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  growthPositive: {
    color: theme.palette.success.main,
  },
  growthNegative: {
    color: theme.palette.error.main,
  },
  growthNeutral: {
    color: theme.palette.warning.main,
  },
}));

interface SimplePlatformAnalyticsProps {
  apiBaseUrl: string;
}

const SimplePlatformAnalytics: React.FC<SimplePlatformAnalyticsProps> = ({ apiBaseUrl }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [loading, setLoading] = useState(true);
  
  // Platform visit stats
  const [stats, setStats] = useState<any>(null);
  
  // Artist performance stats
  const [analytics, setAnalytics] = useState<any>(null);
  const [topArtists, setTopArtists] = useState<any[]>([]);

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const fetchAllAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch both platform visits and artist performance data
      const [platformRes, analyticsRes, artistsRes] = await Promise.all([
        fetch(`${apiBaseUrl}/api/PlatformVisits/stats`),
        fetch(`${apiBaseUrl}/api/Admin/profileViewAnalytics`),
        fetch(`${apiBaseUrl}/api/Admin/topPerformingArtists?count=10`)
      ]);

      if (platformRes.ok) {
        const platformData = await platformRes.json();
        setStats(platformData);
        console.log('Platform stats:', platformData);
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
        console.log('Analytics data:', analyticsData);
      }

      if (artistsRes.ok) {
        const artistsData = await artistsRes.json();
        setTopArtists(Array.isArray(artistsData) ? artistsData : []);
        console.log('Top artists:', artistsData);
      }

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? '+' : '';
    return `${sign}${growth.toFixed(1)}%`;
  };

  const getGrowthClass = (growth: number) => {
    if (growth > 0) return classes.growthPositive;
    if (growth < 0) return classes.growthNegative;
    return classes.growthNeutral;
  };

  if (loading) {
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
        Plattforms- & Artistanalys
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
       Översikt av plattformsbesökare och Konstnärsrankning
      </Typography>

      {/* Platform Metrics Section */}
      <Typography variant="h4" className={classes.sectionTitle}>
        Plattformsöversikt
      </Typography>
      
      <Grid container spacing={3}>
        {/* Platform Visit Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center" textAlign="center">
   
                <Box ml={1}>
                  <Typography className={classes.metricLabel}>
                    Totala Plattformsbesök
                  </Typography>
                  <Typography className={classes.metricValue}>
                    {stats?.totalVisits?.toLocaleString() || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center" textAlign="center">
       
                <Box ml={1}>
                  <Typography className={classes.metricLabel}>
                    Plattformsbesök Idag
                  </Typography>
                  <Typography className={classes.metricValue}>
                    {stats?.uniqueVisitsToday || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>




        {/* Platform Visits Chart */}
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Plattformsbesök (Senaste 30 Dagarna)
              </Typography>
              <Box className={classes.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.recentActivity || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

   
      </Grid>

      {/* Artist Performance Section */}


      <Grid container spacing={3}>
        {/* Weekly & Monthly Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.metricLabel}>
                Profilvisningar Denna Vecka
              </Typography>
              <Typography className={classes.metricValue}>
                {analytics?.UniqueViewsThisWeek || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.metricLabel}>
                Profilvisningar Denna Månad
              </Typography>
              <Typography className={classes.metricValue}>
                {analytics?.UniqueViewsThisMonth || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.metricLabel}>
                Genomsnittliga Visningar/Artist
              </Typography>
              <Typography className={classes.metricValue}>
                {analytics?.AverageViewsPerArtist?.toFixed(1) || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.metricLabel}>
                Bästa Dag Totala Visningar
              </Typography>
              <Typography className={classes.metricValue}>
                {analytics?.BestDay?.Views || 0}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {analytics?.BestDay?.Date ? new Date(analytics.BestDay.Date).toLocaleDateString() : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Artists Table */}
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Konstnärsrankning
              </Typography>
              {topArtists && topArtists.length > 0 ? (
                <TableContainer >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ranking</TableCell>
                        <TableCell>Konstnär</TableCell>
                        <TableCell align="right">Totala Visningar</TableCell>
                        <TableCell align="right">Denna Vecka</TableCell>
                        <TableCell align="right">Tillväxt</TableCell>
                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topArtists.slice(0, 10).map((artist, index) => (
                        <TableRow key={artist.Username || index}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              {index + 1}
                              {index < 3 && <Star style={{ display: 'none' }} />}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Link href={`/profile/@${artist.Username}`}>
                              <a style={{ 
                                fontWeight: 'bold', 
                                color: '#1976d2',
                                textDecoration: 'none'
                              }}>
                                {artist.Username || 'Okänd'}
                              </a>
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            {(artist.TotalViews || 0).toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            {artist.ViewsThisWeek || 0}
                          </TableCell>
                          <TableCell align="right">
                            <Typography className={getGrowthClass(artist.GrowthPercentage || 0)}>
                              {formatGrowth(artist.GrowthPercentage || 0)}
                            </Typography>
                          </TableCell>
             
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Ingen artistdata tillgänglig ännu.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Platform vs Profile Views Comparison */}
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sammanfattning av Plattformsaktivitet
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" className={classes.metricValue}>
                      {stats?.uniqueVisitsThisWeek || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Plattformsbesök Denna Vecka
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" className={classes.metricValue}>
                      {analytics?.UniqueViewsThisWeek || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Profilvisningar Denna Vecka
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" className={classes.metricValue}>
                      {analytics?.UniqueViewsThisWeek && stats?.uniqueVisitsThisWeek ? 
                        ((analytics.UniqueViewsThisWeek / stats.uniqueVisitsThisWeek) * 100).toFixed(1) : 
                        0}%
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Konverteringsgrad (Besök → Profilvisningar)
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SimplePlatformAnalytics; 