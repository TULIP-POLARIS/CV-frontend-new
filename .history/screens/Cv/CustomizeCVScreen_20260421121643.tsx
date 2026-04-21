import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { generateCv } from "../../services/cv.service";
import { CVData } from "../../types/cv";

export default function CustomizeCVScreen({ navigation, route }: any) {
  const data = route.params?.data || {}; 
  const { token } = useAuth();
  const [primaryColor, setPrimaryColor] = useState("#2F3E4D");
  const [generateModal, setGenerateModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<{ cvData: CVData; message: string } | null>(null);

  const handleGenerateCV = async () => {
    if (!jobTitle.trim() || !jobDescription.trim()) {
      Alert.alert("Error", "Please fill in both job title and job description.");
      return;
    }

    setGenerating(true);
    try {
      const result = await generateCv({
        token,
        jobTitle: jobTitle.trim(),
        jobDescription: jobDescription.trim(),
      });

      // Check if CV has any data
      const hasData = 
        result.data.name !== "N/A" && 
        (result.data.skills?.length > 0 || 
         result.data.education?.length > 0 || 
         result.data.experience?.length > 0 ||
         result.data.summary?.trim());

      if (!hasData) {
        Alert.alert(
          "No Profile Data",
          "Your profile appears to be empty. Please fill in your Personal Info, Education, Work Experience, and Skills in the Profile section first.\n\nOnce your profile is complete, the AI can generate a tailored CV.",
          [
            { text: "Go to Profile", onPress: () => navigation.navigate("MainTabs") },
            { text: "Cancel", onPress: () => {} }
          ]
        );
        setGenerating(false);
        return;
      }

      setGeneratedCV({
        cvData: result.data,
        message: result.response.message,
      });
      setGenerateModal(false);
      setResultModal(true);
      setJobTitle("");
      setJobDescription("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to generate CV.");
    } finally {
      setGenerating(false);
    }
  };

  const handleViewGeneratedCV = () => {
    if (generatedCV?.cvData) {
      setResultModal(false);
      navigation.navigate("CVPreview", {
        data: generatedCV.cvData,
        primaryColor,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your CV</Text>

      <Text style={styles.label}>Select Header Color</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.color, { backgroundColor: "#2F3E4D" }]}
          onPress={() => setPrimaryColor("#2F3E4D")}
        />
        <TouchableOpacity
          style={[styles.color, { backgroundColor: "#4A90E2" }]}
          onPress={() => setPrimaryColor("#4A90E2")}
        />
        <TouchableOpacity
          style={[styles.color, { backgroundColor: "#4CAF50" }]}
          onPress={() => setPrimaryColor("#4CAF50")}
        />
      </View>

      <View style={styles.infoBox}>
        <Icon name="information-circle-outline" size={18} color="#4A90E2" />
        <Text style={styles.infoText}>
          Make sure your Profile (Personal, Education, Work, Skills) is complete before generating a CV. The AI uses your profile data to create a tailored CV.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setGenerateModal(true)}
      >
        <Icon name="sparkles-outline" size={18} color="#fff" />
        <Text style={styles.buttonText}>Generate CV with AI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("CVPreview", {
            data,
            primaryColor,
          })
        }
      >
        <Text style={styles.buttonText}>Preview CV</Text>
      </TouchableOpacity>

      {/* ── Generate CV Modal ── */}
      <Modal visible={generateModal} transparent animationType="slide">
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Pressable
            style={styles.overlay}
            onPress={() => setGenerateModal(false)}
          >
            <Pressable style={styles.sheet} onPress={() => {}}>
              <View style={styles.handle} />

              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Generate CV with AI</Text>
                <TouchableOpacity
                  onPress={() => setGenerateModal(false)}
                  style={styles.closeBtn}
                >
                  <Icon name="close" size={22} color="#607d8b" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <View style={styles.hintBox}>
                  <Icon name="information-circle-outline" size={18} color="#4A90E2" />
                  <Text style={styles.hintText}>
                    Tell us the job title and describe the position to generate a tailored CV.
                  </Text>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Job Title *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., React Native Developer"
                    placeholderTextColor="#b0bec5"
                    value={jobTitle}
                    onChangeText={setJobTitle}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Job Description *</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="e.g., Looking for a React Native developer with 5+ years of experience..."
                    placeholderTextColor="#b0bec5"
                    value={jobDescription}
                    onChangeText={setJobDescription}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                </View>

                <View style={styles.sheetActions}>
                  <TouchableOpacity
                    style={[styles.btnSecondary]}
                    onPress={() => setGenerateModal(false)}
                  >
                    <Text style={styles.btnSecondaryText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btnPrimary, generating && styles.btnDisabled]}
                    onPress={handleGenerateCV}
                    disabled={generating}
                  >
                    {generating ? (
                      <>
                        <ActivityIndicator color="#fff" size="small" />
                        <Text style={styles.btnPrimaryText}>Generating...</Text>
                      </>
                    ) : (
                      <>
                        <Icon name="sparkles-outline" size={18} color="#ffffff" />
                        <Text style={styles.btnPrimaryText}>Generate CV</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── Generated CV Result Modal ── */}
      <Modal visible={resultModal} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setResultModal(false)}>
          <Pressable style={styles.resultSheet} onPress={() => {}}>
            <View style={styles.resultHeader}>
              <Icon name="checkmark-circle" size={60} color="#4CAF50" />
              <Text style={styles.resultTitle}>CV Generated Successfully!</Text>
            </View>

            <View style={styles.resultContent}>
              <View style={styles.resultBox}>
                <Icon name="document-outline" size={24} color="#4A90E2" />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultLabel}>Generated CV</Text>
                  <Text style={styles.resultMessage}>{generatedCV?.message}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.resultDataBox}>
                <Text style={styles.resultDataLabel}>CV Details:</Text>
                <Text style={styles.resultDataItem}>
                  <Text style={styles.bold}>Name:</Text> {generatedCV?.cvData?.name}
                </Text>
                <Text style={styles.resultDataItem}>
                  <Text style={styles.bold}>Title:</Text> {generatedCV?.cvData?.title}
                </Text>
                <Text style={styles.resultDataItem}>
                  <Text style={styles.bold}>Skills:</Text> {generatedCV?.cvData?.skills?.join(", ") || "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.resultActions}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => setResultModal(false)}
              >
                <Text style={styles.btnSecondaryText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={handleViewGeneratedCV}
              >
                <Icon name="document-outline" size={18} color="#ffffff" />
                <Text style={styles.btnPrimaryText}>View CV</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  label: { marginBottom: 10 },

  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef4ff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#455a64",
    lineHeight: 18,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sheetTitle: { fontSize: 17, fontWeight: "700", color: "#263238" },
  closeBtn: { padding: 4 },

  scrollView: { paddingHorizontal: 20 },

  hintBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#eef4ff",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginTop: 16,
    marginBottom: 16,
  },
  hintText: { flex: 1, fontSize: 13, color: "#455a64", lineHeight: 20 },

  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#263238",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#dce8fb",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "transparent",
    fontSize: 14,
    color: "#263238",
    padding: 12,
    lineHeight: 22,
  },
  textArea: {
    minHeight: 140,
    textAlignVertical: "top",
  },

  sheetActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  btnPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: "#4A90E2",
  },
  btnDisabled: {
    backgroundColor: "#90a4ae",
  },
  btnPrimaryText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
  },

  btnSecondary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#4A90E2",
    backgroundColor: "#ffffff",
  },
  btnSecondaryText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4A90E2",
  },

  resultSheet: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 24,
    marginVertical: "auto",
  },

  resultHeader: {
    alignItems: "center",
    marginBottom: 24,
  },

  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#263238",
    marginTop: 12,
    textAlign: "center",
  },

  resultContent: {
    marginBottom: 24,
  },

  resultBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef4ff",
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginBottom: 12,
  },

  resultInfo: {
    flex: 1,
  },

  resultLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#263238",
  },

  resultMessage: {
    fontSize: 13,
    color: "#455a64",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },

  urlBox: {
    backgroundColor: "#f8faff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dce8fb",
    padding: 14,
  },

  urlLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#607d8b",
    marginBottom: 8,
  },

  urlText: {
    fontSize: 12,
    color: "#4A90E2",
    fontFamily: "Courier New",
    lineHeight: 18,
  },

  resultDataBox: {
    backgroundColor: "#f8faff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dce8fb",
    padding: 14,
  },

  resultDataLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#263238",
    marginBottom: 10,
  },

  resultDataItem: {
    fontSize: 13,
    color: "#455a64",
    marginBottom: 6,
    lineHeight: 18,
  },

  bold: {
    fontWeight: "700",
    color: "#263238",
  },

  resultActions: {
    flexDirection: "row",
    gap: 10,
  },
});