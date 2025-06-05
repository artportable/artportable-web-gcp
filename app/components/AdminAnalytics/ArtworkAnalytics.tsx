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
  Palette,
  TrendingUp,
  Today,
  Star,
  Assessment,
  Image as ImageIcon,
  BarChart
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
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell
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
  trendChip: {
    minWidth: '60px',
  }
}));

interface ArtworkAnalyticsProps {
  apiBaseUrl: string;
}

const ArtworkAnalytics: React.FC<ArtworkAnalyticsProps> = ({ apiBaseUrl }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [loading, setLoading] = useState(true);
  
  // Artwork analytics data
  const [analytics, setAnalytics] = useState<any>(null);
  const [trendingArtworks, setTrendingArtworks] = useState<any[]>([]);

  useEffect(() => {
    fetchArtworkAnalytics();
  }, []);

  const fetchArtworkAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch artwork analytics and trending artworks
      const [analyticsRes, trendingRes] = await Promise.all([
        fetch(`${apiBaseUrl}/api/Admin/artworkAnalytics`),
        fetch(`${apiBaseUrl}/api/Admin/trendingArtworks?count=15`)
      ]);

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
        console.log('Artwork analytics:', analyticsData);
      }

      if (trendingRes.ok) {
        const trendingData = await trendingRes.json();
        setTrendingArtworks(Array.isArray(trendingData) ? trendingData : []);
        console.log('Trending artworks:', trendingData);
      }

    } catch (error) {
      console.error('Error fetching artwork analytics:', error);
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp style={{ color: '#4caf50', fontSize: 16 }} />;
      case 'down': return <TrendingUp style={{ color: '#f44336', fontSize: 16, transform: 'rotate(180deg)' }} />;
      case 'new': return <Star style={{ color: '#ff9800', fontSize: 16 }} />;
      default: return <BarChart style={{ color: '#9e9e9e', fontSize: 16 }} />;
    }
  };

  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

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
        Konstverksanalys
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Översikt av konstverksvisningar och trender
      </Typography>

      {/* Overview Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center">
                <Visibility color="primary" />
                <Box ml={1}>
                  <Typography className={classes.metricLabel}>
                    Totala Konstverksvisningar
                  </Typography>
                  <Typography className={classes.metricValue}>
                    {analytics?.TotalArtworkViews?.toLocaleString() || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center">
                <Today color="primary" />
                <Box ml={1}>
                  <Typography className={classes.metricLabel}>
                    Visningar Idag
                  </Typography>
                  <Typography className={classes.metricValue}>
                    {analytics?.ArtworkViewsToday?.toLocaleString() || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center">
                <ImageIcon color="primary" />
                <Box ml={1}>
                  <Typography className={classes.metricLabel}>
                    Totala Konstverk
                  </Typography>
                  <Typography className={classes.metricValue}>
                    {analytics?.TotalArtworks?.toLocaleString() || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center">
                <Assessment color="primary" />
                <Box ml={1}>
                  <Typography className={classes.metricLabel}>
                    Genomsnittliga Visningar/Konstverk
                  </Typography>
                  <Typography className={classes.metricValue}>
                    {analytics?.AverageViewsPerArtwork?.toFixed(1) || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Secondary Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.metricLabel}>
                Visningar Denna Vecka
              </Typography>
              <Typography className={classes.metricValue}>
                {analytics?.ArtworkViewsThisWeek?.toLocaleString() || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.metricLabel}>
                Visningar Denna Månad
              </Typography>
              <Typography className={classes.metricValue}>
                {analytics?.ArtworkViewsThisMonth?.toLocaleString() || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>



      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} style={{ marginTop: 24 }}>
        {/* Daily Activity Chart */}
        <Grid item xs={12} md={8}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daglig Konstverksaktivitet (Senaste 30 Dagarna)
              </Typography>
              <Box className={classes.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics?.DailyArtworkActivity || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => `Datum: ${value}`}
                      formatter={(value, name) => {
                        const labels = {
                          Views: 'Visningar',
                          UniqueArtworks: 'Unika Konstverk',
                          UniqueSessions: 'Unika Sessioner'
                        };
                        return [value, labels[name] || name];
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="Views"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="UniqueArtworks"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Breakdown */}
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Kategorier
              </Typography>
              <Box className={classes.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics?.ArtworkCategories || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ Category, Views }) => `${Category}: ${Views}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="Views"
                    >
                      {(analytics?.ArtworkCategories || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mest Visade Konstverk
              </Typography>
              {analytics?.TopArtworks && analytics.TopArtworks.length > 0 ? (
                <TableContainer component={Paper} style={{ backgroundColor: 'transparent' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ranking</TableCell>
                        <TableCell>Konsttitel</TableCell>
                        <TableCell>Konstnär</TableCell>
                        <TableCell align="right">Totala Visningar</TableCell>
                        <TableCell align="right">Denna Vecka</TableCell>
                        <TableCell align="right">Denna Månad</TableCell>
                  
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analytics.TopArtworks.slice(0, 15).map((artwork, index) => (
                        <TableRow key={artwork.ArtworkId || index}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              {index + 1}
                       
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Link href={`/art/${artwork.ArtworkId}`}>
                              <a style={{ 
                                fontWeight: 'bold', 
                                color: '#1976d2',
                                textDecoration: 'none'
                              }}>
                                {artwork.ArtworkTitle || 'Okänd Titel'}
                              </a>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/profile/@${artwork.ArtistUsername}`}>
                              <a style={{ 
                                color: '#1976d2',
                                textDecoration: 'none'
                              }}>
                                {artwork.ArtistUsername || 'Okänd Konstnär'}
                              </a>
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            <strong>{(artwork.TotalViews || 0).toLocaleString()}</strong>
                          </TableCell>
                          <TableCell align="right">
                            {artwork.ViewsThisWeek || 0}
                          </TableCell>
                          <TableCell align="right">
                            {artwork.ViewsThisMonth || 0}
                          </TableCell>
                   
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Ingen konstverksdata tillgänglig ännu.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Trending Artworks Section */}
      {trendingArtworks && trendingArtworks.length > 0 && (
        <>
          <Typography variant="h4" className={classes.sectionTitle}>
            Trendande Konstverk
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Snabbast Växande Konstverk (25%+ tillväxt)
                  </Typography>
                  <TableContainer component={Paper} style={{ backgroundColor: 'transparent' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Konsttitel</TableCell>
                          <TableCell>Konstnär</TableCell>
                          <TableCell align="right">Totala Visningar</TableCell>
                          <TableCell align="right">Denna Vecka</TableCell>
                          <TableCell align="right">Tillväxt</TableCell>
                          <TableCell align="center">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trendingArtworks.map((artwork, index) => (
                          <TableRow key={artwork.ArtworkId || index}>
                            <TableCell>
                              <Link href={`/art/${artwork.ArtworkId}`}>
                                <a style={{ 
                                  fontWeight: 'bold', 
                                  color: '#1976d2',
                                  textDecoration: 'none'
                                }}>
                                  {artwork.ArtworkTitle || 'Okänd Titel'}
                                </a>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link href={`/profile/@${artwork.ArtistUsername}`}>
                                <a style={{ 
                                  color: '#1976d2',
                                  textDecoration: 'none'
                                }}>
                                  {artwork.ArtistUsername || 'Okänd Konstnär'}
                                </a>
                              </Link>
                            </TableCell>
                            <TableCell align="right">
                              {(artwork.TotalViews || 0).toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              <strong>{artwork.ViewsThisWeek || 0}</strong>
                            </TableCell>
                            <TableCell align="right">
                              <Typography className={getGrowthClass(artwork.GrowthRate || 0)}>
                                {formatGrowth(artwork.GrowthRate || 0)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip 
                                label="🔥 Het"
                                size="small"
                                style={{ 
                                  backgroundColor: '#ffebee', 
                                  color: '#d32f2f',
                                  fontWeight: 'bold'
                                }}
                                className={classes.trendChip}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ArtworkAnalytics; 