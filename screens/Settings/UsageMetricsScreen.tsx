import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { fetchGeneratedCvStats, GeneratedCvStats } from '../../services/cv.service';
import { useAuth } from '../../context/AuthContext';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

type DailyStat = {
  date: string;
  generatedCvs: number;
  users: number;
};

const metricBars = [
  { key: 'totalGeneratedCvs', label: 'Generated CVs', color: '#4A90E2' },
  { key: 'totalUsers', label: 'Total Users', color: '#3d6fd8' },
];

export default function UsageMetricsScreen() {
  const { token } = useAuth();
  const [stats, setStats] = useState<GeneratedCvStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      if (!token) {
        setError('Authentication token not available.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchGeneratedCvStats(token);
        setStats(data);
        setDailyStats(data.dailyStats ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metrics.');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [token]);

  const chartData = stats
    ? metricBars.map((bar) => ({
        ...bar,
        value: stats[bar.key as keyof GeneratedCvStats] as number,
      }))
    : [];

  const maxValue = Math.max(...chartData.map((item) => item.value), 1);

  const lineLabels = dailyStats.map(d => d.date.slice(5));
  const cvData = dailyStats.map(d => d.generatedCvs);
  const userData = dailyStats.map(d => d.users);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Usage Metrics</Text>
      <Text style={styles.description}>
        These metrics show how many CVs have been generated and how many users have used the service.
      </Text>

      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading metrics...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          {/* Summary Cards */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Generated CVs</Text>
              <Text style={styles.summaryValue}>{stats?.totalGeneratedCvs ?? 0}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Users</Text>
              <Text style={styles.summaryValue}>{stats?.totalUsers ?? 0}</Text>
            </View>
          </View>

          {/* Bar Overview */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Usage Overview</Text>
            {chartData.map((item) => (
              <View key={item.key} style={styles.chartRow}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barLabel}>{item.label}</Text>
                  <Text style={styles.barValue}>{item.value}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${(item.value / maxValue) * 100}%`,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Line Charts */}
          {dailyStats.length > 0 && (
            <View style={styles.chartCard}>

              <Text style={styles.chartTitle}>Daily CVs Generated</Text>
              <LineChart
                data={{
                  labels: lineLabels,
                  datasets: [
                    {
                      data: cvData,
                      color: () => '#4A90E2',
                      strokeWidth: 2,
                    },
                  ],
                  legend: ['Generated CVs'],
                }}
                width={width - 64}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
                  labelColor: () => '#90a4ae',
                  style: { borderRadius: 16 },
                  propsForDots: {
                    r: '5',
                    strokeWidth: '2',
                    stroke: '#3d6fd8',
                  },
                }}
                bezier
                style={{ borderRadius: 12, marginTop: 8 }}
              />

              <Text style={[styles.chartTitle, { marginTop: 28 }]}>Daily Users</Text>
              <LineChart
                data={{
                  labels: lineLabels,
                  datasets: [
                    {
                      data: userData,
                      color: () => '#3d6fd8',
                      strokeWidth: 2,
                    },
                  ],
                  legend: ['Users'],
                }}
                width={width - 64}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(61, 111, 216, ${opacity})`,
                  labelColor: () => '#90a4ae',
                  style: { borderRadius: 16 },
                  propsForDots: {
                    r: '5',
                    strokeWidth: '2',
                    stroke: '#4A90E2',
                  },
                }}
                bezier
                style={{ borderRadius: 12, marginTop: 8 }}
              />

            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#24313c',
  },
  description: {
    fontSize: 14,
    color: '#556070',
    marginBottom: 20,
    lineHeight: 20,
  },
  loadingWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 14,
    color: '#556070',
  },
  errorWrapper: {
    backgroundColor: '#ffe8e8',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  errorText: {
    color: '#c23939',
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#90a4ae',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#24313c',
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 18,
    color: '#24313c',
  },
  chartRow: {
    marginBottom: 18,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  barLabel: {
    color: '#556070',
    fontSize: 14,
  },
  barValue: {
    color: '#24313c',
    fontSize: 14,
    fontWeight: '700',
  },
  barTrack: {
    width: '100%',
    height: 12,
    borderRadius: 999,
    backgroundColor: '#eef2f6',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
  },
});