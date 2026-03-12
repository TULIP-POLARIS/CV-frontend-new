import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

export default function AnimatedCard({ children }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  const onHoverIn = () => {
    Animated.spring(scale, {
      toValue: 1.03,
      useNativeDriver: true,
    }).start();
  };

  const onHoverOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
    >
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale }] }
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});