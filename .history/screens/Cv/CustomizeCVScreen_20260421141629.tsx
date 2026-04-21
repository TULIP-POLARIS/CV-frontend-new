import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTranslation, setLanguage, Language } from "../../hooks/useTranslation";
import HamburgerMenu from "../../components/HamburgerMenu"; // ← مسیر را با پروژه‌ات تطبیق بده

// ─────────────────────────────────────────────────────────────────────────────
// ۱. تایپ رنگ‌های یک تم
// ─────────────────────────────────────────────────────────────────────────────
type Theme = {
  id: string;
  headerColor: string;
  sidebarColor: string;
  accentColor: string;
  sidebarText: string;
  mainBg: string;
  sectionColor: string;
  swatches: string[];
};

// ─────────────────────────────────────────────────────────────────────────────
// ۲. لیست تم‌ها
// ─────────────────────────────────────────────────────────────────────────────
const THEMES: Theme[] = [
  {
    id: "ocean",
    headerColor: "#2F3E4D",
    sidebarColor: "#263545",
    accentColor: "#4A90D9",
    sidebarText: "#C8D8E8",
    mainBg: "#FFFFFF",
    sectionColor: "#2F3E4D",
    swatches: ["#2F3E4D", "#4A90D9", "#C8D8E8", "#FFFFFF"],
  },
  {
    id: "navyGold",
    headerColor: "#1B2A4A",
    sidebarColor: "#16223A",
    accentColor: "#C9A84C",
    sidebarText: "#E8D9B5",
    mainBg: "#FAFAF8",
    sectionColor: "#1B2A4A",
    swatches: ["#1B2A4A", "#C9A84C", "#E8D9B5", "#FAFAF8"],
  },
  {
    id: "forestSand",
    headerColor: "#2D4A3E",
    sidebarColor: "#1F3329",
    accentColor: "#C4A265",
    sidebarText: "#D9C5A8",
    mainBg: "#FAF8F4",
    sectionColor: "#2D4A3E",
    swatches: ["#2D4A3E", "#C4A265", "#D9C5A8", "#FAF8F4"],
  },
  {
    id: "plumBlush",
    headerColor: "#4A2D5E",
    sidebarColor: "#311E41",
    accentColor: "#C47BA0",
    sidebarText: "#F0D0E0",
    mainBg: "#FDF9FB",
    sectionColor: "#4A2D5E",
    swatches: ["#4A2D5E", "#C47BA0", "#F0D0E0", "#FDF9FB"],
  },
];


function MiniCVPreview({
  theme,
  t,
}: {
  theme: Theme;
  t: (key: string) => string;
}) {
  return (
    <View style={[miniStyles.container, { backgroundColor: theme.mainBg }]}>
      <View style={[miniStyles.header, { backgroundColor: theme.headerColor }]}>
        <Text style={miniStyles.headerName}>ALEX RIVERA</Text>
        <Text style={miniStyles.headerTitle}>{t("customizeCV.miniCV.title")}</Text>
      </View>

      <View style={miniStyles.body}>
        <View style={[miniStyles.sidebar, { backgroundColor: theme.sidebarColor }]}>
          <Text style={[miniStyles.sbLabel, { color: theme.accentColor }]}>
            {t("customizeCV.miniCV.skills")}
          </Text>
          <Text style={[miniStyles.sbItem, { color: theme.sidebarText }]}>
            {t("customizeCV.miniCV.skill1")}
          </Text>
          <Text style={[miniStyles.sbItem, { color: theme.sidebarText }]}>
            {t("customizeCV.miniCV.skill2")}
          </Text>
          <Text style={[miniStyles.sbLabel, { color: theme.accentColor, marginTop: 4 }]}>
            {t("customizeCV.miniCV.languages")}
          </Text>
          <Text style={[miniStyles.sbItem, { color: theme.sidebarText }]}>
            {t("customizeCV.miniCV.lang1")}
          </Text>
          <Text style={[miniStyles.sbItem, { color: theme.sidebarText }]}>
            {t("customizeCV.miniCV.lang2")}
          </Text>
        </View>

        <View style={miniStyles.main}>
          <Text style={[miniStyles.section, { color: theme.sectionColor, borderBottomColor: theme.accentColor }]}>
            {t("customizeCV.miniCV.education")}
          </Text>
          <Text style={miniStyles.mainTitle}>{t("customizeCV.miniCV.degree")}</Text>
          <Text style={miniStyles.mainSub}>{t("customizeCV.miniCV.university")}</Text>

          <Text style={[miniStyles.section, { color: theme.sectionColor, borderBottomColor: theme.accentColor, marginTop: 4 }]}>
            {t("customizeCV.miniCV.experience")}
          </Text>
          <Text style={miniStyles.mainTitle}>{t("customizeCV.miniCV.jobTitle")}</Text>
          <Text style={miniStyles.mainSub}>{t("customizeCV.miniCV.jobPeriod")}</Text>
        </View>
      </View>
    </View>
  );
}

const miniStyles = StyleSheet.create({
  container: { borderRadius: 6, overflow: "hidden", flex: 1 },
  header: { paddingVertical: 6, paddingHorizontal: 8 },
  headerName: { fontSize: 6, fontWeight: "800", color: "#FFF", letterSpacing: 0.5 },
  headerTitle: { fontSize: 5, color: "rgba(255,255,255,0.75)", marginTop: 1 },
  body: { flexDirection: "row", flex: 1 },
  sidebar: { width: "40%", padding: 5 },
  sbLabel: { fontSize: 5, fontWeight: "700", letterSpacing: 0.5 },
  sbItem: { fontSize: 4.5, marginTop: 1.5 },
  main: { flex: 1, padding: 5 },
  section: {
    fontSize: 5.5,
    fontWeight: "700",
    letterSpacing: 0.4,
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 2,
  },
  mainTitle: { fontSize: 5, fontWeight: "600", color: "#444" },
  mainSub: { fontSize: 4.5, color: "#888", marginTop: 1 },
});

// ─────────────────────────────────────────────────────────────────────────────
// ۴. کامپوننت کارت هر تم
// ─────────────────────────────────────────────────────────────────────────────
function ThemeCard({
  theme,
  isSelected,
  onSelect,
  t,
}: {
  theme: Theme;
  isSelected: boolean;
  onSelect: () => void;
  t: (key: string) => string;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 70, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1,    duration: 70, useNativeDriver: true }),
    ]).start();
    onSelect();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        style={[
          cardStyles.card,
          isSelected && { borderColor: theme.accentColor, borderWidth: 2.5 },
        ]}
      >
        {isSelected && (
          <View style={[cardStyles.checkBadge, { backgroundColor: theme.accentColor }]}>
            <Ionicons name="checkmark" size={10} color="#fff" />
          </View>
        )}

        <View style={cardStyles.previewBox}>
          <MiniCVPreview theme={theme} t={t} />
        </View>

        <View style={cardStyles.info}>
          <View style={[cardStyles.accentBar, { backgroundColor: theme.accentColor }]} />
          <Text style={cardStyles.name}>
            {t(`customizeCV.themes.${theme.id}.name`)}
          </Text>
          <Text style={cardStyles.desc} numberOfLines={2}>
            {t(`customizeCV.themes.${theme.id}.desc`)}
          </Text>
          <View style={cardStyles.swatchRow}>
            {theme.swatches.map((color, i) => {
              const isLight = ["#FFFFFF","#FEFEFE","#FAF8F4","#FAFAF8","#FDF9FB"].includes(color);
              return (
                <View
                  key={i}
                  style={[
                    cardStyles.swatch,
                    { backgroundColor: color },
                    isLight && { borderWidth: 1, borderColor: "#E0E0E0" },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#EBEBF2",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  checkBadge: {
    position: "absolute",
    top: 8, right: 8,
    width: 20, height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  previewBox: {
    height: 110,
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  info: { padding: 10, paddingTop: 4 },
  accentBar: { height: 3, width: 24, borderRadius: 2, marginBottom: 5 },
  name: { fontSize: 12, fontWeight: "700", color: "#1A1A2E", marginBottom: 2 },
  desc: { fontSize: 10, color: "#777788", lineHeight: 14 },
  swatchRow: { flexDirection: "row", gap: 4, marginTop: 8 },
  swatch: { width: 14, height: 14, borderRadius: 7 },
});

// ─────────────────────────────────────────────────────────────────────────────
// ۵. کامپوننت اصلی صفحه
// ─────────────────────────────────────────────────────────────────────────────
export default function CustomizeCVScreen({ navigation, route }: any) {
  const data = route.params?.data || {};
  const { t, language } = useTranslation();

  const [selectedId, setSelectedId] = useState<string>("ocean");
  const selectedTheme = THEMES.find((th) => th.id === selectedId) ?? THEMES[0];

  const handlePreview = () => {
    navigation.navigate("CVPreview", {
      data,
      language,
      theme: {
        headerColor:  selectedTheme.headerColor,
        sidebarColor: selectedTheme.sidebarColor,
        accentColor:  selectedTheme.accentColor,
        sidebarText:  selectedTheme.sidebarText,
        mainBg:       selectedTheme.mainBg,
        sectionColor: selectedTheme.sectionColor,
      },
    });
  };

  return (
    <View style={styles.screen}>

      {/* ══ هدر ══ */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t("customizeCV.pageTitle")}</Text>
          <Text style={styles.headerSub}>{t("customizeCV.pageSubtitle")}</Text>
        </View>

        {/* ← منوی همبرگری جایگزین دکمه‌های زبان شد */}
        <HamburgerMenu tintColor="#1A1A2E" />
      </View>

      {/* ══ نوار نشانگر تم انتخابی ══ */}
      <View style={[styles.selectedBar, { borderLeftColor: selectedTheme.accentColor }]}>
        <View style={[styles.selectedDot, { backgroundColor: selectedTheme.accentColor }]} />
        <Text style={styles.selectedLabel}>
          {t("customizeCV.selectedLabel")}{" "}
          <Text style={[styles.selectedName, { color: selectedTheme.accentColor }]}>
            {t(`customizeCV.themes.${selectedTheme.id}.name`)}
          </Text>
        </Text>
      </View>

      {/* ══ گرید ۲ ستونه‌ی تم‌ها ══ */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: Math.ceil(THEMES.length / 2) }).map((_, rowIdx) => (
          <View key={rowIdx} style={styles.gridRow}>
            {THEMES.slice(rowIdx * 2, rowIdx * 2 + 2).map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={selectedId === theme.id}
                onSelect={() => setSelectedId(theme.id)}
                t={t}
              />
            ))}
          </View>
        ))}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ══ دکمه‌ی ثابت پیش‌نمایش ══ */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.previewBtn, { backgroundColor: selectedTheme.headerColor }]}
          onPress={handlePreview}
          activeOpacity={0.85}
        >
          <Ionicons name="document-text-outline" size={20} color="#fff" />

          <View style={styles.btnTextBox}>
            <Text style={styles.previewBtnText}>{t("customizeCV.previewBtn")}</Text>
            <Text style={styles.previewBtnSub}>
              {t("customizeCV.previewBtnSub")}{" "}
              {t(`customizeCV.themes.${selectedTheme.id}.name`)}
            </Text>
          </View>

          <View style={[styles.btnArrow, { backgroundColor: selectedTheme.accentColor }]}>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ۶. استایل‌های صفحه
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8FC" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 56,
    paddingBottom: 14,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F5",
  },
  backBtn: {
    width: 38, height: 38,
    borderRadius: 12,
    backgroundColor: "#F0F0F5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { fontSize: 17, fontWeight: "700", color: "#1A1A2E", letterSpacing: -0.3 },
  headerSub: { fontSize: 11, color: "#9999AA", marginTop: 2 },

  selectedBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 12,
    padding: 11,
    borderLeftWidth: 4,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDot: { width: 8, height: 8, borderRadius: 4 },
  selectedLabel: { fontSize: 13, color: "#555566" },
  selectedName: { fontWeight: "700" },

  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },
  gridRow: { flexDirection: "row", gap: 12 },

  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F5",
  },
  previewBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  btnTextBox: { flex: 1 },
  previewBtnText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
  previewBtnSub: { fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  btnArrow: {
    width: 32, height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});