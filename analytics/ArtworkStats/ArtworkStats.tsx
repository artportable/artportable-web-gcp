import React, { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ArtworkStatsProps {
  artworkId: string;
  showIcon?: boolean;
  variant?: 'minimal' | 'detailed';
}

interface ArtworkAnalyticsData {
  artworkId: string;
  totalViews: number;
  uniqueViewsToday: number;
  uniqueViewsThisWeek: number;
  uniqueViewsThisMonth: number;
}

const ArtworkStats: React.FC<ArtworkStatsProps> = ({ 
  artworkId, 
  showIcon = true, 
  variant = 'minimal' 
}) => {
  const [stats, setStats] = useState<ArtworkAnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchStats = async () => {
      if (!apiBaseUrl || !artworkId) return;

      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/api/ArtworkViews/${artworkId}/stats`);
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching artwork stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [artworkId, apiBaseUrl]);

  if (loading || !stats) {
    return null;
  }

  if (variant === 'minimal') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {showIcon && <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
        <Typography variant="caption" color="text.secondary">
          {stats.totalViews > 0 ? `${stats.totalViews} views` : ''}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Artwork Statistics
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip 
          label={`${stats.totalViews} total views`}
          size="small"
          variant="outlined"
        />
        <Chip 
          label={`${stats.uniqueViewsThisMonth} this month`}
          size="small"
          variant="outlined"
        />
        <Chip 
          label={`${stats.uniqueViewsThisWeek} this week`}
          size="small"
          variant="outlined"
        />
        {stats.uniqueViewsToday > 0 && (
          <Chip 
            label={`${stats.uniqueViewsToday} today`}
            size="small"
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
};

export default ArtworkStats; 