import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  useMediaQuery,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Visibility,
  People,
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
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {

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
    color: theme.palette.primary.main,
  },
  metricLabel: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  trendIcon: {
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },
  chartContainer: {
    height: 300,
    marginTop: theme.spacing(2),
  },
  tabPanel: {
    marginTop: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
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

interface AdminAnalyticsProps {
  apiBaseUrl: string;
}

const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ apiBaseUrl }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [topArtists, setTopArtists] = useState<any[]>([]);
  const [platformInsights, setPlatformInsights] = useState<any>(null);
  const [risingStars, setRisingStars] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch all analytics data in parallel
      const [analyticsRes, artistsRes, insightsRes, starsRes] = await Promise.all([
        fetch(`${apiBaseUrl}/api/Admin/profileViewAnalytics`),
        fetch(`${apiBaseUrl}/api/Admin/topPerformingArtists?count=20`),
        fetch(`${apiBaseUrl}/api/Admin/platformInsights`),
        fetch(`${apiBaseUrl}/api/Admin/risingStars?count=10`)
      ]);

      // Check response status for each endpoint
      console.log('Response statuses:', {
        analytics: analyticsRes.status,
        artists: artistsRes.status,
        insights: insightsRes.status,
        stars: starsRes.status
      });

      // Check if any requests failed
      if (!analyticsRes.ok) {
        console.error('Analytics endpoint failed:', analyticsRes.status, await analyticsRes.text());
      }
      if (!artistsRes.ok) {
        console.error('Artists endpoint failed:', artistsRes.status, await artistsRes.text());
      }
      if (!insightsRes.ok) {
        console.error('Insights endpoint failed:', insightsRes.status, await insightsRes.text());
      }
      if (!starsRes.ok) {
        console.error('Stars endpoint failed:', starsRes.status, await starsRes.text());
      }

      const [analyticsData, artistsData, insightsData, starsData] = await Promise.all([
        analyticsRes.ok ? analyticsRes.json() : {},
        artistsRes.ok ? artistsRes.json() : [],
        insightsRes.ok ? insightsRes.json() : {},
        starsRes.ok ? starsRes.json() : []
      ]);

      // Log the actual data received
      console.log('Received data:', {
        analytics: analyticsData,
        artists: artistsData,
        insights: insightsData,
        stars: starsData
      });

      setAnalytics(analyticsData || {});
      setTopArtists(Array.isArray(artistsData) ? artistsData : []);
      setPlatformInsights(insightsData || {});
      setRisingStars(Array.isArray(starsData) ? starsData : []);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className={`${classes.trendIcon} ${classes.growthPositive}`} />;
      case 'down':
        return <TrendingDown className={`${classes.trendIcon} ${classes.growthNegative}`} />;
      default:
        return <TrendingFlat className={`${classes.trendIcon} ${classes.growthNeutral}`} />;
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

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.tabPanel}>
          {children}
        </Box>
      )}
    </div>
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box className={classes.root}>
      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
        Platform Analytics Dashboard
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={(e, newValue) => setTabValue(newValue)}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
      >
        <Tab label="Overview" />
        <Tab label="Artist Performance" />
        <Tab label="Traffic Trends" />
        <Tab label="User Behavior" />
        <Tab label="Platform Insights" />
      </Tabs>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Key Metrics */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Box display="flex" alignItems="center">
                  <Visibility color="primary" />
                  <Box ml={1}>
                    <Typography className={classes.metricLabel}>
                      Total Views
                    </Typography>
                    <Typography className={classes.metricValue}>
                      {analytics?.TotalViews?.toLocaleString() || 0}
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
                  <People color="primary" />
                  <Box ml={1}>
                    <Typography className={classes.metricLabel}>
                      Active Artists
                    </Typography>
                    <Typography className={classes.metricValue}>
                      {analytics?.ActiveArtists || 0}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.metricLabel}>
                  Views Today
                </Typography>
                <Typography className={classes.metricValue}>
                  {analytics?.UniqueViewsToday || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.metricLabel}>
                  Avg Views/Artist
                </Typography>
                <Typography className={classes.metricValue}>
                  {analytics?.AverageViewsPerArtist?.toFixed(1) || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Daily Activity Chart */}
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Activity (Last 30 Days)
                </Typography>
                <Box className={classes.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics?.DailyActivity || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="Views"
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

          {/* Hourly Activity */}
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Today's Hourly Activity
                </Typography>
                <Box className={classes.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics?.HourlyActivity || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Views" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Traffic Trends */}
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Growth Metrics
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Week over Week
                  </Typography>
                  <Typography variant="h4" className={getGrowthClass(analytics?.TrafficTrends?.WeekOverWeekGrowth || 0)}>
                    {formatGrowth(analytics?.TrafficTrends?.WeekOverWeekGrowth || 0)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Month over Month
                  </Typography>
                  <Typography variant="h4" className={getGrowthClass(analytics?.TrafficTrends?.MonthOverMonthGrowth || 0)}>
                    {formatGrowth(analytics?.TrafficTrends?.MonthOverMonthGrowth || 0)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Artist Performance Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Performing Artists
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Artist</TableCell>
                        <TableCell>Total Views</TableCell>
                        <TableCell>This Week</TableCell>
                        <TableCell>Growth</TableCell>
                        <TableCell>Trend</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(topArtists || []).slice(0, 10).map((artist) => (
                        <TableRow key={artist.Username}>
                          <TableCell>{artist.Rank || 0}</TableCell>
                          <TableCell>
                            <strong>{artist.Username || 'Unknown'}</strong>
                          </TableCell>
                          <TableCell>{(artist.TotalViews || 0).toLocaleString()}</TableCell>
                          <TableCell>{artist.ViewsThisWeek || 0}</TableCell>
                          <TableCell className={getGrowthClass(artist.WeekOverWeekGrowth || 0)}>
                            {formatGrowth(artist.WeekOverWeekGrowth || 0)}
                          </TableCell>
                          <TableCell>
                            {getTrendIcon(artist.TrendDirection || 'flat')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Star color="primary" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Rising Stars
                </Typography>
                {(risingStars || []).map((star, index) => (
                  <Box key={star.Username || index} mb={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1">
                        <strong>{star.Username || 'Unknown'}</strong>
                      </Typography>
                      <Chip
                        label={formatGrowth(star.WeekOverWeekGrowth || 0)}
                        color="primary"
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {(star.TotalViews || 0).toLocaleString()} total views
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(star.WeekOverWeekGrowth || 0, 100)}
                      style={{ marginTop: 4 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Traffic Trends Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Weekly Traffic Trends
                </Typography>
                <Box className={classes.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics?.TrafficTrends?.WeeklyTrends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="WeekStart" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="Views" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="UniqueSessions" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Best Performance
                </Typography>
                <Box mb={2}>
                  <Typography variant="subtitle2" color="primary">
                    Best Day: {analytics?.TrafficTrends?.BestDay?.Period}
                  </Typography>
                  <Typography variant="h4">
                    {analytics?.TrafficTrends?.BestDay?.Views || 0} views
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="subtitle2" color="primary">
                    Best Week
                  </Typography>
                  <Typography variant="h6">
                    {analytics?.TrafficTrends?.BestWeek?.Views || 0} views
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="primary">
                    Best Month
                  </Typography>
                  <Typography variant="h6">
                    {analytics?.TrafficTrends?.BestMonth?.Views || 0} views
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Trends
                </Typography>
                <Box className={classes.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics?.TrafficTrends?.MonthlyTrends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Views" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* User Behavior Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Session Metrics
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Views per Session
                  </Typography>
                  <Typography variant="h4">
                    {analytics?.UserBehavior?.ViewsPerSession?.toFixed(1) || 0}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Return Visitor Rate
                  </Typography>
                  <Typography variant="h4">
                    {analytics?.UserBehavior?.ReturnVisitorRate?.toFixed(1) || 0}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Sessions per User
                  </Typography>
                  <Typography variant="h4">
                    {analytics?.UserBehavior?.SessionsPerUser?.toFixed(1) || 0}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Visitor Types
                </Typography>
                <Box className={classes.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'New Visitors', value: analytics?.UserBehavior?.NewVisitors || 0 },
                          { name: 'Return Visitors', value: analytics?.UserBehavior?.ReturnVisitors || 0 }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {[0, 1].map((entry, index) => (
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

          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Regions
                </Typography>
                {analytics?.UserBehavior?.TopCountries?.map((country, index) => (
                  <Box key={country.Country} mb={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">
                        {country.Country}
                      </Typography>
                      <Typography variant="body2">
                        {country.Percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={country.Percentage}
                      style={{ marginTop: 4 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Platform Insights Tab */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Assessment color="primary" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Discovery Patterns
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Artists Discovered Today
                  </Typography>
                  <Typography variant="h4">
                    {platformInsights?.DiscoveryPatterns?.ArtistsDiscoveredToday || 0}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    This Week
                  </Typography>
                  <Typography variant="h6">
                    {platformInsights?.DiscoveryPatterns?.ArtistsDiscoveredThisWeek || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Average Discovery Rate
                  </Typography>
                  <Typography variant="h6">
                    {platformInsights?.DiscoveryPatterns?.AverageDiscoveryRate?.toFixed(1) || 0}/day
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Engagement Metrics
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Deep Engagement Sessions
                  </Typography>
                  <Typography variant="h4">
                    {platformInsights?.EngagementMetrics?.DeepEngagementSessions || 0}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Engagement Score
                  </Typography>
                  <Typography variant="h6">
                    {platformInsights?.EngagementMetrics?.EngagementScore?.toFixed(1) || 0}/10
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Bounce Rate
                  </Typography>
                  <Typography variant="h6">
                    {((platformInsights?.EngagementMetrics?.BounceRate || 0) * 100).toFixed(1)}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Content Performance by Category
                </Typography>
                <Box className={classes.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformInsights?.ContentPerformance?.CategoryBreakdown || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Views" fill="#8884d8" />
                      <Bar dataKey="AverageViewsPerArtist" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default AdminAnalytics; 