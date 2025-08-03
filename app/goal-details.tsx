import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Target,
  Home,
  GraduationCap,
  Car,
  Plane,
  Heart,
  Baby,
  Calendar,
  IndianRupee,
  Briefcase,
  ArrowLeft,
  Plus,
  TrendingUp,
  Edit3,
  Trash2,
  DollarSign,
  Clock,
  TrendingDown,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function GoalDetails() {
  const { id } = useLocalSearchParams();
  
  // Mock goal data - in real app, this would come from state management or API
  const goal = {
    id: 1,
    title: 'Buy Dream House in Bangalore',
    targetAmount: 8000000,
    currentAmount: 2500000,
    targetDate: '2027-06-15',
    category: 'house',
    monthlyTarget: 114583,
    progress: 31,
    createdDate: '2024-01-15',
    description: 'A beautiful 3BHK apartment in Whitefield, Bangalore with all modern amenities and good connectivity.',
  };

  const goalCategories = [
    { id: 'house', name: 'House', icon: Home, color: '#2563EB', gradient: ['#3B82F6', '#1D4ED8'] },
    { id: 'wedding', name: 'Wedding', icon: Heart, color: '#EC4899', gradient: ['#F472B6', '#DB2777'] },
    { id: 'education', name: 'Education', icon: GraduationCap, color: '#7C3AED', gradient: ['#8B5CF6', '#6D28D9'] },
    { id: 'car', name: 'Car', icon: Car, color: '#059669', gradient: ['#10B981', '#047857'] },
    { id: 'vacation', name: 'Vacation', icon: Plane, color: '#F59E0B', gradient: ['#FBBF24', '#D97706'] },
    { id: 'baby', name: 'Baby', icon: Baby, color: '#EF4444', gradient: ['#F87171', '#DC2626'] },
    { id: 'emergency', name: 'Emergency', icon: Target, color: '#06B6D4', gradient: ['#22D3EE', '#0891B2'] },
    { id: 'retirement', name: 'Retirement', icon: Briefcase, color: '#8B5CF6', gradient: ['#A78BFA', '#7C3AED'] },
  ];

  const contributions = [
    { id: 1, amount: 500000, date: '2024-01-15', type: 'initial' },
    { id: 2, amount: 100000, date: '2024-02-15', type: 'monthly' },
    { id: 3, amount: 150000, date: '2024-03-15', type: 'bonus' },
    { id: 4, amount: 100000, date: '2024-04-15', type: 'monthly' },
    { id: 5, amount: 200000, date: '2024-05-15', type: 'extra' },
  ];

  const getCategoryInfo = (categoryId) => {
    return goalCategories.find((cat) => cat.id === categoryId) || goalCategories[0];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const categoryInfo = getCategoryInfo(goal.category);
  const IconComponent = categoryInfo.icon;
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const targetDate = new Date(goal.targetDate);
  const monthsRemaining = Math.max(
    1,
    Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24 * 30))
  );

  const addContribution = () => {
    Alert.prompt(
      'Add Contribution',
      'Enter amount to add:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: (amount) => {
            const numAmount = parseFloat(amount || '0');
            if (numAmount > 0) {
              Alert.alert('Success!', `₹${numAmount} added to ${goal.title}`);
            }
          },
        },
      ],
      'plain-text',
      '',
      'numeric'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={categoryInfo.gradient}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Goal Details</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit3 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Goal Overview Card */}
        <View style={styles.overviewCard}>
          <LinearGradient
            colors={['#FFFFFF', '#F8FAFC']}
            style={styles.overviewGradient}
          >
            <View style={styles.goalHeader}>
              <LinearGradient
                colors={categoryInfo.gradient}
                style={styles.goalIcon}
              >
                <IconComponent size={32} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalDescription}>{goal.description}</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Progress</Text>
                <Text style={styles.progressPercentage}>{goal.progress}%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <LinearGradient
                  colors={categoryInfo.gradient}
                  style={[
                    styles.progressBarFill,
                    { width: `${goal.progress}%` },
                  ]}
                />
              </View>
              <View style={styles.amountInfo}>
                <Text style={styles.currentAmount}>
                  {formatCurrency(goal.currentAmount)}
                </Text>
                <Text style={styles.targetAmount}>
                  of {formatCurrency(goal.targetAmount)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsCard}>
          <Text style={styles.metricsTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                style={styles.metricIcon}
              >
                <DollarSign size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.metricValue}>
                {formatCurrency(remainingAmount)}
              </Text>
              <Text style={styles.metricLabel}>Remaining</Text>
            </View>
            <View style={styles.metricItem}>
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.metricIcon}
              >
                <IndianRupee size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.metricValue}>
                {formatCurrency(goal.monthlyTarget)}
              </Text>
              <Text style={styles.metricLabel}>Monthly Target</Text>
            </View>
            <View style={styles.metricItem}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.metricIcon}
              >
                <Clock size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.metricValue}>{monthsRemaining}</Text>
              <Text style={styles.metricLabel}>Months Left</Text>
            </View>
            <View style={styles.metricItem}>
              <LinearGradient
                colors={['#10B981', '#047857']}
                style={styles.metricIcon}
              >
                <TrendingUp size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.metricValue}>
                ₹{(goal.currentAmount / contributions.length / 1000).toFixed(0)}K
              </Text>
              <Text style={styles.metricLabel}>Avg Monthly</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.primaryAction} onPress={addContribution}>
            <LinearGradient
              colors={categoryInfo.gradient}
              style={styles.primaryActionGradient}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.primaryActionText}>Add Contribution</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.secondaryActions}>
            <TouchableOpacity 
              style={styles.secondaryAction}
              onPress={() => Alert.alert('Start SIP', 'SIP feature coming soon!')}
            >
              <TrendingUp size={18} color="#2563EB" />
              <Text style={styles.secondaryActionText}>Start SIP</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryAction}
              onPress={() => Alert.alert('Edit Goal', 'Edit feature coming soon!')}
            >
              <Edit3 size={18} color="#059669" />
              <Text style={styles.secondaryActionText}>Edit Goal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contribution History */}
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Contribution History</Text>
          <View style={styles.historyList}>
            {contributions.map((contribution) => (
              <View key={contribution.id} style={styles.historyItem}>
                <View style={styles.historyIcon}>
                  <Plus size={16} color="#10B981" />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyAmount}>
                    {formatCurrency(contribution.amount)}
                  </Text>
                  <Text style={styles.historyDate}>
                    {new Date(contribution.date).toLocaleDateString('en-IN')}
                  </Text>
                </View>
                <View style={styles.historyType}>
                  <Text style={styles.historyTypeText}>
                    {contribution.type}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Goal Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Goal Timeline</Text>
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}>
              <Target size={16} color="#2563EB" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineText}>Goal Created</Text>
              <Text style={styles.timelineDate}>
                {new Date(goal.createdDate).toLocaleDateString('en-IN')}
              </Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}>
              <Calendar size={16} color="#F59E0B" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineText}>Target Date</Text>
              <Text style={styles.timelineDate}>
                {targetDate.toLocaleDateString('en-IN')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewCard: {
    marginTop: -12,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  overviewGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  goalIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  progressSection: {
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563EB',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  amountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  targetAmount: {
    fontSize: 14,
    color: '#6B7280',
  },
  metricsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  metricIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  primaryAction: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  primaryActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 6,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  historyDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  historyType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
  },
  historyTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4F46E5',
    textTransform: 'capitalize',
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  timelineDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});