import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GoalsProvider } from '@/contexts/GoalsContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GoalsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="all-goals" />
        <Stack.Screen name="goal-details" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </GoalsProvider>
  );
}