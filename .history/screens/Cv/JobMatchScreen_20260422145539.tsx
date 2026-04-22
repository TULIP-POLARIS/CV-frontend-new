import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

type ComparisonItem = {
  id: string;
  matchScore: number;
  strengths: string;
  weaknesses: string;
  suggestions: string;
  analysisResult: string;
  createdAt: string;
  jobOffer?: {
    title?: string;
    company?: string;
    description?: string;
  };
};

export default function JobMatchScreen({ route }) {
  const userId = route.params?.userId;

  const [data, setData] = useState<ComparisonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ComparisonItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://YOUR_API_URL/api/compare-cv/user/${userId}`
      );

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.log('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ComparisonItem }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => setSelected(item)}
      >
        <Text style={styles.title}>
          {item.jobOffer?.title || 'No Title'}
        </Text>

        <Text style={styles.company}>
          {item.jobOffer?.company || 'Unknown Company'}
        </Text>

        <Text style={styles.score}>
          Match: {item.matchScore}%
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3d6fd8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* LIST */}
      <Text style={styles.header}>Your Job Matches</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* DETAIL MODAL SIMPLE */}
      {selected && (
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>
            {selected.jobOffer?.title}
          </Text>

          <Text style={styles.detailScore}>
            Match Score: {selected.matchScore}%
          </Text>

          <Text style={styles.section}>Strengths</Text>
          <Text>{selected.strengths}</Text>

          <Text style={styles.section}>Weaknesses</Text>
          <Text>{selected.weaknesses}</Text>

          <Text style={styles.section}>Suggestions</Text>
          <Text>{selected.suggestions}</Text>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setSelected(null)}
          >
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}