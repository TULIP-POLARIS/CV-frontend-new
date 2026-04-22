import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { fetchGeneratedCvStats, GeneratedCvStats } from '../../services/cv.service';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';
import { LineChart } from 'react-native-chart-kit';
import HamburgerMenu from "../../components/HamburgerMenu";

const { width } = Dimensions.get('window');

type DailyStat = {
  date: string;
  generatedCvs: number;
  users: number;
};

export default function UsageMetricsScreen() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [stats, setStats] = useState<GeneratedCvStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      if (!token) {
        setError(t('usageMetrics.authError'));
        setLoading(false);
        return;
      }
      try {
        const data = await fetchGeneratedCvStats(token);
        setStats(data);
        setDailyStats(data.dailyStats ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('usageMetrics.failedLoad'));
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [token]);

  const hasData = dailyStats.length > 0;
  const displayTotalCvs = stats?.totalGeneratedCvs || dailyStats.reduce((sum, item) => sum + item.generatedCvs, 0);
  const displayTotalUsers = stats?.totalUsers || dailyStats.reduce((sum, item) => sum + item.users, 0);
  const chartWidth = Dimensions.get('window').width - 80;
  const lineLabels = dailyStats.map(d => d.date.slice(5));
  const cvData = dailyStats.map(d => d.generatedCvs);
  const userData = dailyStats.map(d => d.users);

  const lineChartData = {
    labels: hasData ? dailyStats.map((d) => {
      const parts = d.date.split('-');
      return parts.length === 3 ? `${parts[1]}/${parts[2]}` : d.date;
    }) : ['No Data'],
    datasets: [
      { data: hasData ? dailyStats.map((d) => d.generatedCvs) : [0], color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, strokeWidth: 2 },
      { data: hasData ? dailyStats.map((d) => d.users) : [0], color: (opacity = 1) => `rgba(61, 111, 216, ${opacity})`, strokeWidth: 2 },
    ],
    legend: [t('usageMetrics.generatedCvs'), t('usageMetrics.totalUsers')],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER WITH HAMBURGER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('usageMetrics.title')}</Text>
        <HamburgerMenu tintColor="#263238" />
      </View>
      
      <Text style={styles.description}>{t('usageMetrics.description')}</Text>

      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>{t('usageMetrics.loading')}</Text>
        </View>
      ) : error ? (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{t('usageMetrics.generatedCvs')}</Text>
              <Text style={styles.summaryValue}>{displayTotalCvs}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{t('usageMetrics.totalUsers')}</Text>
              <Text style={styles.summaryValue}>{displayTotalUsers}</Text>
            </View>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>{t('usageMetrics.usageOverview')}</Text>
            {hasData ? (
              <LineChart
                data={lineChartData}
                width={chartWidth}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(144, 164, 174, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(85, 96, 112, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: { r: '4', strokeWidth: '2', stroke: '#fff' },
                }}
                bezier
                style={styles.chartStyle}
              />
            ) : (
              <Text style={styles.description}>{t('usageMetrics.noData')}</Text>
            )}
          </View>

          {dailyStats.length > 0 && (
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>{t('usageMetrics.dailyCvs')}</Text>
              <LineChart
                data={{
                  labels: lineLabels,
                  datasets: [{ data: cvData, color: () => '#4A90E2', strokeWidth: 2 }],
                  legend: [t('usageMetrics.generatedCvs')],
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
                  propsForDots: { r: '5', strokeWidth: '2', stroke: '#3d6fd8' },
                }}
                bezier
                style={{ borderRadius: 12, marginTop: 8 }}
              />

              <Text style={[styles.chartTitle, { marginTop: 28 }]}>{t('usageMetrics.dailyUsers')}</Text>
              <LineChart
                data={{
                  labels: lineLabels,
                  datasets: [{ data: userData, color: () => '#3d6fd8', strokeWidth: 2 }],
                  legend: [t('usageMetrics.totalUsers')],
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
                  propsForDots: { r: '5', strokeWidth: '2', stroke: '#4A90E2' },
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
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10, color: '#24313c' },
  description: { fontSize: 14, color: '#556070', marginBottom: 20, lineHeight: 20 },
  loadingWrapper: { alignItems: 'center', marginTop: 40 },
  loadingText: { marginTop: 14, fontSize: 14, color: '#556070' },
  errorWrapper: { backgroundColor: '#ffe8e8', padding: 16, borderRadius: 12, marginTop: 12 },
  errorText: { color: '#c23939', fontSize: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 20 },
  summaryCard: {
    flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  summaryLabel: { fontSize: 13, color: '#90a4ae', marginBottom: 8 },
  summaryValue: { fontSize: 28, fontWeight: '700', color: '#24313c' },
  chartCard: {
    backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  chartTitle: { fontSize: 16, fontWeight: '700', marginBottom: 18, color: '#24313c' },
  chartStyle: { marginVertical: 8, borderRadius: 16, marginLeft: -10 },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},
headerTitle: {
  fontSize: 24,
  fontWeight: '700',
  color: '#24313c',
},
});